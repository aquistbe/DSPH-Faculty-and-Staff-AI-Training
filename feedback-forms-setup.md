# Feedback forms — setup notes (two shared forms)

Two Microsoft Forms to create (forms.office.com, Drexel login). Each form collects
responses into ONE spreadsheet, with the first question identifying which session or
page the feedback is about — so all workshop feedback lands in one sheet and all
track-page feedback in another, ready for analysis without merging.

**STATUS 2026-08-31 — both forms are built and wired in; nothing left to paste here.**

- Workshop sessions: <https://forms.cloud.microsoft/r/nkvSu3x9PD> → `_feedback-workshop.qmd`
- Self-paced track pages: <https://forms.cloud.microsoft/r/eLHm7tRtGY> → `_feedback-track.qmd`
- QR cards (Forms-generated, downsized for slides/screen share):
  `slides/qr-workshop-feedback.png` and `slides/qr-track-feedback.png`; full-resolution
  originals are in `../data/`. Both verified to decode to the correct form.
- Remaining form work is the **baseline + endpoint assessment** — see `assessment-instruments.md`.

Historical note — how the links were wired (repeat this if a form is ever rebuilt):

When the forms exist, paste each share link over its placeholder — one edit per file,
since every page pulls these in as includes — then `quarto render`:
- Workshop form link → `_feedback-workshop.qmd` (placeholder: REPLACE-WITH-WORKSHOP-FORM-URL)
- Track form link → `_feedback-track.qmd` (placeholder: REPLACE-WITH-TRACK-FORM-URL)

Suggested settings on both forms: anyone in Drexel can respond, anonymous
(don't record names), responses to Excel.

## Form 1 — Workshop session feedback

1. Which session did you attend? (Choice, dropdown) — Core 1 Foundations & Capabilities /
   Core 2 Workflow Enhancement / Core 3 Reusable Assistants / Core 4 Verify, Disclose, Decide /
   Elective: Documents & Visuals (Adobe) / Elective: AI for Curriculum Development /
   AI in the Classroom session / AI Clinic / Other
2. Your role (Choice) — Faculty / Administrative staff / Research staff / Student / Other
3. Overall, how useful was this session? (Rating, 1–5)
4. BEFORE this session, how confident were you that you could do this session's core task
   on your own? (Rating, 1–5)
5. And NOW, after the session? (Rating, 1–5)
6. What is one thing you will do with this before Friday? (Text)
7. What would you change or add? (Text)
8. What topics should future workshops cover? (Text, optional)

Questions 4–5 are the retrospective pre/post self-efficacy pair — keep their wording
identical across sessions and semesters so the numbers are comparable over time.

## Form 2 — Self-paced track feedback

1. Which page are you giving feedback on? (Choice, **dropdown** — cleaner data than free
   text; paste the 44 page names below as the options)
2. Your role (Choice) — Faculty / Administrative staff / Research staff / Student / Other
3. How useful was this page? (Rating, 1–5)
4. How much did you do? (Choice) — Completed the activities / Did some activities / Read only
5. BEFORE working through this page, how confident were you that you could do this on
   your own? (Rating, 1–5)
6. And NOW? (Rating, 1–5)
7. What worked well, and what should be improved? (Text)
8. Anything missing or unclear? (Text, optional)

Questions 5–6 are the retrospective pre/post self-efficacy pair — keep the wording stable
so results are comparable across pages and over time.

### Dropdown options for question 1 (44 pages)

Paste these as the choices (MS Forms accepts pasting a list into a choice question):

Assignment Assessment Design
AI In Your Coursework
AI For Your Thesis Or Dissertation
Teaching & Learning (track overview)
Bias Equity Audit
Building Agents
Coding With AI
Collaborating On Projects
Communication
Context Engineering
Course AI Policy
Creating Loops
Creating Skills
Data Analysis
Data Analysis Advanced
Data Analysis Basics
Data Cleaning
Data Security Classification
De Identification Synthetic Data
Design Visual Communication
Environmental Sustainability
Geospatial GIS
Governance Ethics
Grant Administration
Grant Proposal Development
Image Generation Annotation
Judgment And Offloading
Literature Review
Local Models Ollama
Manuscript Peer Review
MCP Connecting Tools
Mentoring Advising
Methods Study Design
Multilingual Materials
Program Evaluation
Qualitative Analysis
RAG Knowledge Bases
Responsible AI
Science Communication
Statistical Interpretation
Survey Instrument Design
Technical Agentic
Verifying Output
Web And Dashboards
