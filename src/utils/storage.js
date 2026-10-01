const STORAGE_KEY = "pharmastudy_progress";
const FAVORITES_KEY = "pharmastudy_favorites";

const defaultProgress = {
  questionsCompleted: 0,
  correctAnswers: 0,
  quizzesCompleted: 0,
  flashcardsReviewed: 0,
  calculationsCompleted: 0,
  scenariosCompleted: 0,
};

// =========================================
// PROGRESS
// =========================================

export function getProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultProgress };
    }

    return {
      ...defaultProgress,
      ...JSON.parse(saved),
    };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );

  window.dispatchEvent(
    new Event("pharmastudy-progress-updated")
  );
}

export function incrementProgress(
  field,
  amount = 1
) {
  const current = getProgress();

  const updated = {
    ...current,
    [field]:
      (current[field] || 0) + amount,
  };

  saveProgress(updated);

  return updated;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

// =========================================
// FAVORITES
// =========================================

export function getMedicineKey(medicine) {
  if (!medicine) return null;

  return (
    medicine.rxcui ||
    medicine.id ||
    medicine.name ||
    null
  );
}

export function getFavorites() {
  try {
    const saved =
      localStorage.getItem(FAVORITES_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function isFavorite(medicine) {
  const key = getMedicineKey(medicine);

  if (!key) return false;

  const favorites = getFavorites();

  return favorites.some(
    (item) =>
      getMedicineKey(item) === key
  );
}

export function toggleFavorite(medicine) {
  const key = getMedicineKey(medicine);

  if (!key) {
    return getFavorites();
  }

  const favorites = getFavorites();

  const exists = favorites.some(
    (item) =>
      getMedicineKey(item) === key
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites =
      favorites.filter(
        (item) =>
          getMedicineKey(item) !== key
      );
  } else {
    updatedFavorites = [
      ...favorites,
      medicine,
    ];
  }

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return updatedFavorites;
}

export function removeFavorite(medicine) {
  const key =
    typeof medicine === "object"
      ? getMedicineKey(medicine)
      : medicine;

  if (!key) {
    return getFavorites();
  }

  const favorites = getFavorites();

  const updatedFavorites =
    favorites.filter(
      (item) =>
        getMedicineKey(item) !== key
    );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return updatedFavorites;
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}