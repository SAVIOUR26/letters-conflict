// Letters Conflict: Origins — cover generator (original artwork, seeded and reproducible)
// Concept (blueprint §7): "Fragments before understanding" — the letters A F R I C A carved into a
// coursed dry-stone wall, broken across the joints, the last one sinking into laterite earth.
// Usage: node cover/build_cover.js [pageCount=270] [paper=cream|white]
//   -> cover/output/origins_cover_wrap.html / .pdf / .png (full KDP wrap with bleed)
//   -> cover/output/origins_front_ebook.jpg (front only, 1600 x 2400 px)
//   -> cover/output/origins_front_preview.png
const fs = require('fs');
const path = require('path');

const PAGES = parseInt(process.argv[2] || '270', 10);
const PAPER = process.argv[3] || 'cream';
const SPINE = +(PAGES * (PAPER === 'white' ? 0.002252 : 0.0025)).toFixed(4); // inches (KDP formula)
const BLEED = 0.125, TRIM_W = 6, TRIM_H = 9;
const W = BLEED + TRIM_W + SPINE + TRIM_W + BLEED, H = TRIM_H + 2 * BLEED;
const U = 100; // SVG units per inch
const BACK_X = 0, SPINE_X = BLEED + TRIM_W, FRONT_X = SPINE_X + SPINE; // inches

const C = {
  bone: '#ECE4D4', ink: '#1F1B18', laterite: '#9A3B1F', deep: '#5E2213', ochre: '#B07A2E',
  gold: '#7B5420', joint: '#2E2925', stones: ['#8F8A82', '#9C968D', '#A8A197', '#B3ACA2', '#857F77', '#A09689', '#958B7E'],
};

// ---------- seeded random ----------
let seed = 1871; // the year Mauch reached Great Zimbabwe
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const rr = (a, b) => a + (b - a) * rnd();
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

// ---------- stone wall (front panel) ----------
const wallX0 = FRONT_X * U - 6, wallX1 = W * U + 6;
const wallTop = 3.55 * U, wallBottom = 7.55 * U;
const GAP = 4.5;
const stones = []; // {pts, x, y, w, h, fill}
function stonePath(x, y, w, h) {
  const j = () => rr(-2.2, 2.2), r = rr(4, 9);
  const p = [
    [x + r + j(), y + j()], [x + w * 0.5 + j(), y + j() * 0.6], [x + w - r + j(), y + j()],
    [x + w + j(), y + r + j()], [x + w + j() * 0.6, y + h * 0.5 + j()], [x + w + j(), y + h - r + j()],
    [x + w - r + j(), y + h + j()], [x + w * 0.5 + j(), y + h + j() * 0.6], [x + r + j(), y + h + j()],
    [x + j(), y + h - r + j()], [x + j() * 0.6, y + h * 0.5 + j()], [x + j(), y + r + j()],
  ];
  return 'M' + p.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L') + ' Z';
}
let y = wallBottom, course = 0;
const courses = [];
while (y > wallTop) {
  const h = rr(40, 58);
  const top = y - h;
  courses.push({ top, h });
  let x = wallX0 - rr(0, 60);
  while (x < wallX1) {
    const w = rr(62, 150);
    // ruined top: thin out the two highest courses
    const isTop = top - wallTop < 70;
    const skip = isTop && top - wallTop < 30 && rnd() < 0.5;
    if (!skip) {
      const hh = isTop ? h * rr(0.75, 1) : h;
      stones.push({ x: x + GAP / 2, y: top + (h - hh) + GAP / 2, w: w - GAP, h: hh - GAP, fill: pick(C.stones), d: null, dx: 0, dy: 0, rot: 0 });
    }
    x += w;
  }
  y = top; course++;
}
stones.forEach(s => { s.d = stonePath(s.x, s.y, s.w, s.h); });

