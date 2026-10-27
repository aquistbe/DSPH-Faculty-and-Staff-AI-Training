// Build Core 2 PowerPoint to match slides/workshop2.html (1280x720 px -> 20x11.25 in).
// Usage: node build_w2_pptx.js out.pptx <imgdir>   (imgdir holds sN.png: 2x screenshots of HTML slides 5,6,7,11,16,17,18,19)
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.defineLayout({ name: 'DSPH', width: 20, height: 11.25 });
pres.layout = 'DSPH';
pres.title = 'Core 2 — Workflow Enhancement';
pres.author = 'Alex Quistberg';

const C = { navy: '07294D', gold: 'FFC600', teal: '006699', crimson: '971B2F', slate: '1C2530',
  gray: '5A6571', line: 'D0D3D4', sub: 'C7D2DF', dim: '9FB3CC', white: 'FFFFFF' };
const SERIF = 'Georgia', SANS = 'Futura';
const X = 1.125, W = 17.75; // left margin and content width

const FS = 1.2; // HTML px -> pt at 20in width
function txt(slide, text, o) {
  if (o.fontSize) o.fontSize = Math.round(o.fontSize * FS);
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0, fontFace: SANS, color: C.slate, valign: 'top' }, o));
}
function footer(s) {
  s.addShape(pres.shapes.LINE, { x: X, y: 10.55, w: W, h: 0, line: { color: C.line, width: 0.75 } });
  txt(s, 'Environmental & Occupational Health', { x: X, y: 10.7, w: 8, h: 0.3, fontSize: 12, bold: true, color: C.navy });
  txt(s, 'Dornsife School of Public Health', { x: X + W - 8, y: 10.7, w: 8, h: 0.3, fontSize: 12, color: C.gray, align: 'right' });
}
function content(eyebrow, head, notes) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  txt(s, eyebrow, { x: X, y: 0.95, w: W, h: 0.3, fontSize: 15, bold: true, color: C.teal, charSpacing: 3 });
  txt(s, head, { x: X, y: 1.3, w: W, h: 0.9, fontFace: SERIF, fontSize: 46, bold: true, color: C.navy, valign: 'middle' });
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: 2.3, w: 0.85, h: 0.08, fill: { color: C.gold }, line: { type: 'none' } });
  footer(s);
  if (notes) s.addNotes(notes);
  return s;
}
function bullets(s, items, o) {
  const runs = [];
  items.forEach((it, i) => {
    const parts = Array.isArray(it) ? it : [{ text: it }];
    parts.forEach((p, j) => {
      const opts = Object.assign({}, p.options || {});
      if (j === 0) { opts.bullet = { indent: 22 }; opts.paraSpaceAfter = 12; }
      if (j === parts.length - 1 && i < items.length - 1) opts.breakLine = true;
      runs.push({ text: p.text, options: opts });
    });
  });
  txt(s, runs, Object.assign({ fontSize: 21, lineSpacingMultiple: 1.2 }, o));
}
const B = (t) => ({ text: t, options: { bold: true } });
const T = (t) => ({ text: t });
function numbered(s, items, y0, step, fs) {
  items.forEach((t, i) => {
    const y = y0 + i * step;
    s.addShape(pres.shapes.OVAL, { x: X, y, w: 0.55, h: 0.55, fill: { color: C.gold }, line: { type: 'none' } });
    txt(s, String(i + 1), { x: X, y, w: 0.55, h: 0.55, fontSize: 18, bold: true, color: C.navy, align: 'center', valign: 'middle' });
    txt(s, t, { x: X + 0.85, y, w: W - 0.85, h: 0.55, fontSize: fs, valign: 'middle' });
  });
}
function column(s, x, y, w, h, head, headColor, items, fs) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, line: { color: C.line, width: 0.75 } });
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.85, fill: { color: headColor }, line: { type: 'none' } });
  txt(s, head, { x: x + 0.35, y, w: w - 0.7, h: 0.85, fontFace: SERIF, fontSize: 24, bold: true, color: C.white, valign: 'middle' });
  bullets(s, items, { x: x + 0.35, y: y + 1.15, w: w - 0.7, h: h - 1.4, fontSize: fs || 20 });
}
function section(n, head, desc, notes) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  txt(s, 'SECTION ' + n, { x: X, y: 3.7, w: W, h: 0.3, fontSize: 15, bold: true, color: C.gold, charSpacing: 3 });
  txt(s, head, { x: X, y: 4.1, w: W, h: 1.2, fontFace: SERIF, fontSize: 62, bold: true, color: C.white, valign: 'middle' });
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: 5.55, w: 0.85, h: 0.08, fill: { color: C.gold }, line: { type: 'none' } });
  txt(s, desc, { x: X, y: 6.0, w: 14.5, h: 1.0, fontSize: 23, color: C.sub });
  if (notes) s.addNotes(notes);
}
function brandcard(s) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: X, y: 0.94, w: 4.9, h: 1.1, rectRadius: 0.12, fill: { color: C.white }, line: { type: 'none' } });
  txt(s, 'Drexel University', { x: X + 0.34, y: 1.08, w: 4.4, h: 0.42, fontFace: SERIF, fontSize: 20, bold: true, color: C.navy });
  txt(s, 'Dornsife School of Public Health', { x: X + 0.34, y: 1.55, w: 4.4, h: 0.34, fontSize: 13, bold: true, color: C.teal });
}
function titleSlide(eyebrow, head, sub, leftName, leftRole, right, notes, dept) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  brandcard(s);
  if (dept) txt(s, 'Department of Environmental\n& Occupational Health', { x: 14.9, y: 1.0, w: 4, h: 0.8, fontSize: 15, color: C.dim, align: 'right' });
  txt(s, eyebrow, { x: X, y: 4.45, w: W, h: 0.3, fontSize: 15, bold: true, color: C.gold, charSpacing: 3 });
  txt(s, head, { x: X, y: 4.85, w: W, h: 1.5, fontFace: SERIF, fontSize: 74, bold: true, color: C.white, valign: 'middle' });
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: 6.6, w: 0.85, h: 0.08, fill: { color: C.gold }, line: { type: 'none' } });
  txt(s, sub, { x: X, y: 7.0, w: 15.5, h: 1.0, fontSize: 22, color: C.sub });
  txt(s, leftName, { x: X, y: 9.5, w: 10, h: 0.4, fontSize: 19, bold: true, color: C.white });
  txt(s, leftRole, { x: X, y: 9.92, w: 11, h: 0.35, fontSize: 16, color: C.dim });
  txt(s, right, { x: 10.4, y: 9.92, w: 8.5, h: 0.35, fontSize: 16, color: C.dim, align: 'right' });
  if (notes) s.addNotes(notes);
}

