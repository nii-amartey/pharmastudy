const DAILYMED_API =
  "https://dailymed.nlm.nih.gov/dailymed/services/v2";

// Find DailyMed labels using an RxCUI
export async function findDailyMedLabels(rxcui) {
  try {
    const response = await fetch(
      `${DAILYMED_API}/spls.json?rxcui=${encodeURIComponent(
        rxcui
      )}&pagesize=10`
    );

    if (!response.ok) {
      throw new Error(
        "DailyMed label search failed"
      );
    }

    const data = await response.json();

    return data?.data || [];
  } catch (error) {
    console.error(
      "DailyMed label search error:",
      error
    );

    return [];
  }
}

// Get information about a specific DailyMed label
export async function getDailyMedLabel(setId) {
  try {
    const response = await fetch(
      `${DAILYMED_API}/spls/${encodeURIComponent(
        setId
      )}.json`
    );

    if (!response.ok) {
      throw new Error(
        "DailyMed label request failed"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "DailyMed label error:",
      error
    );

    return null;
  }
}

// Get medicine images/media
export async function getDailyMedMedia(setId) {
  try {
    const response = await fetch(
      `${DAILYMED_API}/spls/${encodeURIComponent(
        setId
      )}/media.json`
    );

    if (!response.ok) {
      throw new Error(
        "DailyMed media request failed"
      );
    }

    const data = await response.json();

    // DailyMed returns media inside:
    // data.media
    return data?.data?.media || [];
  } catch (error) {
    console.error(
      "DailyMed media error:",
      error
    );

    return [];
  }
}