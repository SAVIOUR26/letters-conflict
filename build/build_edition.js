// Letters Conflict: Origins — print edition builder, in the house style of The Japanese Way (First Edition, 2026)
//   node build/build_edition.js            -> advance reading proof  (drafts/Letters_Conflict_Origins_Proof.docx/.pdf)
//   node build/build_edition.js --final    -> first edition          (drafts/Letters_Conflict_Origins_Edition.docx/.pdf)
// Two passes: the book is rendered once with LibreOffice to find where each section starts,
// then rebuilt with real page numbers in the Contents. Needs EB Garamond installed and `soffice` on PATH.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const JSZip = require('jszip');
const { Document, Packer, Paragraph, TextRun, AlignmentType, Header, Footer, PageNumber, NumberFormat,
  LevelFormat, ExternalHyperlink, SectionType, TabStopType, ShadingType, BorderStyle } = require('docx');
const { runs } = require(path.join(__dirname, 'docbuilder'));

const FINAL = process.argv.includes('--final');
const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'manuscript', 'origins');
const FM = require(path.join(DIR, 'frontmatter.js'));
const FONT = 'EB Garamond', INK = '1A1A1A', MUTED = '5A524C';
const BOOK = 'LETTERS CONFLICT: ORIGINS';

// 6 x 9 in; margins measured from The Japanese Way: inside ~0.85 in, outside ~0.7 in.
const page = { size: { width: 8640, height: 12960 }, margin: { top: 1224, bottom: 1080, left: 1224, right: 1008, header: 560, footer: 520, gutter: 0 } };
const TEXT_W = 8640 - 1224 - 1008; // twips
const SIZE = 24, LINE = 276;         // 12 pt, ~1.15 multiple (The Japanese Way)
const AFTER = 70;                    // small space between paragraphs, no first-line indent

const chapters = fs.readdirSync(DIR).filter(f => /^ch\d+\.js$/.test(f)).sort().map(f => require(path.join(DIR, f)));
const NOTE = chapters[0].note;

// ---------- paragraph helpers ----------
const isAuthor = (t) => /^\[AUTHOR:/.test(t);
const authorBox = (t) => new Paragraph({
  spacing: { before: 120, after: 180, line: 264 }, indent: { left: 200, right: 200 },
  shading: { type: ShadingType.CLEAR, fill: 'ECE7E0', color: 'auto' },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: '9A3B1F', space: 6 } },
  children: [new TextRun({ text: 'Author’s passage to come.  ', bold: true, size: 19, color: '9A3B1F' }), ...runs(t.replace(/^\[AUTHOR:\s*/, '').replace(/\]$/, ''), { italics: true, size: 19, color: MUTED })],
});
const body = (t) => isAuthor(t) ? authorBox(t)
  : new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: AFTER, line: LINE }, children: runs(t, { size: SIZE }) });
const center = (t, o = {}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: o.before ?? 0, after: o.after ?? 100, line: o.line ?? LINE }, children: runs(t, { size: o.size ?? SIZE, bold: o.bold, italics: o.italics, color: o.color, characterSpacing: o.cs }) });
const heading = (t) => new Paragraph({ keepNext: true, keepLines: true, spacing: { before: 300, after: 110 }, children: [new TextRun({ text: t, bold: true, size: 26 })] });
const pageTitle = (t) => new Paragraph({ spacing: { before: 0, after: 320 }, children: [new TextRun({ text: t, bold: true, size: 36 })] });
const gap = (n = 200) => new Paragraph({ spacing: { after: n }, children: [] });
function blocks(list) {
  const out = [];
  for (const [k, t] of list) {
    if (k === 'p') out.push(body(t));
    else if (k === 'h') out.push(heading(t));
    else if (k === 'gap') out.push(gap(120));
    else if (k === 'q') out.push(new Paragraph({ numbering: { reference: 'q', level: 0, instance: blocks.qi }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 90, line: LINE }, children: runs(t, { size: SIZE }) }));
    else if (k === 'rule') out.push(center('*      *      *', { before: 240, after: 240, color: MUTED, size: 22 }));
    else if (k === 'center') out.push(center(t, { before: 220 }));
    else if (k === 'pl') out.push(new Paragraph({ spacing: { after: AFTER, line: LINE }, children: runs(t, { size: SIZE }) }));
  }
  return out;
}

