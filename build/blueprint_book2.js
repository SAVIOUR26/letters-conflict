// Letters Conflict · Book Two · Somewhere in Africa — Book Blueprint (Version 1)
// node build/blueprint_book2.js  →  drafts/Letters_Conflict_Somewhere_in_Africa_Blueprint.docx
const { save } = require('./docbuilder');

const B = [
['title', 'LETTERS CONFLICT'],
['subtitle', 'Book Two · Somewhere in Africa — The Anatomy of Our Contradictions'],
['meta', 'Book Blueprint and Production Plan'],
['meta', 'Najuna Saviour · KandaNews Africa Co. Ltd'],
['meta', 'Working document · Version 1 · 14 November 2026'],
['break'],

['h1', 'How to use this document'],
['p', 'This blueprint is the single reference for writing, designing and publishing *Letters Conflict: Somewhere in Africa*. It applies the decisions already locked for the trilogy, builds on the finished draft of *Origins*, and reconciles the two chapter lists made during earlier planning (the author’s original list and the “final architecture” list). Where those documents disagree with this one, this one wins once the author approves it.'],
['p', 'Items marked **[Author]** need Najuna Saviour’s decision or his own experience. Items marked **[Verify]** are research leads that must be checked against the original source before they appear in the manuscript. Nothing in this document is yet evidence.'],

['h1', '1. Series decisions carried from Origins'],
['table', ['Decision', 'Locked value'], [
  ['Series title and byline', 'Letters Conflict · Najuna Saviour · KandaNews Africa Co. Ltd'],
  ['Book title', 'Book Two: Somewhere in Africa — The Anatomy of Our Contradictions'],
  ['Central metaphor', 'People are the letters. Institutions are the grammar. Shared progress is the sentence.'],
  ['The metaphor’s limits', 'A person keeps their dignity when an institution fails them. No ruler, reformer or author arranges people as passive letters. Alignment never means sameness.'],
  ['Trilogy movement', 'Formation → **Manifestation** → Adjustment. How did we get here? → **What are we doing now?** → What must we build?'],
  ['Core principle', 'History explains the arrangement we inherited. It does not decide the arrangement we must keep.'],
  ['Format', '6 × 9 in paperback and Kindle; EB Garamond 12 pt; interior identical to the Origins proof (house style of The Japanese Way).'],
  ['Release', 'All three books together, August–September 2027.'],
], [2300, 6726]],

['h1', '2. What this book is for'],
['h2', 'Its job in the trilogy'],
['p', '*Origins* investigates. *Somewhere in Africa* witnesses. Origins explained how the arrangement was formed; this book makes the reader **stand inside it** — in the queue, the classroom, the clinic, the polling station, the office where a signature has a price — and then shows the mechanism underneath. It is the leanest and most visceral of the three books: scenes first, analysis second, evidence underneath.'],
['h2', 'The opening question (handed over by Origins)'],
['quote', 'History placed some letters badly. But history is no longer holding every hand. So why are we still writing some of the same sentences?'],
['h2', 'The central question'],
['quote', 'What happens when citizens, leaders and institutions repeatedly treat common rules as optional — and how does private advantage become public weakness?'],
['h2', 'The reader and the change in the reader'],
['p', 'Same primary reader as Origins: a young African adult, 18–35, student, graduate, young professional or entrepreneur. This book speaks to them where they live.'],
['table', ['When they open the book, the reader may believe…', 'When they close it, the reader should understand…'], [
  ['Our problems are caused by “them” — the politicians, the foreigners, the system.', 'The system is made of daily choices, including mine. The small exception I take and the large theft I condemn run on the same grammar.'],
  ['Africans are naturally corrupt, lazy or disorderly.', 'The evidence shows people who support rules and democracy but no longer trust the next person to keep them. The problem is broken expectations, not broken people.'],
  ['Nothing works anywhere on this continent.', 'Some institutions, communities and countries hold. Dysfunction is real; it is not all Africa is.'],
  ['The only answers are anger or escape.', 'Silence and exit have costs. There is a third answer — the letter that refuses disorder — and it can be learned.'],
], [4513, 4513]],
['h2', 'The emotional journey (locked)'],
['p', 'Recognition → discomfort → self-implication → responsibility.'],
['h2', 'The method that gives the book its name'],
['p', 'No scene names a real country, place or private person. The title performs the argument: *this happened somewhere in Africa.* The reader in Kampala recognises one thing, the reader in Lagos, Nairobi, Accra or Kinshasa another, and no country can say comfortably that the book is about someone else. Underneath each scene, the analysis uses **named, sourced, real data** from real countries — and says exactly which countries and years it covers.'],

['h1', '3. The shape of the book', true],
['p', 'Same house structure as Origins: front matter, a short personal Introduction, three Parts, Research Notes and Sources, About the Author. **Proposed length: about 38,000–45,000 words** (11 chapters of 3,000–3,800 words), in line with the finished Origins (about 33,000 words plus front matter) rather than the earlier 55,000–70,000 estimate. [Author: confirm]'],
['table', ['Section', 'Contents', 'Words'], [
  ['Front matter', 'Title · Copyright · Dedication [Author] · Acknowledgments · Contents · A Note to the Reader (the scene-label system, Section 5)', '800'],
  ['Introduction', '“Somewhere, Every Day” — why the author stopped blaming only the past. Built from the Book Two author interview. [Author]', '1,500'],
  ['Part I', 'The Rules We Bend — recognition (Chapters 1–3)', '10,000'],
  ['Part II', 'The Promises We Keep Breaking — discomfort (Chapters 4–7)', '14,000'],
  ['Part III', 'Who Holds the Pen — self-implication and responsibility (Chapters 8–11)', '13,500'],
  ['Back matter', 'Research Notes and Sources · Chapter Quotations · About the Author · Also by · Coming next: Africa Adjustment Bureau', 'outside count'],
], [1600, 6626, 800]],

['h2', 'The chapters'],
['p', 'This blueprint keeps the ten chapter functions of the “final architecture” list and proposes **one new chapter** (Chapter 5, on work and idle youth), because neither earlier list has a chapter on jobs, money or the young people the economy leaves behind — the author’s most pressing concern (see the ideas bank). Where the author’s original list had a stronger title, it is offered as an alternative. [Author: approve the eleventh chapter and choose titles]'],
['table', ['#', 'Chapter (alternative title)', 'The job it does for the reader', 'Signature scene [Author/Verify]', 'Words'], [
  ['', 'PART I · THE RULES WE BEND', '', '', ''],
  ['1', 'Somewhere, This Morning (Somewhere in Africa)', 'Set the method: one ordinary morning in an unnamed city. Systems, not stereotypes; variation, not one Africa.', 'Composite: a city waking — boda boda, school run, the office queue, the street vendor moved on again.', '3,000'],
  ['2', 'The Republic of Small Exceptions (The Law That Recognised Faces)', 'Show how queue-jumping, favours and selective obedience destroy confidence in common rules.', 'The application that sits for months and moves in minutes when the applicant knows someone.', '3,500'],
  ['3', 'The Price of a Signature (The Price of Being Connected)', 'Turn corruption from an index into a human transaction: is the rule real or negotiable?', 'A citizen at a desk deciding whether to pay for a document that should be free.', '3,500'],
  ['', 'PART II · THE PROMISES WE KEEP BREAKING', '', '', ''],
  ['4', 'A Classroom Full of Tomorrow (When Education Produced Spectators)', 'A society that praises education while weak learning and mismatched skills erode the future it claims to value. *The system, not the student.*', 'Parents sell land for fees; the graduate comes home unsure where to start. [Author: witnessed?]', '3,800'],
  ['5', '**NEW** The Graduate and the Street', 'Work, the informal economy and idle youth: why capable young people end up waiting, hustling or in gangs while roads go unbuilt and land lies unused. *Who benefits from empty gaps?*', 'The engineer at home and the unbuilt village road; a night-time robbery for a phone. [Author]', '3,500'],
  ['6', 'The Hospital of Waiting', 'Make state capacity tangible through illness, time, dignity, staffing and money.', 'A mother waiting through a day at a health centre with no drugs in stock.', '3,300'],
  ['7', 'The Road Rebuilt Every Rainy Season', 'The difference between inaugurating an asset and maintaining it: procurement, maintenance, incentives. (Recurring image: **the pothole**.)', 'The same stretch of road resurfaced before each election and broken after each rain.', '3,300'],
  ['', 'PART III · WHO HOLDS THE PEN', '', '', ''],
  ['8', 'When the Person Becomes the Office (The Kingdom of One Man)', 'What happens when an office acquires a face — the president, the minister, the head teacher, the pastor, the founder. Shows today what Origins Ch 9 explained.', 'An institution that stops working the week its chief is away. [Composite]', '3,500'],
  ['9', 'The Election of Small Gifts', 'Patronage, identity and the contradiction between demanding good institutions and rewarding private favours.', 'Sugar, salt and cash on the eve of a vote — and the road that never comes.', '3,300'],
  ['10', 'Silence, Exit, and the Common Good (The People Who Betrayed Their Future)', 'Fear of speaking, resignation and emigration: the moral cost when capable citizens decide the system is someone else’s problem.', 'The best student in the class at the embassy queue; the whistle never blown.', '3,300'],
  ['11', 'The Letter That Refused Disorder (A Continent of Unfinished Sentences)', 'End not in despair but with people and communities choosing rules, competence and cooperation when disorder pays — and hand the reader to Book Three.', 'A documented public servant, community or reform that held. [Verify]', '3,500'],
], [500, 2350, 2700, 2700, 776]],

['h2', 'Threads that run through the chapters, not separate chapters'],
['bullets', [
  '**Religion and the church**, **social class and imitation**, **relationships and the family** — named in the author’s first plan; carried inside Chapters 2, 8 and 10 rather than given chapters of their own. [Author: confirm]',
  '**The individual letter:** every chapter turns once to the reader — where do I take the small exception?',
  '**Recurring image:** the pothole (as the wall was for Origins and the case file will be for Book Three).',
]],

['h1', '4. The house chapter format for Book Two', true],
['p', 'Origins’ format, adapted from history to the present. Every chapter keeps the author’s signature section.'],
['numbers', [
  '**Epigraph** — verified, preferably an African voice.',
  '**The Scene** — 400–800 words, labelled with its type (Section 5). Unnamed place, unnamed people, real pattern.',
  '**The Question** — stated plainly.',
  '**Under the Scene** — the evidence: named countries, years, surveys, audits, court records. Never “Africa” as one character.',
  '**The Grammar** — the mechanism: incentives, expectations, trust, enforcement, how private advantage becomes public weakness.',
  '**When the Evidence Corrects the Story** — a popular belief checked against the sources and found more complicated. (Every chapter.)',
  '**Who Pays** — who carries the cost today, and how unequally (the Book Two counterpart of Origins’ “Who Carried the Weight”).',
  '**Where the Letters Hold** — one documented counter-example: a reform, a community, an institution that works. (Every chapter; this keeps the book honest and hopeful.)',
  '**The Letter Principle** — one paragraph of philosophy.',
  '**Questions for Reflection** — five, for students, reading groups and workplaces.',
  'A rule (three spaced asterisks), two closing paragraphs (the second points onward), and the refrain. **Proposed refrain:** *This happened somewhere in Africa. It does not have to happen again.* [Author: choose, or keep the Origins refrain]',
]],

['h1', '5. Scenes, honesty and the law'],
['p', 'This book stands or falls on the honesty of its scenes. A Note to the Reader will explain four labels, and every scene will carry one in the manuscript (a small italic line under the scene).'],
['table', ['Label', 'What it means', 'Rule'], [
  ['Witnessed', 'The author saw or experienced it.', 'Only from the author’s own account. [Author]'],
  ['Reported', 'Taken from a court record, audit, inquiry or news report.', 'Cited in the notes; details as reported, nothing added.'],
  ['Composite', 'Built from several real, documented patterns into one scene.', 'Every element traceable to a source in the notes; no real person identifiable.'],
  ['Imagined', 'A teaching illustration.', 'Introduced with “Imagine…”, as in Origins.'],
], [1400, 3800, 3826]],
['bullets', [
  'Never disguise an allegation about a real, identifiable person or institution as fiction. If it happened to a named official, it is either Reported (with sources) or left out.',
  'Never invent quotations for real people. Invented characters in composite scenes may speak; real people may not be given words they did not say.',
  'Every continental statement names its coverage: “across 39 countries surveyed by Afrobarometer in 2021–2023”, not “Africans believe”. [Verify current round]',
  'Country examples belong in “Under the Scene”, sourced — never inside the unnamed scene.',
  'Defamation check before print: no scene may be readable as a specific living person. [Publisher]',
]],

['h1', '6. Evidence spine (research leads)'],
['p', 'From the earlier research plan; each is a lead to be fetched and checked, not a finding. [Verify all]'],
['table', ['Chapter', 'Principal sources to consult'], [
  ['All', 'Afrobarometer (latest round: trust, corruption, democracy, service access, migration; always state countries and years); Mo Ibrahim Index of African Governance; World Bank Worldwide Governance Indicators and CPIA (with their limits stated); national statistics offices (e.g. UBOS).'],
  ['2 Small exceptions', 'Research on conditional cooperation and rule-following (public-goods experiments; Elinor Ostrom on commons); Afrobarometer on trust in others and in institutions.'],
  ['3 Corruption', 'AU Convention on Preventing and Combating Corruption (adopted 2003, in force 2006 [Verify]); Afrobarometer bribery questions; auditor-general and procurement reports; documented anti-corruption reforms that worked.'],
  ['4 Education', 'UNESCO Institute for Statistics; World Bank learning-poverty data; national assessments and budgets; household spending on education; graduate outcomes.'],
  ['5 Work and youth', 'UBOS National Labour Force Survey (youth NEET and unemployment) and equivalents elsewhere; ILO on informality; the ideas-bank evidence: Uganda Youth Opportunities Program (Blattman, Fiala & Martinez, QJE 2014), Liberia STYL (Blattman, Jamison & Sheridan, AER 2017), Uganda Community Service Act 2000; police crime reports.'],
  ['6 Health', 'WHO Africa; universal health coverage monitoring (service coverage and financial protection); out-of-pocket spending; health-worker density; Afrobarometer access questions.'],
  ['7 Roads', 'Public investment management reviews; PEFA assessments; auditor-general reports; road agency maintenance budgets; procurement data.'],
  ['8 Person and office', 'AU African Charter on Democracy, Elections and Governance; constitutions and term limits; institutional-capture literature (World Bank, World Development Report 2017). Do not repeat Origins Ch 9’s neopatrimonialism discussion — refer back to it.'],
  ['9 Elections', 'Electoral commission data; AU observation reports; clientelism research; Afrobarometer: strong support for democracy versus low satisfaction with how it works.'],
  ['10 Silence and exit', 'Albert Hirschman, *Exit, Voice, and Loyalty* (1970); Afrobarometer migration findings; World Bank remittance and migration data; whistle-blower protection laws.'],
  ['11 The letter that held', 'Documented reform cases and public servants; Afrobarometer civic participation (voting, community meetings) as the empirical counterweight.'],
], [2000, 7026]],

['h1', '7. What the ideas bank contributes'],
['p', 'From the ideas bank, *research/adjustment_bureau_ideas_and_video_series.md* (the author’s notes of 4 November 2026). Book Two diagnoses; Book Three proposes. So this book takes the **problems** and leaves the **programmes** for the Bureau.'],
['table', ['Author’s idea', 'In Book Two (diagnosis)', 'Left for Book Three (solution)'], [
  ['Expensive education, unready graduates', 'Ch 4: the parents’ sacrifice; *the system, not the student*', 'Education tied to real work and real gaps'],
  ['Empty gaps beside idle talent', 'Ch 5 and Ch 7: who benefits from empty gaps?', 'Graduates as registered, contracted teams'],
  ['Kifeesi and the cycle of robbery and prison', 'Ch 5: the young men the economy leaves behind', '“From Kifeesi to Workforce”'],
  ['Importing what we could make', 'Ch 7: the imported lorry on the unmaintained road', 'Industrial policy that learns from success and failure'],
  ['Money that leaves local economies', 'Ch 5 and Ch 9', 'Specialisation and interdependence'],
], [2600, 3300, 3126]],

['h1', '8. Front and back matter, and the author’s voice'],
['bullets', [
  'Same sequence and layout as the Origins proof: title page, copyright, dedication, acknowledgments, contents, A Note to the Reader, Introduction, Part pages, chapters, Research Notes and Sources, Chapter Quotations, About the Author, Also by.',
  '**Introduction, “Somewhere, Every Day”** — short and personal: when the author began to see the same sentences being written around him. Built only from the author’s answers. [Author]',
  '**Witnessed scenes** — the book is strongest where the author has seen it himself. A separate interview (*research/author_interview_book2.md*) asks for them. Nothing will be invented. [Author]',
  'Depth will come from the author’s voice in the Introduction, Part openings and Chapter 11, as in Origins.',
]],

['h1', '9. Cover brief'],
['p', 'Same generator and series system as Origins (*cover/build_cover.js*): series wordmark, title position, author name at the foot, spine fragment of the trilogy letterform. **Idea: collision** — letters in streets, queues and forms; the pothole. **Palette:** asphalt, signal amber, faded paint — or, if the author keeps the times-of-day idea, **harsh midday** after Origins’ dusk, before Book Three’s dawn. [Author]'],

['h1', '10. Production plan', true],
['table', ['Stage', 'What happens', 'Target'], [
  ['1. Blueprint', 'This document approved or corrected; eleventh chapter and titles decided. [Author]', 'November 2026'],
  ['2. Author interview (Book Two)', 'Witnessed scenes and the Introduction material. [Author]', 'November–December 2026'],
  ['3. Proof of voice', 'Chapter 1 drafted in the new format; author reviews scene labels, voice and balance.', 'December 2026'],
  ['4. Chapters 2–11', 'Research dossier, then chapter, about one a week, each reviewed by the author.', 'December 2026 – February 2027'],
  ['5. Book Three blueprint', 'Africa Adjustment Bureau blueprint, drawing on the ideas bank.', 'February 2027'],
  ['6. Legal and fact check', 'Fact check; defamation read of every scene.', 'June 2027'],
  ['7. Typesetting and covers', 'House layout, page count, spine, full wrap; trilogy box-set artwork.', 'July 2027'],
  ['8. Proof and release', 'Printed proofs, corrections, release of all three books together.', 'August–September 2027'],
], [2400, 5026, 1600]],

['h1', '11. Decisions for the author'],
['numbers', [
  'Approve the eleventh chapter, *The Graduate and the Street*?',
  'For each chapter, the final-architecture title or the alternative from your original list?',
  'Part titles: The Rules We Bend · The Promises We Keep Breaking · Who Holds the Pen?',
  'Book Two refrain: *This happened somewhere in Africa. It does not have to happen again.* — or keep *The letters remain. The question is the sentence.*?',
  'Length: about 38,000–45,000 words?',
  'Hand-off line to Book Three. Proposal: *We already know what the sentence should say. The question is who will build the grammar that lets us write it.*',
  'Answer the Book Two interview, especially the scenes you have witnessed yourself.',
], 2],
];

save(B, 'Letters Conflict · Somewhere in Africa · Book Blueprint', process.argv[2] || require('path').join(__dirname, '..', 'drafts', 'Letters_Conflict_Somewhere_in_Africa_Blueprint.docx'));