const path = require('path');
const IMG = process.argv[3];
function imageSlide(n, notes) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addImage({ path: path.join(IMG, 's' + n + '.png'), x: 0, y: 0, w: 20, h: 11.25 });
  if (notes) s.addNotes(notes);
}
function callout(s, t, y) {
  s.addShape(pres.shapes.RECTANGLE, { x: X, y, w: W, h: 1.0, fill: { color: 'FFF8DB' }, line: { type: 'none' } });
  s.addShape(pres.shapes.RECTANGLE, { x: X, y, w: 0.09, h: 1.0, fill: { color: C.gold }, line: { type: 'none' } });
  txt(s, t, { x: X + 0.35, y, w: W - 0.6, h: 1.0, fontSize: 20, bold: true, color: C.navy, valign: 'middle' });
}
function cardRow(s, cards, y, h) {
  const kw = 5.5, kg = 0.625;
  cards.forEach(([hd, p, col], i) => {
    const x = X + i * (kw + kg);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: kw, h, fill: { color: C.white }, line: { color: C.line, width: 0.75 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: kw, h: 0.1, fill: { color: col }, line: { type: 'none' } });
    txt(s, hd, { x: x + 0.4, y: y + 0.35, w: kw - 0.8, h: 0.95, fontFace: SERIF, fontSize: 22, bold: true, color: C.navy, fit: 'shrink' });
    txt(s, p, { x: x + 0.4, y: y + 1.35, w: kw - 0.8, h: h - 1.55, fontSize: 18, color: C.gray, lineSpacingMultiple: 1.25 });
  });
}
const cw = 8.6, gap = 0.55;

// 1 Title
titleSlide('AI WORKSHOPS FOR DSPH', 'Workflow Enhancement',
  'Start from your own plan, then let ChatGPT Edu or Copilot Chat draft or refine',
  'Alex Quistberg, PhD, MPH', 'Associate Research Professor · Department of Environmental & Occupational Health',
  'Core 2 · Fall 2026 · on Zoom',
  'On Zoom. Paste the Core 2 page link, the demo-file links, and m365.cloud.microsoft/chat in the chat now. Two ideas run through the hour: plan first, then decide whether AI drafts or refines.', true);

// 2 Goals
let s = content("WHAT YOU'LL LEAVE WITH", "Today's Goals", 'Five goals. The real ones: a plan before any AI, and knowing when to let AI draft versus refine.');
numbered(s, [
  'Pick a weekly task where AI can save you time.',
  'Start from your own plan, then decide: should AI draft it, or refine what you wrote?',
  'Get a document, email, or spreadsheet into Copilot Chat or ChatGPT Edu.',
  "Use AI as an editor: tighten language, catch inconsistencies, find what's missing.",
  'Check the answer before you use it, and save one prompt you can reuse.'], 3.3, 0.95, 21);

