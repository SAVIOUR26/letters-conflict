# Letters Conflict — project instructions for Claude

This repository holds the manuscript and build system for **Letters Conflict**, a trilogy of literary-philosophical nonfiction by **Najuna Saviour** (published by **KandaNews Africa Co. Ltd**, Kampala). Read this file fully before doing any work. It records every decision made so far; do not reopen a locked decision unless the author asks.

## 1. Where things stand (update this section after every chapter)

| Item | Status |
|---|---|
| Book blueprint (Origins) | Version 2 done — `build/blueprint.js` → `drafts/Letters_Conflict_Origins_Blueprint.docx` |
| A Note to the Reader | Done (inside `manuscript/origins/ch01.js`, export `note`) |
| Front and back matter | Draft 1 done in `manuscript/origins/frontmatter.js`, modelled on *The Japanese Way*: title page, copyright, **dedication (proposed — author to confirm)**, acknowledgments, contents, Introduction, Part pages, Chapter Quotations, About the Author, Also by |
| Introduction (“The Book I Started on Campus”) | Draft 1 done (~1,600 words). One `[AUTHOR]` box for the campus scene; lines about the author’s first question and change of mind to be confirmed by him |
| **Print proof** | `npm run proof` → `drafts/Letters_Conflict_Origins_Proof.pdf` (152 pp., 6 × 9 in, EB Garamond embedded, contents with real page numbers, chapters on right-hand pages). `npm run edition` builds the final (no proof marks) |
| Chapter 1 · The Story Before the Wound | Draft 2 done (~3,800 words, notes 1–22) |
| Chapter 2 · Nile, Kush, and the Horn | Draft 1 done (~3,200 words, notes 23–40) |
| Chapter 3 · Gold, Manuscripts, and the Cities of Knowledge | Draft 1 done (~2,900 words, notes 41–56) |
| Chapter 4 · Stone, Sea, and Bronze | Draft 1 done (~3,800 words, notes 57–74) |
| Chapter 5 · The Grammar of African Power | Draft 1 done (~3,500 words, notes 75–87; reuses [11]) |
| Chapter 6 · The Markets of Captivity | Draft 1 done (~3,000 words, notes 88–97; reuses [11], [69], [75], [81]) |
| Chapter 7 · Lines Drawn Across Living Worlds | Draft 1 done (~3,000 words, notes 98–108; reuses [75], [77], [78], [80], [83]) |
| Chapter 8 · Freedom with Inherited Machinery | Draft 1 done (~2,700 words, notes 109–122; reuses [45], [78], [98], [100], [101], [108]) |
| Chapter 9 · When Power Became Greater Than Purpose | Draft 1 done (~2,500 words, notes 123–133; reuses [81], [110], [112], [119], [121], [122]) |
| Chapter 10 · When Greatness Began to Sound Like a Fairy Tale | Draft 1 done (~2,500 words, notes 134–140; reuses [16], [38], [69], [74], [122]). **One `[AUTHOR]` placeholder on the author’s schooling** |
| Chapter 11 · The Sentence We Inherited | Draft 1 done (~2,100 words + author material, notes 141–142; reuses many earlier notes). **Three `[AUTHOR]` placeholders (campus story, how the research changed him, an inherited habit from his own work)** |
| Full draft | `drafts/Letters_Conflict_Origins_Chapters_1-11_Draft.docx` / `.pdf` (~33,000 words, notes 1–142 continuous) |
| **Open `[AUTHOR]` placeholders** | 5 in total: Introduction (1, campus scene), Ch 10 (1, schooling), Ch 11 (3, campus and present). In the proof they print as shaded boxes headed “Author’s passage to come”. Kooki material removed at the author’s request (31 Oct 2026) — keep the big picture |
| **Next note number** | **143** |
| **Next task** | **Author reads the printed proof; then fill the `[AUTHOR]` boxes, confirm the dedication, and run the verification list** |
| Covers | Draft 1 in `cover/` (generator `cover/build_cover.js`; palettes dusk/laterite/ochre/charcoal/cream; **dusk** currently preferred). Wrap regenerated for 152 pp (spine 0.38 in). Replace the low-res author photo before print |

Chapters 4–11 were drafted on 31 October 2026. Ch 8–11 run shorter (~2,000–2,700 words) by design; the author’s own material will deepen them. Every Wikipedia-led or secondary point is listed in `research/verification.md`. The author has asked next for: **the Introduction, front matter and covers.**

## 2. Locked decisions

- **Series title:** Letters Conflict (no apostrophe). The related typing app currently says “Letter’s Conflict” and should align.
- **Byline / publisher:** Najuna Saviour · KandaNews Africa Co. Ltd · www.kandanews.africa · publishing@kandanews.africa
- **Books:**
  - Book One: *Origins — The Anatomy of the Conflict*
  - Book Two: *Somewhere in Africa — The Anatomy of Our Contradictions*
  - Book Three: *Africa Adjustment Bureau — The Architecture of a New Africa*
