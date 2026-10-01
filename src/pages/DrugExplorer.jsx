import { useEffect, useState } from "react";

import {
  Search,
  Pill,
  LoaderCircle,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  Stethoscope,
  Package,
  Image as ImageIcon,
  Star,
} from "lucide-react";

import drugs from "../data/drugs";

import {
  findDailyMedLabels,
  getDailyMedLabel,
  getDailyMedMedia,
} from "../services/dailymed";

import {
  isFavorite,
  toggleFavorite,
} from "../utils/storage";

function DrugExplorer({
  medicineToOpen,
  onMedicineOpened,
}) {
  // =========================================
  // STATE
  // =========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [apiResults, setApiResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [searchedOnline, setSearchedOnline] =
    useState(false);

  const [selectedDrug, setSelectedDrug] =
    useState(null);

  const [details, setDetails] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [favorite, setFavorite] =
    useState(false);

  // =========================================
  // CATEGORIES
  // =========================================

  const categories = [
    "All",
    ...new Set(
      drugs.map((drug) => drug.category)
    ),
  ];

  // =========================================
  // NORMALIZE MEDICINE NAME
  // =========================================

  const normalizeName = (name = "") => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  };

  // =========================================
  // SEARCH RXNORM
  // =========================================

  const searchOnline = async (term) => {
    if (!term.trim()) {
      setApiResults([]);
      setSearchedOnline(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(
          term
        )}&maxEntries=20&option=1`
      );

      if (!response.ok) {
        throw new Error(
          "RxNorm search failed"
        );
      }

      const data = await response.json();

      const candidates =
        data?.approximateGroup?.candidate ||
        [];

      // =========================================
      // REMOVE INVALID RESULTS
      // =========================================

      const validCandidates =
        candidates.filter((medicine) => {
          const name = (
            medicine.name || ""
          ).trim();

          if (!name) {
            return false;
          }

          if (
            name.toLowerCase() ===
            "unknown medicine"
          ) {
            return false;
          }

          if (!medicine.rxcui) {
            return false;
          }

          return true;
        });

      // =========================================
      // FIND EXACT MATCH
      // =========================================

      const normalizedSearch =
        normalizeName(term);

      const exactMatch =
        validCandidates.find(
          (medicine) => {
            const normalizedMedicine =
              normalizeName(
                medicine.name
              );

            return (
              normalizedMedicine ===
              normalizedSearch
            );
          }
        );

      // =========================================
      // SELECT ONLINE RESULTS
      // =========================================
      //
      // If RxNorm has an exact match,
      // show only that medicine.
      //
      // Otherwise show the first useful
      // result instead of displaying many
      // formulation/concept duplicates.
      // =========================================

      const selectedCandidates =
        exactMatch
          ? [exactMatch]
          : validCandidates.slice(0, 1);

      const results =
        selectedCandidates.map(
          (medicine, index) => ({
            id:
              medicine.rxcui ||
              `online-${index}`,

            name:
              medicine.name ||
              "Unknown medicine",

            genericName:
              medicine.name ||
              "Unknown medicine",

            drugClass:
              "Medicine",

            category:
              "RxNorm",

            dosageForms: [],

            commonUses: [],

            commonSideEffects: [],

            studyNotes:
              "Medicine identified through the RxNorm terminology service. Open the medicine profile to retrieve additional reference information.",

            rxcui:
              medicine.rxcui,
          })
        );

      setApiResults(results);
      setSearchedOnline(true);
    } catch (error) {
      console.error(
        "RxNorm search error:",
        error
      );

      setApiResults([]);
      setSearchedOnline(true);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // SEARCH HANDLER
  // =========================================

  const handleSearch = (event) => {
    const value =
      event.target.value;

    setSearchTerm(value);

    // Close currently opened medicine
    setSelectedDrug(null);
    setDetails(null);

    if (
      value.trim().length >= 2
    ) {
      searchOnline(value);
    } else {
      setApiResults([]);
      setSearchedOnline(false);
    }
  };

  // =========================================
  // OPEN MEDICINE
  // =========================================

  const openDrug = async (drug) => {
    if (!drug) {
      return;
    }

    setSelectedDrug(drug);

    setDetails(null);

    setDetailsLoading(true);

    // Check whether medicine is already saved
    setFavorite(
      isFavorite(drug)
    );

    try {
      let medicineDetails = {
        ...drug,
      };

      // =========================================
      // LOCAL MEDICINE
      // =========================================

      if (!drug.rxcui) {
        setDetails(
          medicineDetails
        );

        setDetailsLoading(false);

        return;
      }

      // =========================================
      // DAILYMED LABEL SEARCH
      // =========================================

      const labels =
        await findDailyMedLabels(
          drug.rxcui
        );

      if (
        !labels ||
        labels.length === 0
      ) {
        setDetails(
          medicineDetails
        );

        setDetailsLoading(false);

        return;
      }

      // =========================================
      // GET FIRST LABEL
      // =========================================

      const label =
        labels[0];

      const setId =
        label.setid ||
        label.SETID ||
        label.setId;

      if (!setId) {
        setDetails(
          medicineDetails
        );

        setDetailsLoading(false);

        return;
      }

      // =========================================
      // GET DAILYMED LABEL
      // =========================================

      const labelDetails =
        await getDailyMedLabel(
          setId
        );

      // =========================================
      // GET DAILYMED MEDIA
      // =========================================

      const media =
        await getDailyMedMedia(
          setId
        );

      medicineDetails = {
        ...medicineDetails,
        dailyMed:
          labelDetails,
        media,
        setId,
      };

      setDetails(
        medicineDetails
      );
    } catch (error) {
      console.error(
        "Could not load medicine information:",
        error
      );

      setDetails(drug);
    } finally {
      setDetailsLoading(false);
    }
  };

  // =========================================
  // OPEN SAVED MEDICINE
  // =========================================

  useEffect(() => {
    if (!medicineToOpen) {
      return;
    }

    openDrug(
      medicineToOpen
    );

    if (onMedicineOpened) {
      onMedicineOpened();
    }
  }, [medicineToOpen]);

  // =========================================
  // FAVORITES
  // =========================================

  const handleFavorite = () => {
    if (!selectedDrug) {
      return;
    }

    const medicine =
      details || selectedDrug;

    toggleFavorite(medicine);

    setFavorite(
      isFavorite(medicine)
    );
  };

  // =========================================
  // LOCAL RESULTS
  // =========================================

  const localResults =
    drugs.filter((drug) => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      const matchesSearch =
        search === "" ||
        drug.name
          .toLowerCase()
          .includes(search) ||
        drug.genericName
          .toLowerCase()
          .includes(search) ||
        drug.drugClass
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        selectedCategory ===
          "All" ||
        drug.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // =========================================
  // COMBINE LOCAL + ONLINE RESULTS
  // =========================================

  const combinedResults =
    searchTerm.trim().length >= 2
      ? [
          ...localResults,
          ...apiResults,
        ]
      : localResults;

  // =========================================
  // REMOVE DUPLICATES
  // =========================================

  const resultMap =
    new Map();

  combinedResults.forEach(
    (drug) => {
      const key =
        normalizeName(
          drug.name || ""
        );

      if (
        key &&
        !resultMap.has(key)
      ) {
        resultMap.set(
          key,
          drug
        );
      }
    }
  );

  const results =
    Array.from(
      resultMap.values()
    );

  // =========================================
  // MEDIA URL
  // =========================================

  const getMediaUrl = (
    item
  ) => {
    if (!item) {
      return null;
    }

    return (
      item.url ||
      item.href ||
      item.image ||
      item.media_url ||
      item.mediaUrl ||
      null
    );
  };

  // =========================================
  // MEDICINE DETAILS PAGE
  // =========================================

  if (selectedDrug) {
    const medicine =
      details ||
      selectedDrug;

    const mediaImages =
      medicine?.media
        ?.map(getMediaUrl)
        .filter(Boolean) ||
      [];

    return (
      <div className="drug-details-page">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() => {
            setSelectedDrug(null);
            setDetails(null);
          }}
        >
          <ArrowLeft
            size={18}
          />

          Back to Drug Explorer
        </button>

        {/* LOADING */}

        {detailsLoading ? (
          <div className="drug-loading">

            <LoaderCircle
              size={32}
              className="loading-icon"
            />

            <h3>
              Loading medicine
              information...
            </h3>

            <p>
              Retrieving information
              from pharmacy reference
              services.
            </p>

          </div>
        ) : (
          <>
            {/* =================================
                MEDICINE HERO
            ================================= */}

            <section className="medicine-hero">

              <div className="medicine-hero-content">

                <div className="medicine-hero-icon">
                  <Pill
                    size={34}
                  />
                </div>

                <div>

                  <p className="eyebrow">
                    MEDICINE REFERENCE
                  </p>

                  <h1>
                    {medicine.name ||
                      selectedDrug.name}
                  </h1>

                  <p className="medicine-subtitle">
                    {medicine.genericName ||
                      selectedDrug.genericName}
                  </p>

                  <div className="medicine-tags">

                    <span>
                      {medicine.drugClass ||
                        selectedDrug.drugClass}
                    </span>

                    <span>
                      {medicine.category ||
                        selectedDrug.category}
                    </span>

                  </div>

                </div>

              </div>

              <div className="medicine-id">

                <span>
                  RxCUI
                </span>

                <strong>
                  {medicine.rxcui ||
                    selectedDrug.rxcui ||
                    "Local"}
                </strong>

              </div>

            </section>

            {/* =================================
                FAVORITE BUTTON
            ================================= */}

            <div className="favorite-action">

              <button
                className={`favorite-button ${
                  favorite
                    ? "saved"
                    : ""
                }`}
                onClick={
                  handleFavorite
                }
                type="button"
              >

                <Star
                  size={18}
                  fill={
                    favorite
                      ? "currentColor"
                      : "none"
                  }
                />

                {favorite
                  ? "Saved to favorites"
                  : "Save medicine"}

              </button>

            </div>

            {/* =================================
                IMAGES
            ================================= */}

            {mediaImages.length >
              0 && (
              <section className="medicine-section">

                <div className="medicine-section-title">

                  <ImageIcon
                    size={20}
                  />

                  <div>

                    <h2>
                      Medicine Images
                    </h2>

                    <p>
                      Available images
                      from the reference
                      source.
                    </p>

                  </div>

                </div>

                <div className="drug-media-grid">

                  {mediaImages.map(
                    (
                      imageUrl,
                      index
                    ) => (
                      <div
                        className="drug-media-card"
                        key={`${imageUrl}-${index}`}
                      >

                        <img
                          src={imageUrl}
                          alt={`${medicine.name} medicine`}
                          loading="lazy"
                        />

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================
                ABOUT
            ================================= */}

            <section className="medicine-section">

              <div className="medicine-section-title">

                <BookOpen
                  size={20}
                />

                <div>

                  <h2>
                    About this medicine
                  </h2>

                  <p>
                    Key information
                    for pharmacy
                    students.
                  </p>

                </div>

              </div>

              <div className="medicine-overview">

                <p>
                  {selectedDrug.studyNotes ||
                    `Study information about ${
                      medicine.name ||
                      selectedDrug.name
                    }.`}
                </p>

              </div>

            </section>

            {/* =================================
                INFORMATION GRID
            ================================= */}

            <section className="medicine-info-grid">

              <div className="medicine-info-card">

                <div className="info-card-icon">
                  <Pill
                    size={20}
                  />
                </div>

                <span>
                  Drug class
                </span>

                <strong>
                  {medicine.drugClass ||
                    selectedDrug.drugClass ||
                    "Not available"}
                </strong>

              </div>

              <div className="medicine-info-card">

                <div className="info-card-icon">
                  <Package
                    size={20}
                  />
                </div>

                <span>
                  Category
                </span>

                <strong>
                  {medicine.category ||
                    selectedDrug.category ||
                    "Not available"}
                </strong>

              </div>

              <div className="medicine-info-card">

                <div className="info-card-icon">
                  <Stethoscope
                    size={20}
                  />
                </div>

                <span>
                  Drug type
                </span>

                <strong>
                  {medicine.tty ||
                    medicine.drugClass ||
                    "Not available"}
                </strong>

              </div>

            </section>

            {/* =================================
                DOSAGE FORMS
            ================================= */}

            {selectedDrug.dosageForms
              ?.length > 0 && (
              <section className="medicine-section">

                <div className="medicine-section-title">

                  <Package
                    size={20}
                  />

                  <div>

                    <h2>
                      Dosage Forms
                    </h2>

                    <p>
                      Available forms
                      in the study
                      library.
                    </p>

                  </div>

                </div>

                <div className="medicine-pill-list">

                  {selectedDrug.dosageForms.map(
                    (form) => (
                      <span
                        key={form}
                      >
                        {form}
                      </span>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================
                COMMON USES
            ================================= */}

            {selectedDrug.commonUses
              ?.length > 0 && (
              <section className="medicine-section">

                <div className="medicine-section-title">

                  <Stethoscope
                    size={20}
                  />

                  <div>

                    <h2>
                      Common Uses
                    </h2>

                    <p>
                      General educational
                      information.
                    </p>

                  </div>

                </div>

                <div className="medicine-list">

                  {selectedDrug.commonUses.map(
                    (use) => (
                      <div
                        className="medicine-list-item"
                        key={use}
                      >

                        <span className="list-dot" />

                        <p>
                          {use}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================
                SIDE EFFECTS
            ================================= */}

            {selectedDrug.commonSideEffects
              ?.length > 0 && (
              <section className="medicine-section">

                <div className="medicine-section-title">

                  <AlertCircle
                    size={20}
                  />

                  <div>

                    <h2>
                      Common Side Effects
                    </h2>

                    <p>
                      Review these
                      as part of
                      your study.
                    </p>

                  </div>

                </div>

                <div className="medicine-list">

                  {selectedDrug.commonSideEffects.map(
                    (effect) => (
                      <div
                        className="medicine-list-item"
                        key={effect}
                      >

                        <span className="list-dot" />

                        <p>
                          {effect}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================
                STUDY NOTE
            ================================= */}

            <section className="study-note-card">

              <div className="study-note-icon">
                <BookOpen
                  size={22}
                />
              </div>

              <div>

                <span>
                  STUDY NOTE
                </span>

                <h3>
                  Remember this medicine
                </h3>

                <p>
                  {selectedDrug.studyNotes ||
                    "Review this medicine again to strengthen your knowledge."}
                </p>

              </div>

            </section>

            {/* =================================
                DAILYMED
            ================================= */}

            {medicine.dailyMed && (
              <section className="medicine-section">

                <div className="medicine-section-title">

                  <BookOpen
                    size={20}
                  />

                  <div>

                    <h2>
                      Official Label
                      Reference
                    </h2>

                    <p>
                      Additional
                      information
                      retrieved from
                      DailyMed.
                    </p>

                  </div>

                </div>

                <div className="daily-med-card">

                  {medicine.dailyMed
                    .title && (
                    <div>

                      <span>
                        Label title
                      </span>

                      <strong>
                        {
                          medicine
                            .dailyMed
                            .title
                        }
                      </strong>

                    </div>
                  )}

                  {medicine.dailyMed
                    .published_date && (
                    <div>

                      <span>
                        Published
                      </span>

                      <strong>
                        {
                          medicine
                            .dailyMed
                            .published_date
                        }
                      </strong>

                    </div>
                  )}

                  {medicine.setId && (
                    <div>

                      <span>
                        Set ID
                      </span>

                      <strong>
                        {medicine.setId}
                      </strong>

                    </div>
                  )}

                </div>

              </section>
            )}

            {/* =================================
                DISCLAIMER
            ================================= */}

            <div className="medical-disclaimer">

              <strong>
                Educational reference only
              </strong>

              <p>
                PharmaStudy is designed
                for learning and study
                purposes. This information
                should not be used as a
                substitute for official
                prescribing information,
                professional judgment,
                diagnosis, or treatment.
              </p>

            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================
  // MAIN DRUG EXPLORER
  // =========================================

  return (
    <div className="drug-explorer">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="page-heading">

        <div>

          <p className="eyebrow">
            MEDICINE REFERENCE
          </p>

          <h2>
            Drug Explorer
          </h2>

          <p>
            Search your study library
            or look up medicines
            online.
          </p>

        </div>

      </section>

      {/* =====================================
          SEARCH CONTROLS
      ===================================== */}

      <section className="drug-controls">

        <div className="drug-search">

          {loading ? (
            <LoaderCircle
              size={19}
              className="loading-icon"
            />
          ) : (
            <Search size={19} />
          )}

          <input
            type="text"
            placeholder="Search medicines e.g. amoxicillin..."
            value={searchTerm}
            onChange={
              handleSearch
            }
          />

        </div>

        <select
          value={
            selectedCategory
          }
          onChange={(event) =>
            setSelectedCategory(
              event.target.value
            )
          }
        >

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}

        </select>

      </section>

      {/* =====================================
          ONLINE SEARCH STATUS
      ===================================== */}

      {searchTerm.trim()
        .length >= 2 && (
        <div className="online-search-status">

          {loading
            ? "Searching RxNorm..."
            : searchedOnline
            ? `Found ${apiResults.length} online medicine result${
                apiResults.length === 1
                  ? ""
                  : "s"
              }`
            : ""}

        </div>
      )}

      {/* =====================================
          RESULT COUNT
      ===================================== */}

      <div className="drug-count">

        <span>
          Showing{" "}
          {results.length}{" "}
          medicine
          {results.length === 1
            ? ""
            : "s"}
        </span>

      </div>

      {/* =====================================
          MEDICINE CARDS
      ===================================== */}

      <section className="drug-grid">

        {results.map(
          (drug) => (
            <article
              className="drug-card clickable"
              key={
                drug.rxcui ||
                drug.id ||
                drug.name
              }
              onClick={() =>
                openDrug(drug)
              }
            >

              {/* CARD HEADER */}

              <div className="drug-card-header">

                <div className="drug-icon">
                  <Pill
                    size={21}
                  />
                </div>

                <div>

                  <h3>
                    {drug.name}
                  </h3>

                  <span>
                    {
                      drug.genericName
                    }
                  </span>

                </div>

              </div>

              {/* TAGS */}

              <div className="drug-tags">

                <span>
                  {
                    drug.drugClass
                  }
                </span>

                {drug.rxcui && (
                  <span>
                    RxCUI:{" "}
                    {drug.rxcui}
                  </span>
                )}

              </div>

              {/* DOSAGE FORMS */}

              {drug.dosageForms
                ?.length > 0 && (
                <div className="drug-section">

                  <strong>
                    Dosage Forms
                  </strong>

                  <p>
                    {drug.dosageForms.join(
                      ", "
                    )}
                  </p>

                </div>
              )}

              {/* COMMON USES */}

              {drug.commonUses
                ?.length > 0 && (
                <div className="drug-section">

                  <strong>
                    Common Uses
                  </strong>

                  <ul>

                    {drug.commonUses.map(
                      (use) => (
                        <li
                          key={use}
                        >
                          {use}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* STUDY NOTE */}

              <div className="drug-study-note">

                <strong>
                  View medicine →
                </strong>

                <p>
                  Open the full
                  medicine profile.
                </p>

              </div>

            </article>
          )
        )}

      </section>

      {/* =====================================
          NO RESULTS
      ===================================== */}

      {!loading &&
        searchTerm.trim()
          .length >= 2 &&
        results.length === 0 && (
          <div className="empty-state">

            <Pill
              size={28}
            />

            <h3>
              No medicine found
            </h3>

            <p>
              Try another medicine
              name.
            </p>

          </div>
        )}

      {/* =====================================
          DISCLAIMER
      ===================================== */}

      <div className="medical-disclaimer">

        <strong>
          Educational reference
        </strong>

        <p>
          PharmaStudy is an educational
          learning tool. Medicine
          information should be verified
          against appropriate official
          references and professional
          guidance.
        </p>

      </div>

    </div>
  );
}

export default DrugExplorer;