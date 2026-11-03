// Letters Conflict: Origins — front and back matter for the edition (modelled on The Japanese Way, First Edition 2026)
// Block types as in the chapters: p, h, quote, center, rule. Text in [AUTHOR: …] is printed as a marked box in proofs.

module.exports.title = {
  series: 'LETTERS CONFLICT',
  book: 'Book One',
  title: 'ORIGINS',
  subtitle: 'The Anatomy of the Conflict',
  author: 'NAJUNA SAVIOUR',
  editionProof: 'Advance Reading Proof · November 2026',
  editionFinal: 'First Edition, 2027',
};

module.exports.copyright = (final) => [
  ['p', '*Letters Conflict · Book One*'],
  ['p', '*Origins: The Anatomy of the Conflict*'],
  ['gap'],
  ['p', '© 2026 Najuna Saviour'],
  ['p', 'All rights reserved.'],
  ['gap'],
  ['p', final ? 'First Edition, 2027' : 'Advance reading proof, November 2026. Not for sale or distribution.'],
  ['gap'],
  ['p', 'Except as permitted by applicable copyright law, no part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means without prior written permission from the copyright holder. Permission requests should be addressed to the publisher.'],
  ['gap'],
  ['p', 'Published by KandaNews Africa Co. Ltd, Kampala, Uganda'],
  ['gap'],
  ['p', 'www.kandanews.africa'],
  ['p', 'publishing@kandanews.africa'],
  ['gap'],
  ['p', final ? 'ISBN: ' : 'ISBN: to be assigned'],
  ['gap'],
  ['p', 'Quotations from historical documents are reproduced from the editions and translations identified in the Research Notes and Sources. Scenes are reconstructed from the documentary record cited; no dialogue or private thought has been invented for any historical person. No endorsement by any museum, university, government or organisation mentioned in this book is implied.'],
  ['gap'],
  ['p', 'Typeset in EB Garamond.'],
];

// PROPOSED — for the author to confirm or replace.
module.exports.dedication = [
  'To every young African who was taught',
  'that history began somewhere else —',
  'and to the keepers of memory',
  'who knew that it did not.',
  '',
  'The letters were always yours.',
];

module.exports.acknowledgments = [
  ['p', 'This book stands on the work of others.'],
  ['p', 'To the archaeologists, historians, linguists, librarians and curators — in Africa and beyond — whose research fills the notes of these pages: thank you for reading the stone, the page and the voice with such care.'],
  ['p', 'To the families and communities who kept manuscripts, genealogies, songs and stories when no institution would keep them for you: much of what is known survived because you refused to let it go.'],
  ['p', 'To my mentors, family and friends — your belief carried this vision from its first pages to this one.'],
  ['p', 'To the young people of Uganda and of Africa who will read this book and argue with it: you are the reason it exists.'],
];

