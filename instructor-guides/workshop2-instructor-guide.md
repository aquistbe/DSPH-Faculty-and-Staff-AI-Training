# Instructor Guide: Workshop 2

Workshop: Workflow Enhancement  
Length: 60 minutes  
Presentation target: 15-18 minutes  
Main tools: Microsoft 365 Copilot, Copilot Chat with Enterprise Data Protection, ChatGPT Edu  
Participant assumption: participants have tried at least one prompt, but most are still early users

## Goals

Participants should leave able to:

1. Identify which recurring tasks are good candidates for AI help.
2. Use Microsoft 365 Copilot where work already lives in Word, Outlook, and Excel.
3. Use ChatGPT Edu with GPT-5.5 when available for drafting, summarizing, and revising.
4. Save one prompt recipe for reuse.

## Instructor Prep

Ready-made synthetic demo files are in `demo-materials/` (also linked from the workshop 2 page):

- `Workshop2_Demo_StudyDescription.docx` — pedestrian-safety study description (Track A, Word). Each file ends with its three prompts and a verify step.
- `Workshop2_Demo_EmailThread.docx` — 6-message curriculum-committee thread with decisions, open questions, and one deliberately ambiguous item (the accreditation crosswalk) to demo over-summarizing.
- `Workshop2_Demo_SeminarAttendance.xlsx` — 30 rows of monthly seminar attendance and catering cost, three departments, AY 2025–26. Built-in dip in Dec–Jan and drop in Jun so "what stands out?" has a real answer. Prompts on the About sheet.
- `Workshop2_Demo_Abstracts.docx` — three synthetic pedestrian-safety abstracts for the summarize-then-act demo, with the round 2/3 iteration prompts.

Before the session:

- Open the three Office demo files in Word and Excel; have the email thread ready to paste into Copilot Chat (Outlook can't load a mock thread).
- Open ChatGPT Edu and Copilot Chat with Enterprise Data Protection.
- Remind participants to bring a real non-sensitive task or use the demo files.

## 60-Minute Run of Show

| Time | Segment | Instructor role |
|---|---|---|
| 0:00-0:03 | Reconnect | Ask who tried a prompt after Workshop 1. |
| 0:03-0:18 | Minimal slides | Explain workflow fit, tool choice, and candidate tasks. |
| 0:18-0:33 | Office demo/activity | Let participants choose Word, Outlook, or Excel. |
| 0:33-0:53 | ChatGPT Edu real task | Coach iteration and prompt recipe creation. |
| 0:53-0:58 | Debrief | Ask where AI saved time and where it did not. |
| 0:58-1:00 | Next step | Ask them to bring two reusable prompts to Workshop 3. |

## Slide Plan and Speaking Notes

The deck is 23 slides, but most of the hands-on segment (slides 14–21) stays on screen during the activities rather than being presented. Present slides 1–12 in the 15–18 minute window; the worked-example slides then serve as on-screen instructions while participants work.

Figure slides and what to say with each:

- **Slide 4 (task anatomy):** "You frame it, AI drafts the middle, you finish it. The middle box is where your weekly hours go — that's the target."
- **Slide 6 (tool decision flow):** walk the three branches left to right; land on the red bar — data classification first, always.
- **Slide 7 (quadrant):** point at the gold quadrant. "Frequent and low-stakes is the sweet spot. Top-left — rare and high-stakes — do it yourself." Ask the room to place one of their own tasks.
- **Slide 8 (week of DSPH work):** "All five rows show up as worked examples today."
- **Slide 11 (before you hit send):** trace one draft through the three diamonds; any 'no' loops it back.
- **Slides 15–17 (worked examples A–C):** these preview the activity — don't run the prompts yet, just show the shape: document on the left, three prompts on the right, one thing to watch for.
- **Slide 18 (PTCF anatomy):** the filled example is the same lay-summary task from slide 15, so the two segments connect.
- **Slide 20 (iteration rounds):** "Round 1 is generic, round 2 makes it quantitative, round 3 makes it do analysis you react to."

The original 6 core claims below still map onto the deck (claims 1–2 → slides 4–8, claim 3 → slide 6, claim 4 → slides 18–19, claim 5 → slide 21, claim 6 → slides 10–11).

### Slide 1: From Prompting to Workflow

Claim: The value is not a single clever prompt. The value is reducing repeated first-draft work.

Say:

- "Today we move from trying AI to fitting it into one task you already do."
- "The target is not full automation. The target is a faster first draft, summary, or reformat that you review."

### Slide 2: Good Candidate Tasks

Claim: AI works best when the task is text-heavy, repeated, and reviewable.

Say:

- "Good candidates: meeting summaries, email drafts, document summaries, first-pass outlines, reformatting notes, formula help, plain-language rewrites."
- "Poor candidates: final decisions, unverified citations, sensitive data without approval, work where the source cannot be checked."

### Slide 3: Choose the Tool by Where the Work Lives

Claim: Tool choice should be boring and practical.

Say:

- "If the work is in Word, Outlook, Excel, PowerPoint, or Teams, try Microsoft 365 Copilot."
- "If you need protected web chat and do not need a custom GPT, use Copilot Chat with Enterprise Data Protection."
- "If you need open-ended drafting, file analysis, or a reusable assistant, use ChatGPT Edu."

### Slide 4: Demo: Summarize, Then Act

Claim: A strong workflow moves from raw material to a useful next action.

Demo:

1. Paste or open a short text.
2. Ask for a summary.
3. Ask for a follow-up email or task list.
4. Ask what is missing or unclear.

Say:

- "The second step matters. A summary is useful, but a summary plus next action is closer to a real workflow."

### Slide 5: Save the Recipe

Claim: Reuse comes from saving the prompt structure, not the one-off answer.

Say:

- "When a prompt works, strip out the details and keep placeholders."
- "A good recipe has role, task, input, output format, and review step."

Example:

> You are a [role]. Summarize [input] for [audience]. Produce [format]. Then list any claims, numbers, or action items I should verify before using it.

### Slide 6: Keep the Human Review Step

Claim: AI saves time only if review remains explicit.

Say:

- "Check facts, names, dates, figures, citations, tone, and anything that affects a real decision."
- "For writing, remove generic phrasing and restore your voice."

Reading to mention: `(1) AI-slop , GrantaGate and Bad Writing - by Tuhin Chakrabarty.pdf`

## Activity Facilitation Notes

For the Office activity, let participants pick the tool closest to their work. Staff may gravitate to Outlook and Word; faculty may pick Word and PowerPoint; analysts may pick Excel. Keep the room moving by asking participants to choose within 1 minute.

Live-demo script (pick one track, ~4 minutes, before releasing the room):

1. Open `Workshop2_Demo_StudyDescription.docx` in Word.
2. Run prompt 1 (5-bullet summary) — point out it's fast but flat.
3. Run prompt 2 (lay rewrite) — read one sentence aloud and check a fact against the original on screen. This is the verify habit, demonstrated, not described.
4. Run prompt 3 (draft next steps) — note that it invented the steps; that's fine for a draft, and exactly why you edit.

Planted teaching moments in the demo files:

- **Email thread:** the accreditation crosswalk is deliberately ambiguous (flagged, deferred to September, but no owner). Ask: "Is that a decision, an action item, or an open question?" AI summaries often misfile it.
- **Excel data:** attendance dips in Dec–Jan and drops in June — a correct "what stands out?" answer exists. The $12 cost-per-attendee flag catches several rows; verify one by hand on screen.
- **Abstracts:** the three CI ranges are the numbers most likely to be transposed in a table — verify them live in round 2.

For the ChatGPT Edu activity, push participants to iterate 2-3 times. Useful follow-ups:

- "Make this shorter and less formal."
- "Put this in a table."
- "Flag anything that needs verification."
- "Rewrite this for a non-technical colleague."
- "Turn this into a reusable prompt template."

## Common Questions

**Does Copilot see all my files?**  
It operates within Microsoft 365 permissions. That still does not mean every use is appropriate. Match the tool and use case to Drexel's data classification guidance.

**What if Copilot gives a weak answer?**  
Make the task smaller, specify the audience and format, and ask it to cite the part of the document or thread it used.

**Should I save outputs?**  
Save prompts and edited final products. Do not treat unreviewed AI output as a record of fact.

## Optional References

- `(1) How AI Is Changing Teaching Workflows.pdf`
- `(1) AI-slop , GrantaGate and Bad Writing - by Tuhin Chakrabarty.pdf`
- `Watch your tone- language machines as writing technology.pdf`
- `The task is not the job - by Luis Garicano.pdf`
- Drexel AI Tools + Data Classification
