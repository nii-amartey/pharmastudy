import { useState } from "react";
import {
  Settings as SettingsIcon,
  RotateCcw,
  Trash2,
  Info,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import {
  resetProgress,
  clearFavorites,
} from "../utils/storage";

function Settings() {
  const [message, setMessage] =
    useState("");

  const handleResetProgress = () => {
    const confirmed = window.confirm(
      "Reset all learning progress? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    resetProgress();

    setMessage(
      "Learning progress has been reset."
    );
  };

  const handleClearFavorites = () => {
    const confirmed = window.confirm(
      "Remove all saved medicines?"
    );

    if (!confirmed) {
      return;
    }

    clearFavorites();

    setMessage(
      "Saved medicines have been cleared."
    );
  };

  return (
    <div className="settings-page">
      <section className="page-heading">
        <p className="eyebrow">
          APPLICATION
        </p>

        <h2>Settings</h2>

        <p>
          Manage your PharmaStudy
          preferences and learning data.
        </p>
      </section>

      {message && (
        <div className="settings-message">
          <CheckCircle size={18} />

          <span>{message}</span>

          <button
            type="button"
            onClick={() =>
              setMessage("")
            }
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <SettingsIcon size={21} />
            </div>

            <div>
              <h3>
                Learning preferences
              </h3>

              <p>
                Information about your
                current learning setup.
              </p>
            </div>
          </div>

          <div className="settings-info-list">
            <div className="settings-info-row">
              <span>Application</span>
              <strong>
                PharmaStudy
              </strong>
            </div>

            <div className="settings-info-row">
              <span>Version</span>
              <strong>
                1.0.0
              </strong>
            </div>

            <div className="settings-info-row">
              <span>Storage</span>
              <strong>
                Local browser storage
              </strong>
            </div>

            <div className="settings-info-row">
              <span>Backend</span>
              <strong>
                Not required
              </strong>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h3>
                Your data
              </h3>

              <p>
                Manage locally stored
                learning information.
              </p>
            </div>
          </div>

          <div className="settings-actions">
            <div className="settings-action">
              <div>
                <strong>
                  Reset learning progress
                </strong>

                <p>
                  Clears quiz, flashcard,
                  calculation, and scenario
                  progress.
                </p>
              </div>

              <button
                type="button"
                className="settings-danger-button"
                onClick={
                  handleResetProgress
                }
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            <div className="settings-action">
              <div>
                <strong>
                  Clear saved medicines
                </strong>

                <p>
                  Removes all medicines
                  saved in Drug Explorer.
                </p>
              </div>

              <button
                type="button"
                className="settings-danger-button"
                onClick={
                  handleClearFavorites
                }
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <Info size={21} />
            </div>

            <div>
              <h3>
                About PharmaStudy
              </h3>

              <p>
                What this application is
                designed for.
              </p>
            </div>
          </div>

          <div className="about-content">
            <p>
              PharmaStudy is a
              frontend-focused educational
              application designed to help
              pharmacy students practise
              medicine knowledge,
              calculations, quizzes,
              flashcards, and pharmacy
              scenarios.
            </p>

            <p>
              The application stores
              learning progress and saved
              medicines locally in the
              browser.
            </p>
          </div>
        </section>

        <section className="settings-card disclaimer-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h3>
                Educational use
              </h3>

              <p>
                Important information about
                using the application.
              </p>
            </div>
          </div>

          <div className="disclaimer-content">
            <p>
              PharmaStudy is an educational
              and study-support tool. It is
              not intended to replace
              professional training, approved
              medicine information, clinical
              references, or advice from a
              qualified healthcare
              professional.
            </p>

            <p>
              Always verify medicine-related
              information using appropriate
              professional and official
              references before applying it
              in real practice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;