// 3 Welcome back
s = content('WELCOME BACK', 'How Did Your Core 1 Task Go?', 'Ask for one line in the Zoom chat. Read two or three aloud. Then cover the right box: Zoom and browser side by side, thumbs-up reaction when done, questions in the chat.');
column(s, X, 2.95, cw, 4.6, 'In the Zoom chat, one line', C.teal, ['What task did you try after Core 1?', 'Did it help? What did you have to fix?', "Didn't get to it? Type the task you'll try today."]);
column(s, X + cw + gap, 2.95, cw, 4.6, 'How today works on Zoom', C.navy, ['Put Zoom and your browser side by side.', 'React with a thumbs-up when you finish a step.', "Stuck? Say so in the chat and we'll help.", 'Demo file links are in the chat.']);

// 4 Section
section('01', 'Plan First, Then Draft or Refine', 'Your plan comes before any AI draft. Then decide what AI should do with it.');

// 5-7 Figures and cards
imageSlide(5, 'Before AI, write a few bullets: the point, who it is for, the key facts. Two minutes. AI then drafts from your plan or refines what you wrote, and you check the result against your plan.');
imageSlide(6, 'The center of the session. AI drafts from your outline: routine, low stakes, you know the content. You write, AI refines: your expertise, judgment, or voice is the point, or the stakes are high. Leave AI out: sensitive information and the decision itself. Ask in the chat for one task per column.');
imageSlide(7, 'Each prompt asks for a list, not a rewrite. You stay the author; AI is the second reader. Inconsistencies are the sleeper hit: dates that do not match, a name spelled two ways, a number that changes between sections.');

// 8 Tools
s = content('WHICH TOOL TO OPEN', 'Two Tools, Same Steps', 'Brief. Both take pasted text or an uploaded file. If asked about Copilot inside Word or Excel: Drexel does not have that license, and you do not need it. In Outlook, the Summarize button works for everyone.');
cardRow(s, [
  ['Copilot Chat', 'm365.cloud.microsoft/chat, signed in with your Drexel account. Good for quick summaries and edits of Drexel documents and email.', C.navy],
  ['ChatGPT Edu', 'The Drexel workspace you used in Core 1. Good for longer drafting, going back and forth, and (in Core 3) saved assistants.', C.teal],
  ['Same Steps in Both', 'Paste the text, or upload the file with the + button. Ask. Check. Copy the answer back into your document.', C.gold]], 2.95, 3.9);
callout(s, "No Copilot inside Word or Excel at Drexel. You don't need it: upload the file or paste the text, then copy the answer back.", 7.3);

// 9 Data rule
s = content('TOOLS & DATA', 'Same Data Rule as Core 1', 'Same rule as Core 1. Drexel lists Copilot Chat (signed in) as approved for High Risk Data, but for this session keep the simple rule.');
column(s, X, 2.95, cw, 4.9, 'Fine to use', C.teal, ['Your own drafts, notes, and announcements', 'Committee and project email without sensitive details', 'Public documents and published papers', 'Made-up versions of anything sensitive']);
column(s, X + cw + gap, 2.95, cw, 4.9, 'Never paste in', C.crimson, ['Health information about a person', 'Student records or Social Security numbers', 'Identifiable research data', 'When in doubt, leave it out or make the details up']);

// 10 Section
section('02', 'Check Before You Use It', 'Three quick questions before anything leaves your hands.');

// 11 Figure
imageSlide(11, 'Trace one draft through the three diamonds. Verified: check it against your plan and the original. Disclosed: official, research, or external work. Yours: does it say what you mean? Any "no" sends it back. Core 4 covers this in depth.');

// 12 Quote
s = pres.addSlide();
s.background = { color: 'F5F6F7' };
txt(s, '“', { x: 1.9, y: 2.9, w: 2, h: 1.4, fontFace: SERIF, fontSize: 120, bold: true, color: C.gold });
txt(s, 'If you can’t open it, you can’t cite it.', { x: 1.9, y: 4.3, w: 16, h: 1.3, fontFace: SERIF, fontSize: 46, bold: true, color: C.navy, valign: 'middle' });
s.addShape(pres.shapes.RECTANGLE, { x: 1.9, y: 6.0, w: 0.07, h: 0.9, fill: { color: C.gold }, line: { type: 'none' } });
txt(s, 'A rule worth keeping', { x: 2.2, y: 6.0, w: 12, h: 0.4, fontSize: 20, bold: true, color: C.navy });
txt(s, 'Treat every AI-supplied figure as unverified until you’ve confirmed it', { x: 2.2, y: 6.45, w: 14, h: 0.4, fontSize: 17, color: C.gray });
s.addNotes('Applies to numbers as much as citations. If you cannot trace it to a source you opened, it does not go in.');

