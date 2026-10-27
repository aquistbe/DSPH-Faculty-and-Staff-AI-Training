# Instructor Guide: Core 1

Workshop: Foundations & Capabilities  
Length: 60 minutes, on Zoom  
Presentation target: about 15 minutes of slides, 40 minutes hands-on  
Main tools: ChatGPT Edu (Copilot Chat as backup), Drexel AI Tools page  
Participant assumption: many have never used ChatGPT or Copilot. Some will not know where to type. Pace for them.

## Goals

Participants should leave able to:

1. Say in one sentence what tools like ChatGPT do, and what they get wrong.
2. Know which Drexel tools to use and what never goes into them.
3. Sign in to ChatGPT Edu, type a request, and ask a follow-up.
4. Use the four PTCF questions (Persona, Task, Context, Format) to get a better answer.

## Instructor Prep

- Sign in to ChatGPT Edu with Drexel credentials and confirm what the current default model is. Tell participants to use the default.
- Walk through the guided-tour steps yourself on the current interface. Confirm where the message box, copy icon, "New chat" button, and chat history are. Update the slide and workshop page if the layout has changed.
- Open the Drexel AI Tools page in a tab.
- Share a single browser window with ChatGPT Edu for the guided tour, not your whole screen, so notifications and other tabs stay private. Enlarge the browser text (Ctrl/Cmd +) so it reads well in a Zoom window.
- Paste the Core 1 page link in the Zoom chat at the start and again before each activity; late joiners can't see earlier chat messages unless chat history is on.
- Plan for sign-in problems: participants can use Copilot Chat with their Drexel account, and should say so in the Zoom chat. If you have a co-host, ask them to watch the chat and handle sign-in help for the first 15 minutes of hands-on time.

## 60-Minute Run of Show

| Time | Segment | Slides | Instructor role |
|---|---|---|---|
| 0:00-0:08 | What AI is, which tools, the one data rule | 1-6 | Keep it short. Mental model, four terms, tool choice, data rule. |
| 0:08-0:17 | What it can do: six real tasks | 7-13 | Instructor demo. One live (data), the rest from slides. ~60-90 seconds per slide. |
| 0:17-0:23 | How AI gets things wrong, who is responsible | 14-15 | Three points: makes things up, can be biased, you are responsible. Tie back to the wrong DOI on slide 11. |
| 0:23-0:33 | Guided tour of ChatGPT Edu | 16-17 | Do each step on your shared screen. Wait for most people's 👍 reactions before moving on. |
| 0:33-0:44 | Activity 1: three first requests | 18 | Watch the Zoom chat. Help everyone get at least one answer back. |
| 0:44-0:55 | Activity 2: PTCF | 19 | Show the short and full prompts side by side, then have people write their own. |
| 0:55-1:00 | Wrap-up and next step | 20-21 | One task to try before Core 2. Point to the feedback form at the bottom of the workshop page. |

## Slide Plan and Speaking Notes

### Slides 1-2: Title and Goals

Say:

- "No experience needed. If you have never opened ChatGPT, you are in the right room."
- "By the end of the hour, everyone will have used ChatGPT Edu for a real task."

### Slide 4: AI Drafts, You Decide

Say:

- "These tools write by predicting what words come next. That makes them good at drafts and summaries."
- "It also means they can sound sure of themselves and still be wrong. You are the quality check."

Do not explain model architecture, training, or tokens. If asked, give a one-sentence answer and offer to talk afterward.

### Slide 5: Four Terms

Read each term and definition aloud. Point out that "hallucination" is the one that matters most for safety.

### Slide 6: Which Tool, and the One Data Rule

Say:

- "For Drexel work, use ChatGPT Edu or Copilot Chat, signed in with your Drexel account."
- "Personal accounts and other tools are for public information only."
- "The rule: no health information about a person, no student records, no Social Security numbers, no identifiable research data. When in doubt, make the details up."

Point to the Tools & Access page on the site for the full list. Do not walk through every tool and data classification here.

### Slides 7-13: What It Can Do (9 min)

Purpose: show beginners why this is worth an hour before they touch it. Keep moving; do not teach the prompts in detail.

Prep before class:

- Download `demo-materials/Workshop1_Demo_RivertonPedCrashes.csv` to your laptop.
- Open a ChatGPT Edu chat in a second tab, ready for the upload. Do a dry run once: the chart and wording will differ from the slide, which is fine.

