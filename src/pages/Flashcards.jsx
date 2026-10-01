import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  XCircle,
} from "lucide-react";

import { incrementProgress } from "../utils/storage";

const flashcardBank = [
  {
    id: "f01",
    category: "Drug Knowledge",
    front: "What drug class is amoxicillin?",
    back: "Amoxicillin is a penicillin antibiotic.",
  },
  {
    id: "f02",
    category: "Drug Knowledge",
    front: "What drug class is ibuprofen?",
    back: "Ibuprofen is a non-steroidal anti-inflammatory drug (NSAID).",
  },
  {
    id: "f03",
    category: "Drug Knowledge",
    front: "What drug class is cetirizine?",
    back: "Cetirizine is an antihistamine.",
  },
  {
    id: "f04",
    category: "Drug Knowledge",
    front: "What drug class is omeprazole?",
    back: "Omeprazole is a proton pump inhibitor (PPI).",
  },
  {
    id: "f05",
    category: "Drug Knowledge",
    front: "What drug class is metformin?",
    back: "Metformin is a biguanide medicine.",
  },
  {
    id: "f06",
    category: "Drug Knowledge",
    front: "What drug class is amlodipine?",
    back: "Amlodipine is a calcium channel blocker.",
  },
  {
    id: "f07",
    category: "Drug Knowledge",
    front: "What drug class is salbutamol?",
    back: "Salbutamol is a short-acting beta-2 agonist.",
  },
  {
    id: "f08",
    category: "Drug Knowledge",
    front: "What is paracetamol commonly used for?",
    back: "Pain relief and reduction of fever.",
  },

  {
    id: "f09",
    category: "Pharmacology",
    front: "What is an analgesic?",
    back: "A medicine used to relieve pain.",
  },
  {
    id: "f10",
    category: "Pharmacology",
    front: "What is an antipyretic?",
    back: "A medicine used to reduce fever.",
  },
  {
    id: "f11",
    category: "Pharmacology",
    front: "What does an antihistamine affect?",
    back: "It reduces effects mediated by histamine receptors.",
  },
  {
    id: "f12",
    category: "Pharmacology",
    front: "What do proton pump inhibitors reduce?",
    back: "They reduce gastric acid secretion.",
  },
  {
    id: "f13",
    category: "Pharmacology",
    front: "What is a beta-2 agonist used for?",
    back: "It can produce bronchodilation and help relieve bronchospasm.",
  },
  {
    id: "f14",
    category: "Pharmacology",
    front: "What is an antibiotic?",
    back: "A medicine used to treat susceptible bacterial infections.",
  },
  {
    id: "f15",
    category: "Pharmacology",
    front: "What is an NSAID?",
    back: "A non-steroidal anti-inflammatory drug.",
  },
  {
    id: "f16",
    category: "Pharmacology",
    front: "What is a calcium channel blocker?",
    back: "A medicine that reduces calcium entry through certain calcium channels.",
  },

  {
    id: "f17",
    category: "Pharmacy Practice",
    front: "Why is patient counselling important?",
    back: "It supports safe and appropriate medicine use.",
  },
  {
    id: "f18",
    category: "Pharmacy Practice",
    front: "What should you do if a prescription is unclear?",
    back: "Clarify the prescription before dispensing.",
  },
  {
    id: "f19",
    category: "Pharmacy Practice",
    front: "Why check a patient's current medicines?",
    back: "To identify possible interactions, duplication, and safety concerns.",
  },
  {
    id: "f20",
    category: "Pharmacy Practice",
    front: "What should you do when medicine information is uncertain?",
    back: "Check a reliable professional reference.",
  },
  {
    id: "f21",
    category: "Pharmacy Practice",
    front: "What is medication adherence?",
    back: "The extent to which a patient follows the agreed medicine regimen.",
  },
  {
    id: "f22",
    category: "Pharmacy Practice",
    front: "Why is accurate documentation important?",
    back: "It supports communication, accountability, and continuity of care.",
  },
  {
    id: "f23",
    category: "Pharmacy Practice",
    front: "What is an OTC medicine?",
    back: "A medicine available without a prescription under applicable regulations.",
  },
  {
    id: "f24",
    category: "Pharmacy Practice",
    front: "Why should medicine instructions be explained clearly?",
    back: "Clear instructions help patients use medicines safely and correctly.",
  },

  {
    id: "f25",
    category: "Medication Safety",
    front: "What is medication duplication?",
    back: "Unnecessary use of medicines with overlapping ingredients or effects.",
  },
  {
    id: "f26",
    category: "Medication Safety",
    front: "Why check for medicine interactions?",
    back: "Some medicines can alter the effects or safety of other medicines.",
  },
  {
    id: "f27",
    category: "Medication Safety",
    front: "What should you do if a medicine cannot be identified?",
    back: "Verify its identity using reliable information before proceeding.",
  },
  {
    id: "f28",
    category: "Medication Safety",
    front: "Why are storage conditions important?",
    back: "Improper storage can affect medicine quality or stability.",
  },
  {
    id: "f29",
    category: "Medication Safety",
    front: "What should you check on a medicine package?",
    back: "Relevant details such as name, strength, directions, and expiry information.",
  },
  {
    id: "f30",
    category: "Medication Safety",
    front: "Why should patients avoid guessing medicine doses?",
    back: "Incorrect doses can reduce effectiveness or increase risk.",
  },
  {
    id: "f31",
    category: "Medication Safety",
    front: "What is an adverse drug reaction?",
    back: "A harmful and unintended response to a medicine used at normal doses.",
  },
  {
    id: "f32",
    category: "Medication Safety",
    front: "Why should serious medicine reactions be assessed?",
    back: "Serious reactions may require prompt medical attention.",
  },

  {
    id: "f33",
    category: "OTC & Counselling",
    front: "What should be assessed before recommending an OTC medicine?",
    back: "Symptoms, duration, patient factors, and current medicines.",
  },
  {
    id: "f34",
    category: "OTC & Counselling",
    front: "What information can be important for a child?",
    back: "Age and weight can be important when assessing medicine use.",
  },
  {
    id: "f35",
    category: "OTC & Counselling",
    front: "Why ask about allergies?",
    back: "Allergy history can affect medicine safety.",
  },
  {
    id: "f36",
    category: "OTC & Counselling",
    front: "Why ask how long symptoms have lasted?",
    back: "Duration can help determine whether self-care is appropriate.",
  },
  {
    id: "f37",
    category: "OTC & Counselling",
    front: "What should happen if symptoms persist?",
    back: "Further assessment or referral may be appropriate.",
  },
  {
    id: "f38",
    category: "OTC & Counselling",
    front: "Should leftover antibiotics be reused without assessment?",
    back: "No. Antibiotics should be used according to an appropriate treatment plan.",
  },
  {
    id: "f39",
    category: "OTC & Counselling",
    front: "Why check other medicines before OTC recommendations?",
    back: "OTC medicines can interact with existing medicines or duplicate ingredients.",
  },
  {
    id: "f40",
    category: "OTC & Counselling",
    front: "What is the purpose of the teach-back approach?",
    back: "To check whether the patient understands the instructions.",
  },

  {
    id: "f41",
    category: "Calculations",
    front: "What is the basic dose-volume formula?",
    back: "Volume required = (dose required ÷ dose available) × volume available.",
  },
  {
    id: "f42",
    category: "Calculations",
    front: "What is 5% of 200 mL?",
    back: "10 mL.",
  },
  {
    id: "f43",
    category: "Calculations",
    front: "500 mg requires how many 250 mg tablets?",
    back: "2 tablets.",
  },
  {
    id: "f44",
    category: "Calculations",
    front: "750 mg requires how many 250 mg tablets?",
    back: "3 tablets.",
  },
  {
    id: "f45",
    category: "Calculations",
    front: "250 mg is available in 5 mL. How much gives 250 mg?",
    back: "5 mL.",
  },
  {
    id: "f46",
    category: "Calculations",
    front: "250 mg is available in 5 mL. How much gives 500 mg?",
    back: "10 mL.",
  },
  {
    id: "f47",
    category: "Calculations",
    front: "What does percentage mean in a calculation?",
    back: "A proportion expressed per hundred.",
  },
  {
    id: "f48",
    category: "Calculations",
    front: "What should you check after a medicine calculation?",
    back: "The arithmetic, units, reasonableness, and required precision.",
  },

  {
    id: "f49",
    category: "Patient Assessment",
    front: "Why is patient history relevant to medicine use?",
    back: "It can identify precautions, contraindications, and referral needs.",
  },
  {
    id: "f50",
    category: "Patient Assessment",
    front: "What is a red flag?",
    back: "A finding that may indicate the need for further or urgent assessment.",
  },
  {
    id: "f51",
    category: "Patient Assessment",
    front: "Why assess symptom severity?",
    back: "Severity can help determine appropriate self-care or referral.",
  },
  {
    id: "f52",
    category: "Patient Assessment",
    front: "Why ask about pregnancy when relevant?",
    back: "Pregnancy can affect medicine selection and safety considerations.",
  },
  {
    id: "f53",
    category: "Patient Assessment",
    front: "Why ask about allergies before recommending medicines?",
    back: "Allergies can create important safety concerns.",
  },
  {
    id: "f54",
    category: "Patient Assessment",
    front: "Why ask about existing medical conditions?",
    back: "Conditions can affect medicine choice, precautions, and safety.",
  },

  {
    id: "f55",
    category: "Professional Practice",
    front: "What is a reliable medicine reference?",
    back: "An authoritative source used to verify medicine information.",
  },
  {
    id: "f56",
    category: "Professional Practice",
    front: "Why is clear communication important in pharmacy?",
    back: "It supports understanding, safety, and effective patient care.",
  },
  {
    id: "f57",
    category: "Professional Practice",
    front: "What should happen after identifying a medication error?",
    back: "Follow appropriate procedures to assess, address, and document it.",
  },
  {
    id: "f58",
    category: "Professional Practice",
    front: "What does confidentiality mean?",
    back: "Protecting private patient information from inappropriate disclosure.",
  },
  {
    id: "f59",
    category: "Professional Practice",
    front: "Why should pharmacists verify uncertain information?",
    back: "Verification reduces the risk of providing incorrect information.",
  },
  {
    id: "f60",
    category: "Professional Practice",
    front: "What is a key goal of pharmacy practice?",
    back: "Promoting safe and appropriate use of medicines.",
  },
];

