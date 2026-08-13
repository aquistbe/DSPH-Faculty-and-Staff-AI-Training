# Changelog

Substantive changes to the teaching materials in this repository — principally the
[AI Environmental Footprint Explorer](interactive/ai-footprint-explorer.html) and the
[Environmental Sustainability track](tracks/environmental-sustainability.qmd).

Git history records *that* a figure changed. This file records **what superseded what, and on
what evidence** — which matters here because almost every number in the Explorer is contested,
several widely-circulated ones have turned out to be wrong, and the corrections are themselves
teaching material.

Format: newest first. Each entry names the figure, the old value, the new value, and the source
that forced the change.

---

## 2026-08-13 (later) — Metric tabs, and water/carbon in the comparison modules

### Energy / Water / Carbon tabs

Modules A, B and B2 now each carry a **Show: Energy | Water | Carbon** switch and display one chart
at a time. The three tab strips drive a single shared state, so choosing Water anywhere puts every
module in water. Module A previously stacked three charts; it now shows one, which is most of the
scrolling saved.

### Water and carbon added to "AI task vs. doing it yourself"

The important part is that the two sides are now on the **same footing**, which the headline figures
usually are not:

- **Water.** A laptop consumes no water itself, so its water is entirely what was evaporated
  generating its electricity. The AI bar adds that *same* generation water to the data centre's
  on-site cooling water — Google's disclosed 0.26 mL per prompt covers only the cooling. Plotting the
  disclosed AI figure against a generation-water laptop figure would have compared different things
  and flattered the AI side.
- **Carbon.** Location-based on both sides at ~350 gCO₂e/kWh. Neither counts manufacturing.
- At mid estimates: a frontier chat query is **0.9 mL** and **0.09 g** against **34 mL** and
  **5.95 g** for 20 minutes of laptop use.

### Water and carbon added to "When the agent costs more than the person"

Both sides are pure electricity, so one grid factor applies to both. At METR's $3,300 crossover:
agent **~1,920 L** and **~336 kg CO₂e**, human researcher **~134 L** and **~23 kg**. Noted on the
chart: the agent's data centre would also evaporate cooling water on site, which is not counted, so
the agent bar is if anything conservative.

### The new grid factor, and why it has a wide range

`GRID_ML_PER_WH = {low: 1.0, mid: 2.0, high: 4.5}` — millilitres of freshwater **consumed** (not
withdrawn; withdrawal is ~40× larger but mostly returned) per Wh of US grid electricity.

- **Low 1.0** — thermoelectric only, hydropower evaporation excluded. USGS empirical data give
  0.92 L/kWh; a Macknick-weighted 2025 generation mix gives ~1.0.
- **Mid 2.0** — hydropower included at Macknick et al.'s median allocation.
- **High 4.5** — full reservoir-evaporation allocation; this is LBNL's figure for US data-centre
  locations.

The 4.5× spread is **the same argument** that splits the LBNL and Harvard data-centre water
estimates, reproduced at grid level: how much evaporation from a multipurpose reservoir should be
charged to the electricity it generates. Source: Macknick et al., *Environmental Research Letters*
2012, weighted to the 2025 EIA mix, cross-checked against USGS and LBNL.

### Fixed

- Derived values now round to 3 significant figures. Before this, floating-point arithmetic put
  **"0.8999999999999999 mL"** on a chart label.
- Module B's legend said "AI query (energy)" regardless of which metric was displayed.

---

## 2026-08-13 — Carbon added as a third dimension

Module A now shows **CO₂e alongside energy and water**, for AI tasks and everyday activities, in
both the single-task and annual views, with matching tables.

### The accounting choice, stated plainly

Every carbon bar is **location-based** — what the grid where the work physically happened actually
emitted. Where no figure was disclosed, it is the task's energy × the US average grid intensity of
**350 gCO₂e/kWh** (EPA eGRID2023). That is the number comparable to the everyday bars, which are all
tailpipe or grid figures, and it is the number that matters to a community living near a facility.

