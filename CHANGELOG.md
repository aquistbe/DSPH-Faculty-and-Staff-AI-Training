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

## 2026-10-27 — Source check of everything not previously verified

The 2026-10-15 refresh had not been checked against its sources. Every figure it added or changed
was checked today against the primary source (web search, plus Scite, Consensus and Elicit for
papers). Most held up. These did not:

### Corrected: wrong

- **Hugging Face AI Energy Score v2.** "Reasoning mode averages ~30x the energy of the same models
  with reasoning off" → the 30x compares **reasoning models with non-reasoning models**; the same
  model with reasoning switched on used **150-700x** more (154x, 514x, 697x in the post's table).
- **Astekin et al. (arXiv 2610.03010).** "Worst case 160x" was presented as energy; it is a
  **runtime slowdown**. Now: ~6.4x the energy, ~6x longer, worst-case slowdowns of 160x.
- **California.** "AB 1577 … requires reporting of energy, PUE, water consumption and water-use
  effectiveness." Enacted AB 1577 covers energy and PUE reporting to the California Energy
  Commission; **water reporting is a separate bill, AB 2619**. "Effective 2027" removed (not
  confirmed from the bill text). Sources: Governor's office, Sept 21, 2026; Mayer Brown; Ballard Spahr.
- **"Energy per successful goal" (arXiv 2605.22883).** The 4.3x figure is from **v1 (May 2026)**.
  **v2 (Oct 12, 2026)** covers nine task families and reports 0.35-11.07x (CPU only) or 0.4-26.48x
  (with GPU). Both are now described.
- **Epoch AI utilization.** "Epoch publishes no utilization assumption" → Epoch's page says average
  draw is **"typically 60-80% of capacity"**; the tool's naive example in fact uses that range.
  Epoch's 90% interval is **23-81%**, not 23-82%, as of Oct 13, 2026.
- **Multiplier caveat.** "Those 10-100x figures come from reasoning-mode frontier models measured
  through APIs" → the MIT Technology Review ~60x compares non-reasoning Llama 3.1 8B and 405B on
  research hardware; only Jegham's figures are reasoning-mode API estimates.
- **Watershed / Bistline "50-500 Wh per agentic workflow."** Not in the linked Heatmap article,
  and Watershed's framework (arXiv 2608.06733) reports per million tokens, not per task. Removed;
  the agentic-task range is still bracketed by Couch (~41 Wh) and Masley (~459 Wh).

### Corrected: wording or precision

- Jegham et al.: DeepSeek-R1's 29 Wh is **on DeepSeek's own servers** (7.4 Wh on Azure).
- Oviedo et al.: "adjacent model sizes" → **a 70B and a 405B model** (0.09 vs 0.39 Wh, ~4x).
- Luo et al. (2609.29707): the 41-45% GPU-telemetry gap is **across agentic, reasoning and
  batched-serving workloads**, not agentic only.
- "Lights, Camera, Carbon" (2607.04553): author order **Jegham, Gamazaychikov & Luccioni**; "under
  review" → **preprint, not peer-reviewed**. ML.ENERGY v3.0 post dated **January 2026**, not Dec 2025.
- Hausfather: the double-counting was in a naive sum of the logs (~2.2x) and an AI-assisted first
  pass, not Claude Code's own counters.
- EIA pilot surveys: "do not collect water" → **focus on energy rather than water** (the
  questionnaire covers cooling systems).
- LBNL: the ~168 TWh restatement for 2023 is **implied** (192 TWh ÷ 1.14), not stated.
- Microsoft: total emissions **+27%** under the GHG Protocol (market-based); +25% under Microsoft's
  own criteria.
- CRS report: it **cites** LBNL's direct-water figure and an estimate that public systems supplied
  ~97% of on-site water; it did not independently confirm them.
- Bloomberg Intelligence: Arizona AI projects **under construction**, not "planned."
- Google totals: "over the same stretch" → **the same period (calendar 2024-2025)**.

### Corrected: internal consistency (found during the check)

- **Everyday carbon.** Laundry 100/175/500 g → **105/315/805 g**; one hour of air conditioning
  350/1,000/1,500 g → **175/525/1,225 g**; phone charge 2/7/12 g → **4/5/7 g**. All now equal energy ×
  350 gCO2e/kWh, the tool's stated factor (they had been set by hand in the 2026-08-13 carbon update).
  The kettle's range is now labeled as grid mix.
- **Household electricity.** "About 10,500 kWh a year" → **10,791 kWh (2022), about 900 kWh a
  month**, matching EIA FAQ 97 and the per-capita figure elsewhere in the tool.

### Confirmed (no change)

Oviedo et al. figures and the "estimated" wording; GPT-5 2.33 vs 17.15 Wh; Hausfather's figures;
video energy (57.5-114.8 Wh; ~1,313 Wh Sora 2 Pro); Alpine et al. "net"; Ye, Tol & Wang; Chen et
al.; Amazon; Alphabet Q2 tokens; OpenRouter; Ceres electricity-water; Llama 4 model card; Harvard
preprint flag; LBNL 2025 +22%.

### Not resolved

- OpenAI DevDay 2026 "1.2 billion weekly users" (page returned 403; only secondary confirmation) and
  NBER w34255 daily-message figure (abstract doesn't state it). Both pre-date the October refresh.
- Google's 10.9 billion gallons (+34%) is confirmed only by secondary coverage so far.
- Epoch's August snapshot (78 sites, 12.1 GW) doesn't match the Aug 12 archive (80 sites, 12.4 GW);
  likely an earlier-August retrieval.

---

## 2026-10-27 — New module: "Data centers: how much of it is AI?"

Added after "Zooming out: the aggregate numbers." Data centers are a major public concern, but much
of the coverage treats "data center" and "AI" as the same thing. The module shows the AI share of
world data-center electricity in 2025 under the two boundaries already used in this tool: about
**155 of 485 TWh** for AI-focused facilities (IEA, April 2026) and **46-82 TWh** for AI accelerators
only (de Vries-Gao, *Joule* 2025). Either way, roughly a tenth to a third.

- **No figures changed.** Everything comes from sources already cited here (IEA 2026, de Vries-Gao
  2025, LBNL 2026, Ceres 2025).
- **One derived figure:** AI-focused data centers were about **three-quarters of 2025's growth** in
  data-center electricity. From IEA: total 485 TWh after 17% growth (+~70 TWh); AI-focused ~155 TWh
  after ~50% growth (+~52 TWh). Labeled in the tool as derived, not an IEA number.
- **Framing:** most of today's data-center footprint is not AI, but most of its growth is; and local
  effects (water, grid) follow the new, concentrated AI buildout, not the global share.

**Verification (2026-10-27).** Every figure in the module was re-checked against primary sources
before publishing: IEA *Key Questions on Energy and AI* (executive summary: 485 TWh, +17%, AI-focused
+50%, total ~950 TWh by 2030; report p. 26: AI-focused "around 465 TWh by 2030"); the ~155 TWh 2025
level is read from IEA Figure 1.5 and endnote 4, and Our World in Data (Ritchie, July 20, 2026) reports
the same ("non-AI data centers consumed two-thirds of the total"); de Vries-Gao, *Joule* 9(6):101961
(doi:10.1016/j.joule.2025.101961), 5.3-9.4 GW, 46-82 TWh; LBNL 2025 Update (192 TWh in 2024, 4.7%;
AI servers 55% of total data-center energy in 2030, Reference Case); Ceres, *Drained by Data* (385
million to more than 3.7 billion gal/yr cooling water, +870%). Independent check: Aczel et al. 2026
(doi:10.53328/inr26rma002) estimate ~20% of 448 TWh in 2025, now cited in the module.

**Corrected.** The Phoenix projection said "within about six years." Ceres gives no completion year,
so both the new module and the aggregate Phoenix card now say "as planned facilities are built." The
module also notes that water-policy experts (ASU Kyl Center, quoted in *Phoenix New Times*) have
questioned the study's assumptions.

---

## 2026-10-15 — Data refresh through October 2026

A pass against newer primary sources. Several figures were superseded, one Phoenix figure was
replaced because it could not be traced to a primary source, and a number of descriptions were
corrected to say "estimated" where the source is a model rather than a measurement. (This entry was
written on 2026-10-27 from the commit, 4fbb168.)

### Superseded by newer data

- **US data-center electricity.** 176 TWh in 2023 (4.4%), 325-580 TWh by 2028 (LBNL, Dec 2024) →
  **192 TWh in 2024 (4.7%); 649 TWh by 2030 (11.8%), range 521-843 TWh**, with AI servers projected
  at 55% of data-center electricity by 2030. Source: LBNL, *United States Data Center Energy Usage
  Report: 2025 Update* (Smith et al.), June 2026, which also restates 2023 to about 168 TWh. Why: a
  newer edition of the same report.
- **One AI video clip.** 30 / 940 / 3,000 Wh (low/mid/high), from one academic model (CogVideoX,
  MIT Technology Review 2025) → **57.5 / 115 / 1,313 Wh**; the label is now "one short AI video
  clip." Source: Gamazaychikov, Jegham & Luccioni, "Lights, Camera, Carbon," arXiv 2607.04553
  (July 2026, preprint): 57.5-114.8 Wh for a 5-second clip on current open models; the high end is
  the same team's estimate for one 12-second Sora 2 Pro clip, inferred from generation time. Water
  and carbon rescaled from energy. Why: the old figure came from an older model on academic hardware;
  the new one covers current models. Still flagged low-confidence.
- **OpenRouter token volume.** "~1.5 quadrillion tokens a year run rate (May 2026), ~15x in a year"
  (Menlo Ventures analysis) → **25 trillion tokens a week (May 2026), 5x in six months, ~1.3
  quadrillion a year annualized**. Source: OpenRouter's own Series B announcement (May 2026, updated
  Aug 2026). Why: a first-party figure replaces a third-party analysis.
- **Model-size multiplier.** The example pair changed from o3/DeepSeek-R1 >33 Wh vs GPT-4.1 nano
  ~0.47 Wh (>70x) → **DeepSeek-R1 29 Wh vs Llama 3.1 8B 0.44 Wh (>65x)**, from the Nov 2025 revision
  of Jegham et al.; and the production-serving comparison from "~3-5x, frontier 0.31 vs Llama 70B
  0.09 Wh" → **~4x, Llama 3.1 405B 0.39 Wh vs 70B 0.09 Wh** (Oviedo et al., *Joule* 2026). Why: the
  revised paper changed its numbers, and the old pairing compared different model families. The
  slider values (3 / 50 / 100x) did not change.
- **Epoch AI data-center dataset.** 78 sites, 12.9 million H100-equivalents, 12.1 GW (Aug 2026) →
  **94 sites, 14.6 million H100e, 14.1 GW (Oct 2026)**, with Epoch's coverage estimate revised from
  27% to **44% of global AI compute (90% interval 23-82%)**. The worked "capacity is not
  consumption" example still uses the August snapshot and says so.

### Replaced: could not be traced to a primary source

- **Phoenix water.** "Roughly 3% of the region's water today, could exceed 20% by 2031" (WSJ,
  July 2026) → **~385 million gal/yr of on-site cooling water, projected to more than 3.7 billion
  (+870%); electricity-related water ~2.9 → more than 14.5 billion gal**, from Ceres, *Drained by
  Data* (Sept 2025), plus Bloomberg Intelligence (Oct 13, 2026): planned Arizona AI projects at ~5
  billion gal/yr on site, about 4.5% of Phoenix's current water production. Why: the WSJ percentages
  had no traceable primary source. (The "within about six years" timeframe added here was itself
  unsupported and was removed on 2026-10-27; see above.)

### Corrected wording or framing

- **Google totals.** "Data-center electricity rose 27% and 37%" → **total electricity use**; and
  "greenhouse-gas emissions rose 18%, its largest increase" → **operational emissions fell 2%, but
  supply-chain emissions rose 25%**. Source: Google Environmental Report 2026. Why: the old wording
  misdescribed what the report measures.
- **"Measured" → "estimated"** for Oviedo et al. (*Joule* 2026): the 0.31 Wh median and the 3.91 Wh
  reasoning median come from a bottom-up model built from token throughput, node power and overhead,
  not meter readings. The DeepSeek-R1 note now says 10.6 Wh is that model's **median** in reasoning
  mode, not its single heaviest case.
- **Hausfather agentic day.** "~3.0 kWh per working day" → **per average day of use**, matching the
  source.
- **Alpine et al. (enabled emissions).** Now states that the 0.47-1.8 Gt CO2/yr is a **net** figure,
  after AI's productivity gains in renewables are netted off.
- **"Energy per successful goal" (arXiv 2605.22883).** "On small models, ~4.3x a linear baseline" →
  **across eight task families, ~4.3x, although on tool-heavy tasks the agentic version was
  cheaper**.

### Added

- **Microsoft and Amazon card.** Microsoft electricity +24%, water +22%, total emissions +25%
  (fiscal year to June 2025); Amazon carbon footprint +16%, purchased-electricity emissions +34%,
  data-center water withdrawal 9.4 billion liters (2025). Sources: Microsoft 2026 Environmental Data
  Fact Sheet; Amazon 2025 Sustainability Report.
- **A third AI-share estimate.** Chen et al., *Communications Sustainability* (Sept 2026): six large
  companies, ~118 TWh in 2024, 239-295 TWh by 2030 (about 1% of world demand).
- **Google token volume.** Model APIs alone at ~22 billion tokens a minute by July 2026 (Alphabet
  Q2 2026 earnings).
- **Llama 4.** Meta's Llama 4 model card again reports 0 t CO2e market-based vs 1,999 t
  location-based.
- **What we don't know.** Microsoft's modelled 0.31 Wh is for generic frontier models, not a
  measured Copilot figure; OpenAI's only number is an unsourced 0.34 Wh in a CEO blog post (June
  2025); GPU-only telemetry missed 41-45% of system energy in agentic workloads (Luo et al., 2026);
  EIA began voluntary data-center energy pilot surveys in March 2026 (no water); California enacted
  reporting requirements in September 2026 (AB 1577, effective 2027).
- **Preprint flags.** The Harvard water study (arXiv 2607.02531) is now marked "preprint, not yet
  peer-reviewed."

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