// letters carved across the wall; some fragments displaced (broken), last letter sinking
const WORD = ['A', 'F', 'R', 'I', 'C', 'A'];
const letterY = wallBottom - 1.45 * U; // baseline
const fontSize = 1.5 * U;
const lx0 = FRONT_X * U + 0.5 * U, lstep = 0.83 * U;
const broken = new Set([1, 4]); // F and C
const ADV = { A: 0.70, F: 0.56, R: 0.66, I: 0.34, C: 0.66 }; // approx. advance widths (em), EB Garamond SemiBold
const LX = []; { let x = 0; WORD.forEach(ch => { LX.push(x); x += ADV[ch] * fontSize + 0.05 * U; }); const span = x - 0.05 * U; const start = FRONT_X * U + (TRIM_W * U + BLEED * U - span) / 2; for (let i = 0; i < LX.length; i++) LX[i] += start; }
stones.forEach(s => { if (rnd() < 0.5) { s.dx = rr(-5, 5); s.dy = rr(-3.5, 3.5); s.rot = rr(-2.2, 2.2); } });

// ---------- earth (laterite) ----------
function earthPath(x0, x1, baseY, amp, rise) {
  let d = `M${x0},${H * U + 10} L${x0},${baseY}`;
  for (let x = x0; x <= x1; x += 12) {
    const t = (x - x0) / (x1 - x0);
    const yy = baseY - amp * Math.sin(x / 47) * 0.5 - amp * Math.sin(x / 13.7) * 0.25 - rise(t) + rr(-1.5, 1.5);
    d += ` L${x.toFixed(1)},${yy.toFixed(1)}`;
  }
  return d + ` L${x1},${H * U + 10} Z`;
}
const earthBase = 7.42 * U;
const frontStartT = FRONT_X / W;
// the earth rises over the right of the front panel to bury the last A
const rise = (t) => (t > frontStartT ? Math.max(0, (t - (frontStartT + (1 - frontStartT) * 0.56)) / ((1 - frontStartT) * 0.44)) ** 1.3 * 1.95 * U : 0);
const earthD = earthPath(-10, W * U + 10, earthBase, 9, rise);

// scattered fragments on the earth
const frags = [
  { x: FRONT_X * U + 0.42 * U, y: 7.72 * U, w: 86, h: 46, rot: -9, ch: 'S', cx: 10, cy: 62 },
  { x: FRONT_X * U + 4.95 * U, y: 7.98 * U, w: 62, h: 36, rot: 12, ch: 'E', cx: -14, cy: 48 },
];