Market-based accounting — what companies usually report — is explained in an expandable note under
the chart rather than plotted. Google's disclosed **0.03 gCO₂e** for a median Gemini text prompt is
market-based; using Google's own location-based emission factor for the same year (**345 vs
94 gCO₂e/kWh**) the same prompt is nearer **0.09 g**, which is what the chart shows. Both are
legitimate and the GHG Protocol requires reporting both. The note also carries the cleanest available
illustration: Meta's Llama 3.1 model card reports **11,390 tCO₂e location-based and 0 tCO₂e
market-based** for the same training run.

### Per-bar boundary labels

Each bar now carries its accounting boundary under the label — *inference only*, *inference +
embodied hardware, no training*, *full lifecycle, farm to retail*, *tailpipe*, and so on. This exists
to prevent the most common error in AI carbon comparisons: putting a company's market-based,
inference-only figure next to an everyday activity's full-lifecycle figure and reading the difference
as efficiency. Google's 0.03 g and Mistral's ISO-compliant **1.14 gCO₂e per 400-token response** are
not 38× apart in efficiency — Mistral's includes amortised training and server manufacturing.

### Figures added

- AI tasks, gCO₂e location-based (low/mid/high): small model 0.005/0.011/0.035 · frontier text
  0.035/**0.09**/0.21 · long reasoning 0.7/1.4/14 · image 0.1/0.35/1.0 · 5-second video 10/330/1050 ·
  agentic task 14/**52**/175 · agentic working day 350/1050/2100. All derived from the tool's existing
  energy ranges except where noted; Hausfather's own annual figure implies ~50 gCO₂e per agentic task
  at the US average grid, which matches.
- Everyday comparators: web search 0.2 g (Google, 2009) · phone charge ~7 g · streaming hour 36 g
  (IEA) · kettle ~40 g · driving one mile 400 g (EPA tailpipe) · EV mile 35–200 g depending on grid.
- **Two new carbon-only anchors**: 100 g of beef at ~6,000 gCO₂e (Poore & Nemecek 2018 via Our World
  in Data) and a one-way transatlantic flight at ~700 kgCO₂e per passenger (Wynes & Nicholas 2017).
  Both are there to make the log scale do its work — a frontier text prompt is roughly one
  eight-millionth of the flight.

### Deliberately not added

A per-capita CO₂ line in the annual callout, because no per-capita figure was verified in this pass.
The energy and water per-capita lines stand; carbon will follow when the denominator is checked.

Also not added: **health exposures and outcomes.** Requested, and deferred by agreement until the
literature supports it — as of August 2026 there is no epidemiology on data-center-adjacent
populations at all (no cohort, case-control, or panel study), no study of data-center noise and
health, and none on water and health. The gap is documented in the lecture materials rather than
papered over here.

---

## 2026-08-12 (later) — Scope boundary: what the operational numbers leave out

Everything in the Explorer measures the electricity and water used to **run** models. Two new
sources argue that this is the narrow question.

### Added

- **Module: "What this tool does not measure."** Three expandable items — enabled emissions,
  the opposite finding in the same journal, and manufacturing/grid-mix — plus a closing note on
  why the operational numbers still matter (they drive siting, local air quality, and bills).
