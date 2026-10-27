// Rebuild Core 1 PowerPoint to match slides/workshop1.html (1280x720 px -> 20x11.25 in, 1 px = 1/64 in)
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.defineLayout({ name: 'DSPH', width: 20, height: 11.25 });
pres.layout = 'DSPH';
pres.title = 'Core 1 — Foundations & Capabilities';
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

// 1 Title
titleSlide('AI WORKSHOPS FOR DSPH', 'Foundations & Capabilities',
  'What generative AI is, which Drexel tools to use, and how to ask for what you need. No experience needed.',
  'Alex Quistberg, PhD, MPH', 'Associate Research Professor · Department of Environmental & Occupational Health',
  'Core 1 · Fall 2026',
  'No experience needed. If you have never opened ChatGPT, you are in the right room. By the end of the hour, everyone will have used ChatGPT Edu for a real task.', true);

// 2 Goals
let s = content("WHAT YOU'LL LEAVE WITH", "Today's Goals",
  'Four goals for the hour. The point is one safe, useful habit started, not every feature.');
numbered(s, [
  'Say in one sentence what tools like ChatGPT do, and what they get wrong.',
  'Know which Drexel tools to use and what never goes into them.',
  'Sign in to ChatGPT Edu, type a request, and ask a follow-up.',
  'Use four simple questions (PTCF) to get a better answer.'], 3.3, 0.95, 22);

// 3 Section
section('01', 'What AI Is', 'What these tools do, which ones to use, and the one data rule.');

// 4 Mental model
s = content('THE MENTAL MODEL', 'AI Drafts, You Decide',
  'These tools write by predicting what words come next. That makes them good at drafts and summaries. It also means they can sound sure of themselves and still be wrong. You are the quality check. Do not explain model architecture, training, or tokens. If asked, give a one-sentence answer and offer to talk afterward.');
txt(s, 'ChatGPT and Copilot write text by predicting what words should come next, based on patterns in a huge amount of writing.',
  { x: X, y: 2.95, w: 16.3, h: 1.3, fontSize: 24, lineSpacingMultiple: 1.25 });
bullets(s, [
  'Good at drafting, summarizing, rewriting, and explaining.',
  'Can sound confident and still be wrong. They are not search engines or databases.',
  'Think of a fast, eager assistant who has read a lot but is sometimes wrong. You check the draft before you use it.'],
  { x: X, y: 4.6, w: 16.3, h: 3.5 });

// 5 Terms
s = content("A FEW WORDS YOU'LL HEAR", 'Four Terms',
  'Read each term and definition aloud. Hallucination is the one that matters most for safety.');
const cw = 8.6, gap = 0.55, ch = 3.0;
column(s, X, 2.95, cw, ch, 'Prompt', C.teal, ['What you type into the box: a question, a request, or instructions.']);
column(s, X + cw + gap, 2.95, cw, ch, 'Chat', C.teal, ['One conversation. It remembers earlier messages in the same chat, not other chats.']);
column(s, X, 2.95 + ch + 0.45, cw, ch, 'Model', C.teal, ['The AI system underneath the tool. You can use the default.']);
column(s, X + cw + gap, 2.95 + ch + 0.45, cw, ch, 'Hallucination', C.crimson, ['When the AI states something false as if it were true.']);

// 6 Tools
s = content('TOOLS & DATA', 'Which Tool, and the One Data Rule',
  'For Drexel work, use ChatGPT Edu or Copilot Chat, signed in with your Drexel account. Personal accounts and other tools are for public information only. The rule: no health information about a person, no student records, no Social Security numbers, no identifiable research data. When in doubt, make the details up. Point to the Tools & Access page for the full list; do not walk through every tool and data classification here.');
column(s, X, 2.95, cw, 4.6, 'Which tool to use', C.teal, [
  [B('ChatGPT Edu'), T(', signed in with your Drexel account')],
  [B('Copilot Chat'), T(', signed in with your Drexel account')],
  'Personal ChatGPT, Claude, Gemini: public or low-risk information only']);
column(s, X + cw + gap, 2.95, cw, 4.6, 'Never paste in', C.crimson, [
  'Health information about a person',
  'Student records or Social Security numbers',
  'Identifiable research data',
  'When in doubt, leave it out or make the details up']);

// 7 Section
section('02', 'How AI Gets Things Wrong', 'And who is responsible when it does.');

// 8 Cards
s = content('THREE THINGS TO REMEMBER', 'Wrong, Biased, and Yours',
  "It can invent facts and citations. Check anything that matters. It learned from writing that reflects society's inequities, so it can repeat stereotypes. In public health our work affects real communities. If your name is on it, you own it. 'The AI wrote it' is never the answer. Core 4 covers verification and disclosure in depth; the Bias & Equity Audit track covers bias.");
const cards = [
  ['It Makes Things Up', 'It predicts likely-sounding text, so it can invent facts, numbers, and citations. Check anything that matters.', C.navy],
  ['It Can Be Biased', "It learned from writing that reflects society's inequities, so answers can repeat stereotypes. Our work affects real communities.", C.teal],
  ['You Are Responsible', 'If your name is on it, you own it: accuracy, fairness, and tone. “The AI wrote it” is never the answer.', C.gold]];