module.exports.introduction = {
  title: 'Introduction',
  blocks: [
    ['h', 'The Book I Started on Campus'],
    ['p', 'This book began as a question I asked as a student, and I asked it badly.'],
    ['p', 'I wanted to understand why the continent I come from seemed, as I put it then, “dark and far from civilisation.” I did not invent that idea. It is an old one, and it had travelled a long way to reach me. The question felt honest. It was also built on an assumption I had never examined: that darkness was the starting point, and that the only thing to explain was why the light had come so late.'],
    ['p', '[AUTHOR: The campus, the year and the moment you first wrote about Letters Conflict. What did you see, read or hear that made you start? Why “letters”? (Interview questions 1–3.)]'],
    ['p', 'When I returned to those pages to turn them into a book, I brought a different method to them. I began to ask not only what had gone wrong, but what had been built; not only who had been blamed, but who had been doing the telling. The more carefully I looked, the more the original question came apart in my hands.'],
    ['p', 'This is the book that came out of that unravelling. It does not answer the question I first asked. It replaces it with a better one.'],

    ['h', 'Letters, Grammar and the Sentence'],
    ['p', 'Place six letters on a page: A, F, R, I, C, A. We recognise the word only because of their arrangement. Change the order and the meaning changes, or disappears.'],
    ['p', 'That image runs through all three books of the Letters Conflict trilogy. People are the letters: distinct, each with its own shape and its own dignity. Institutions are the grammar: the rules and habits by which people share authority, settle disputes, trade, learn and govern. Shared progress is the sentence: what people can build together that none of them could build alone.'],
    ['p', 'The image has limits, and I have tried to respect them on every page. People are not marks on paper waiting for a powerful hand to place them. A person keeps their worth when an institution fails them. No ruler, reformer or author is entitled to arrange human beings as passive letters in a sentence of his own choosing. And the word *Africa* itself carries the most important lesson: it needs different letters. Six identical letters would spell nothing.'],
    ['p', 'The question at the centre of this book, then, is not “Why is Africa dark?” It is this: how did societies that built so much — cities, kingdoms, scholarship, law and long-distance trade — arrive at a present in which so many of their institutions struggle to turn human ability into shared progress?'],

    ['h', 'Neither Pedestal nor Ruin'],
    ['p', 'There are two easy ways to write about the African past, and this book refuses both.'],
    ['p', 'The first is the old colonial story, in which Africa had no history worth the name until outsiders arrived to supply one. Chapter 1 shows how that story was manufactured, and how long it took the evidence to defeat it. The second is its mirror: a story of unbroken golden ages, in which every kingdom was just, every ancestor heroic and every difficulty the fault of someone else. It is more comfortable to read. It is no more true.'],
    ['p', 'The societies in these pages built walls of granite and libraries of manuscripts. They also held slaves, raided their neighbours and silenced their critics. Recognising the scholarship does not excuse the slavery; recognising the slavery does not erase the scholarship. An honest history has to carry both, and I have tried to carry both without flinching.'],
    ['p', 'Nor is Africa one character in this book. A ruler who sold captives, the captive he sold and the family who hid from his raiders were all African, and they did not share the same interests, power or guilt. Wherever it matters, I name the society, the region and the century.'],

    ['h', 'Written from Uganda for a Wider Conversation'],
    ['p', 'I write from Uganda, and the kingdoms of the Great Lakes — Buganda and Bunyoro above all — run through the book as a deliberate thread: before conquest in Chapter 5, during it in Chapter 7, and at independence in Chapter 8. But the book travels widely, from the Nile to the Niger, from the Swahili coast to the Kongo, because no single country can explain the continent, and no continent can be understood from a single country.'],
    ['p', 'I have written for young Africans first: students, graduates, young professionals and entrepreneurs who have inherited the consequences of this history without ever being taught it properly. I have also written for teachers, civil servants, church and community leaders, and readers in the diaspora and beyond who want to understand Africa as it was, rather than as it has been imagined.'],

    ['h', 'How the Argument Develops'],
    ['p', '**Part One, What Was Built,** spans five chapters. It begins with the argument over who built Great Zimbabwe, and with the question of who has been telling the story. It then travels to Kush and Aksum on the Nile and in the Horn; to Ghana, Mali, Songhai and the manuscripts of Timbuktu; to Mapungubwe, the Swahili coast, Ife and Benin; and finally to the many ways African societies organised power, from the court of the Kabaka of Buganda and the Golden Stool of Asante to Igbo communities that chose to have no kings at all. Each of these chapters ends by asking who carried the weight of the achievement.'],
    ['p', '**Part Two, What Was Broken,** follows the trades in human beings across the Atlantic, the Sahara and the Indian Ocean, and the conquest that drew new lines across living worlds — on maps, but also in land registers, tax rolls and chains of command.'],
    ['p', '**Part Three, What Was Inherited,** asks what independence received, what Africans chose to keep, and what they did with it: the borders ratified in 1964, the kingdoms abolished and restored, the coups and single parties, the countries that found a different path, and the long process by which documented greatness came to sound, to its own descendants, like a fairy tale. The final chapter gathers every layer together and asks what sentence we have inherited.'],

    ['h', 'How to Read This Book'],
    ['p', 'Every chapter opens with a documented moment — a named person, in a named place, on a known date — and then asks a plain question. Each contains a section called “When the Evidence Corrects the Story,” in which a popular belief is tested against the sources and found to be more complicated than it seemed. Each ends with a short reflection I call the Letter Principle, and with five questions for students, reading groups and anyone willing to argue with the chapter.'],
    ['p', 'The prose carries the story; the notes carry the evidence. A number in square brackets leads to the Research Notes and Sources at the back of the book, where each source is named and its use explained, including where a claim still needs to be checked. A Note to the Reader, before this Introduction, explains how the book distinguishes established history, scholarly debate, oral tradition and my own interpretation.'],
    ['p', '*Origins* is the first of three books. It asks how we got here. The second, *Somewhere in Africa*, asks what we are doing now. The third, *Africa Adjustment Bureau*, asks what we must build. They can be read separately, but they were written as one argument.'],

    ['h', 'The Question We Carry'],
    ['p', 'I no longer believe that Africa began in darkness. I believe something harder and more hopeful: that the arrangements which shape our lives were made by people, under pressure and with unequal power, over many centuries — and that what people made, people can remake.'],
    ['p', 'History explains the arrangement we inherited. It does not decide the arrangement we must keep.'],
    ['p', 'The rest of this book is the evidence for that sentence.'],
  ],
};

