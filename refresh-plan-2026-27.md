# DSPH AI Workshops — 2026-27 Refresh Plan

Prepared 2026-08-30. Sources: full content review of all 47 site pages (Opus), web research on comparable programs and tool changes (Sonnet), and research on ASPPH's AI framework and site analytics (Sonnet). Key file-level claims were spot-checked against the current source files.

---

## 1. Direct answers to your questions

### Can I track page views on GitHub Pages? Where visitors came from?

GitHub Pages has no built-in analytics. The repo's Insights → Traffic tab shows views/clones and referring sites, but it is repo-level (not per-page on the live site), limited to a rolling 14 days, and mixes in git/API traffic.

**Recommendation: GoatCounter** (goatcounter.com). Free for non-commercial use, no cookies, no consent banner, shows per-page views AND referrers plus country and browser. Setup:

1. Create a free account at goatcounter.com (pick a site code, e.g. `dsph-ai`).
2. Add to `_quarto.yml`:

```yaml
format:
  html:
    include-in-header:
      - text: |
          <script data-goatcounter="https://dsph-ai.goatcounter.com/count"
                  async src="//gc.zgo.at/count.js"></script>
```

3. `quarto render` and push. Every page reports from then on.

Alternative: Cloudflare Web Analytics (also free, JS-beacon only, no DNS change needed) — similar data, slightly less per-page detail in practice. Either works; GoatCounter is simpler for a small site.

**Referrer caveat:** modern browsers send only the referring *domain* cross-site (strict-origin-when-cross-origin), and some strip it entirely, which inflates "Direct." Read referrers as domain-level and directional. For links you distribute yourself (emails, slides, QR codes), append UTM parameters (e.g. `?utm_source=orientation2026`) — those survive stripping and give you clean attribution per channel. Analytics only count from install day forward, so install before fall promotion starts.

### Are there existing courses worth borrowing from?

The most useful comparators (full sourced list in the research appendix at the end):

- **University of Arizona MEZCOPH "Public Health & AI Summer School"** — the closest peer program (4-day intensive, no prerequisites, June 2026 was its 3rd cohort). Borrow: its two-tier **"AI Literacy" vs "AI Fluency"** track split — a clean way to serve novices and builders in the same series, which maps onto your expansion to students.
- **UCF Faculty Center "AI Fundamentals for Educators"** — a 6-week, capped-enrollment, certificate-bearing cohort paired with a no-deadline asynchronous "Essentials" twin. Borrow: the flagship-cohort + self-paced-twin naming and the capstone (each participant leaves with one finished AI-enhanced artifact).
- **AAC&U Institute on AI, Pedagogy, and the Curriculum** (2026-27 cohort: 316 teams from 296 institutions in prior rounds). Borrow: the lightweight kickoff → midpoint → capstone structure that turns disconnected sessions into a program.
- **Anthropic "AI Fluency" courses** (free, CC-licensed). Borrow: the 4D framework vocabulary (Delegation, Description, Discernment, Diligence) as shared language across tracks; and the practice of publishing "how we built this with AI" — which your environmental-sustainability page already does and could be site-wide.
- **Indiana University Digital Gardener series** — 10 one-hour webinars organized by discipline/use case, open to students as well as staff.
- **Georgia State SPH AI Initiative** (launched Aug 26, 2026) — borrow the "faculty champions" model for sustaining a program that currently runs on one person.
- **CIDRAP/Eurosurveillance survey of field epidemiologists (2026):** ~2/3 already use AI at work but only 1 in 5 has had any training. Use this in your marketing and your ASPPH abstract — it is the exact gap the program fills.

Notably, the research found no comparable public-facing faculty/staff AI workshop series at Hopkins, Harvard Chan, Michigan, Emory, or Columbia as of Aug 2026 — your program appears ahead of peer schools' public offerings. That is a positioning point for the ASPPH presentation.

### What does ASPPH itself want? (for both the workshops and the abstract)

ASPPH's **Task Force for the Responsible and Ethical Use of AI** (chaired by Ashish Joshi, Memphis) released a draft framework in March 2026 — *"Harnessing Innovation: Artificial Intelligence for Public Health"* — with the final report due summer 2026 (check aspph.org/initiatives/ai-for-public-health/ for the final before citing). Four pillars: Education, Teaching & Learning, Practice & Research, Policy/Regulatory. Directly usable pieces:

