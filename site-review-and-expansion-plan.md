# DSPH Workshop Site — Review and Expansion Plan

Reviewed July 7, 2026. Covers all 6 workshop pages, all 32 track topic pages, 5 track index pages, home, Tools & Access, and Resources.

---

## 1. What is working

- **The template.** All 32 topic pages share an identical structure (level badge, "what you'll be able to do," two activities with Time/Tools/Goal/Setup/Steps/Expected result/Check your work/Pitfalls/Stretch, readiness quiz, readings, data-rules callout). Learners always know where to look. Keep it.
- **Workshop 2 is the model.** Worked examples with downloadable synthetic demo files, three role tracks, planted verification moments (the ambiguous crosswalk item, mangle-able CIs). This is what every workshop and topic page should look like.
- **The Philadelphia data spine.** Crash data, 311, crime incidents recur across data-analysis-basics, coding, cleaning, statistics, dashboards, geospatial, qualitative. Concrete, reproducible, and thematically coherent with your research.
- **Ethics thread and data-classification discipline** are consistent everywhere.

## 2. The five main gaps

### Gap 1 — Half the track pages are generic where the other half are paste-ready

The data pages give a real CSV link, exact prompts, and an expected number to hit. The conceptual pages say "bring your own task" and leave prompts as `[placeholder]` skeletons. Worst offenders, with the fix for each:

| Page | Most generic instruction | Concrete replacement |
|---|---|---|
| data-security-classification | "List three data types you actually work with" / "[fabricated record]" | Supply a 5-row fabricated record with quasi-identifiers (age, ZIP, admission date, rare condition) plus 3 role-based classification calls: a student grade file, a de-identified survey, a public dataset |
| bias-equity-audit | "Setup: A real use case" | Two paste-ready vignette prompts with named group/condition pairs, plus a fabricated screening tool with a stated 8-point score disparity to audit |
| environmental-sustainability | "A simple task you'd normally send to a large model" | A specific 200-word abstract to summarize on a small vs. large model, with a comparison checklist |
| context-engineering | "A task where AI keeps missing what you want" | A worked before/after: weak prompt → drifting output → the one-example fix (matching a specific memo tone) |
| building-agents | "A repeated task and one non-sensitive reference file" | A complete custom-GPT instruction block + a fabricated grant-deadline list to draft monthly reminders from, + a paste-ready guardrail list with a stop-test input |
| responsible-ai | "List three places AI shows up in your work" | Role-specific starter lists (admin / research / teaching) to react to |
| mcp-connecting-tools | "Tools: conceptual" | A fully worked scenario: named tool, over-scoped vs. least-privilege access grants to critique |
| creating-skills | Names the task, supplies no material | A block of messy meeting notes + the target recap format |

### Gap 2 — Activity 2 is almost always "bring your own," even on strong pages

The single most consistent pattern: a page opens with a concrete Activity 1, then Activity 2 says "your own paragraph / a second batch / your own topic." Fixes:

- qualitative-analysis: supply a second batch of 8 sample comments
- science-communication: supply a dense sample paragraph to de-jargon
- manuscript-peer-review: a fictional methods paragraph + fake reviewer comments (so people without a manuscript-in-progress can do it)
- literature-review: name 2–3 specific open-access PMIDs
- multilingual-materials: a fully written message + named target language
- program-evaluation: a 5-line pre-written program description (a Vision Zero corridor intervention)
- de-identification: an actual 5-row identified table (page describes fields but never supplies rows)
- data-cleaning: a 15–20 row inline sample so no API wrangling is needed first
- rag-knowledge-bases: 3–5 linked public PDFs so everyone builds the same notebook
- image-generation-annotation: a linked image set instead of "collect ~10 Street View images"
- verifying-output: a known-good vs. known-fabricated citation pair
- design-visual-communication: a concrete brief for Activity 2 (flyer for a community pedestrian-safety event) + sample alt-text

### Gap 3 — Audience coverage is skewed to research staff and research faculty

Nearly every concrete example is a coder using R/Python on crash data. Of your four stated audiences:

- **Admin staff**: closest fits are collaborating-on-projects and W2 Tracks B/C. No topic page is scoped to their actual work (scheduling, correspondence, forms, event logistics, grant administration).
- **Teaching faculty**: W6 is the only teaching content on the whole site. No track topic covers syllabus design, assessment, rubrics, or course AI policy.
- **Mentoring**: absent entirely. Nothing on advising, letters, trainee AI use, or lab AI policies.
- **Practice**: partially served (science-communication, multilingual, program-evaluation, design-visual) but never named as an audience.

### Gap 4 — No navigation between related pages, no prerequisites

Every topic page links only back to its parent track. Obvious pairs aren't connected: statistical-interpretation ↔ web-and-dashboards use the identical CSV; data-security ↔ de-identification share readings; sci-comm ↔ multilingual; creating-skills ↔ collaborating-on-projects ↔ building-agents. Several stretches name "Reproducible AI" — a page that doesn't exist. Advanced pages never say what to do first.

### Gap 5 — No role-based entry point

Tracks are organized by *topic*. A grants administrator landing on 32 topics across 5 tracks has no way to know which six matter to them, in what order. The "Good First Uses by Role" table on Resources is the seed of the answer, but it goes nowhere.

## 3. Smaller fixes

1. **W1 activities have `[paste a paragraph...]` placeholders** — inline a real public-report paragraph and messy notes, or add W1 demo files like W2's.
2. **W3 has one sample notes line** — add demo files: a messy meeting-notes doc, a sample style guide + template to upload to the shared Project, a 2-sentence project description for the plan stress-test.
3. **W4–W6 (fall) have no demo files** — before fall: a specific public PDF for Acrobat (e.g., an NOFO or a city Vision Zero report), sample learning objectives + an open-access paper for W6/NotebookLM, sample event brief for Firefly.
4. **coding-with-ai promises Stata, delivers R/Python only** — add a Stata variant (your audience analyzes in Stata more than Python).
5. **statistical-interpretation makes users look up field names** — list the actual crash-CSV column names on the page (also web-and-dashboards).
6. **Index parity** — data-analysis.qmd has a "Where should you start?" placement quiz; the other four track indexes don't. Copy it over.
7. **Time labels** — headers say "~1 hour" but activities sum to ~35 min. Split: "~35 min hands-on + readings and quiz."
8. **Expected results** — best pages state a number to hit ("a few thousand per year"); several give only "a sense of…". Add a checkable expected result wherever possible.
9. **Advanced tier jump** — Technical & Agentic goes moderate → 4 advanced topics with no bridge; Methods jumps moderate → advanced GIS. Note prerequisites on the index tables.

## 4. Expansion: role-based learning paths

The core recommendation: add a **Learning Paths** page (`paths.qmd`) with six role-based paths that cut across workshops and tracks. Each path = ordered checklist with time estimates, a capstone, and a printable version. Structure per step: what to do → why → done-when.

### Path A — Administrative & Operations Staff *(novice, ~6 hours total)*

1. Workshop 1 (or recording) — prompting + data rules
2. Workshop 2, Tracks B/C — Outlook triage, Excel attendance demo
3. verifying-output
4. data-security-classification
5. Workshop 3 — shared Project + custom GPT
6. creating-skills — standardize one recurring task
7. **Capstone:** build and share one custom GPT for a real recurring task (meeting recaps, reminder drafting, onboarding Q&A)

### Path B — Research Staff & Coordinators *(novice → moderate, ~8 hours)*

1. Workshops 1–3
2. data-analysis-basics → data-cleaning → coding-with-ai
3. statistical-interpretation
4. verifying-output + de-identification-synthetic-data
5. Optional: data-analysis-advanced, geospatial-gis, web-and-dashboards
6. **Capstone:** one real analysis task done with AI scaffolding, verified against a hand-check

### Path C — Faculty: Teaching *(novice → moderate, ~6 hours)*

1. Workshop 1 → Workshop 2 (Track A) → Workshop 6
2. NEW topic: assignment & assessment design in the AI era
3. NEW topic: writing your course AI policy
4. judgment-and-offloading (what to let students offload)
5. multilingual-materials / science-communication (student-facing materials)
6. **Capstone:** one session redesigned backward from objectives, with an AI-resilient assessment and a course AI policy statement

### Path D — Faculty: Research *(moderate → advanced, ~8 hours)*

