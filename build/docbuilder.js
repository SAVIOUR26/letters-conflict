// Shared helpers for Letters Conflict working documents (A4, EB Garamond)
const d = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, LevelFormat, Footer, Header, PageNumber, PageBreak } = d;

const FONT = 'EB Garamond';
const INK = '1F1A17', ACCENT = '7A4A1E', MUTED = '6B625B';

function runs(text, base = {}) {
  // **bold**, *italic*
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const CW = 9026; // A4 content width with 1" margins
const border = { style: BorderStyle.SINGLE, size: 4, color: 'C9BFB5' };
const borders = { top: border, bottom: border, left: border, right: border };

function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (txt, w, head) => new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: 'EFE6DC', type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    children: String(txt).split('\n').map(line => new Paragraph({ spacing: { after: 40 }, children: runs(line, { size: 19, bold: head || undefined }) })),
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], true)) }),
      ...rows.map(r => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i], false)) }))],
  });
}

function build(blocks) {
  const kids = [];
  for (const b of blocks) {
    const [k, a, c, w] = b;
    if (k === 'title') kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1800, after: 200 }, children: [new TextRun({ text: a, size: 56, bold: true, color: INK })] }));
    else if (k === 'subtitle') kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: a, size: 30, italics: true, color: ACCENT })] }));
    else if (k === 'meta') kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: a, size: 22, color: MUTED })] }));
    else if (k === 'break') kids.push(new Paragraph({ children: [new PageBreak()] }));
    else if (k === 'h1') kids.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: !!c, children: [new TextRun(a)] }));
    else if (k === 'h2') kids.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(a)] }));
    else if (k === 'h3') kids.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(a)] }));
    else if (k === 'p') kids.push(new Paragraph({ spacing: { after: 140, line: 300 }, children: runs(a) }));
    else if (k === 'quote') kids.push(new Paragraph({ indent: { left: 560, right: 560 }, spacing: { before: 80, after: 160, line: 300 }, children: runs(a, { italics: true, color: '3B332D' }) }));
    else if (k === 'bullets') a.forEach(t => kids.push(new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 70, line: 290 }, children: runs(t) })));
    else if (k === 'numbers') a.forEach(t => kids.push(new Paragraph({ numbering: { reference: 'num' + (c || ''), level: 0 }, spacing: { after: 70, line: 290 }, children: runs(t) })));
    else if (k === 'table') { kids.push(table(a, c, w)); kids.push(new Paragraph({ spacing: { after: 120 }, children: [] })); }
  }
  return kids;
}

function makeDoc(blocks, headerText) {
  const numCfg = (ref) => ({ reference: ref, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 320 } } } }] });
  return new Document({
    creator: 'Najuna Saviour',
    styles: {
      default: { document: { run: { font: FONT, size: 23, color: INK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, font: FONT, color: INK }, paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 27, bold: true, font: FONT, color: ACCENT }, paragraph: { spacing: { before: 260, after: 120 }, outlineLevel: 1, keepNext: true } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: FONT }, paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2, keepNext: true } },
      ],
    },
    numbering: { config: [
      { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 280 } } } }] },
      ...['num', 'num2', 'num3', 'num4', 'num5', 'num6'].map(numCfg),
    ] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1300, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: headerText, size: 17, color: MUTED, smallCaps: true })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: MUTED })] })] }) },
      children: build(blocks),
    }],
  });
}

async function save(blocks, headerText, out) {
  const buf = await Packer.toBuffer(makeDoc(blocks, headerText));
  require('fs').writeFileSync(out, buf);
  console.log('wrote', out);
}
module.exports = { save, runs, FONT };