// ---------- headers / footers ----------
const hdr = (t) => new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t.toUpperCase(), size: 16, color: MUTED, characterSpacing: 24 })] })] });
const emptyHdr = () => new Header({ children: [new Paragraph({ children: [] })] });
const emptyFtr = () => new Footer({ children: [new Paragraph({ children: [] })] });
const pnFooter = () => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 19 })] })] });
const plain = (children, extra = {}) => ({ properties: { type: SectionType.NEXT_PAGE, page: { ...page, ...extra } }, headers: { default: emptyHdr(), even: emptyHdr() }, footers: { default: pnFooter(), even: pnFooter() }, children });
const running = (right, children, extra = {}) => ({ properties: { type: SectionType.ODD_PAGE, titlePage: true, page: { ...page, ...extra } }, headers: { first: emptyHdr(), default: hdr(right), even: hdr(BOOK) }, footers: { first: pnFooter(), default: pnFooter(), even: pnFooter() }, children });

// ---------- chapter ----------
function chapterBlocks(ch) {
  blocks.qi = ch.num;
  return [
    new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: `Chapter ${ch.num}`, size: 40, bold: true })] }),
    new Paragraph({ spacing: { after: 380 }, children: [new TextRun({ text: ch.title, size: 30 })] }),
    new Paragraph({ indent: { left: 400, right: 400 }, spacing: { after: 80, line: 264 }, children: runs(`“${ch.epigraph[0]}”`, { italics: true, size: 22 }) }),
    new Paragraph({ alignment: AlignmentType.RIGHT, indent: { right: 400 }, spacing: { after: 420 }, children: runs(ch.epigraph[1], { size: 20 }) }),
    ...blocks(ch.blocks),
  ];
}

// ---------- notes ----------
function noteBlocks() {
  const out = [pageTitle('Research Notes and Sources'),
    new Paragraph({ spacing: { after: 200, line: 252 }, alignment: AlignmentType.JUSTIFIED, children: runs('Notes are numbered continuously through the book. Each identifies the source used for factual statements and what it supports. Where a note says “to be confirmed”, the point rests on a secondary or encyclopedic lead and is being checked against the scholarly source named. Web sources were consulted between October and November 2026.', { size: 18, italics: true }) })];
  for (const ch of chapters) {
    out.push(new Paragraph({ keepNext: true, spacing: { before: 220, after: 120 }, children: [new TextRun({ text: `Chapter ${ch.chapter.num} · ${ch.chapter.title}`, size: 20, bold: true })] }));
    for (const [n, t, url] of ch.notes) {
      out.push(new Paragraph({ keepNext: !!url, keepLines: true, alignment: AlignmentType.LEFT, spacing: { after: url ? 20 : 130, line: 240 }, children: [new TextRun({ text: `[${n}] `, size: 18, bold: true }), ...runs(t, { size: 18 })] }));
      if (url) out.push(new Paragraph({ spacing: { after: 130 }, children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text: url, size: 15, color: '5A4632' })] })] }));
    }
  }
  return out;
}

// ---------- contents ----------
function contents(pages) {
  const line = (label, key, o = {}) => new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' }], spacing: { before: o.before ?? 0, after: o.after ?? 70, line: 252 },
    children: [...runs(label, { size: 21, bold: o.bold }), ...(key ? [new TextRun({ text: `\t${pages[key] ?? '00'}`, size: 21 })] : [])] });
  const out = [pageTitle('Contents'), line('Introduction', 'intro', { after: 160 })];
  for (const ch of chapters) {
    const p = FM.parts[ch.chapter.num];
    if (p) out.push(line(`${p[0]} · ${p[1]}`, null, { bold: true, before: 120, after: 90 }));
    out.push(line(`${ch.chapter.num}  ${ch.chapter.title}`, 'ch' + ch.chapter.num));
  }
  out.push(line('Research Notes and Sources', 'notes', { before: 160 }), line('Chapter Quotations', 'quotes'), line('About the Author', 'about'));
  return out;
}

