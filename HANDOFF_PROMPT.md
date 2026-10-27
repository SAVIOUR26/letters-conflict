# Prompt for Claude Code

Paste the text below as your first message in Claude Code, opened in this repository.

---

You are continuing work on my book trilogy **Letters Conflict**. I am the author, Najuna Saviour. Everything you need is in this repository.

Before doing anything else:
1. Read `CLAUDE.md` completely. It contains every decision we have locked, the house chapter format, the voice and evidence rules, the note-numbering system and the build instructions.
2. Read `research/chapter_plan.md`.
3. Read the three finished chapters in `manuscript/origins/` (`ch01.js`, `ch02.js`, `ch03.js`) so you match their voice, structure and note style exactly.
4. Skim `reference/house-style/The_Japanese_Way_First_Edition.pdf` — my published book, which sets the layout and the “when research corrects the story” approach.
5. Run `npm install` and `npm run build`, and confirm the Chapters 1–3 draft builds.

Then write the remaining chapters of **Origins**, in order, from **Chapter 4 (Stone, Sea, and Bronze)** to **Chapter 11 (The Sentence We Inherited)**. For each chapter:
- Research it properly with web search and fetch. Quote only words you have actually read in a fetched source; otherwise paraphrase. Use Wikipedia only as a lead, and name the scholarly source behind it.
- Write it as `manuscript/origins/chNN.js` in the house format, about 3,000–4,000 words, with numbered notes continuing from note 57.
- Do a fact-check pass against your sources before moving on.
- Rebuild, render to PDF if LibreOffice is available, and look at the pages.
- Update the status table in `CLAUDE.md` and `research/verification.md`.
- Commit and push with a clear message, e.g. `Origins: Chapter 4 draft 1`.

Where a chapter needs my own knowledge or experience (Kooki and the Great Lakes kingdoms in Chapter 5, my school experience in Chapter 10, my campus story in Chapter 11), write everything the sources support and leave clearly marked `[AUTHOR: …]` placeholders. Never invent my experiences.

Use a task list so I can see progress. After each chapter, give me a short summary: the opening scene, the “When the Evidence Corrects the Story” section, and anything I need to decide. When all eleven chapters are done, build the full Chapters 1–11 draft, then we will move to the Introduction, front matter and covers.