- "Establish **AI literacy as a foundational public health competency** alongside epidemiology and biostatistics."
- "AI must **augment, but never replace, human judgment**, expertise, and compassion" — nearly identical to your site's throughline; quote it and cite it.
- Recommends **faculty workshops on AI literacy, ethics, and pedagogy** — your series is a working implementation of a named recommendation.
- Its own audit: of 155 ASPPH member institutions, only **18 (11.6%) had formal public AI policies**, and 83% of existing policies cover only classroom use. (Peer-reviewed version: Frontiers in Public Health, 2026, "Investigating the use of generative AI policies among ASPPH member schools" — citable in the abstract.)
- Recommends tiered course AI-use policies and non-outsourceable assessments — your course-ai-policy and assignment-assessment-design pages already teach exactly this; label the alignment.
- **CEPH**: the current (2024) foundational competencies contain no AI competency, but CEPH is drafting a new **MPH.9 "Emerging Technologies"** criterion (public comment through Oct 26, 2026 — exact wording not yet final; verify before quoting). Framing for the abstract: the program is *ahead of accreditation*, responsive to a gap ASPPH has formally flagged.
- The 2027 CFP has a dedicated **Topic 11: "Technology, AI & Data Science"** — the track to submit under (AI was only a cross-cutting theme in 2026; now it is its own topic area, which itself signals timeliness).

**Suggested addition to the abstract** (≈25 words, fits the 500-word budget if the evaluation highlight stays short): "The model operationalizes ASPPH's AI task force recommendations — AI literacy as a foundational competency, faculty development in AI pedagogy, and human judgment kept central — at a single school." Also consider swapping a citation to the Frontiers policy-audit paper into the opening problem statement (11.6% of member schools have formal AI policies; two-thirds of field epidemiologists use AI with almost no training).

---

## 2. Fix before anything else — content that breaks in front of an audience

Verified against the current files:

