# Instructor Guide: Workshop 3

Workshop: Collaboration on Projects  
Length: 60 minutes  
Presentation target: 15-20 minutes  
Main tools: ChatGPT Edu custom GPTs, shared prompt library, Zoom AI Companion, OpenAI Academy  
Participant assumption: participants can now run prompts and identify low-risk examples

## Goals

Participants should leave able to:

1. Turn meeting notes into summaries, decisions, and action items.
2. Draft and stress-test a simple project plan.
3. Create or outline one internal custom GPT in ChatGPT Edu.
4. Start a shared prompt library for their team.
5. Know where to continue learning through OpenAI Academy.

## Instructor Prep

- Open ChatGPT Edu and confirm custom GPT creation is available.
- Prepare a simple custom GPT example, such as "Meeting Recap Assistant."
- Open a shared prompt library example in Word, Teams, SharePoint, or OneDrive.
- Open OpenAI Academy in a browser tab.
- Prepare a sample set of messy meeting notes for participants who do not bring their own.

Ready-made synthetic demo files are in `demo-materials/` (also linked from the workshop 3 page). Each ends with its workshop prompt and a "then check" list:

- `Workshop3_Demo_MeetingNotes.docx` — messy study-team check-in notes (Activity 1 Part A). Planted teaching moments: only ONE real decision (the September newsletter), so you can catch the AI inventing others — the budget move and equipment choice were NOT decided; two unassigned action items (Spanish translation, October room booking); vague dates ("hopefully back soon"); and a personnel aside (student worker missing shifts) that must not reach a shared recap — use it to run the shared-space test live.
- `Workshop3_Demo_ProjectDescription.docx` — two-paragraph fictional study description (Activity 1 Part B). Five planted risks the AI's plan should surface: DUA stuck in legal review, city installation schedule outside team control, a shared analyst, student-worker coverage during counts, and a 90-day report clock that starts regardless. Score the AI's risk list against the five.
- `Workshop3_Demo_StyleGuide.docx` + `Workshop3_Demo_UpdateTemplate.docx` — the upload pair for Activity 2 (shared Project reference files). After uploading both, run "Using the uploaded template, draft a project update for this month" and point out that the output follows the template's Done / In Progress / Needs Attention structure and the style guide's rules (bottom line, no unexplained acronyms) without re-pasting them — the shared-context payoff, demonstrated.

Live-demo script (~4 minutes, before releasing the room): open the meeting notes, run the recap prompt, and check the three planted traps aloud — invented decisions, unassigned items, the personnel note. That models both the recap habit and the shared-space test in one pass.

## 60-Minute Run of Show

| Time | Segment | Instructor role |
|---|---|---|
| 0:00-0:03 | Reconnect | Ask for one prompt recipe that worked. |
| 0:03-0:20 | Minimal slides | Move from individual prompting to team reuse. |
| 0:20-0:33 | Meeting recap and project plan | Participants turn notes into action items and risks. |
| 0:33-0:51 | Custom GPT or prompt library | Participants build or outline one reusable team tool. |
| 0:51-0:56 | OpenAI Academy | Show where to find events, content, and education/work resources. |
| 0:56-1:00 | Commitment | Each participant names one team habit to try. |

## Slide Plan and Speaking Notes

Use 7 slides. The Academy slide can be a live browser demo rather than a detailed slide.

### Slide 1: From Individual Use to Team Practice

Claim: A prompt that works for one person is useful; a prompt the team can reuse becomes a standard.

Say:

- "Today is about shared work: meetings, project planning, prompt libraries, and custom GPTs."
- "The goal is a repeatable team habit, not a polished AI system."

### Slide 2: Three Team Uses That Are Worth Starting

Claim: Start with recaps, plans, and reusable prompts.

Say:

- "Meeting recaps reduce lost decisions and vague follow-up."
- "Project-plan prompts surface risks and missing owners."
- "Prompt libraries and custom GPTs let later users benefit from what early adopters learn."

### Slide 3: Meeting Recap Pattern

Claim: The most useful recap separates summary, decisions, action items, and uncertainties.

Prompt:

> Turn these notes into four sections: brief summary, decisions made, action items with owner and due date, and unclear items that need follow-up.

Say:

- "The unclear-items section is the point. It shows where the meeting did not actually resolve ownership or timing."

### Slide 4: Stress-Test the Project Plan

Claim: AI can help find gaps before they become project delays.

Prompt:

> Draft a simple project plan with phases, tasks, owners, and timeline. Then list the top 5 risks, what would reduce each risk, and what early warning sign we should watch.

Say:

- "Use this to find blind spots. Do not outsource the decision."

### Slide 5: Custom GPT or Prompt Library?

Claim: Use the lightest reusable tool that solves the problem.

Say:

- "Use a prompt library when the team needs shared examples and can copy/paste."
- "Use a custom GPT when the team needs the same instructions, tone, format, or reference files every time."
- "Share custom GPTs internally only, consistent with Drexel workspace rules."

### Slide 6: Data and Permission Check

Claim: Shared AI tools increase consistency, but they also increase privacy and permission risk.

Say:

- "Do not upload sensitive reference files just because a GPT is internal."
- "Use public, low-risk, synthetic, or explicitly approved content."
- "For research data, check IRB and data use agreements."

Reading to mention: `LLMs can unmask pseudonymous users at scale with surprising accuracy - Ars Techn.pdf`

### Slide 7: Where to Keep Learning

Claim: OpenAI Academy gives participants a place to continue after the workshops.

Live demo:

1. Open https://academy.openai.com/.
2. Point to Events, Content, Work, and Education.
3. Ask participants to find one relevant resource or event after the session.

Say:

- "This is a good place for short learning after the workshop. Check Events for live or recorded sessions, and Content for role-based topics."

## Activity Facilitation Notes

For custom GPTs, some participants may move quickly and others may not know what to build. Offer these starter ideas:

- Meeting Recap Assistant
- Plain-Language Rewriter
- Grant Reminder Drafter
- Research Project Update Assistant
- Student/Staff Onboarding Q&A Assistant
- Policy Summary Assistant

Use this starter instruction:

> You are a [role] for the DSPH [team]. When given [input], produce [output] in this format: [structure]. Use a [tone] tone. If key information is missing, ask for it before producing the output. Never include sensitive or identifying data.

If custom GPT creation is unavailable or slow, have participants write the instructions in a shared document instead. That document becomes the seed for a later GPT.

## OpenAI Academy Placement

Introduce OpenAI Academy near the end, after participants have enough context to know what to look for. Keep it to 3-5 minutes:

- Show the home page.
- Point to Content and Events.
- Mention that relevant sessions may appear under Work and Education.
- Ask participants to bookmark it and choose one resource after the workshop.

## Common Questions

**Should every team build a custom GPT?**  
No. A shared prompt library is often enough. Build a custom GPT when the task is repeated, the output format is stable, and the instructions need to stay consistent.

**Can a custom GPT use our internal files?**  
Only if those files are appropriate under Drexel's ChatGPT Edu terms, data-classification guidance, IRB requirements, and any data use agreements.

**What should we do after the workshop?**  
Pick one team habit for 30 days: AI-assisted meeting recaps, a shared prompt library, or one internal custom GPT for a repeated task.

## Optional References

- `Introducing workspace agents in ChatGPT - OpenAI.pdf`
- `Understanding-AI-agents.pdf`
- `(1) AI Agents for Data Scientists- Automations vs Agents.pdf`
- `LLMs can unmask pseudonymous users at scale with surprising accuracy - Ars Techn.pdf`
- OpenAI Academy
- Drexel AI Tools + Data Classification