- **Central metaphor:** People are the letters. Institutions are the grammar. Shared progress is the sentence.
- **Limits of the metaphor (always respect):** a person keeps their dignity when an institution fails them; no ruler, reformer or author may arrange people as passive letters; alignment never means sameness (“AFRICA” needs different letters).
- **Trilogy movement:** Formation → Manifestation → Adjustment. How did we get here? → What are we doing now? → What must we build?
- **Origins reader journey:** wonder → complexity → fracture → inheritance → responsibility.
- **Origins’ final hand-off line:** “History placed some letters badly. But history is no longer holding every hand. So why are we still writing some of the same sentences?”
- **Core principle:** History explains the arrangement we inherited. It does not decide the arrangement we must keep.
- **Primary reader:** young African adults (18–35), students, graduates, young professionals and entrepreneurs. Secondary: diaspora, teachers, civil servants, church and community leaders, policymakers.
- **Release:** all three books together (target August–September 2027).
- **Format:** 6 × 9 in paperback (matches the author’s published *The Japanese Way*), EB Garamond, Kindle EPUB from the same text. **Interior matches *The Japanese Way* (author’s request, 3 Nov 2026):** 12 pt EB Garamond, ~1.15 line spacing, flush justified paragraphs with a small space after (no first-line indent), inside margin 0.85 in, outside 0.7 in, running heads (book title left, section right), centred page numbers, roman front matter, Part pages followed by a blank page.
- **Length:** chapters are running ~3,000–4,000 words (similar to *The Japanese Way*). Do not pad. Depth will be added through the author’s own voice (Introduction, Part openings, Chapter 11).

## 3. Origins — the 11 chapters (locked)

| # | Title | Part |
|---|---|---|
| 1 | The Story Before the Wound | I · What Was Built |
| 2 | Nile, Kush, and the Horn | I |
| 3 | Gold, Manuscripts, and the Cities of Knowledge | I |
| 4 | Stone, Sea, and Bronze | I |
| 5 | The Grammar of African Power | I |
| 6 | The Markets of Captivity | II · What Was Broken |
| 7 | Lines Drawn Across Living Worlds | II |
| 8 | Freedom with Inherited Machinery | III · What Was Inherited |
| 9 | When Power Became Greater Than Purpose | III |
| 10 | When Greatness Began to Sound Like a Fairy Tale | III |
| 11 | The Sentence We Inherited | III |

Chapter 9 was restored deliberately: personalised power after independence was one of the author’s founding themes.

**What each chapter owns** (others may only mention it in a sentence and point forward/back):
- Great Zimbabwe’s authorship and the argument about it → Ch 1. Its economy and society → Ch 4. Ch 10 refers back.
- Historical method → A Note to the Reader + Ch 1 (in story form only).
- Slavery inside African societies → Ch 3 and Ch 5 (in context). External slave trades → Ch 6.
- Colonial education and memory, looted heritage and restitution → Ch 10.
- Personalised power after independence → Ch 9.
- Great Lakes kingdoms and Uganda → a deliberate thread: Ch 5 (before), Ch 7 (conquest), Ch 8 (independence).

## 4. The house chapter format (follow exactly)

Modelled on *The Japanese Way* (see `reference/house-style/`), adapted for history:

1. **Epigraph** — a verified quotation with attribution, preferably an African voice or a primary source.
2. **Opening scene** — a documented moment with named people, place and date. Never a hypothetical.
3. **Governing question** — stated plainly within the first page or two.
4. **The history** — two or three cases in real depth, under bold section headings.
5. **The mechanism** — how authority, incentives, knowledge, trade or force shaped relationships (“grammar”).
6. **“When the Evidence Corrects the Story”** — a section with exactly this heading: a popular belief, checked against sources, shown to be more complicated. This is the author’s signature move (see *The Japanese Way*, Ch 2). Every chapter has one.
7. **“Who Carried the Weight”** — the costs, coercion, slavery and exclusion inside the achievement. Every Part I chapter has one.
8. **“The Letter Principle”** — one paragraph of philosophy the chapter has earned.
9. **“Questions for Reflection”** — five questions for students and book clubs.
10. A `rule` (* * *), two short closing paragraphs (the second points to the next chapter), then the refrain:
    *The letters remain. The question is the sentence.*

## 5. Voice and evidence rules

- Lyrical at entrances and exits; clear, concrete and confident in the middle. **Rigour lives in the notes, not in hedging.** Do not write “we will / we should / we must” meta-commentary about method — that problem sank the first draft of Ch 1 (59 such phrases in 5,000 words).
- Name people, places and dates. Prefer one real person to three hypothetical ones. Hypotheticals, if any, are labelled (“Imagine…”).
- British spelling: civilisation, organise, honour, centre, programme, travelled.
- Never treat “Africa” as one character. Name the society, region and century.
- Hold structure and agency together: outsiders’ actions and Africans’ choices both appear.
- **Quotations:** only quote words you have actually read in a fetched source. If you only have a paraphrase, paraphrase. Never invent quotations, dialogue or private thoughts for real people.
- **Statistics** carry source, year and coverage.
- **Sources:** prefer primary sources, peer-reviewed scholarship, UNESCO/museum pages and Britannica. Wikipedia may be used **only as a lead**: name the principal scholarly source it relies on in the note and flag “to be confirmed before publication”.
- Every factual claim in the text carries a citation `[n]`.