function shuffleArray(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function createDeck() {
  return shuffleArray(flashcardBank);
}

function Flashcards() {
  const [cards, setCards] = useState(() =>
    createDeck()
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [revealed, setRevealed] =
    useState(false);

  const [knownCount, setKnownCount] =
    useState(0);

  const [reviewCount, setReviewCount] =
    useState(0);

  const [completed, setCompleted] =
    useState(false);

  const currentCard = cards[currentIndex];

  const progress =
    ((currentIndex + 1) / cards.length) * 100;

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
    }
  };

  const markCard = (known) => {
    if (!revealed) {
      return;
    }

    if (known) {
      setKnownCount(
        (previous) => previous + 1
      );
    } else {
      setReviewCount(
        (previous) => previous + 1
      );
    }

    incrementProgress(
      "flashcardsReviewed"
    );

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(
        (previous) => previous + 1
      );
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      );
      setRevealed(false);
    }
  };

  const newRound = () => {
    setCards(createDeck());
    setCurrentIndex(0);
    setRevealed(false);
    setKnownCount(0);
    setReviewCount(0);
    setCompleted(false);
  };

  const percentage = useMemo(() => {
    if (!cards.length) {
      return 0;
    }

    return Math.round(
      (knownCount / cards.length) * 100
    );
  }, [knownCount, cards.length]);

  if (completed) {
    return (
      <div className="flashcards-page">
        <section className="page-heading">
          <p className="eyebrow">
            ACTIVE RECALL
          </p>

          <h2>
            Flashcards Complete
          </h2>

          <p>
            You completed this randomized
            60-card study round.
          </p>
        </section>

        <div className="flashcards-result">
          <div className="flashcards-result-icon">
            <CheckCircle size={40} />
          </div>

          <p className="result-eyebrow">
            ROUND COMPLETE
          </p>

          <div className="flashcards-score">
            {knownCount}
            <span>
              / {cards.length}
            </span>
          </div>

          <h3>
            {percentage}% marked as known
          </h3>

          <div className="flashcards-result-stats">
            <div>
              <CheckCircle size={18} />
              <strong>
                {knownCount}
              </strong>
              <span>
                Known
              </span>
            </div>

            <div>
              <XCircle size={18} />
              <strong>
                {reviewCount}
              </strong>
              <span>
                Review again
              </span>
            </div>
          </div>

          <p>
            Start a new round to shuffle all
            60 cards and practise again.
          </p>

          <button
            type="button"
            className="flashcards-primary-button"
            onClick={newRound}
          >
            <Shuffle size={18} />
            Start New Round
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-page">
      <section className="page-heading">
        <p className="eyebrow">
          ACTIVE RECALL
        </p>

        <h2>
          Pharmacy Flashcards
        </h2>

        <p>
          Review important pharmacy concepts
          with randomized study cards.
        </p>
      </section>

      <section className="flashcards-container">
        <div className="flashcards-top">
          <div className="flashcards-topic">
            <BookOpen size={18} />

            <span>
              {currentCard.category}
            </span>
          </div>

          <div className="flashcards-counter">
            Card {currentIndex + 1} of{" "}
            {cards.length}
          </div>
        </div>

        <div className="flashcards-progress">
          <div
            className="flashcards-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div
          className={`flashcard ${
            revealed ? "revealed" : ""
          }`}
          onClick={handleReveal}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              handleReveal();
            }
          }}
        >
          <div className="flashcard-label">
            {revealed
              ? "ANSWER"
              : "QUESTION"}
          </div>

          <div className="flashcard-content">
            {revealed
              ? currentCard.back
              : currentCard.front}
          </div>

          {!revealed && (
            <div className="flashcard-hint">
              Tap the card or use the button
              below to reveal the answer.
            </div>
          )}
        </div>

        {!revealed ? (
          <button
            type="button"
            className="reveal-button"
            onClick={handleReveal}
          >
            <BookOpen size={18} />
            Reveal Answer
          </button>
        ) : (
          <div className="flashcard-rating">
            <p>
              How well did you know this?
            </p>

            <div className="flashcard-rating-buttons">
              <button
                type="button"
                className="review-button"
                onClick={() =>
                  markCard(false)
                }
              >
                <XCircle size={18} />
                Review Again
              </button>

              <button
                type="button"
                className="known-button"
                onClick={() =>
                  markCard(true)
                }
              >
                <CheckCircle size={18} />
                I Know This
              </button>
            </div>
          </div>
        )}

        <div className="flashcards-footer">
          <div className="flashcards-stats">
            <span>
              Known:{" "}
              <strong>
                {knownCount}
              </strong>
            </span>

            <span>
              Review:{" "}
              <strong>
                {reviewCount}
              </strong>
            </span>
          </div>

          <div className="flashcards-footer-actions">
            <button
              type="button"
              className="flashcards-secondary-button"
              onClick={previousCard}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            <button
              type="button"
              className="flashcards-secondary-button"
              onClick={newRound}
            >
              <RotateCcw size={16} />
              New Round
            </button>

            {revealed &&
              currentIndex <
                cards.length - 1 && (
                <button
                  type="button"
                  className="flashcards-primary-button"
                  onClick={() =>
                    markCard(true)
                  }
                >
                  I Know This
                  <ChevronRight
                    size={17}
                  />
                </button>
              )}
          </div>
        </div>
      </section>

      <section className="flashcards-info">
        <div className="flashcards-info-icon">
          <Shuffle size={20} />
        </div>

        <div>
          <strong>
            Randomized study bank
          </strong>

          <p>
            {flashcardBank.length} flashcards
            cover drug knowledge, pharmacology,
            pharmacy practice, calculations,
            medication safety, counselling,
            patient assessment, and professional
            practice.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Flashcards;