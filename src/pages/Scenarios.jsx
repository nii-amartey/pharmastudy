import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Store,
} from "lucide-react";

import { incrementProgress } from "../utils/storage";

const SCENARIO_HISTORY_KEY =
  "pharmastudy_scenario_history";

const scenarioBank = [
  {
    id: "allergy-01",
    category: "OTC requests",
    scenario:
      "A patient asks for an over-the-counter medicine for seasonal allergy symptoms.",
    question:
      "What should you do first?",
    options: [
      "Ask about symptoms, age, medicines, and relevant medical history",
      "Immediately recommend the strongest available medicine",
      "Tell the patient to take any antihistamine they prefer",
      "Recommend antibiotics for the allergy symptoms",
    ],
    answer: 0,
    explanation:
      "Gathering relevant information first helps identify appropriate options and situations requiring referral.",
  },

  {
    id: "allergy-02",
    category: "OTC requests",
    scenario:
      "A patient requests an allergy medicine but says they are already taking several medicines.",
    question:
      "What is the most appropriate next step?",
    options: [
      "Check the patient's current medicines before recommending a product",
      "Tell the patient that allergy medicines never interact",
      "Recommend taking two allergy medicines together",
      "Ignore the existing medicines",
    ],
    answer: 0,
    explanation:
      "Reviewing current medicines can identify potential interactions, duplication, or precautions.",
  },

  {
    id: "missed-dose-01",
    category: "Adherence",
    scenario:
      "A patient says they forgot to take a scheduled medicine.",
    question:
      "What information is important before giving general guidance?",
    options: [
      "The medicine, prescribed schedule, and when the dose was missed",
      "Only the patient's favorite brand",
      "Only the color of the tablet",
      "Whether the patient prefers tablets or capsules",
    ],
    answer: 0,
    explanation:
      "Missed-dose advice depends on the specific medicine and dosing schedule.",
  },

  {
    id: "missed-dose-02",
    category: "Adherence",
    scenario:
      "A patient frequently forgets doses of a prescribed medicine.",
    question:
      "Which approach can support adherence?",
    options: [
      "Explore why doses are missed and discuss practical reminders",
      "Tell the patient to double every missed dose",
      "Tell the patient to stop treatment",
      "Ignore the issue unless symptoms appear",
    ],
    answer: 0,
    explanation:
      "Understanding the reason for missed doses can help identify practical adherence strategies.",
  },

  {
    id: "prescription-01",
    category: "Prescription safety",
    scenario:
      "A prescription contains an instruction that is unclear.",
    question:
      "What should happen before dispensing?",
    options: [
      "Clarify the unclear instruction with the appropriate prescriber or authorized source",
      "Guess what the prescriber intended",
      "Change the instruction without consultation",
      "Dispense the medicine using a random dose",
    ],
    answer: 0,
    explanation:
      "Unclear prescription instructions should be clarified rather than guessed.",
  },

  {
    id: "prescription-02",
    category: "Prescription safety",
    scenario:
      "A prescription appears to contain information that does not match the patient's details.",
    question:
      "What is the safest initial response?",
    options: [
      "Pause the dispensing process and verify the information",
      "Ignore the discrepancy",
      "Change the patient information yourself",
      "Dispense it and investigate later",
    ],
    answer: 0,
    explanation:
      "Patient and prescription details should be verified before dispensing when discrepancies are identified.",
  },

  {
    id: "storage-01",
    category: "Medicine storage",
    scenario:
      "A patient asks how a medicine should be stored.",
    question:
      "Where should you obtain the storage requirements?",
    options: [
      "The approved product information or appropriate medicine reference",
      "A guess based on the tablet's color",
      "A social media comment",
      "The patient's previous experience",
    ],
    answer: 0,
    explanation:
      "Storage requirements should be checked against reliable product information or professional references.",
  },

  {
    id: "storage-02",
    category: "Medicine storage",
    scenario:
      "A patient says a medicine has been stored in unsuitable conditions.",
    question:
      "What should you do?",
    options: [
      "Check the product-specific storage requirements and assess the situation",
      "Automatically assume the medicine is safe",
      "Automatically double the dose",
      "Tell the patient to freeze every medicine",
    ],
    answer: 0,
    explanation:
      "The effect of unsuitable storage depends on the specific medicine and conditions involved.",
  },

  {
    id: "adverse-01",
    category: "Adverse effects",
    scenario:
      "A patient reports a new symptom after starting a medicine.",
    question:
      "What is an important first step?",
    options: [
      "Gather details about the symptom, medicine, timing, and severity",
      "Immediately tell the patient to stop every medicine",
      "Assume the medicine caused the symptom",
      "Ignore the symptom",
    ],
    answer: 0,
    explanation:
      "Relevant details help determine whether further assessment or referral is appropriate.",
  },

  {
    id: "adverse-02",
    category: "Adverse effects",
    scenario:
      "A patient reports a severe or potentially serious reaction after taking a medicine.",
    question:
      "What is the appropriate approach?",
    options: [
      "Treat the situation as potentially urgent and arrange appropriate medical assessment",
      "Tell the patient to wait several weeks",
      "Recommend taking another medicine without assessment",
      "Ignore the reaction",
    ],
    answer: 0,
    explanation:
      "Potentially serious medicine reactions require prompt assessment rather than routine self-care advice.",
  },

  {
    id: "interactions-01",
    category: "Medicine interactions",
    scenario:
      "A patient wants to start an OTC product while taking prescription medicines.",
    question:
      "What should be checked?",
    options: [
      "The patient's medicines and the potential for interactions or duplication",
      "Only the package color",
      "Only the price",
      "Nothing because OTC products cannot interact",
    ],
    answer: 0,
    explanation:
      "OTC medicines can have interactions and precautions, so the medication list should be reviewed.",
  },

  {
    id: "interactions-02",
    category: "Medicine interactions",
    scenario:
      "A patient cannot remember the name of a medicine they take regularly.",
    question:
      "What is the best approach?",
    options: [
      "Try to verify the medicine using reliable information before making a recommendation",
      "Guess the medicine from its tablet color",
      "Assume it is harmless",
      "Recommend several medicines at once",
    ],
    answer: 0,
    explanation:
      "Reliable identification of current medicines is important when assessing interactions or safety.",
  },

  {
    id: "pediatric-01",
    category: "Patient assessment",
    scenario:
      "A parent asks for medicine for a young child.",
    question:
      "Which information is particularly important?",
    options: [
      "The child's age and weight, along with symptoms and relevant history",
      "Only the child's favorite flavor",
      "Only the package size",
      "Only the parent's preferred brand",
    ],
    answer: 0,
    explanation:
      "Age and weight can be important factors in pediatric medicine use, alongside symptoms and relevant history.",
  },

  {
    id: "pediatric-02",
    category: "Patient assessment",
    scenario:
      "A parent asks whether an adult medicine can simply be given to a child.",
    question:
      "What should you do?",
    options: [
      "Check whether the specific medicine and formulation are appropriate for the child",
      "Assume every adult medicine is suitable",
      "Tell the parent to give half the adult dose automatically",
      "Ignore the child's age",
    ],
    answer: 0,
    explanation:
      "Pediatric suitability depends on the specific medicine, formulation, dose, and patient factors.",
  },

  {
    id: "elderly-01",
    category: "Patient assessment",
    scenario:
      "An older patient takes several medicines and asks about adding another product.",
    question:
      "What should be considered?",
    options: [
      "Review the current medicines and relevant patient factors",
      "Assume interactions are impossible",
      "Recommend every product requested",
      "Ignore the existing medicines",
    ],
    answer: 0,
    explanation:
      "Multiple medicines increase the importance of reviewing the medication list and relevant patient factors.",
  },

  {
    id: "elderly-02",
    category: "Patient assessment",
    scenario:
      "An older patient says they sometimes confuse their medicines.",
    question:
      "What can help?",
    options: [
      "Discuss practical organization and adherence strategies",
      "Tell them to stop all medicines",
      "Tell them to take all medicines at once",
      "Ignore the concern",
    ],
    answer: 0,
    explanation:
      "Medication organization and practical adherence strategies can help reduce confusion.",
  },

  {
    id: "antibiotic-01",
    category: "Antibiotic awareness",
    scenario:
      "A patient asks for an antibiotic for symptoms that may be caused by a viral infection.",
    question:
      "What is an appropriate response?",
    options: [
      "Explain that antibiotics do not treat viral infections and assess whether referral is needed",
      "Provide an antibiotic for every cold",
      "Recommend doubling the antibiotic dose",
      "Tell the patient all infections require antibiotics",
    ],
    answer: 0,
    explanation:
      "Antibiotics treat susceptible bacterial infections, not viral infections such as many common colds.",
  },

  {
    id: "antibiotic-02",
    category: "Antibiotic awareness",
    scenario:
      "A patient has antibiotics remaining from an earlier illness and wants to use them for a new illness.",
    question:
      "What should you recommend?",
    options: [
      "Do not encourage using leftover antibiotics without appropriate assessment",
      "Tell the patient to use all remaining tablets",
      "Tell the patient to double the dose",
      "Recommend sharing them with a family member",
    ],
    answer: 0,
    explanation:
      "Leftover antibiotics should not be reused without appropriate assessment and a valid treatment plan.",
  },

  {
    id: "label-01",
    category: "Medicine labels",
    scenario:
      "A patient is unsure how to use a medicine after receiving it.",
    question:
      "What should you do?",
    options: [
      "Review the directions and explain the appropriate use clearly",
      "Tell the patient to guess",
      "Tell the patient to use it whenever they remember",
      "Ignore the question",
    ],
    answer: 0,
    explanation:
      "Clear instructions help patients use medicines safely and correctly.",
  },

  {
    id: "label-02",
    category: "Medicine labels",
    scenario:
      "A patient asks what a medicine label means.",
    question:
      "What is the best response?",
    options: [
      "Explain the instructions using clear language and check understanding",
      "Use only technical terminology",
      "Tell the patient to search social media",
      "Tell the patient labels are not important",
    ],
    answer: 0,
    explanation:
      "Clear communication and checking understanding support safe medicine use.",
  },

  {
    id: "referral-01",
    category: "Referral",
    scenario:
      "A patient presents with symptoms that appear severe or unusual.",
    question:
      "What should you consider?",
    options: [
      "Whether the patient needs prompt medical assessment or referral",
      "Whether the patient wants the cheapest product",
      "Whether the symptoms can be ignored",
      "Whether several unrelated medicines can be recommended",
    ],
    answer: 0,
    explanation:
      "Severe or unusual symptoms may require assessment beyond routine self-care.",
  },

  {
    id: "referral-02",
    category: "Referral",
    scenario:
      "A patient has symptoms that have persisted despite self-care.",
    question:
      "What is an appropriate consideration?",
    options: [
      "Consider referral for further assessment",
      "Continue changing OTC medicines indefinitely",
      "Ignore the persistent symptoms",
      "Automatically recommend antibiotics",
    ],
    answer: 0,
    explanation:
      "Persistent symptoms may require further assessment rather than repeated unsupervised self-treatment.",
  },

  {
    id: "counselling-01",
    category: "Patient counselling",
    scenario:
      "A patient appears unsure about the instructions for a new medicine.",
    question:
      "Which counselling technique is useful?",
    options: [
      "Ask the patient to explain how they will use the medicine",
      "Assume they understood everything",
      "Give no explanation",
      "Tell them to memorize the package",
    ],
    answer: 0,
    explanation:
      "Asking the patient to explain the instructions can help identify misunderstandings.",
  },

  {
    id: "counselling-02",
    category: "Patient counselling",
    scenario:
      "A patient asks the same medicine-use question several times.",
    question:
      "What is the best communication approach?",
    options: [
      "Repeat the explanation clearly and check what remains unclear",
      "Refuse to answer again",
      "Tell the patient to guess",
      "Give unrelated information",
    ],
    answer: 0,
    explanation:
      "Patient counselling should be clear, respectful, and responsive to remaining questions.",
  },
];