## 6. Notes and citations

- Notes are numbered **continuously through the whole book** (Ch 1 has 1–22, Ch 2 has 23–40, Ch 3 has 41–56; Ch 4 starts at **57**).
- When a later chapter uses a source already cited, **reuse its existing number** (e.g. Ch 2 reuses [10] Hegel, [19] UNESCO Meroë, [20] Met Aksum; Ch 3 reuses [22] Library of Congress Timbuktu).
- Each note is annotated in house style: who, title, date, **what it is used for**, and any limits (“No claim is made that…”, “to be confirmed against…”). Add every “to be confirmed” item to `research/verification.md`.

## 7. Chapter module format

Each chapter is a CommonJS module in `manuscript/origins/chNN.js`:

```js
module.exports.chapter = {
  num: 4,
  title: 'Stone, Sea, and Bronze',
  epigraph: ['Quotation text without quote marks.', '— Attribution'],
  blocks: [
    ['p', 'Paragraph text with *italics*, **bold** and citations [57].'],
    ['h', 'Section Heading'],
    ['q', 'A reflection question.'],          // numbered automatically, restarts per chapter
    ['rule'],                                 // * * * separator
    ['center', '*The letters remain. The question is the sentence.*'],
  ],
};
module.exports.notes = [
  ['57', 'Author. *Title*. Date. Used for … To be confirmed against …', 'https://…'], // URL may be ''
];
```

`ch01.js` also exports `note` (A Note to the Reader). The builder picks up every `chNN.js` automatically.

## 8. Build

```bash
npm install                 # docx 9.5.1 and jszip 3.10.1 (pinned)
npm run build               # → drafts/Letters_Conflict_Origins_Chapters_1-N_Draft.docx
npm run blueprint           # → drafts/Letters_Conflict_Origins_Blueprint.docx
npm run proof               # → drafts/Letters_Conflict_Origins_Proof.docx/.pdf (print proof, house style of The Japanese Way)
npm run edition             # → drafts/Letters_Conflict_Origins_Edition.docx/.pdf (final, no proof marks)
node cover/build_cover.js 152 cream dusk   # cover wrap for the real page count
```

- Install the **EB Garamond** font (Google Fonts) on the machine, or Word/LibreOffice will substitute another face. Check `pdffonts` shows EBGaramond in the PDF before printing.
- To produce a PDF for checking: `soffice --headless --convert-to pdf <file>.docx` (LibreOffice), or open in Word and export.
- The builder sets 6 × 9 in pages, mirrored margins (inside 0.75 in, outside 0.6 in), chapters starting on right-hand pages, no header on chapter-opening pages, book title on left-hand headers, chapter number on right-hand headers, indented paragraphs with no space between them.
- **Always open or render the result and look at it** before calling a chapter done.

## 9. Workflow for each chapter

1. Read `research/chapter_plan.md` for that chapter, and the previous chapter’s closing paragraph (it promises what comes next).
2. Research with web search/fetch. Collect verbatim quotations only from pages you actually fetch.
3. Write `manuscript/origins/chNN.js` in the house format (~3,000–4,000 words).
4. Fact-check pass: every quotation, date, number and name against the fetched sources; soften or remove anything unsupported.
5. `npm run build`, render, inspect.
6. Update §1 of this file (status, next note number, next task) and `research/verification.md`.
7. Commit: `git add -A && git commit -m "Origins: Chapter N draft 1"` and push.

## 10. Waiting on the author

- Answers to `research/author_interview.md` → needed for the Introduction (“The Book I Started on Campus”), Ch 10 (schooling) and Ch 11 (campus and present). **Decision (31 Oct 2026): no Kooki-specific material in *Origins*; keep the big picture.** The Great Lakes thread runs through Buganda and Bunyoro.
- The original trilogy cover files and box-set mockup (made earlier in ChatGPT).
- Confirmation of trim size (6 × 9 in default) and overall length.
- Dedication and acknowledgments.

## 11. Things never to do

- Never use the placeholder covers on the series web page — they are **other authors’ books** (*The Last Word*, *Dream of Africa*, *Exode 2050*).
- Never present the Africa of the past as uniformly glorious, or uniformly backward.
- Never present the Manden Charter’s 44-article text, the “richest man in history” claim, or similar viral claims as settled fact without the evidence (see Ch 3 for how to handle them).
- Never invent the author’s personal experiences. Leave `[AUTHOR: …]` placeholders.
- AI disclosure: Amazon KDP requires disclosure of AI-generated text. The author intends to revise every chapter in his own voice; remind him of this before publication.
