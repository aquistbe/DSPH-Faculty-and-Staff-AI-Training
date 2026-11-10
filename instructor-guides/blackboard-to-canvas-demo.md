# Demo Script: Moving a Course from Blackboard to Canvas with AI

Session: Faculty discussion (week of November 16, 2026)
Length: about 30 minutes: 20-minute core demo, 10-minute optional API segment, then questions
Main tools: Blackboard Learn (Original), Canvas sandbox, ChatGPT Edu (Claude optional), Python 3 for the API segment
Handout: `demo-materials/Blackboard_to_Canvas_Quick_Guide.docx`
Page for participants: `tracks/blackboard-to-canvas.qmd` ("Moving a Course from Blackboard to Canvas with AI")
Scripts: `demo-materials/canvas-migration/` (inventory, module builder, page updater, example plan)

## The one message

Canvas moves the content. AI helps with the cleanup, which is where the hours go. And you check everything before students see it.

Timing matters: **Blackboard Learn Original courses become read-only on December 31, 2026.** Faculty who want to reuse a Blackboard course should export it now.

## Prep (2–3 days before)

Do the slow steps ahead of time. An import can take several minutes and you don't want to wait on it live.

**Course and data**

- [ ] If you don't have a Canvas sandbox yet, request one now. You need it before you can import.
- [ ] Pick the real course. Prefer one with a mix of pages, files, a test, an assignment, and at least one Blackboard folder (so the import shows its usual mess).
- [ ] In Blackboard: **Packages and Utilities → Export/Archive Course → Export Package** (not Archive). Copy links and include copies of files, including those outside the default directory. Select All. Download the .zip. **Don't unzip it.**
- [ ] Check the course files for anything you uploaded that names a student: old rosters, graded spreadsheets, sample student work, announcements that mention someone. Remove those from the sandbox after import, before any AI step.
- [ ] Confirm the sandbox has **no students enrolled**, and that nothing in it will show a student name on screen.

**Canvas sandbox**

- [ ] Import the .zip: **Settings → Import Course Content → Blackboard 6/7/8/9 export .zip file → All content → Adjust events and due dates: Remove dates → Import.**
- [ ] When it finishes, open the issues link (if the status is yellow) and copy the list into a text file.
- [ ] **Settings → Validate Links in Content → Start Link Validation.** Copy the results into the same file.
- [ ] Pick **one messy page** for the live rebuild (a Blackboard folder page or the old syllabus page works well). Copy its HTML (Edit → `</>`) into a text file as a backup.
- [ ] Copy your syllabus schedule (weeks and topics) into the same text file.
- [ ] Optional for contrast: create a second, empty sandbox (or reset the course) so you can start an import live and let it run in the background.

**ChatGPT Edu (and Claude, if you show it)**

- [ ] Run the two prompts below once on your real material, so you know what the output looks like and roughly how long it takes.
- [ ] Open a fresh chat for the live demo. Turn off memory or close unrelated chats in the sidebar if they'd be visible on screen.

**API segment (optional)**

- [ ] Create a Canvas token (**Account → Settings → + New Access Token**) that expires the day after the session.
- [ ] In a Terminal window, `cd` to a folder with the three scripts, and set `CANVAS_BASE_URL` and `CANVAS_TOKEN`. **Do this before screen sharing**, so the token never appears on screen. Run `clear` afterward.
- [ ] Run `python3 canvas_inventory.py COURSE_ID` once to confirm it works; keep the resulting `inventory.md`.
- [ ] Generate a `module_plan.csv` with the Activity 4 prompt, and run the **dry run** once. Decide whether you'll `--apply` live. A safe choice is to apply only a "Start Here" module.

**Backups if something fails live**

- [ ] Screenshots of: the export screen, the import screen, the yellow "Completed" status and issues list, the link validator results, the before/after page, and the dry-run output.
- [ ] The text file with issues, broken links, schedule, and the messy page HTML.

**Screen sharing**

- [ ] Share a single browser window, not your whole screen. Turn off email and chat notifications.
- [ ] Zoom the browser to 125–150% so code and HTML are readable.

## Run of show

| Time | Segment | What to show | Say |
|---|---|---|---|
| 0:00–0:02 | Why now | The Drexel timeline | Blackboard Original goes read-only Dec 31. Export what you want to reuse now. |
| 0:02–0:06 | Export and import | Blackboard **Export Package** screen (or screenshot); Canvas **Import Course Content** with the Blackboard content type and **Remove dates** | Export, not Archive: the archive includes student work and grades. Canvas does the moving; no AI needed. |
| 0:06–0:09 | What came over | Modules page; yellow **Completed** and the issues list; link validator results | This is the mess: flat structure, duplicates, broken Blackboard links, no dates. Here's where AI helps. |
| 0:09–0:14 | AI sorts the cleanup | ChatGPT Edu, Prompt 1 | It sorts the to-do list and drafts modules from my syllabus. I check every placement. It doesn't know my course. |
| 0:14–0:19 | AI rebuilds a page | ChatGPT Edu, Prompt 2; paste into Canvas; accessibility checker; Student View | Same content, clean structure, alt text. It flags dates and Blackboard links; it doesn't guess. Compare before you save. |
| 0:19–0:20 | What still needs you | The "What still needs your hands" list on the page | Dates, quiz settings, rubrics, blogs/journals/wikis, integrations like Course Reserves. |
| 0:20–0:30 | Optional: the API | Terminal: inventory → `inventory.md` flags → module plan → dry run → (optional) apply one module → page export/update dry run | Read-only first, dry run second, sandbox always. The token never leaves my computer. |
| 0:30– | Questions | — | Point to the page, the handout, and ITG. |