function shuffleArray(items) {
  const copy = [...items];

  for (
    let i = copy.length - 1;
    i > 0;
    i -= 1
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function getHistory() {
  try {
    const saved = localStorage.getItem(
      SCENARIO_HISTORY_KEY
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(
    SCENARIO_HISTORY_KEY,
    JSON.stringify(history)
  );
}

function getNewRound() {
  const history = getHistory();

  const available =
    scenarioBank.filter(
      (scenario) =>
        !history.includes(scenario.id)
    );

  if (available.length === 0) {
    saveHistory([]);
    return shuffleArray(scenarioBank);
  }

  return shuffleArray(available);
}

function Scenarios() {
  const [scenarioQueue, setScenarioQueue] =
    useState(() => getNewRound());

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [completed, setCompleted] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const currentScenario =
    scenarioQueue[currentIndex];

  const progressPercent = useMemo(() => {
    if (!scenarioQueue.length) {
      return 0;
    }

    return (
      (completed /
        scenarioQueue.length) *
      100
    );
  }, [completed, scenarioQueue.length]);

  useEffect(() => {
    if (!currentScenario) {
      return;
    }

    const history = getHistory();

    if (!history.includes(currentScenario.id)) {
      saveHistory([
        ...history,
        currentScenario.id,
      ]);
    }
  }, [currentScenario]);

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answerIndex);

    if (
      answerIndex ===
      currentScenario.answer
    ) {
      setScore((previous) => previous + 1);
    }

    setCompleted((previous) => previous + 1);

    incrementProgress(
      "scenariosCompleted"
    );
  };

  const handleNext = () => {
    if (
      currentIndex <
      scenarioQueue.length - 1
    ) {
      setCurrentIndex(
        (previous) => previous + 1
      );
      setSelectedAnswer(null);
      return;
    }

    setScenarioQueue(
      getNewRound()
    );

    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCompleted(0);
    setScore(0);
  };

  const restartRound = () => {
    setScenarioQueue(
      shuffleArray(scenarioBank)
    );

    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCompleted(0);
    setScore(0);

    saveHistory([]);
  };

  if (!currentScenario) {
    return null;
  }

  const answered =
    selectedAnswer !== null;

  const isCorrect =
    selectedAnswer ===
    currentScenario.answer;

  return (
    <div className="scenarios-page">
      <section className="page-heading">
        <p className="eyebrow">
          PHARMACY PRACTICE
        </p>

        <h2>
          Pharmacy Scenarios
        </h2>

        <p>
          Practise responding to common
          pharmacy situations and patient
          questions.
        </p>
      </section>

      <section className="scenario-container">
        <div className="scenario-top">
          <div className="scenario-category">
            <Store size={17} />

            <span>
              {currentScenario.category}
            </span>
          </div>

          <div className="scenario-counter">
            Question{" "}
            {currentIndex + 1} of{" "}
            {scenarioQueue.length}
          </div>
        </div>

        <div className="scenario-progress">
          <div
            className="scenario-progress-bar"
            style={{
              width: `${progressPercent}%`,
            }}
          />
        </div>

        <div className="scenario-content">
          <div className="scenario-label">
            PATIENT SITUATION
          </div>

          <div className="scenario-box">
            <p>
              {currentScenario.scenario}
            </p>
          </div>

          <h3 className="scenario-question">
            {currentScenario.question}
          </h3>

          <div className="scenario-answers">
            {currentScenario.options.map(
              (option, index) => {
                let className =
                  "scenario-answer";

                if (answered) {
                  if (
                    index ===
                    currentScenario.answer
                  ) {
                    className +=
                      " correct";
                  } else if (
                    index ===
                    selectedAnswer
                  ) {
                    className +=
                      " incorrect";
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    className={className}
                    onClick={() =>
                      handleAnswer(
                        index
                      )
                    }
                    disabled={answered}
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      {option}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {answered && (
            <div
              className={
                isCorrect
                  ? "scenario-feedback correct-feedback"
                  : "scenario-feedback incorrect-feedback"
              }
            >
              <div className="feedback-title">
                <CheckCircle
                  size={18}
                />

                <strong>
                  {isCorrect
                    ? "Correct"
                    : "Review this answer"}
                </strong>
              </div>

              <p>
                {
                  currentScenario.explanation
                }
              </p>
            </div>
          )}
        </div>

        <div className="scenario-footer">
          <div className="scenario-score">
            Score:{" "}
            <strong>
              {score}
            </strong>
          </div>

          <div className="scenario-footer-actions">
            <button
              type="button"
              className="scenario-restart"
              onClick={restartRound}
            >
              <RotateCcw size={16} />
              New round
            </button>

            {answered && (
              <button
                type="button"
                className="scenario-next"
                onClick={handleNext}
              >
                Next scenario
                <ChevronRight
                  size={17}
                />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="scenario-info">
        <div className="scenario-info-icon">
          <Shuffle size={19} />
        </div>

        <div>
          <strong>
            Randomized question bank
          </strong>

          <p>
            {scenarioBank.length} pharmacy
            scenarios are available. Each
            question is shuffled so you can
            practise different situations
            instead of seeing the same order
            every time.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Scenarios;