- **Enabled emissions.** Alpine, Geldner, Alpine & Chepeliev, "AI-driven productivity gains enable
  more CO₂ emissions than they avoid in a global energy–economy model,"
  *[npj Climate Action](https://www.nature.com/articles/s44168-026-00411-0)* 5:71 (4 Aug 2026),
  open access. Static GTAP-E-Power CGE; net **0.47–1.8 Gt CO₂/yr** (1.2–4.8% of 2024 energy-related
  CO₂), and renewables productivity gains must exceed fossil gains by **~4–5×** to break even.
  **Disclosed when teaching:** two of four authors run the Enabled Emissions Campaign, an advocacy
  organisation named after the paper's central concept, and are ex-Microsoft staff who left publicly
  over Azure's oil and gas contracts — declared in the paper as a non-financial competing interest;
  the fourth author is at Purdue's Center for Global Trade Analysis and develops the GTAP-Power
  database used. Fossil productivity shocks are calibrated from investment-bank and consultancy
  projections; **no peer-reviewed econometric estimate of realised AI productivity gains in oil and
  gas exists.** Teach the mechanism, not the gigatonnes.
- **Deliberately omitted: the paper's "3.3–13.3× the IEA datacenter estimate" figure.** It compares
  a gross, counterfactual, economy-wide model output against an attributional inventory estimate
  covering *all* datacenter workloads — two inflations in one ratio. The authors themselves state it
  "contextualizes magnitude only; it is not an aggregation across analytical frameworks." The net
  Gt range is used instead.
- **The counterpoint.** Stern, Romani et al., "Green and intelligent: the role of AI in the climate
  transition," *[npj Climate Action](https://www.nature.com/articles/s44168-025-00252-3)* (2025) —
  AI could **cut 3.2–5.4 Gt CO₂e/yr by 2035**. Same journal, opposite sign, both scenario exercises.
  Added to the track readings as a deliberate pair.
- **A challenge to the right-sizing module.** Hausfather (*The Climate Brink*, Aug 2026) argues the
  decisive lever is grid decarbonisation, not user restraint — hardware is ~150× more efficient than
  in 2016 and total consumption rose anyway. Surfaced in Module C rather than buried: right-sizing
  is the lever an individual holds, the generation mix is the lever that determines the outcome.

### Refined

- **Agentic source detail**, from reading the Hausfather piece in full rather than secondhand:
  ~150 Wh per typed prompt (60–290), **~600× a chat prompt**, uncertain by a factor of ~2 either
  way; **96% of tokens were cache reads**, so the assumed cost of a cached token (he uses 10%,
  published methods span 1–25%) drives the estimate more than anything else; annualised to ~1.1 MWh
  and ~370 kgCO₂e — an electric clothes dryer, or half a California EV. Competing estimates now
  named: 41 Wh/session (Couch), ~459 Wh for a 100k-token agent run (Masley), and Bai et al. (2026)
  putting coding agents at ~1,000× the tokens of ordinary chat.
- **New "why estimates disagree" entry** on cached-token accounting.
- Pruned 9 orphaned `SOURCE_HTML` keys left behind by earlier source-string edits, and added a
  comment at the top of that object explaining the re-keying requirement.

---

## 2026-08-12 — Agentic workloads, growth drivers, and the Epoch AI dataset

**Prompted by** an audience question after the Steinbright session: *per-query numbers understate
the industrial driver — isn't the growth coming from enterprise and agentic use rather than
individuals?* Largely correct, and the tool had no way to represent it.

### Added

- **Two agentic tasks** in the task picker: "One agentic AI task" (40 / 150 / 500 Wh) and
  "A working day of agentic AI" (~3 kWh, flagged low-confidence). Evidence: Anthropic reports
  agents use ~4× the tokens of a chat and multi-agent systems ~15×; KAIST (HPCA 2026,
  [arXiv 2506.04301](https://arxiv.org/abs/2506.04301)) measured ~348 Wh for a Reflexion task
  against 2.55 Wh for a single query, with GPUs idle-but-powered up to 54.5% of the time on
  tool-heavy tasks — which is why the *energy* multiplier exceeds the *token* multiplier;
  Hausfather's instrumented field estimate
  ([The Climate Brink](https://www.theclimatebrink.com/p/the-real-energy-use-of-agentic-ai),
  Aug 2026) found 1,138 typed prompts triggered 14,000+ model calls, ~150 Wh per task,
  ~3 kWh per working day. Water figures are **derived** by scaling Google's measured
  0.26 mL per 0.24 Wh, and are labelled as derived.
- **Module: "Where the growth is actually coming from."** Token volume against falling per-query
  cost (Google: 480T tokens/month in May 2025 → 3.2 quadrillion in May 2026, ~7×; OpenRouter,
  essentially all developer traffic, ~15×), and the demand-growth decomposition.
- **Module: "Capacity is not consumption."** A worked reconciliation using
  [Epoch AI's AI Data Centers dataset](https://epoch.ai/data/ai-data-centers) (CC-BY) — 78 sites,
  12.1 GW current IT power. Shows why the obvious calculation (capacity ÷ coverage × PUE ×
  utilization × 8,760) returns 283–441 TWh and is ~3× too high.
- **Activity 4 (Advanced)** in the sustainability track, plus `demo-materials/epoch_ai_capacity.R`
  and `.do` — students reproduce the error and rank the corrections.

### Corrected

- **"There is no authoritative public estimate of what share of data-center electricity is
  generative AI."** True when the tool was built; **false since April 2026**. The IEA's
  *Key Questions on Energy and AI* gives **~155 TWh for AI-focused data centres in 2025**, of
  485 TWh for all data centres, rising to ~465 TWh by 2030. Presented alongside de Vries-Gao
  (*Joule* 2025), whose bottom-up estimate is **46–82 TWh** for the same year — a ~3× difference
  driven by **boundary** (whole AI-focused facilities vs AI accelerator hardware), not error.
  Honest 2025 range: 50–200 TWh.
- **The per-capita callout** used to land on "your annual AI use is ~0.004% of your footprint,"
  which reads as permission. Now paired with the counterweight: all chatbot *text* queries are
  only ~2% of AI's own electricity; the individual lever is real but small, and the institutional
  levers (procurement, default model, unattended agents, siting) are not.

### Known limitation

`epoch.ai` was unreachable from the environment used to write the starter scripts, so the **exact
CSV column names were never verified**. Both scripts print the schema first and fuzzy-match a
"current power" column, with an explicit EDIT-THIS line. Verify on first run.

---

## 2026-08-11 — Data refresh: IEA 2026, Joule 2026, Harvard water study

A verification pass against primary sources found one figure a year out of date, one superseded,
and one that needed reframing as a live scientific disagreement.

- **Global data-centre electricity.** 415 TWh (2024) / ~945 TWh (2030), from IEA *Energy and AI*
  (2025) → **485 TWh in 2025, ~950 TWh by 2030 (~3%)**, with AI-focused data centres growing
  ~50% in 2025, per IEA
  *[Key Questions on Energy and AI](https://www.iea.org/reports/key-questions-on-energy-and-ai)*
  (16 April 2026). The ~1.6% share for 2025 is derived here, not an IEA figure.
- **Typical frontier chatbot query.** High end lowered from **3 Wh → 0.6 Wh**. The widely-cited
  ~3 Wh (de Vries, *Joule* 2023) is superseded: Oviedo et al. (Microsoft),
  "Energy use of AI inference, efficiency pathways, and test-time scaling," *Joule* 2026
  ([arXiv 2509.20241](https://arxiv.org/abs/2509.20241)) measured a **median 0.31 Wh, IQR
  0.16–0.60** for frontier models in production serving, and finds public estimates overstated
  **4–20×** — largely because benchmark conditions run ~11× hotter than production. Cross-checks
  against Google's disclosed 0.24 Wh median Gemini text prompt (Aug 2025). Mid stayed at 0.3 Wh.
- **Long / complex reasoning query.** Mid lowered **8 Wh → 4 Wh**; the same *Joule* paper measured
  a median **3.91 Wh** (IQR 2.15–7.05) in reasoning mode, ~13× a short prompt, heaviest single
  case 10.6 Wh. The 40 Wh high end was retained but relabelled as Epoch AI's *modelled*
  ~100k-token-context scenario, not a measurement.
- **Right-sizing multiplier.** Low end **10× → 3×**. The 10–100× figures come from reasoning-mode
  frontier models on long prompts measured through APIs; under production-optimized serving
  *Joule* 2026 measured only ~3–5× between adjacent model classes.
- **Jevons caveat.** The previous version mixed figures from two different Google reports. Now a
  matched sequence from the 2026 Environmental Report (covering 2025): data-centre electricity
  **+27% in 2024 and +37% in 2025**, water **10.9 billion gallons (+34%)**, GHG **+18%**.
  The 33×/44× per-prompt efficiency figures (May 2024→May 2025) are unchanged and were *not*
  updated in the 2026 report.
- **US data-centre water.** LBNL's 2023 figures retained (228 billion gallons: 17B direct +
  211B indirect), now presented against Guidi & Dominici, Harvard Salata Institute
  ([arXiv 2607.02531](https://arxiv.org/abs/2607.02531), July 2026): 472 hyperscale facilities,
  ~300 billion litres/yr, ~74 GL direct + 226 GL indirect. **LBNL implies indirect ≈12× direct;
  Harvard ≈3×.** The direct figures broadly agree — the entire gap is how each attributes
  evaporation from hydropower reservoirs (Harvard uses a baseline 8.0 L/kWh and flags it as
  contested; its no-hydro sensitivity cuts indirect by 43%). Both measure consumption, not
  withdrawal. Teach it as a **3×–12× range**.
- **Added to "what we don't know":** the training/inference split is not rigorously published
  (the repeated "80–90% is inference" traces to an *uncited* estimate; the last real measurement
  is Google's 2019–2021 figure of ~60/40), no consumer/enterprise token split exists, and no
  systematic federal assessment of US data-centre water use exists (CRS, 31 July 2026).
- Fixed a pre-existing inconsistency: the footer read "Prepared 2026-07-09" while `DATA.preparedDate`
  read 2026-07-28.

---

## 2026-07-28 — METR expenditure-horizon module

Added the agent-versus-human comparison built on METR's *Expenditure Horizon* (July 2026). METR
reports dollars, not kilowatt-hours; the energy figures are **derived** from the hardware
allocation and time limits METR published, and the derivation is exposed in that module's table
view. The largest single uncertainty — GPU utilization during the agent runs — was never published
by METR and is flagged as such.

---

## 2026-07-10 — Annual-use view and verified citations

- **Annual use toggle** in Module A, with usage-rate sliders and Light/Typical/Heavy presets, plus
  a live per-capita callout. Text presets are anchored on OpenAI's disclosed ~2.5B prompts/day
  across ~500M weekly users (July 2025); image and video presets are explicitly illustrative,
  because no published per-user rate exists.
- Key finding the view makes visible: individual AI use is a vanishingly small share of one
  person's annual footprint, while the aggregate is a significant grid issue. Both are true.
- **Every source citation made a clickable, individually-verified link.** Note the mechanism:
  `SOURCE_HTML` is keyed on the *exact* raw source string and falls back to plain text on a miss,
  so **editing a source string silently degrades its citation**. Re-key after any data edit.

---

## 2026-07-09 — Initial release

AI Environmental Footprint Explorer and the Environmental Sustainability track activity, built in
response to faculty and student questions prompted by the July 2026 WSJ reporting on data-centre
water use.

---

## Authorship

These materials were built by D. Alex Quistberg with [Claude](https://www.anthropic.com/claude)
(Anthropic). Claude did the research synthesis, the code, and the browser testing; every figure was
traced to a primary source and checked before it went in, and the editorial judgments — which numbers
to trust, which to leave out, how to frame the disagreements — are the author's.

That division of labour is why this file reads the way it does. Most entries below exist because a
figure did not survive checking.

## Maintaining this file

When a figure changes, record four things: **the old value, the new value, the source that forced
the change, and why the old one was wrong.** The fourth is the one people skip and the one that is
actually useful later — "superseded by a better measurement" and "was a unit error" call for very
different levels of confidence in whatever else came from the same source.

Cross-check anything load-bearing against primary sources before reuse; this topic moves fast
enough that a figure more than a few months old deserves a second look.
