// House interior builder for Letters Conflict (KDP 6 x 9 in, mirrored margins, chapters on right-hand pages)
// Usage:
//   node build/build_book.js                       -> builds every manuscript/origins/chNN.js into drafts/
//   node build/build_book.js <out.docx> "<label>" <chapterModule> [...]
// Works on Windows, macOS and Linux (no shell zip tools needed).
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const { Document, Packer, Paragraph, TextRun, AlignmentType, Header, Footer, PageNumber, NumberFormat,
  LevelFormat, ExternalHyperlink, SectionType } = require('docx');
const { runs } = require(path.join(__dirname, 'docbuilder'));

const FONT = 'EB Garamond', INK = '1A1A1A', MUTED = '555555';
const BOOK = 'LETTERS CONFLICT: ORIGINS';
// left = inside (gutter side) once mirrorMargins is set; right = outside
const page = { size: { width: 8640, height: 12960 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 880, header: 600, footer: 580 } };
const LINE = 300; // ~1.25 line spacing

let afterHeading = true;
const body = (t) => {
  const p = new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 0, line: LINE }, indent: afterHeading ? undefined : { firstLine: 360 }, children: runs(t) });
  afterHeading = false; return p;
};
const center = (t, size, o = {}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: o.after ?? 120, before: o.before ?? 0 }, children: [new TextRun({ text: t, size, bold: o.bold, italics: o.italics, color: o.color || INK, characterSpacing: o.cs })] });
const hdr = (t) => new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, size: 16, color: MUTED, characterSpacing: 20 })] })] });
const emptyHdr = () => new Header({ children: [new Paragraph({ children: [] })] });
const emptyFtr = () => new Footer({ children: [new Paragraph({ children: [] })] });
const pnFooter = () => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18 })] })] });

function chapterBlocks(ch) {
  afterHeading = true;
  const out = [
    new Paragraph({ spacing: { before: 900, after: 120 }, children: [new TextRun({ text: `Chapter ${ch.num}`, size: 40, bold: true })] }),
    new Paragraph({ spacing: { after: 420 }, children: [new TextRun({ text: ch.title, size: 30 })] }),
    new Paragraph({ indent: { left: 400, right: 400 }, spacing: { after: 80, line: 276 }, children: [new TextRun({ text: `“${ch.epigraph[0]}”`, italics: true, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.RIGHT, indent: { right: 400 }, spacing: { after: 480 }, children: [new TextRun({ text: ch.epigraph[1], size: 20 })] }),
  ];
  for (const [k, t] of ch.blocks) {
    if (k === 'p') out.push(body(t));
    else if (k === 'h') { out.push(new Paragraph({ keepNext: true, spacing: { before: 320, after: 140 }, children: [new TextRun({ text: t, bold: true, size: 23 })] })); afterHeading = true; }
    else if (k === 'q') out.push(new Paragraph({ numbering: { reference: 'q', level: 0, instance: ch.num }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 100, line: LINE }, children: runs(t) }));
    else if (k === 'rule') { out.push(center('*      *      *', 20, { before: 220, after: 220, color: MUTED })); afterHeading = true; }
    else if (k === 'center') out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 260 }, children: runs(t, { size: 23 }) }));
  }
  return out;
}

function noteBlocks(chapters) {
  const out = [
    new Paragraph({ spacing: { before: 900, after: 200 }, children: [new TextRun({ text: 'Research Notes and Sources', size: 32, bold: true })] }),
    new Paragraph({ spacing: { after: 200, line: 252 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: 'Notes identify the material used for factual statements and say what each source supports. Web sources were checked between 26 and 27 October 2026. In the finished book, notes are numbered continuously through all chapters.', size: 18, italics: true })] }),
  ];
  for (const ch of chapters) {
    out.push(new Paragraph({ keepNext: true, spacing: { before: 200, after: 120 }, children: [new TextRun({ text: `Chapter ${ch.chapter.num} · ${ch.chapter.title}`, size: 20, bold: true })] }));
    for (const [n, t, url] of ch.notes) {
      out.push(new Paragraph({ keepNext: !!url, keepLines: true, spacing: { after: url ? 30 : 150, line: 252 }, children: [new TextRun({ text: `[${n}] `, size: 18, bold: true }), ...runs(t, { size: 18 })] }));
      if (url) out.push(new Paragraph({ spacing: { after: 150 }, children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text: url, size: 16, color: '5A4632' })] })] }));
    }
  }
  return out;
}