// ---------- SVG ----------
const lettersSVG = [];
WORD.forEach((ch, i) => {
  const lx = LX[i];
  stones.forEach((s, k) => {
    if (s.x > lx + 1.2 * U || s.x + s.w < lx - 0.2 * U || s.y > letterY + 0.2 * U || s.y + s.h < letterY - 1.3 * U) return;
    const off = broken.has(i) ? `translate(${s.dx.toFixed(2)},${s.dy.toFixed(2)}) rotate(${s.rot.toFixed(2)},${(s.x + s.w / 2).toFixed(1)},${(s.y + s.h / 2).toFixed(1)})` : '';
    lettersSVG.push(`<g clip-path="url(#st${k})"><g transform="${off}">
      <text x="${(lx + 1.6).toFixed(1)}" y="${(letterY + 1.8).toFixed(1)}" class="carve hi">${ch}</text>
      <text x="${lx.toFixed(1)}" y="${letterY.toFixed(1)}" class="carve lo">${ch}</text></g></g>`);
  });
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(W * U).toFixed(2)} ${(H * U).toFixed(2)}" width="${W}in" height="${H}in" preserveAspectRatio="none">
<defs>
  <filter id="paper" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.30  0 0 0 0.10 0"/>
    <feComposite in2="SourceGraphic" operator="in"/>
    <feBlend in="SourceGraphic" mode="multiply"/>
  </filter>
  <filter id="grain" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="3" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 0.62" result="dark"/>
    <feComposite in="dark" in2="SourceGraphic" operator="in" result="speck"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="speck"/></feMerge>
  </filter>
  <filter id="soil" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="11" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.04  0 0 0 0 0.02  0 0 0 -1.1 0.75" result="d"/>
    <feComposite in="d" in2="SourceGraphic" operator="in" result="s"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/></feMerge>
  </filter>
  <linearGradient id="earthG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${C.laterite}"/><stop offset="1" stop-color="${C.deep}"/>
  </linearGradient>
  <linearGradient id="stoneLight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.18"/>
  </linearGradient>
  <linearGradient id="wallShade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0.18"/><stop offset="0.35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.12"/>
  </linearGradient>
  ${stones.map((s, k) => `<clipPath id="st${k}"><path d="${s.d}"/></clipPath>`).join('')}
  <clipPath id="frontPanel"><rect x="${(FRONT_X * U).toFixed(2)}" y="0" width="${((W - FRONT_X) * U + 20).toFixed(2)}" height="${H * U}"/></clipPath>
  <style>
    .carve { font-family: 'EBG'; font-weight: 600; font-size: ${fontSize}px; }
    .hi { fill: #E4DED3; fill-opacity: 0.55; }
    .lo { fill: #2A2521; fill-opacity: 0.82; }
    .frag { font-family: 'EBG'; font-weight: 600; font-size: 84px; fill: #2A2521; fill-opacity: 0.8; }
  </style>
</defs>
<rect width="100%" height="100%" fill="${C.bone}" filter="url(#paper)"/>
<g clip-path="url(#frontPanel)">
  <g filter="url(#grain)">
    ${(() => { const minTop = Math.min(...stones.map(s => s.y)); return ''; })()}
    ${(() => { const body = courses.filter(c => c.top - wallTop >= 30); const t = Math.min(...body.map(c => c.top)); return `<rect x="${wallX0}" y="${(t + 3).toFixed(1)}" width="${wallX1 - wallX0}" height="${(wallBottom - t + 40).toFixed(1)}" fill="${C.joint}"/>`; })()}
    ${stones.map(s => `<path d="${s.d}" fill="#1A1714" opacity="0.55" transform="translate(2.5,3)"/>`).join('')}
    ${stones.map(s => `<path d="${s.d}" fill="${s.fill}"/><path d="${s.d}" fill="url(#stoneLight)"/>`).join('')}
    ${lettersSVG.join('')}
  </g>
</g>
<path d="${earthD}" fill="url(#earthG)" filter="url(#soil)"/>
<path d="${earthD}" fill="none" stroke="#3E160B" stroke-opacity="0.35" stroke-width="2"/>
${frags.map((f, i) => `<g transform="rotate(${f.rot},${f.x + f.w / 2},${f.y + f.h / 2})" filter="url(#grain)">
  <clipPath id="fr${i}"><path d="${stonePath(f.x, f.y, f.w, f.h)}"/></clipPath>
  <path d="${stonePath(f.x, f.y, f.w, f.h)}" fill="${C.stones[i + 1]}"/>
  <g clip-path="url(#fr${i})"><text x="${f.x + f.cx}" y="${f.y + f.cy}" class="frag">${f.ch}</text></g>
  <path d="M${f.x - 4},${f.y + f.h + 1} q ${f.w / 2},6 ${f.w + 8},0" stroke="#3E160B" stroke-opacity="0.4" stroke-width="3" fill="none"/>
</g>`).join('')}
</svg>`;

// ---------- HTML (typography) ----------
const fonts = path.join(__dirname, 'fonts');
const ff = (file) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(fonts, file)).toString('base64');
const blurb = [
  'Before the borders, there were kingdoms. Before the maps, there were journeys. Stone cities rose in the south, scholars copied manuscripts in the Sahel, and queens of Kush made war on Rome.',
  'So how did societies that built so much arrive at a present in which so many institutions struggle to turn talent into shared progress — and in which their own achievements can sound like fairy tales?',
  'In <i>Origins</i>, the first book of the Letters Conflict trilogy, Najuna Saviour follows that question through the evidence: the civilisations Africans built and the injustices within them, the slave trades and the conquest that broke them, and the machinery inherited at independence — along with the choices Africans made with it.',
];
const photo = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'author_photo_lowres.png')).toString('base64');

const html = (mode) => `<!doctype html><html><head><meta charset="utf-8"><title>Origins cover</title><style>
@font-face { font-family: 'EBG'; font-weight: 400; src: url(${ff('eb-garamond-latin-400-normal.woff2')}); }
@font-face { font-family: 'EBG'; font-weight: 500; src: url(${ff('eb-garamond-latin-500-normal.woff2')}); }
@font-face { font-family: 'EBG'; font-weight: 600; src: url(${ff('eb-garamond-latin-600-normal.woff2')}); }
@font-face { font-family: 'EBG'; font-style: italic; font-weight: 400; src: url(${ff('eb-garamond-latin-400-italic.woff2')}); }
@page { size: ${W}in ${H}in; margin: 0; }
html, body { margin: 0; padding: 0; }
body { width: ${W}in; height: ${H}in; position: relative; overflow: hidden; font-family: 'EBG', serif; color: ${C.ink}; background: ${C.bone}; }
.art { position: absolute; left: 0; top: 0; }
.abs { position: absolute; }
.track { letter-spacing: 0.32em; }
/* front */
.series { left: ${FRONT_X + 0.5}in; width: ${TRIM_W - 1}in; top: ${BLEED + 0.62}in; text-align: center; font-size: 15pt; font-weight: 500; color: ${C.laterite}; letter-spacing: 0.42em; padding-left: 0.42em; }
.rule { left: ${FRONT_X + 2.35}in; width: 1.3in; top: ${BLEED + 1.0}in; border-top: 1.2pt solid ${C.ochre}; }
.title { left: ${FRONT_X}in; width: ${TRIM_W + BLEED}in; top: ${BLEED + 1.08}in; text-align: center; font-size: 84pt; font-weight: 600; letter-spacing: 0.06em; line-height: 1; }
.sub { left: ${FRONT_X + 0.4}in; width: ${TRIM_W - 0.8}in; top: ${BLEED + 2.42}in; text-align: center; font-size: 21pt; font-style: italic; color: ${C.gold}; }
.book { left: ${FRONT_X + 0.5}in; width: ${TRIM_W - 1}in; top: ${BLEED + 8.03}in; text-align: center; font-size: 10.5pt; letter-spacing: 0.5em; padding-left: 0.5em; color: #E9C9A6; }
.author { left: ${FRONT_X + 0.3}in; width: ${TRIM_W - 0.6}in; top: ${BLEED + 8.25}in; text-align: center; font-size: 23pt; font-weight: 500; letter-spacing: 0.34em; padding-left: 0.34em; color: ${C.bone}; }
/* spine */
.spine { left: ${SPINE_X}in; width: ${SPINE}in; top: 0; height: ${H}in; }
.spine .v { position: absolute; left: 50%; transform-origin: 0 0; transform: rotate(90deg) translateY(-50%); white-space: nowrap; line-height: 1; }
.spine .s1 { top: ${BLEED + 0.45}in; font-size: 9pt; letter-spacing: 0.3em; color: ${C.laterite}; font-weight: 500; }
.spine .s2 { top: ${BLEED + 2.45}in; font-size: 21pt; font-weight: 600; letter-spacing: 0.12em; }
.spine .s3 { top: ${BLEED + 4.75}in; font-size: 11pt; letter-spacing: 0.28em; color: ${C.ink}; font-weight: 500; }
.spine .mark { position: absolute; top: ${BLEED + 8.42}in; width: 100%; text-align: center; font-size: 7pt; letter-spacing: 0.1em; color: #E9C9A6; }
.spineEdge { position: absolute; top: 0; height: ${H}in; border-left: 0.6pt solid rgba(123,84,32,0.35); }
/* back */
.back { left: ${BLEED + 0.55}in; width: ${TRIM_W - 1.1}in; top: ${BLEED + 0.5}in; }
.head { font-size: 19.5pt; font-weight: 600; color: ${C.laterite}; text-align: center; letter-spacing: 0.06em; line-height: 1.15; margin-bottom: 0.2in; }
.back p { font-size: 11.6pt; line-height: 1.32; margin: 0 0 0.11in; text-align: left; }
.back p.principle { font-style: italic; text-align: center; color: ${C.gold}; font-size: 12.4pt; margin-top: 0.14in; }
.bio { display: flex; gap: 0.18in; margin-top: 0.2in; align-items: flex-start; }
.bio img { width: 1.05in; height: 1.32in; object-fit: cover; }
.bio .n { font-size: 14pt; font-weight: 600; letter-spacing: 0.08em; color: ${C.gold}; margin-bottom: 0.03in; }
.bio .r { font-size: 10.5pt; margin-bottom: 0.06in; }
.bio .t { font-size: 10.5pt; line-height: 1.3; }
.pub { left: ${BLEED + 0.55}in; top: ${BLEED + 7.95}in; width: 2.9in; font-size: 9.5pt; line-height: 1.35; color: ${C.bone}; }
.barcode { left: ${BLEED + TRIM_W - 0.25 - 2}in; top: ${BLEED + TRIM_H - 0.25 - 1.2}in; width: 2in; height: 1.2in; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 7.5pt; color: #999; letter-spacing: 0.1em; }
/* guides (preview only) */
.guide { position: absolute; border: 0.75pt dashed rgba(0,140,255,0.7); pointer-events: none; }
</style></head><body>
<div class="art">${svg}</div>

<div class="abs series">LETTERS CONFLICT</div>
<div class="abs rule"></div>
<div class="abs title">ORIGINS</div>
<div class="abs sub">The Anatomy of the Conflict</div>
<div class="abs book">BOOK ONE</div>
<div class="abs author">NAJUNA SAVIOUR</div>

<div class="abs spine">
  <div class="v s1">LETTERS CONFLICT</div>
  <div class="v s2">ORIGINS</div>
  <div class="v s3">NAJUNA SAVIOUR</div>
  <div class="mark">KANDANEWS</div>
</div>
<div class="spineEdge" style="left:${SPINE_X}in"></div><div class="spineEdge" style="left:${FRONT_X}in"></div>

<div class="abs back">
  <div class="head">AFRICA WAS NEVER<br>AN EMPTY PAGE.</div>
  ${blurb.map(b => `<p>${b}</p>`).join('')}
  <p class="principle">History explains the arrangement we inherited.<br>It does not decide the arrangement we must keep.</p>
  <div class="bio"><img src="${photo}" alt="Najuna Saviour">
    <div><div class="n">NAJUNA SAVIOUR</div><div class="r">Author · Entrepreneur · Software Developer</div>
    <div class="t">Najuna Saviour is a Ugandan author, entrepreneur, and software developer. His previous book is <i>The Japanese Way</i>.</div></div></div>
</div>
<div class="abs pub">Published by KandaNews Africa Co. Ltd<br>www.kandanews.africa<br>publishing@kandanews.africa</div>
<div class="abs barcode">ISBN BARCODE AREA</div>
${mode === 'preview' ? `<div class="guide" style="left:${BLEED}in;top:${BLEED}in;width:${W - 2 * BLEED}in;height:${TRIM_H}in"></div>
<div class="guide" style="left:${SPINE_X}in;top:${BLEED}in;width:${SPINE}in;height:${TRIM_H}in"></div>` : ''}
</body></html>`;

const out = path.join(__dirname, 'output');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'origins_cover_wrap.html'), html('print'));
fs.writeFileSync(path.join(out, 'origins_cover_preview.html'), html('preview'));

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const pxW = Math.round(W * 96), pxH = Math.round(H * 96);
  for (const mode of ['print', 'preview']) {
    const page = await browser.newPage({ viewport: { width: pxW, height: pxH }, deviceScaleFactor: 300 / 96 });
    await page.goto('file://' + path.join(out, mode === 'print' ? 'origins_cover_wrap.html' : 'origins_cover_preview.html'));
    await page.evaluate(() => document.fonts.ready);
    if (mode === 'print') {
      await page.pdf({ path: path.join(out, 'origins_cover_wrap.pdf'), width: W + 'in', height: H + 'in', printBackground: true, pageRanges: '1' });
      await page.screenshot({ path: path.join(out, 'origins_cover_wrap.png'), fullPage: false });
      // front panel only, trimmed (no bleed): 6 x 9 in
      await page.screenshot({ path: path.join(out, 'origins_front_trim.png'), clip: { x: FRONT_X * 96, y: BLEED * 96, width: TRIM_W * 96, height: TRIM_H * 96 } });
    } else {
      await page.screenshot({ path: path.join(out, 'origins_cover_preview.png') });
    }
    await page.close();
  }
  await browser.close();
  console.log(`spine ${SPINE} in (${PAGES} pp, ${PAPER}); wrap ${W.toFixed(3)} x ${H} in`);
})();
