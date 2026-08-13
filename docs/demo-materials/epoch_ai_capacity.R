# ---------------------------------------------------------------------------
# From capacity to consumption: estimating AI data-center electricity use
# AI for Urban Health / DSPH — Environmental Sustainability track, Activity 4
#
# Data: Epoch AI, "AI Data Centers". Published online at epoch.ai.
#       Retrieved from https://epoch.ai/data/ai-data-centers   (CC-BY)
#
# This script does not exist to give you a number. It exists to show you that
# capacity x 8,760 hours is an upper bound, not an estimate, and to let you see
# which assumption actually moves the answer.
# ---------------------------------------------------------------------------

CSV_URL <- "https://epoch.ai/data/data_centers/data_centers.csv"

## 1. Load -------------------------------------------------------------------
## Epoch revises this schema as the database grows. ALWAYS read the column
## names before trusting anything below.
dc <- tryCatch(
  read.csv(CSV_URL, stringsAsFactors = FALSE, check.names = FALSE),
  error = function(e)
    stop("Could not reach epoch.ai. Download the CSV by hand from ",
         "https://epoch.ai/data/ai-data-centers and point CSV_URL at the local file.")
)

cat("\n=== COLUMNS (check these against the code below) ===\n")
print(names(dc))
cat("\nRows:", nrow(dc), "\n")

## 2. Find the current-capacity column ---------------------------------------
## Epoch's headline uses CURRENT values: sites under construction carry 0, and
## ramping campuses carry only the capacity energized so far. That is a feature.
power_cols <- grep("power", names(dc), ignore.case = TRUE, value = TRUE)
cat("\nCandidate power columns:", paste(power_cols, collapse = " | "), "\n")

POWER_COL <- power_cols[grepl("current", power_cols, ignore.case = TRUE)][1]
if (is.na(POWER_COL)) POWER_COL <- power_cols[1]      # <-- EDIT if the grep picked wrong
cat("Using column:", POWER_COL, "\n")

mw <- suppressWarnings(as.numeric(gsub("[^0-9.]", "", dc[[POWER_COL]])))
mw <- mw[!is.na(mw) & mw > 0]
tracked_gw <- sum(mw) / 1000

cat(sprintf("\nTracked current capacity: %.1f GW across %d sites with a nonzero value\n",
            tracked_gw, length(mw)))
cat("Epoch's published headline was ~12.1 GW IT power / 78 sites in Aug 2026.\n")
cat("Differ a lot? You are probably summing FACILITY power rather than IT power.\n")

## 3. Parameters — this is the actual content of the exercise ----------------
COVERAGE <- 0.27   # Epoch's share of globally DELIVERED AI compute, in
                   # H100-equivalents, as of April 2026. NOTE: this is a share of
                   # COMPUTE, not of megawatts, and it carries a different date
                   # than the capacity snapshot. Both facts matter and they push
                   # in opposite directions.
HOURS    <- 8760

estimate <- function(ratio_lo, ratio_hi,
                     util_lo, util_hi,
                     pue_lo = 1.2, pue_hi = 1.4) {
  it_gw <- tracked_gw / COVERAGE
  c(low  = it_gw * ratio_lo * pue_lo * util_lo * HOURS / 1000,
    high = it_gw * ratio_hi * pue_hi * util_hi * HOURS / 1000)
}
show <- function(label, v)
  cat(sprintf("%-46s %6.0f - %6.0f TWh\n", label, v["low"], v["high"]))

## 4. The naive estimate ------------------------------------------------------
cat("\n=== STEP 1: the obvious calculation ===\n")
naive <- estimate(ratio_lo = 1.00, ratio_hi = 1.00,   # today's capacity, all year
                  util_lo  = 0.60, util_hi  = 0.80)   # "servers are busy"
show("naive", naive)
cat("\nCompare that with the IEA's 155 TWh for AI-focused data centres in 2025\n")
cat("and de Vries-Gao's 46-82 TWh for the same year. You are 2-3x high.\n")

## 5. Correction one: WHICH YEAR are you estimating? --------------------------
## The dominant error, and the least obvious. An August 2026 capacity snapshot
## describes 2026 - not 2025. In a fleet doubling roughly annually, energy is the
## integral of the growth curve, not the endpoint times 8,760.
cat("\n=== STEP 2: fix the time base ===\n")
show("2026, average capacity (ratio 0.65-0.75)", estimate(0.65, 0.75, 0.60, 0.80))
show("2025, back-cast       (ratio 0.30-0.40)", estimate(0.30, 0.40, 0.60, 0.80))

## 6. Correction two: nameplate is not average draw ---------------------------
## Epoch's IT power is every chip at rated TDP and its PUE is PEAK PUE.
## Published fleet-wide effective load factors run 0.4-0.6. LBNL models training
## servers near 0.56 of nameplate and inference fleets nearer 0.2.
cat("\n=== STEP 3: add a realistic load factor (0.4-0.6) ===\n")
est_2026 <- estimate(0.65, 0.75, 0.40, 0.60)
est_2025 <- estimate(0.30, 0.40, 0.40, 0.60)
show("2026, corrected", est_2026)
show("2025, corrected", est_2025)

## 7. Published anchors -------------------------------------------------------
cat("\n=== STEP 4: how does that sit against the literature? ===\n")
cat("2025  IEA (2026), whole AI-focused facilities .......... ~155 TWh\n")
cat("2025  de Vries-Gao (Joule 2025), AI hardware only ...... 46-82 TWh\n")
cat("2026  IEA path, interpolated (not a published figure) ... ~210-230 TWh\n\n")
cat("Your corrected 2025 band should sit BELOW the IEA figure and overlap\n")
cat("de Vries-Gao. That is where a hardware-boundary estimate belongs: the IEA\n")
cat("counts whole AI-focused facilities including their storage, networking and\n")
cat("conventional servers. Neither boundary is wrong. They are different objects.\n")

## 8. One-at-a-time sensitivity ----------------------------------------------
cat("\n=== STEP 5: rank the assumptions by how much they move the answer ===\n")
show("naive",                              naive)
show("only fix the load factor",           estimate(1.00, 1.00, 0.40, 0.60))
show("only fix the time base (to 2026)",   estimate(0.65, 0.75, 0.60, 0.80))
show("only fix the time base (to 2025)",   estimate(0.30, 0.40, 0.60, 0.80))
show("fix both (2026)",                    est_2026)
show("fix both (2025)",                    est_2025)

cat("\n--- What to take away --------------------------------------------------\n")
cat("1. Never divide a snapshot by a coverage fraction carrying a different date.\n")
cat("2. Capacity x hours is an upper bound. Energy needs a load factor.\n")
cat("3. In a fleet doubling annually, today's capacity x 8,760 overstates LAST\n")
cat("   year's energy by roughly 3x even if every other assumption is right.\n")
cat("4. Report a range. Every input here is a range.\n")