module.exports.parts = {
  1: ['Part I', 'What Was Built'],
  6: ['Part II', 'What Was Broken'],
  8: ['Part III', 'What Was Inherited'],
};

// Sources of the chapter epigraphs (note numbers refer to the Research Notes and Sources).
module.exports.chapterQuotations = [
  [1, 'Proverb, as cited by Chinua Achebe in a 1994 interview (*The Paris Review*), quoted by NPR. See note 17.'],
  [2, 'Psalm 68:31, King James Version. See note 28.'],
  [3, 'Ibn Battuta, *Travels in Asia and Africa, 1325–1354*, trans. H. A. R. Gibb (1929), section on Mali. See note 49.'],
  [4, 'Ekpo Eyo, as quoted by National Geographic History (2021). See note 66.'],
  [5, 'Kauta, steward of Kabaka Mutesa I, as recorded by Henry M. Stanley, *Through the Dark Continent* (1878), vol. 1, ch. IX. See note 11.'],
  [6, 'Afonso I of Kongo to João III of Portugal, 1526, trans. John K. Thornton (2023). See note 88.'],
  [7, 'F. D. Lugard, *The Dual Mandate in British Tropical Africa* (1922), p. 617. See note 102.'],
  [8, 'Kwame Nkrumah, independence speech, Accra, 6 March 1957. See note 109.'],
  [9, 'Kwame Nkrumah, independence speech, Accra, 6 March 1957. See note 109.'],
  [10, 'Ngũgĩ wa Thiong’o, *Decolonising the Mind* (1986), p. 3. See note 137.'],
  [11, 'Julius Nyerere, as quoted in William Edgett Smith, *Nyerere of Tanzania* (1973), p. 87. See note 122.'],
];

module.exports.aboutAuthor = [
  ['p', 'Najuna Saviour is a Ugandan author, entrepreneur and software developer. His interests include technology, education, enterprise and the everyday practices through which people build dependable institutions.'],
  ['p', '*Origins* is the first book of the Letters Conflict trilogy, which grew from pages he began writing as a student. His previous book is *The Japanese Way: Timeless Principles for Global Leaders* (2026).'],
  ['center', 'Author | Entrepreneur | Software Developer'],
];

module.exports.alsoBy = [
  ['h', 'Also by Najuna Saviour'],
  ['pl', '*The Japanese Way: Timeless Principles for Global Leaders* (2026)'],
  ['gap'],
  ['h', 'The Letters Conflict Trilogy'],
  ['pl', '**Book One** · *Origins — The Anatomy of the Conflict*'],
  ['pl', '**Book Two** · *Somewhere in Africa — The Anatomy of Our Contradictions*'],
  ['pl', '**Book Three** · *Africa Adjustment Bureau — The Architecture of a New Africa*'],
  ['gap'],
  ['center', '*History placed some letters badly. But history is no longer holding every hand. So why are we still writing some of the same sentences?*'],
];