1. **`tracks/building-agents.qmd`** — the grant-deadlines CSV uses absolute dates (2026-07-28 … 2026-10-05). By October, most are past and the "what's urgent in the next 30 days" activity cannot work. Fix: instruct readers to set deadlines relative to today (5/20/45/90/180 days out) or ship a tiny generator. The CSV appears twice (lines ~45 and ~142).
2. **`tracks/grant-administration.qmd`** — same problem: FOA tracker dates expire by spring; the "flag anything due within 60 days" logic dies. Cheapest fix converts decay into a teaching moment: "one date is already past — does your script handle it sensibly?"
3. **`tracks/data-cleaning.qmd` Activity 2** — the setup provides an 18-row pedestrian-crash CSV, but the prompt says "Here are the distinct values of the **crime offense field**" and asks for violent/property/quality-of-life groupings. Two datasets got crossed; a participant following it literally cannot proceed. Rewrite the prompt around the crash fields (e.g., recode `road_type` or `severity`), or supply the crime-offense value list it references.
4. **`tracks/image-generation-annotation.qmd`** — all ten Street View links use a placeholder panorama ID and will not open as described. Replace with ten hosted screenshots (the house-style answer) or a public annotated image set.
5. **Small but visible:** "Saturday, October 18, 2026" is a Sunday (design-visual-communication); "weds 7/2" is a Thursday (creating-skills); Workshop 5 says the ethics thread "concludes" while Workshop 6 says it "continues"; environmental-sustainability's pasted abstract contains a sentence that tells the model the answer to the exercise (delete it from the abstract, keep it in the facilitator note); `creating-loops.qmd` and `data-analysis-advanced.qmd` both reference a "Reproducible AI" page that doesn't exist (write it — it's the genuine gap in the Technical track — or cut the references).

## 3. Stale framing to rewrite for the new year

- **`index.qmd` reads abandoned mid-summer 2026**: "Three workshops run this summer," June/July dates, "(Fall)" tags on W4-6, six "TBD" locations, "This first series is one general track" and a promise of specialized research-staff sessions that the Data & Analysis and Technical tracks already fulfilled. Rewrite around the 2026-27 cadence once the structure below is decided.
- Same stale promises in `resources.qmd` ("Research-Staff Sessions (Coming Summer or Fall)") and `workshop3.qmd`; `tools.qmd` says "all three workshops."
- **Model names:** GPT-5.5 is hard-coded in 10 places (two of them in stated learning objectives with no "or current default" escape hatch). Define "the current default model" once on `tools.qmd` and reference that phrase everywhere — one file to maintain.
- **Tool changes since July that the content must absorb** (verify each against the primary source before editing):
  - **NotebookLM was renamed "Gemini Notebook"** (July 16, 2026; old links redirect). Affects Workshop 6 and several track pages.
  - **ChatGPT Edu**: new Education plugins including a College Educator and College Student plugin (Aug 2026), reworked model picker, "ChatGPT Work" agent, scheduled tasks, PowerPoint integration. The College Student plugin matters directly for the student expansion.
  - **Adobe**: a new "productivity agent" and PDF Spaces sit above Acrobat AI Assistant (May 2026); Acrobat Studio vs AI Assistant vs Firefly AI Assistant are now three distinct things — Workshop 4 should name them precisely.
  - **Microsoft 365 Copilot**: June/July/Aug "What's New" posts could not be machine-read; check them manually before re-running Workshop 2 and 6 (the "Teach experience rolling out" claim in workshop6 especially).
- **Compliance pass (do first in calendar order):** re-verify every Drexel data-classification claim (~40 across the site) against Drexel's AI Tools page, and confirm whether ChatGPT Edu now covers students — that single fact determines the size of the student work below.

## 4. Restructure recommendation for 2026-27

The review's structural finding: the six 15-minute ethics openers consume 25% of all contact time before anyone touches a keyboard, Workshops 4-6 have no demo files and no planted teaching moments, and no workshop activity has success criteria (while all 36 self-paced pages do — 100% coverage).

**Recommended structure — "Core 4, run twice, plus electives and a clinic":**

- **Core 4** (fall, repeated spring): 1. Foundations & Data Rules (current W1) · 2. Workflow Enhancement (current W2 + a Copilot-Chat-only track for students) · 3. Reusable Assistants (merge W3+W5 — they already overlap heavily; both build custom GPTs) · 4. **Verify, Disclose, Decide** (new, assembled from existing verifying-output / grant-proposal / manuscript / judgment-and-offloading content) — the consolidated ethics hour, hands-on: the real-vs-fabricated citation test, the numeric checker, funder policy, disclosure practice.
- **Electives, once each**: Documents & Visuals (W4), Curriculum Development (W6), Data & Code for Research Staff, **AI for Grad Students** (new).
- **Monthly AI Clinic**: 45 minutes, same slot monthly, drop-in, bring real work. This is the second-contact mechanism — the thing that converts a workshop into actual adoption.
- **Cheap role-tracking**: keep one room, but every core activity ships three demo files tagged Admin / Research / Teaching-or-Student (Workshop 2 already does this; extend the pattern).

This yields more total contact with less new authorship than delivering six sessions once, and the core repeats — repetition is what the confidence goal needs.

## 5. Opening to students — minimum viable path

The review found 142 student references across 21 files, and in every one the student is the object (advisee, policy subject), never the reader. Blocking assumptions: ChatGPT Edu framed as faculty/staff-only (verify current eligibility first), M365 Copilot as a paid staff license (Workshop 2's three tracks are un-runnable for students), custom GPTs/shared Projects as Edu-workspace features, and every demo artifact is an employee artifact.

Minimum set:
1. **`tools.qmd`: add a "Student access" column** and an "If you don't have ChatGPT Edu" mapping (Copilot Chat for drafting/summarizing; a saved instruction block instead of a custom GPT; a shared OneDrive folder instead of a shared Project). This one edit unblocks the most content.
2. **`paths.qmd`: add a Graduate Students path** (coursework and thesis/doctoral variants) resequencing existing topics.
3. **Three new pages** (a sixth "Teaching & Learning" track is the natural home, along with the four teaching topics currently misfiled under Communication): *AI in Your Coursework* (how to read course AI policies, conflicting policies across courses, writing a real disclosure statement — reuse the EPID 602 policy from course-ai-policy.qmd as the artifact); *AI for Your Thesis or Dissertation* (the AI-critiques-never-drafts ethos applied before it becomes a funder problem); optionally *AI and Your Early Career*.
4. **One-line fixes**: audience statements in `index.qmd`/`_quarto.yml`; a "No ChatGPT Edu? Every prompt below works in Copilot Chat" note on Workshop 1; a Track D (Copilot-Chat-only) for Workshop 2.
5. **Reframe the two "adversarial student" prompts** (course-ai-policy, assignment-assessment-design ask readers to role-play a student hunting loopholes) as "a student acting in good faith who can't tell what's allowed" — fine on a faculty site, reads badly on one students use.

## 6. Confidence by design (the "super practical" goal)

Ranked by payoff per hour:

1. **Add "Expected result" + "Check your work" to all 14 workshop activities.** Your own house convention — 100% present on self-paced pages, 0% on workshops. "I know I did it right" is what confidence is. (~4 h)
2. **Retrospective pre/post self-efficacy items in the feedback forms** you're about to build: "Before this session, how confident were you that you could [the session's task]? (1-5)" / "Now?" / "What will you do with this before Friday?" Two questions added to each form — makes confidence a measurable outcome and gives you a year-over-year number for the dean and for ASPPH. (~1 h)
3. **Demo files for Workshops 4, 5, 6** — currently zero artifacts. Most already exist elsewhere on the site: lift the Grant Deadline Tracker CSV (building-agents) and the messy meeting notes (creating-skills) into W5; the EPID 602 fictional course (course-ai-policy) into W6 plus a pre-built Gemini Notebook the room joins; a demo PDF with a caveat buried on p. 19 plus the already-written Fairhill Square flyer brief (design-visual-communication) into W4. (~6 h)
4. **A "First week — 20 minutes total" block per workshop**: three time-boxed micro-tasks (Mon 5 min / Wed 10 min / Fri 5 min) with a completion test ("you're done when your 'prompts that work' note has one entry"). (~2 h)
5. **A capstone micro-task per core workshop with a published model answer** — the mechanism that turns "I produced something" into "I produced the right thing." creating-skills.qmd already models this. (~5 h)
6. **The monthly clinic** (above) and, later, completion recognition (core + two self-paced quizzes = a letter/badge — real motivator for the 40% non-faculty audience) and an AI-champions cohort as the year-two scaling move.

The training-effectiveness literature supports this ordering: ethics-before-tools sequencing produces more durable (if initially more modest) self-efficacy than tools-only; communities of practice and second contacts are what sustain adoption; and validated self-efficacy scales (e.g., TAICS) exist if you want a formal instrument rather than two home-grown items.

## 7. Punch list (ordered)

| # | Item | Effort | When |
|---|---|---|---|
| 1 | Compliance pass: Drexel data classifications (~40 claims) + ChatGPT Edu student eligibility | ~3 h | First |
| 2 | Fix the three broken activities (building-agents dates, grant-admin dates, data-cleaning mismatch) | ~2 h | Now |
| 3 | Install GoatCounter + UTM convention on distributed links | ~1 h | Now (data starts on install) |
| 4 | Add self-efficacy items to the two feedback forms being built | ~1 h | With forms |
| 5 | Decide the 2026-27 structure (Core 4 recommendation above) | — | Sept |
| 6 | Rewrite index.qmd + tools.qmd + resources.qmd for the new year, audience, and tool renames (Gemini Notebook etc.) | ~4 h | Sept |
| 7 | Expected-result/check-your-work on all workshop activities; demo files for W4-6 | ~10 h | Before each session runs |
| 8 | Student path: tools.qmd column, paths.qmd section, Workshop 1/2 variants | ~4 h | Before opening to students |
| 9 | New pages: Verify-Disclose-Decide session, AI in Your Coursework, AI for Your Thesis; Teaching & Learning track split | ~12 h | Fall term |
| 10 | Centralize model-name language; capstone micro-tasks; First-week blocks | ~8 h | Rolling |

---

## Appendix: sources

- ASPPH AI initiative: aspph.org/initiatives/ai-for-public-health/ · Draft report PDF: aspph-webassets.s3.us-east-1.amazonaws.com/AI+Taskforce+Draft+Report_March+2026.pdf · Policy audit (peer-reviewed): Frontiers in Public Health 2026, doi 10.3389/fpubh.2026.1796810 · CEPH 2026 criteria revisions: ceph.org/about/org-info/criteria-procedures-documents/criteria-procedures/2026-criteria-revisions/
- Comparable programs: publichealth.arizona.edu/ai/summer-school · fctl.ucf.edu/programs/ai-fundamentals-for-educators/ · aacu.org/event/2026-27-institute-ai-pedagogy-curriculum · anthropic.skilljar.com/ai-fluency-for-educators · dgi.iu.edu/gen-ai · news.gsu.edu (Aug 26, 2026 SPH AI Initiative) · CIDRAP: cidrap.umn.edu/misc-emerging-topics/adoption-artificial-intelligence-outpaces-training-field-epidemiology-programs
- Tool changes: OpenAI Enterprise/Edu release notes: help.openai.com/en/articles/10128477 · Gemini Notebook rename: blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/ · Adobe productivity agent: news.adobe.com/news/2026/05/adobes-new-productivity-agent · Microsoft: techcommunity.microsoft.com "What's New in Microsoft 365 Copilot" June/July 2026 + EDU Back to School Aug 2026 (check manually — not machine-readable)
- Analytics: docs.github.com (repo traffic) · goatcounter.com · developers.cloudflare.com/web-analytics/about/ · quarto.org/docs/output-formats/html-basics.html (include-in-header)
- Flagged as unverified by the research agents: final ASPPH task-force report publication status; exact CEPH MPH.9 wording; M365 Copilot June-Aug specifics; some Claude/Anthropic 2026 dates (third-party aggregator); the Wiley/PMC scoping review on public-health AI competencies (paywalled — pull via Drexel library: doi 10.1002/hsr2.72066).