function build(outPath, label, mods) {
  const chapters = mods.map(m => require(path.resolve(m)));
  const listing = chapters.map(c => center(`Chapter ${c.chapter.num} · ${c.chapter.title}`, 22, { after: 60 }));
  const cover = [
    center('WORKING DRAFT · FOR AUTHOR REVIEW', 16, { before: 1400, after: 900, color: MUTED, cs: 30 }),
    center('LETTERS CONFLICT', 26, { after: 160, cs: 60 }),
    center('ORIGINS', 56, { bold: true, after: 120, cs: 40 }),
    center('The Anatomy of the Conflict', 26, { italics: true, after: 900 }),
    ...(chapters[0].note ? [center('A Note to the Reader', 22, { after: 60 })] : []),
    ...listing,
    center('Research Notes and Sources', 22, { after: 1100 }),
    center('NAJUNA SAVIOUR', 24, { after: 80, cs: 60 }),
    center(label, 18, { color: MUTED }),
  ];
  const sections = [{ properties: { page }, headers: { default: emptyHdr(), even: emptyHdr() }, footers: { default: emptyFtr(), even: emptyFtr() }, children: cover }];
  const noteMod = chapters.find(c => c.note);
  if (noteMod) {
    afterHeading = true;
    sections.push({ properties: { type: SectionType.ODD_PAGE, page: { ...page, pageNumbers: { start: 7, formatType: NumberFormat.LOWER_ROMAN } } },
      headers: { default: emptyHdr(), even: emptyHdr() }, footers: { default: pnFooter(), even: pnFooter() },
      children: [new Paragraph({ spacing: { before: 900, after: 260 }, children: [new TextRun({ text: 'A Note to the Reader', size: 32, bold: true })] }), ...noteMod.note.map(([, t]) => body(t))] });
  }
  chapters.forEach((c, i) => sections.push({
    properties: { type: SectionType.ODD_PAGE, titlePage: true, page: { ...page, ...(i === 0 ? { pageNumbers: { start: c.startPage || 1, formatType: NumberFormat.DECIMAL } } : {}) } },
    headers: { first: emptyHdr(), default: hdr(`Chapter ${c.chapter.num}`), even: hdr(BOOK) }, footers: { first: pnFooter(), default: pnFooter(), even: pnFooter() },
    children: chapterBlocks(c.chapter) }));
  sections.push({ properties: { type: SectionType.ODD_PAGE, titlePage: true, page },
    headers: { first: emptyHdr(), default: hdr('Research Notes and Sources'), even: hdr(BOOK) }, footers: { first: pnFooter(), default: pnFooter(), even: pnFooter() },
    children: noteBlocks(chapters) });

  const doc = new Document({
    creator: 'Najuna Saviour', title: `Letters Conflict: Origins — ${label}`, evenAndOddHeaderAndFooters: true,
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    numbering: { config: [{ reference: 'q', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] }] },
    sections,
  });
  return Packer.toBuffer(doc).then(async buf => {
    // add mirrored margins (inside/outside pages) to word/settings.xml — docx-js has no option for this
    const zip = await JSZip.loadAsync(buf);
    let s = await zip.file('word/settings.xml').async('string');
    if (!s.includes('w:mirrorMargins')) s = s.includes('<w:evenAndOddHeaders/>')
      ? s.replace('<w:evenAndOddHeaders/>', '<w:mirrorMargins/><w:evenAndOddHeaders/>')
      : s.replace('<w:displayBackgroundShape/>', '<w:displayBackgroundShape/><w:mirrorMargins/>');
    zip.file('word/settings.xml', s);
    fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
    fs.writeFileSync(outPath, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    console.log('wrote', outPath);
  });
}

let [out, label, ...mods] = process.argv.slice(2);
if (!out) {
  const dir = path.join(__dirname, '..', 'manuscript', 'origins');
  mods = fs.readdirSync(dir).filter(f => /^ch\d+\.js$/.test(f)).sort().map(f => path.join(dir, f));
  const nums = mods.map(m => parseInt(path.basename(m).slice(2), 10));
  const range = nums.length > 1 ? `${nums[0]}-${nums[nums.length - 1]}` : `${nums[0]}`;
  const today = new Date().toISOString().slice(0, 10);
  out = path.join(__dirname, '..', 'drafts', `Letters_Conflict_Origins_Chapters_${range}_Draft.docx`);
  label = `Chapters ${range.replace('-', '–')} · Draft · ${today}`;
}
build(out, label, mods);