1. Workshops 1–2
2. literature-review → manuscript-peer-review
3. grant-proposal-development
4. statistical-interpretation (+ coding-with-ai if they code)
5. rag-knowledge-bases (grounded Q&A over their own corpus)
6. responsible-ai + verifying-output
7. **Capstone:** a grant aim page or manuscript section drafted with AI, with a documented verification pass

### Path E — Faculty: Practice & Community Engagement *(novice → moderate, ~5 hours)*

1. Workshops 1–2
2. science-communication → multilingual-materials
3. design-visual-communication (+ Workshop 4 in fall)
4. program-evaluation
5. bias-equity-audit
6. **Capstone:** a three-audience communication package (community flyer, partner brief, translated message) from one real finding

### Path F — Faculty: Mentoring & Advising *(NEW content required, ~3 hours)*

Currently zero content for this audience. Requires one new topic page plus reuse:

1. Workshop 1
2. NEW topic: **AI in mentoring & advising** — drafting a lab/team AI-use policy; recommendation letters (disclosure, voice, and what not to delegate); IDP drafting with trainees; reviewing and discussing trainees' AI use; AI in qualifying-exam and thesis feedback
3. judgment-and-offloading — framed around what trainees should not offload while building skills
4. responsible-ai
5. **Capstone:** a written lab AI-use policy and a mentoring conversation guide

### Implementation of paths

- `paths.qmd` with a role picker at top ("I mostly… manage operations / coordinate research / teach / run studies / do community work / mentor trainees")
- Reuse the existing placement-quiz JS for routing
- Per-step checkboxes persisted in localStorage (site is static; no backend needed)
- Role badges (Admin · Research · Teaching · Practice · Mentoring) on track index tables and activity headers, so pages are discoverable from both directions

## 5. Expansion: new topic pages

Ranked by audience-gap size:

1. **AI in mentoring & advising** — closes the empty Path F (faculty)
2. **Assignment & assessment design in the AI era** — biggest teaching gap; what assessments still measure learning, redesigning take-homes, AI-transparent assignment language
3. **Writing your course AI policy** — short, high-demand, pairs with W6; include 2–3 real policy examples (permissive / conditional / restrictive)
4. **Grant administration with AI** — serves admin staff AND faculty: budget justifications, biosketch updates, RPPR progress reports, NOFO summarization with Acrobat AI (concrete: a real public NOFO)
5. **Admin workflows deep-dive** — correspondence, scheduling, event logistics, Copilot-in-Excel tracking/reporting; extends W2 Tracks B/C into a self-paced page
6. **Reproducible AI** — already referenced by name in two existing stretches; scripts vs. chats, seeds, documenting AI-assisted analyses
7. **Presentations & slide decks** — Copilot in PowerPoint + ChatGPT outlining; universal audience
8. **IRB protocols & compliance documents** — drafting consent-form lay language, protocol summaries; strong fit for research staff and faculty; naturally reinforces the data rules

Also worth adding to the site rather than leaving as a promise: the **research-staff specialized sessions** are announced in three places (home, W3, Resources) with no page. Even a stub page with planned topics and a sign-up link would stop that thread from dangling.

## 6. Priority order

**Before Workshop 3 (July 14):**
1. W3 demo files (meeting notes, style guide/template, project description) — same pattern as W2
2. Fix W1's `[paste...]` placeholders with inline sample text

**This summer (highest leverage for self-paced use):**
3. Retrofit the 8 generic topic pages (Gap 1 table)
4. Add supplied samples to every Activity 2 (Gap 2 list)
5. Build `paths.qmd` with the six role paths + role badges on indexes
6. Add Next/Related footer links to all topic pages; state prerequisites on advanced pages

**Before fall workshops:**
7. Demo files for W4–W6
8. New topic pages 1–4 (mentoring, assessment design, course AI policy, grant administration)
9. Placement quizzes on the four remaining track indexes
10. Stata variant in coding-with-ai; field names in the two crash-CSV pages

**Ongoing / lower priority:**
11. Remaining new topics (admin deep-dive, reproducible AI, presentations, IRB)
12. localStorage progress tracking on paths
13. Time-label honesty pass; expected-result pass