const kw = 5.5, kg = 0.625;
cards.forEach(([h, p, col], i) => {
  const x = X + i * (kw + kg);
  s.addShape(pres.shapes.RECTANGLE, { x, y: 2.95, w: kw, h: 4.6, fill: { color: C.white }, line: { color: C.line, width: 0.75 } });
  s.addShape(pres.shapes.RECTANGLE, { x, y: 2.95, w: kw, h: 0.1, fill: { color: col }, line: { type: 'none' } });
  txt(s, h, { x: x + 0.4, y: 3.4, w: kw - 0.8, h: 0.6, fontFace: SERIF, fontSize: 26, bold: true, color: C.navy });
  txt(s, p, { x: x + 0.4, y: 4.2, w: kw - 0.8, h: 3.0, fontSize: 19, color: C.gray, lineSpacingMultiple: 1.25 });
});

// 9 Section
section('03', 'Hands-On', 'A guided tour, three first requests, and a simple recipe for better answers.');

// 10 Guided tour
s = content('GUIDED TOUR · ~10 MIN · FOLLOW ALONG', 'ChatGPT Edu, Step by Step',
  'Do each step on the projector and pause. Ask people to give a thumbs-up when they have finished a step. Steps 4 and 6 teach the most important idea: a chat remembers earlier messages, and a new chat starts fresh. Backup if sign-in fails: Copilot Chat with a Drexel account, or pair with a neighbor.');
numbered(s, [
  'Sign in with your Drexel account. Check you are in the Drexel workspace.',
  'Find the message box at the bottom of the screen.',
  'Type: “In two sentences, what can you help a public health staff member with?”',
  'Follow up in the same chat: “Give me three examples.”',
  'Copy the answer with the copy icon.',
  'Click “New chat.” It does not remember the old one.',
  'Find past chats in the list on the left.'], 2.95, 0.95, 21);

// 11 Activity 1
s = content('ACTIVITY 1 · ~15 MIN', 'Your First Three Requests',
  'Participants copy the three prompts from the Core 1 workshop page, then try one follow-up. The goal is one successful answer per person. Prioritize people who have not gotten any response yet. If someone wants to use sensitive work content, have them make up a version with the same structure.');
txt(s, 'Copy each prompt from the workshop page into ChatGPT Edu, one at a time. There are no wrong answers.',
  { x: X, y: 2.95, w: 16.3, h: 1.0, fontSize: 24, lineSpacingMultiple: 1.25 });
bullets(s, [
  [B('Summarize: '), T('a short paragraph on pedestrian deaths, in 3 bullet points.')],
  [B('Draft: '), T('a friendly reminder email to a committee, under 100 words.')],
  [B('Explain: '), T('what a “data use agreement” is, in plain language.')],
  [B('Then follow up: '), T('“Make it shorter,” “More formal,” or “Add a sentence about ___.”')]],
  { x: X, y: 4.75, w: 16.3, h: 4.0 });

// 12 Activity 2
s = content('ACTIVITY 2 · ~15 MIN', 'Four Questions Before You Type',
  "Run the short prompt and the full prompt on the projector so the room sees the difference. Then ask everyone to write a PTCF prompt for a real email or short document they need this week, using made-up names and details. You don't need all four parts every time; adding even one or two helps. Ask two or three people which answer they would send.");
column(s, X, 2.95, cw, 4.9, 'PTCF', C.teal, [
  [B('Persona: '), T('who should it act as?')],
  [B('Task: '), T('what do you want it to do?')],
  [B('Context: '), T('what does it need to know?')],
  [B('Format: '), T('what should the answer look like?')]]);
column(s, X + cw + gap, 2.95, cw, 4.9, 'Try both', C.crimson, [
  [B('Short: '), T('“Write an email about a meeting.”')],
  [B('Full: '), T('“You are an experienced department administrator. Write an email announcing a staff meeting Tuesday at 10 in Room 204 about the new travel policy. Under 100 words, warm tone, date and time first.”')]]);

// 13 Wrap-up
s = content('WRAP-UP', 'What to Take Away',
  'One task to try before Core 2. Point to the feedback form at the bottom of the workshop page.');
txt(s, 'AI writes drafts. You check them and decide.', { x: X, y: 2.95, w: 16.3, h: 0.8, fontSize: 24 });
bullets(s, [
  'For Drexel work, use ChatGPT Edu or Copilot and follow the data rule.',
  'Before you type, ask the four questions: Persona, Task, Context, Format.',
  'Before Core 2: do one weekly task (an email, a summary, notes) with ChatGPT Edu, and bring it.'],
  { x: X, y: 4.1, w: 16.3, h: 3.5 });

// 14 Closing
titleSlide('THANK YOU', 'Questions & Discussion',
  'Next: Core 2 — Workflow Enhancement. Use Copilot and ChatGPT Edu to speed up the work you already do.',
  'Alex Quistberg, PhD, MPH', 'daq26@drexel.edu', 'Department of Environmental & Occupational Health', null, false);

pres.writeFile({ fileName: process.argv[2] }).then(f => console.log('wrote', f));
