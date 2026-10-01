import { useState } from "react";

import {
  Star,
  Pill,
  Trash2,
  ArrowRight,
} from "lucide-react";

import {
  getFavorites,
  removeFavorite,
  getMedicineKey,
} from "../utils/storage";

function Favorites({ onOpenMedicine }) {
  const [favorites, setFavorites] =
    useState(getFavorites());

  // =========================================
  // REMOVE FAVORITE
  // =========================================

  const handleRemove = (medicine) => {
    const updated =
      removeFavorite(medicine);

    setFavorites(updated);
  };

  // =========================================
  // EMPTY STATE
  // =========================================

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">

        <section className="page-heading">

          <div>

            <p className="eyebrow">
              YOUR LIBRARY
            </p>

            <h2>
              Saved Medicines
            </h2>

            <p>
              Medicines you saved
              for later study.
            </p>

          </div>

          <div className="saved-count">

            <Star
              size={18}
              fill="currentColor"
            />

            <span>
              0 saved
            </span>

          </div>

        </section>

        <div className="favorites-empty">

          <div className="favorites-empty-icon">
            <Star size={30} />
          </div>

          <h3>
            No saved medicines yet
          </h3>

          <p>
            Open Drug Explorer and
            save medicines that you
            want to review later.
          </p>

        </div>

      </div>
    );
  }

  // =========================================
  // SAVED MEDICINES
  // =========================================

  return (
    <div className="favorites-page">

      <section className="page-heading">

        <div>

          <p className="eyebrow">
            YOUR LIBRARY
          </p>

          <h2>
            Saved Medicines
          </h2>

          <p>
            Medicines you saved
            for later study.
          </p>

        </div>

        <div className="saved-count">

          <Star
            size={18}
            fill="currentColor"
          />

          <span>
            {favorites.length}{" "}
            {favorites.length === 1
              ? "saved"
              : "saved"}
          </span>

        </div>

      </section>

      <section className="favorites-grid">

        {favorites.map(
          (medicine) => {

            const medicineKey =
              getMedicineKey(
                medicine
              );

            return (
              <article
                className="favorite-medicine-card"
                key={medicineKey}
              >

                {/* ICON */}

                <div className="favorite-card-icon">

                  <Pill size={24} />

                </div>

                {/* INFORMATION */}

                <div className="favorite-card-content">

                  <h3>
                    {medicine.name ||
                      "Unknown medicine"}
                  </h3>

                  <p>
                    {medicine.genericName ||
                      medicine.name ||
                      "Medicine"}
                  </p>

                  <span>
                    {medicine.drugClass ||
                      medicine.category ||
                      "Medicine"}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="favorite-card-actions">

                  <button
                    type="button"
                    className="open-favorite-button"
                    onClick={() =>
                      onOpenMedicine(
                        medicine
                      )
                    }
                    title="Open medicine"
                  >

                    <ArrowRight
                      size={17}
                    />

                  </button>

                  <button
                    type="button"
                    className="remove-favorite-button"
                    onClick={() =>
                      handleRemove(
                        medicine
                      )
                    }
                    title="Remove medicine"
                  >

                    <Trash2
                      size={17}
                    />

                  </button>

                </div>

              </article>
            );
          }
        )}

      </section>

    </div>
  );
}

export default Favorites;