// ---------- document ----------
// Every section starts on a new page; blank pages are inserted explicitly (as in The Japanese Way) so that
// the Introduction, Part pages, chapters, notes and About the Author open on right-hand pages.
const ROMAN = { pageNumbers: { formatType: NumberFormat.LOWER_ROMAN } }, ARABIC = { pageNumbers: { formatType: NumberFormat.DECIMAL } };
const sec = (children, { right = null, first = true, num = ARABIC, start = null, foot = true } = {}) => ({
  properties: { type: SectionType.NEXT_PAGE, titlePage: first, page: { ...page, pageNumbers: { ...num.pageNumbers, ...(start ? { start } : {}) } } },
  headers: { first: emptyHdr(), default: right ? hdr(right) : emptyHdr(), even: right ? hdr(BOOK) : emptyHdr() },
  footers: foot ? { first: pnFooter(), default: pnFooter(), even: pnFooter() } : { first: emptyFtr(), default: emptyFtr(), even: emptyFtr() },
  children });
const blankSec = (num) => sec([new Paragraph({ children: [] })], { num, foot: false });

function sectionList(pages) {
  const T = FM.title;
  const L = []; // { sig, odd, make(num) }
  const add = (sig, odd, make) => L.push({ sig, odd, make });
  add(T.series, false, () => sec([
    gap(1500), center(T.series, { size: 22, cs: 60, color: '9A3B1F', after: 260 }),
    center(T.title, { size: 64, cs: 30, after: 200 }), center(T.subtitle, { size: 28, italics: true, after: 1600 }),
    center(T.author, { size: 24, cs: 50, after: 900 }), center(FINAL ? T.editionFinal : T.editionProof, { size: 19, color: MUTED }),
    ...(FINAL ? [] : [center('Not for sale', { size: 17, color: MUTED, before: 60 })]),
  ], { num: ROMAN, start: 1, foot: false }));
  add('Letters Conflict · Book One', false, () => sec(FM.copyright(FINAL).map(([k, t]) => k === 'gap' ? gap(140) : new Paragraph({ spacing: { after: 0, line: 252 }, children: runs(t, { size: 18 }) })), { num: ROMAN }));
  add('Dedication', false, () => sec([pageTitle('Dedication'), gap(900), ...FM.dedication.map(t => center(t || ' ', { italics: true, size: 23, after: 40 }))], { num: ROMAN }));
  add('Acknowledgments', false, () => sec([pageTitle('Acknowledgments'), ...blocks(FM.acknowledgments)], { num: ROMAN }));
  add('Contents', false, () => sec(contents(pages), { num: ROMAN }));
  add('A Note to the Reader', false, () => sec([pageTitle('A Note to the Reader'), ...blocks(NOTE)], { num: ROMAN }));
  add('Introduction', true, () => sec([pageTitle(FM.introduction.title), ...blocks(FM.introduction.blocks)], { right: 'Introduction', start: 1 }));
  for (const ch of chapters) {
    const p = FM.parts[ch.chapter.num];
    if (p) add(p[0], true, () => sec([gap(300), new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: p[0], size: 36, bold: true })] }), new Paragraph({ children: [new TextRun({ text: p[1], size: 28 })] })]));
    add(`Chapter ${ch.chapter.num}`, true, () => sec(chapterBlocks(ch.chapter), { right: `Chapter ${ch.chapter.num}` }));
  }
  add('Research Notes and Sources', true, () => sec(noteBlocks(), { right: 'Research Notes and Sources' }));
  add('Chapter Quotations', false, () => sec([pageTitle('Chapter Quotations'), ...FM.chapterQuotations.map(([n, t]) => new Paragraph({ spacing: { after: 110, line: 252 }, children: [new TextRun({ text: `Chapter ${n}: `, bold: true, size: 20 }), ...runs(t, { size: 20 })] }))], { right: 'Chapter Quotations' }));
  add('About the Author', true, () => sec([pageTitle('About the Author'), ...blocks(FM.aboutAuthor), gap(500), ...blocks(FM.alsoBy)], { right: 'About the Author' }));
  return L;
}
function sectionsFor(pages, blanks = new Set()) {
  const out = [];
  sectionList(pages).forEach((s, i) => { if (blanks.has(i)) out.push(blankSec(i <= 6 ? ROMAN : ARABIC)); out.push(s.make()); });
  if (blanks.has('end')) out.push(blankSec(ARABIC));
  return out;
}

