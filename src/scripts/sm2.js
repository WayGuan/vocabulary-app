const STORAGE_KEY = 'vocabulary-progress';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getCardData(slug) {
  const today = new Date().toISOString().split('T')[0];
  return getProgress()[slug] || {
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    nextReview: today,
  };
}

export function updateCard(slug, quality) {
  // quality: 1 = Again, 3 = Hard, 5 = Easy
  const progress = getProgress();
  const card = getCardData(slug);

  if (quality >= 3) {
    if (card.repetitions === 0) card.interval = 1;
    else if (card.repetitions === 1) card.interval = 6;
    else card.interval = Math.round(card.interval * card.easeFactor);

    card.easeFactor = Math.max(
      1.3,
      card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
    );
    card.repetitions++;
  } else {
    card.interval = 1;
    card.repetitions = 0;
  }

  const next = new Date();
  next.setDate(next.getDate() + card.interval);
  card.nextReview = next.toISOString().split('T')[0];

  progress[slug] = card;
  saveProgress(progress);
  return card;
}

export function getDueCards(allSlugs) {
  const today = new Date().toISOString().split('T')[0];
  return allSlugs.filter(slug => getCardData(slug).nextReview <= today);
}

export function getAllStats(allSlugs) {
  return allSlugs.map(slug => ({ slug, ...getCardData(slug) }));
}
