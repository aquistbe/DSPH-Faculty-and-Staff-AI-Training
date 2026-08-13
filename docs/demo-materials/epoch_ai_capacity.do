*! ---------------------------------------------------------------------------
*! From capacity to consumption: estimating AI data-center electricity use
*! AI for Urban Health / DSPH — Environmental Sustainability track, Activity 4
*!
*! Data: Epoch AI, "AI Data Centers". Published online at epoch.ai.
*!       Retrieved from https://epoch.ai/data/ai-data-centers   (CC-BY)
*!
*! This do-file does not exist to give you a number. It exists to show that
*! capacity x 8,760 hours is an upper bound, not an estimate.
*! ---------------------------------------------------------------------------

clear all
set more off

local CSV "https://epoch.ai/data/data_centers/data_centers.csv"

*--- 1. Load ----------------------------------------------------------------
* Stata can read a remote CSV directly. If your institution blocks it, download
* by hand from https://epoch.ai/data/ai-data-centers and use the local path.
capture import delimited "`CSV'", clear varnames(1) stringcols(_all)
if _rc {
    display as error "Could not reach epoch.ai. Download the CSV and set local CSV to the file path."
    exit 1
}

display _newline "=== COLUMNS (check these against the code below) ==="
ds
display _newline "Rows: " _N

*--- 2. Find the current-capacity column ------------------------------------
* Epoch's headline uses CURRENT values: sites under construction carry 0, and
* ramping campuses carry only the capacity energized so far.
ds *power* *Power*
local pcands `r(varlist)'
display _newline "Candidate power variables: `pcands'"

* EDIT THIS if the list above shows a better match.
local POWERVAR ""
foreach v of local pcands {
    if strpos(lower("`v'"), "current") & "`POWERVAR'" == "" local POWERVAR "`v'"
}
if "`POWERVAR'" == "" {
    local POWERVAR : word 1 of `pcands'
}
display "Using variable: `POWERVAR'"

* strip any non-numeric characters, then make numeric
generate str mw_str = ustrregexra(`POWERVAR', "[^0-9.]", "")
destring mw_str, generate(mw) force
drop if missing(mw) | mw <= 0

quietly summarize mw
local tracked_gw = r(sum)/1000
local nsites = r(N)
display _newline "Tracked current capacity: " %5.1f `tracked_gw' " GW across " `nsites' " sites with a nonzero value"
display "Epoch's published headline was ~12.1 GW IT power / 78 sites in Aug 2026."
display "Differ a lot? You are probably summing FACILITY power rather than IT power."

*--- 3. Parameters — the actual content of the exercise ---------------------
* COVERAGE is Epoch's share of globally DELIVERED AI compute, in H100-equivalents,
* as of April 2026. It is a share of COMPUTE, not of megawatts, and it carries a
* different date than the capacity snapshot. Both facts matter, and they push in
* opposite directions.
local COVERAGE = 0.27
local HOURS    = 8760
local IT_GW    = `tracked_gw' / `COVERAGE'

* estimate: ratio_lo ratio_hi util_lo util_hi [pue_lo pue_hi] label
capture program drop epochest
program define epochest
    args it_gw hours ratio_lo ratio_hi util_lo util_hi label
    local pue_lo = 1.2
    local pue_hi = 1.4
    local lo = `it_gw' * `ratio_lo' * `pue_lo' * `util_lo' * `hours' / 1000
    local hi = `it_gw' * `ratio_hi' * `pue_hi' * `util_hi' * `hours' / 1000
    display %-46s "`label'" %8.0f `lo' " - " %6.0f `hi' " TWh"
end

*--- 4. The naive estimate ---------------------------------------------------
display _newline "=== STEP 1: the obvious calculation ==="
epochest `IT_GW' `HOURS' 1.00 1.00 0.60 0.80 "naive"
display _newline "Compare with the IEA's 155 TWh for AI-focused data centres in 2025,"
display "and de Vries-Gao's 46-82 TWh for the same year. You are 2-3x high."

*--- 5. Correction one: which YEAR are you estimating? ----------------------
* The dominant error, and the least obvious. An August 2026 capacity snapshot
* describes 2026, not 2025. In a fleet doubling roughly annually, energy is the
* integral of the growth curve, not the endpoint times 8,760.
display _newline "=== STEP 2: fix the time base ==="
epochest `IT_GW' `HOURS' 0.65 0.75 0.60 0.80 "2026, average capacity (ratio 0.65-0.75)"
epochest `IT_GW' `HOURS' 0.30 0.40 0.60 0.80 "2025, back-cast       (ratio 0.30-0.40)"

*--- 6. Correction two: nameplate is not average draw -----------------------
* Epoch's IT power is every chip at rated TDP and its PUE is PEAK PUE.
* Published fleet-wide effective load factors run 0.4-0.6; LBNL models training
* servers near 0.56 of nameplate and inference fleets nearer 0.2.
display _newline "=== STEP 3: add a realistic load factor (0.4-0.6) ==="
epochest `IT_GW' `HOURS' 0.65 0.75 0.40 0.60 "2026, corrected"
epochest `IT_GW' `HOURS' 0.30 0.40 0.40 0.60 "2025, corrected"

*--- 7. Published anchors ----------------------------------------------------
display _newline "=== STEP 4: how does that sit against the literature? ==="
display "2025  IEA (2026), whole AI-focused facilities .......... ~155 TWh"
display "2025  de Vries-Gao (Joule 2025), AI hardware only ...... 46-82 TWh"
display "2026  IEA path, interpolated (not a published figure) ... ~210-230 TWh"
display _newline "Your corrected 2025 band should sit BELOW the IEA figure and overlap"
display "de Vries-Gao. That is where a hardware-boundary estimate belongs."

*--- 8. One-at-a-time sensitivity -------------------------------------------
display _newline "=== STEP 5: rank the assumptions by how much they move the answer ==="
epochest `IT_GW' `HOURS' 1.00 1.00 0.60 0.80 "naive"
epochest `IT_GW' `HOURS' 1.00 1.00 0.40 0.60 "only fix the load factor"
epochest `IT_GW' `HOURS' 0.65 0.75 0.60 0.80 "only fix the time base (to 2026)"
epochest `IT_GW' `HOURS' 0.30 0.40 0.60 0.80 "only fix the time base (to 2025)"
epochest `IT_GW' `HOURS' 0.65 0.75 0.40 0.60 "fix both (2026)"
epochest `IT_GW' `HOURS' 0.30 0.40 0.40 0.60 "fix both (2025)"

display _newline "--- What to take away --------------------------------------------------"
display "1. Never divide a snapshot by a coverage fraction carrying a different date."
display "2. Capacity x hours is an upper bound. Energy needs a load factor."
display "3. In a fleet doubling annually, today's capacity x 8,760 overstates LAST"
display "   year's energy by roughly 3x even if every other assumption is right."
display "4. Report a range. Every input here is a range."