async function write(docxPath, pages, blanks) {
  const doc = new Document({
    creator: 'Najuna Saviour', title: 'Letters Conflict: Origins — The Anatomy of the Conflict', evenAndOddHeaderAndFooters: true,
    styles: { default: { document: { run: { font: FONT, size: SIZE, color: INK } } } },
    numbering: { config: [{ reference: 'q', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] }] },
    sections: sectionsFor(pages, blanks),
  });
  const zip = await JSZip.loadAsync(await Packer.toBuffer(doc));
  let s = await zip.file('word/settings.xml').async('string');
  if (!s.includes('w:mirrorMargins')) s = s.includes('<w:evenAndOddHeaders/>') ? s.replace('<w:evenAndOddHeaders/>', '<w:mirrorMargins/><w:evenAndOddHeaders/>') : s.replace('<w:displayBackgroundShape/>', '<w:displayBackgroundShape/><w:mirrorMargins/>');
  zip.file('word/settings.xml', s);
  fs.writeFileSync(docxPath, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

function toPdf(docxPath) {
  execFileSync('soffice', ['--headless', '--convert-to', 'pdf:writer_pdf_Export:{"ExportBlankPages":{"type":"boolean","value":"true"},"EmbedStandardFonts":{"type":"boolean","value":"true"}}', '--outdir', path.dirname(docxPath), docxPath], { stdio: 'ignore', timeout: 300000 });
  return docxPath.replace(/\.docx$/, '.pdf');
}

// physical start page of every section (located in order by its first line)
function sectionStarts(pdf) {
  const n = parseInt(execFileSync('pdfinfo', [pdf]).toString().match(/Pages:\s+(\d+)/)[1], 10);
  const first = [];
  for (let i = 1; i <= n; i++) first.push((execFileSync('pdftotext', ['-f', String(i), '-l', String(i), pdf, '-']).toString().split('\n').map(x => x.trim()).filter(Boolean)[0]) || '');
  const L = sectionList({}); const starts = []; let from = 0;
  for (const s of L) { const k = first.findIndex((t, j) => j >= from && t === s.sig); if (k < 0) throw new Error('section not found: ' + s.sig); starts.push(k + 1); from = k + 1; }
  return { starts, total: n };
}
function plan(starts, total) {
  const L = sectionList({}); const len = starts.map((p, i) => (i + 1 < starts.length ? starts[i + 1] : total + 1) - p);
  const blanks = new Set(); const phys = []; let p = 1;
  L.forEach((s, i) => { if (s.odd && p % 2 === 0) { blanks.add(i); p++; } phys.push(p); p += len[i]; });
  const intro = phys[L.findIndex(s => s.sig === 'Introduction')];
  const pages = { intro: 1 };
  L.forEach((s, i) => { const n = phys[i] - intro + 1; const m = s.sig.match(/^Chapter (\d+)$/);
    if (m) pages['ch' + m[1]] = n; else if (s.sig === 'Research Notes and Sources') pages.notes = n; else if (s.sig === 'Chapter Quotations') pages.quotes = n; else if (s.sig === 'About the Author') pages.about = n; });
  if ((p - 1) % 2 === 1) { blanks.add('end'); p++; }
  return { blanks, pages, totalPages: p - 1 };
}

(async () => {
  const name = FINAL ? 'Letters_Conflict_Origins_Edition' : 'Letters_Conflict_Origins_Proof';
  const docx = path.join(ROOT, 'drafts', name + '.docx');
  await write(docx, {}, new Set());
  let a = sectionStarts(toPdf(docx));            // pass 1: natural layout, no blanks
  let P = plan(a.starts, a.total);
  for (let pass = 2; pass <= 4; pass++) {         // pass 2+: with blanks and page numbers, until stable
    await write(docx, P.pages, P.blanks);
    const b = sectionStarts(toPdf(docx));
    const L = sectionList({});
    const ok = L.every((s, i) => !s.odd || b.starts[i] % 2 === 1);
    // derive natural section lengths from this pass (blank pages removed) and re-plan
    const nat = []; let shift = 0; b.starts.forEach((st, i) => { if (P.blanks.has(i)) shift++; nat.push(st - shift); });
    const Q = plan(nat, b.total - P.blanks.size);
    if (ok && JSON.stringify(Q.pages) === JSON.stringify(P.pages)) { console.log('pages:', b.total, 'contents:', JSON.stringify(P.pages)); break; }
    P = Q; console.log('re-planning (pass ' + pass + ')');
  }
  console.log('wrote', docx, 'and .pdf');
})();
