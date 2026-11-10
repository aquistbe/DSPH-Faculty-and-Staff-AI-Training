# Instructor Guide: Core 3 · Set It Up Once

Date: Tuesday, November 10, 2026, 1:00–2:00 PM
Length: 60 minutes on Zoom
Slides: `slides/workshop3.html` (27 slides)
Main tools: ChatGPT Edu (plugins, Projects, scheduled tasks), Copilot Chat (agents), Claude (instructor demo only)
Handout: `demo-materials/Workshop3_Guardrail_Card.docx`

## Why this session changed (November 2026)

OpenAI stopped new custom GPTs on October 26, 2026 and plans to retire them on December 11, 2026 (dates can vary by workspace). The replacement is the plugin: instructions become a skill, knowledge files become reference files, and custom actions are not migrated. The session now builds a plugin instead of a custom GPT, adds a guardrail card, and adds scheduled tasks. The old shared-Project activity is folded into Build B and the fallback tip. The project-description risk exercise was dropped from the session; `Workshop3_Demo_ProjectDescription.docx` stays in `demo-materials/` for the Collaborating on Projects track.

## Prep (day before)

- [ ] In ChatGPT Edu: confirm **@ Plugin Creator** works and note the exact steps you see. If they differ from the page, tell participants at the start.
- [ ] Build both plugins ahead of time (Grant Deadline Tracker with a fresh CSV; Crossing Points Recap with the style guide and template). Run the three tests on each so you know how they fail.
- [ ] Confirm **Scheduled** appears in the ChatGPT Edu sidebar. Create the PubMed task once so you can show the Scheduled list.
- [ ] In Copilot Chat: check whether **Create an agent** appears for a Drexel account. If it does not, drop that line from slide 9 and the page tip.
- [ ] Claude demo: set up a Project with the Crossing Points Recap instructions + the two reference files; save the same instructions as a Skill; create the weekly PubMed scheduled task. Use only the fictional files.
- [ ] Post in the Zoom chat at the start: links to the guardrail card and the four Word demo files.

## Run of show

| Time | Segment | Slides | Notes |
|---|---|---|---|
| 0:00-0:05 | Welcome back; basic how-tos | 1-4 | Zoom chat: which Core 2 prompt did you reuse, what did you re-explain? |
| 0:05-0:13 | What changed; four parts; which tool | 5-8 | Keep it short. The main point: write instructions in your own Word document. |
| 0:13-0:30 | Activity 1: build a plugin | 9-14 | Build Crossing Points Recap (Build B) on your screen first, step by step, while people follow. Then release. Point newer users to Build B; Build A needs editing a .csv file. Slide 14 (other uses) is 1 minute; skip if short on time. |
| 0:30-0:40 | Activity 2: guardrail card + three tests | 15-18 | Card is optional during the session; the three tests are the priority. Ask for scores in the chat. |
| 0:40-0:52 | Activity 3: sort tasks, set one up | 19-24 | Part A answers in chat for 3, 5, 8, then show slide 22. Part B: everyone creates one task with an end date. |
| 0:52-0:57 | Claude live demo | 25 | Same Word document pasted into a Project and a Skill; rerun Test 1 and 2; show the scheduled task. |
| 0:57-1:00 | Wrap-up, feedback QR | 26-27 | One assistant or task they'll set up this month. |

If time runs short, cut Activity 3 Part B to a demo of your own scheduled task and keep Part A.

## Participants who are less comfortable with Office and Zoom

- Ask a colleague to co-host and watch the Zoom chat for help requests.
- Show slide 4 (basic how-tos) and walk through Side-by-side view, Downloads, the copy icon on the page, and the + button in ChatGPT. Do each one on your screen.
- For every step in Activity 1: show it first, then say "now you," then wait for thumbs-up reactions.
- Every prompt on the page is in a gray box with a copy icon. Send the page link in the chat at the start.
- Build B uses only downloaded files and the attach button; steer newer users there.
- Tell people it is fine to watch and do the steps later from the page.
- If many people are stuck at the plugin step, switch to a Project (the tip box on the page) or do Build B together as a follow-along.

## Expected results (for checking participants' work)

**Build A (Grant Deadline Tracker):** two deadlines in 30 days (+10, +25); only +10 is URGENT; ends with the funder-site reminder. Tests: declines budget question, declines again on push, says the NSF CAREER deadline isn't on file.

**Build B (Crossing Points Recap):** one decision (September newsletter, Rosa). Second corridor, budget move, counter equipment = open questions. Spanish translation and October room booking = Unassigned. IRB check = No date. Student-worker note left out with a one-line notice. Tests: declines the note to Jordan, declines on push, says the notes give no IRB due date.

**Common failures to point out:** Test 2 (push back) often succeeds; Plugin Creator sometimes rewrites rules more loosely than the pasted instructions, which is why step 4 says to read the final instructions.

## Talking points

- Slide 5: The custom GPT retirement is the reason to keep instructions in your own document. If a tool changes, you paste, retest, and move on.
- Slide 6: "Custom actions" do not migrate. Few faculty use them, but anyone with a GPT that calls an outside service needs to reconnect it.
- Slide 7: Instructions for newer models should be shorter and plainer. Current OpenAI and Anthropic guidance: say what you want and why, and drop repeated warnings, ALL-CAPS "MUST/NEVER" lines, and contradictory rules, which can make newer models rigid or overly cautious. Keep the guardrails and rely on the three tests.
- Slide 8: Copilot Chat agents are free when grounded in instructions and public websites; using SharePoint or OneDrive files requires the paid license or pay-as-you-go billing, which Drexel does not have. Scheduled prompts in Copilot also require the paid license.
- Slide 14: Skills can apply in an ordinary chat when a request matches. Drexel's sharing and connected-app settings are not confirmed; say so if asked.
- Slide 18: "Advisory only" means a person checks the output before anyone acts on it. The grant tracker is advisory only.
- Slide 20: A task no one reads still runs and uses the plan's allowance.
- Slide 25: Claude is Low Risk Data only and not Drexel-supported. Show it to make the portability point, not to recommend a switch. For more advanced participants: a Markdown (.md) file works as well as a Word document and pastes cleanly; Claude Skills are Markdown files.

## Data rules to repeat

No health information about a person, student records, HR matters, or identifiable research data in any assistant or scheduled task. Shared assistants: reference files must be fine for everyone they're shared with. Share inside the Drexel workspace only.

## Sources checked 2026-11-09

- OpenAI Help: Plugins in ChatGPT; Build plugins (learn.chatgpt.com/docs/build-plugins); Scheduled tasks in ChatGPT (Edu limit 10 active; tasks in a Project can't read Project files; no more than hourly).
- Custom GPT retirement dates: MSU IT KB (retirement Dec 11, 2026; no new GPTs after Oct 26, 2026); ETIH coverage.
- Microsoft: Copilot Chat agents grounded in instructions and public websites at no added cost (learn.microsoft.com/copilot/agents); scheduled prompts require a Microsoft 365 Copilot license (Microsoft Support).