// 13 Section
section('03', 'Hands-On', 'Upload a file together, then pick one everyday job, then your own task. Demo file links are in the Zoom chat.');

// 14 Guided start
s = content('GUIDED START · ~5 MIN · FOLLOW ALONG', 'Upload a File to Copilot Chat', 'Do each step on your shared screen and pause. Ask for a thumbs-up reaction after the upload step. Summarizing is a safe first job: the content already exists, so every bullet can be checked. No shield icon: personal Microsoft account. Upload fails: paste the text. Cannot find the file: repost the link.');
numbered(s, [
  'Download Workshop2_Demo_StudyDescription.docx (link in the Zoom chat).',
  'Go to m365.cloud.microsoft/chat and sign in with your Drexel account. Look for the shield icon.',
  'Click + next to the message box and upload the file (or paste the text).',
  'Type: “Summarize this document in 5 bullet points for a project status update.”',
  'Follow up: “Now make it 3 bullets for a busy dean.”'], 2.95, 0.95, 21);
txt(s, 'React with a thumbs-up in Zoom when you have an answer. The same steps work in ChatGPT Edu.', { x: X, y: 7.8, w: 16, h: 0.4, fontSize: 17, italic: true, color: C.gray });

// 15 Activity 1 overview
s = content('ACTIVITY 1 · ~19 MIN', 'Three Everyday Jobs: Pick One', 'Ask people to type A, B, or C in the chat. Leave the slide for the most common choice on screen; switch if the chat asks.');
txt(s, 'Use Copilot Chat or ChatGPT Edu, on your own screen. Upload the demo file or use your own non-sensitive material. Questions go in the Zoom chat.', { x: X, y: 2.85, w: 17, h: 1.1, fontSize: 23, lineSpacingMultiple: 1.2 });
cardRow(s, [
  ['Job A · A Document', "Summarize a study description, rewrite a paragraph for a community board, then find what's missing.", C.navy],
  ['Job B · An Email Thread', 'Find the decisions and open questions, make an action-item table, then draft a reply from your outline.', C.teal],
  ['Job C · A Spreadsheet', 'Find what stands out, get an Excel formula to flag rows, pick a chart.', C.gold]], 4.3, 3.3);

// 16-19 Worked examples and Activity 2
imageSlide(16, 'Find what is missing: the description has aims, methods, products, and partners, but no timeline, budget, sample size, team roles, or plan for privacy in street imagery. Ask people to post one gap in the chat and whether it is real. AI lists gaps; the author decides what to add.');
imageSlide(17, 'The person supplies the two points; AI only turns them into sentences. Did the reply add anything they did not say? The accreditation crosswalk was put on the September agenda with no owner: decision, action item, or open question?');
imageSlide(18, '17 of 60 rows are over $12 per attendee: Oct EOH, HMP, and Autism Institute; all of Dec except Epi & Biostat; Jan HMP, CHP, and Autism Institute; all six in June. Nov HMP is exactly $12.00 ($300 ÷ 25): a formula with > will not flag it, >= will. Check the formula, not just the answer.');
imageSlide(19, 'Hold people to step 1: a plan before AI. Ask them to type "plan done" in the chat before opening AI. Routine task: recipe 1. Expertise or high stakes: write it, then recipe 2. Everyone saves at least one recipe before leaving.');

// 20 Wrap-up
s = content('WRAP-UP', 'What to Take Away', 'Ask for one line in the chat: one thing they will try this week. Paste the feedback form link (bottom of the Core 2 page) in the chat.');
txt(s, 'Plan first. Then AI drafts from your outline, or refines what you wrote. Then you check it.', { x: X, y: 2.95, w: 17, h: 0.8, fontSize: 24 });
bullets(s, ['Routine and low stakes: AI drafts from your outline. Your expertise or high stakes: you write, AI refines.', "As an editor, AI tightens language, catches inconsistencies, and finds what's missing. Ask for a list, not a rewrite.", 'Before you use it: Verified? Disclosed? Yours?', 'Before Core 3: save two recipes (one draft, one refine) and use one again next week.'], { x: X, y: 4.1, w: 17, h: 4.2 });
txt(s, "In the Zoom chat: one thing you'll try this week.", { x: X, y: 8.6, w: 12, h: 0.4, fontSize: 17, italic: true, color: C.gray });

// 21 Closing
titleSlide('THANK YOU', 'Questions & Discussion',
  'Next: Core 3 — Reusable Assistants. Turn your saved recipes into shared Projects and custom GPTs.',
  'Alex Quistberg, PhD, MPH', 'daq26@drexel.edu', 'Department of Environmental & Occupational Health', null, false);

pres.writeFile({ fileName: process.argv[2] }).then(f => console.log('wrote', f));
