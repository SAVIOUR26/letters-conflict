# Letters Conflict

A trilogy of literary-philosophical nonfiction by **Najuna Saviour**, published by **KandaNews Africa Co. Ltd**.

1. **Origins** — *The Anatomy of the Conflict* (in progress)
2. **Somewhere in Africa** — *The Anatomy of Our Contradictions* (planned)
3. **Africa Adjustment Bureau** — *The Architecture of a New Africa* (planned)

> People are the letters. Institutions are the grammar. Shared progress is the sentence.

## Repository layout

```
CLAUDE.md                      Project instructions and every locked decision (read first)
HANDOFF_PROMPT.md              Prompt for starting a Claude Code session on this repo
manuscript/origins/chNN.js     Chapter text, notes and Note to the Reader (the source of truth)
build/build_book.js            Builds the KDP-format Word manuscript from the chapter files
build/blueprint.js             Builds the Origins book blueprint
build/docbuilder.js            Shared formatting helpers
drafts/                        Latest generated Word/PDF drafts
research/chapter_plan.md       Research leads for Chapters 4–11 and what comes after
research/author_interview.md   Questions the author still needs to answer
research/verification.md       Facts to confirm before publication
reference/source-materials/    The original planning documents and ChatGPT conversation
reference/house-style/         The Japanese Way (the author’s published book) — the layout model
```

## Building the manuscript

Requires Node.js 18 or later.

```bash
npm install
npm run build        # all chapters → drafts/Letters_Conflict_Origins_Chapters_1-N_Draft.docx
npm run blueprint    # → drafts/Letters_Conflict_Origins_Blueprint.docx
```

Install the free **EB Garamond** font (fonts.google.com/specimen/EB+Garamond) so the Word file displays as designed. For a PDF, export from Word or run LibreOffice: `soffice --headless --convert-to pdf drafts/<file>.docx`.

## Putting this on GitHub

The folder is already a Git repository with a first commit. Create an empty **private** repository named `letters-conflict` on GitHub (no README), then:

```bash
git remote add origin https://github.com/SAVIOUR26/letters-conflict.git
git push -u origin main
```

Keep the repository **private** until publication.

© 2026 Najuna Saviour. All rights reserved.
