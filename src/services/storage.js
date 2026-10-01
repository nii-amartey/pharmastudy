export function toggleFavorite(medicine) {
  const favorites = getFavorites();

  const exists = favorites.some(
    (item) => item.rxcui === medicine.rxcui
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(
      (item) => item.rxcui !== medicine.rxcui
    );
  } else {
    updatedFavorites = [...favorites, medicine];
  }

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return updatedFavorites;
}