Slide 8 (live, ~3 min): upload the CSV, paste the prompt from the slide, and run it. While it works, say: "It is writing and running analysis code. You can click to see it." When it returns, point to the data problems it flagged (6 missing speed limits, 3 rows with hour = 99). If it misses them, ask: "Are there any missing or impossible values?" That is also a lesson. If the upload or the network fails, use the slide; it shows a real result from the same file.

Slide 9 (~1 min): "This is my draft, not the AI's. I ask it to act like a study section reviewer and to not rewrite anything." The critique is real model output (trimmed). Say: "NIH will not review applications substantially developed by AI. Use it to critique, not to write."

Slide 10 (~1 min): the mini-slides are an example. Mention that ChatGPT Edu can produce a PowerPoint file directly, and that it works for updating last year's deck.

Slide 11 (~1.5 min): email triage is the easy win for staff. Then the citations: a model was asked for 5 studies on leading pedestrian intervals. It gave 2 and declined to invent the rest. Fayish & Gross (2010), DOI 10.3141/2198-03, checks out. For Van Houten et al. (2000), it gave 10.3141/1734-11, which resolves to a motorcycle helmet paper; the correct DOI is 10.3141/1734-13. Say: "Even a careful answer had a wrong citation."

Slide 12 (~1 min): student groups. Say: "Even in ChatGPT Edu, I don't upload names. I swap names for IDs in Excel, upload only what matters for grouping, and match the names back myself." Point out the last line of the prompt ("check each rule") and tell them to count anyway; models sometimes say a rule is met when it isn't. The roster is fabricated: `demo-materials/Workshop1_Demo_AnonymizedRoster.csv`. The groups on the slide meet all three rules (checked).

Slide 13 (~1 min): this section was built by an agentic tool working in your OneDrive folder. Stress the label: not Drexel-supported, low-risk data only. Today everyone starts with ChatGPT Edu.

### Slide 15: Wrong, Biased, and Yours

Say:

- "It can invent facts and citations. Check anything that matters."
- "It learned from writing that reflects society's inequities, so it can repeat stereotypes. In public health our work affects real communities."
- "If your name is on it, you own it. 'The AI wrote it' is never the answer."

Mention that Core 4 covers verification and disclosure in depth, and the Bias & Equity Audit track covers bias.

### Slide 17: Guided Tour

Do each step on your shared screen and pause. Ask people to react with 👍 in Zoom when they have finished a step. The steps are:

1. Sign in and confirm the Drexel workspace.
2. Find the message box.
3. Type the test prompt.
4. Ask the follow-up in the same chat.
5. Copy the answer.
6. Start a new chat.
7. Find chat history.

Steps 4 and 6 teach the most important idea: a chat remembers earlier messages, and a new chat starts fresh.

### Slide 18: Activity 1

Participants copy the three prompts from the workshop page (Summarize, Draft, Explain), then try one follow-up. Tell them where the page is: the Core 1 link on the course site.

### Slide 19: Activity 2

Run the short prompt and the full PTCF prompt on your shared screen so everyone sees the difference. Then ask everyone to write a PTCF prompt for a real email or short document they need this week, using made-up names and details.

Say: "You don't need all four parts every time. Adding even one or two helps."

## Activity Facilitation Notes

Activity 1 is about confidence. The goal is one successful answer per person. Prioritize people who have not gotten any response yet over people who want to go further.

Activity 2 should make the improvement visible. Ask people to say in the chat which answer they would send, short or full, and invite two or three to unmute and explain why.

If someone wants to use sensitive work content, redirect them:

> Use a made-up version with the same structure. Replace names, dates, dollar amounts, and anything that could identify a person.

## Common Questions

**Can I use this for student or research data?**  
Not in this session. In general, only when the tool and use case are approved for that data classification. For research data, also check the IRB and any data use agreement.

**Can I trust what it tells me?**  
Check anything that matters. Treat citations as unverified until you find the source yourself.

**Should I use ChatGPT Edu or Copilot?**  
Either works for today. Core 2 covers when to use Copilot inside Word, Outlook, and other Office apps.

**Does it remember what I told it last week?**  
Each new chat starts fresh. Past chats are saved in the list on the left, and you can go back to them.

## Optional References

- `Judgment is the skill that matters most in the AI era – Jim Grey on software man.pdf`
- `How People Are Really Using AI in 2026.pdf`
- `Choosing to Stay Human - by Ethan Mollick.pdf`
- Drexel AI Tools + Data Classification
- ChatGPT Edu official page