If time runs short, skip the API segment and show only the `inventory.md` flags as a screenshot: "This is what a script can tell you in thirty seconds."

## Live prompts

**Prompt 1: sort the cleanup and plan modules.** Paste the issues list, broken links, current module list, and syllabus schedule underneath.

```
I imported a Blackboard course into a Canvas sandbox. Below are (1) the import issues Canvas reported, (2) the broken links, (3) the current module list, and (4) my syllabus schedule.

Do two things:
A. Sort every issue and broken link into: Fix before students see the course / Fix later / Probably delete. One line each, with the reason.
B. Propose a module structure for Canvas: a "Start Here" module, then one module per week from the schedule. For each module, list which existing items belong in it, using their exact current titles. List any item you can't place, and any week with no content.

Don't invent content, dates, or items that aren't in my lists. Ask me if something is unclear.
```

Point out live: pick one item from part B and find it in Canvas. If it invented or renamed something, say so. That is the lesson.

**Prompt 2: rebuild one page.** Paste the page's HTML underneath.

```
This is a course page imported from Blackboard into Canvas. Rewrite the HTML as a clean Canvas page:
- keep every piece of content and every link; do not add or remove information;
- use headings (h2, h3) in order, short paragraphs, and real lists;
- remove empty tags, inline font styling, and leftover Blackboard formatting;
- give every image an alt attribute; if you can't tell what an image shows, write alt="TODO: describe" instead of guessing;
- list any link that points to Blackboard (it will be broken in Canvas), and any date, so I can update them myself;
- do not change dates or guess new ones.
After the HTML, list every change you made.
```

Point out live: the change list, the flagged Blackboard links, and any `alt="TODO"`. Paste into the Canvas HTML editor, save, run the accessibility checker, then open **Student View**.

**Prompt 3 (API segment): module plan as CSV.** Paste `inventory.md` and the schedule underneath.

```
Here is an inventory of a Canvas course imported from Blackboard, and my syllabus schedule. Write a module plan as CSV with the columns module,type,ref,title,indent.
- type is one of Page, Assignment, Quiz, Discussion, File, SubHeader, ExternalUrl.
- ref is the exact "ref" value shown in the inventory (the page_url for pages, the numeric id for everything else). For ExternalUrl, ref is the web address. For SubHeader, leave ref blank and put the text in title.
- Start with a "Start Here" module, then one module per week from the schedule.
- Use only items that are in the inventory. After the CSV, list items you left out and why.
```

**API commands, in order**

```
python3 canvas_inventory.py COURSE_ID
python3 canvas_build_modules.py COURSE_ID module_plan.csv
python3 canvas_build_modules.py COURSE_ID module_plan.csv --apply
python3 canvas_pages.py export COURSE_ID
python3 canvas_pages.py update COURSE_ID
python3 canvas_pages.py update COURSE_ID --apply
```

Show the first two for sure. The `--apply` steps are optional live.

## Talking points

- **Export vs. archive.** The export package is instructor content only. The archive adds submissions, grades, and discussion posts. Still check uploaded files: you may have uploaded something with student names yourself.
- **Which AI tool.** ChatGPT Edu is the Drexel-approved option, governed by Drexel's Terms of Use. Claude on a personal account is for Low Risk data only. Course pages with no student information are usually fine; check first.
- **AI doesn't log in to Canvas.** In the API segment, AI helped write the plan; the scripts run on my computer with my token. The token is a password: it never goes into a chat, and I revoke it after.
- **Dry run, sandbox, backup.** Every script that changes anything shows what it would do first, runs in the sandbox first, and the page updater saves the old version before replacing it.
- **What AI is bad at here.** Knowing your course. It will place items in plausible weeks, tidy titles, and fill in dates if you let it. Tell it to flag, not fill, and check its placements.
- **Good moment to rethink.** Rebuilding a course is a chance to revisit assessments. Point to the "Assessment That Holds Up to AI" topic.

## Likely questions

- **"Can I still do this after December 31?"** Drexel says Blackboard Original courses become view-only for faculty then. Don't count on exporting after that date. Export now.
- **"Does the export include grades or student work?"** Not the export package. The archive does. Use the export.
- **"My course is in Ultra, not Original."** The export option is on the Course Content page menu (**Export Course Package**). Choose **No** when asked about student activity data. The Canvas import is the same.
- **"What about my question pools / publisher test banks?"** Pools may need to be moved separately, and some question types (for example hot spot) aren't supported. For publisher banks, ask the publisher for a Canvas-ready version.
- **"How do I get a sandbox?"** Tell the room who to ask at DSPH.
- **"Who can help?"** The Instructional Technology Group (itg@drexel.edu), your unit's Canvas Implementation Lead, and the Countdown to Canvas site. The Teaching and Learning Center offers an OSCQR-based course review.
- **"Can I just ask AI to do the whole migration?"** No. AI tools can't log in to Canvas for you, and the import tool already does the moving. AI is useful for the judgment-heavy cleanup and for writing scripts you run yourself.

## If something goes wrong live

- **Import still running or failed:** switch to screenshots. Large packages can fail; the fix is to export in smaller pieces.
- **ChatGPT Edu is slow or down:** show the saved output from your prep run.
- **Script error:** read the one-line message aloud (it's written for that). 401 means the token; "Could not reach Canvas" means the address. Paste only the error text, never the token, if you ask AI for help.
- **Something with a student name appears on screen:** stop sharing, remove it, and resume. Better: check in prep.

## After the session

- [ ] Revoke the token in **Account → Settings**.
- [ ] Delete the `pages/`, `backup/`, and `inventory.md` files if you don't need them.
- [ ] Note any steps where Drexel's screens differed from the guide, so the page can be updated.
