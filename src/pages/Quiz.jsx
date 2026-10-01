import { useMemo, useState } from "react";
import {
  Brain,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
} from "lucide-react";

import { incrementProgress } from "../utils/storage";

const questionBank = [
  {
    id: "q01",
    category: "Drug Knowledge",
    question:
      "Which drug class does amoxicillin belong to?",
    options: [
      "Penicillin antibiotic",
      "Antihistamine",
      "Proton pump inhibitor",
      "Calcium channel blocker",
    ],
    answer: 0,
    explanation:
      "Amoxicillin is a beta-lactam antibiotic in the penicillin group.",
  },
  {
    id: "q02",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly classified as a proton pump inhibitor?",
    options: [
      "Omeprazole",
      "Amlodipine",
      "Cetirizine",
      "Metformin",
    ],
    answer: 0,
    explanation:
      "Omeprazole is a proton pump inhibitor used to reduce gastric acid secretion.",
  },
  {
    id: "q03",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly used as an antihistamine?",
    options: [
      "Cetirizine",
      "Metformin",
      "Ibuprofen",
      "Omeprazole",
    ],
    answer: 0,
    explanation:
      "Cetirizine is an antihistamine commonly used for allergic symptoms.",
  },
  {
    id: "q04",
    category: "Drug Knowledge",
    question:
      "Which medicine is a calcium channel blocker?",
    options: [
      "Amlodipine",
      "Amoxicillin",
      "Paracetamol",
      "Cetirizine",
    ],
    answer: 0,
    explanation:
      "Amlodipine is a calcium channel blocker used in cardiovascular conditions.",
  },
  {
    id: "q05",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly classified as a biguanide?",
    options: [
      "Metformin",
      "Ibuprofen",
      "Salbutamol",
      "Amlodipine",
    ],
    answer: 0,
    explanation:
      "Metformin belongs to the biguanide class of medicines.",
  },
  {
    id: "q06",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly used as a short-acting beta-2 agonist?",
    options: [
      "Salbutamol",
      "Omeprazole",
      "Metformin",
      "Amoxicillin",
    ],
    answer: 0,
    explanation:
      "Salbutamol is a short-acting beta-2 agonist used for relief of bronchospasm.",
  },
  {
    id: "q07",
    category: "Drug Knowledge",
    question:
      "Which medicine is an NSAID?",
    options: [
      "Ibuprofen",
      "Cetirizine",
      "Omeprazole",
      "Metformin",
    ],
    answer: 0,
    explanation:
      "Ibuprofen is a non-steroidal anti-inflammatory drug.",
  },
  {
    id: "q08",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly used as an analgesic and antipyretic?",
    options: [
      "Paracetamol",
      "Amlodipine",
      "Cetirizine",
      "Omeprazole",
    ],
    answer: 0,
    explanation:
      "Paracetamol is commonly used for pain relief and reduction of fever.",
  },

  {
    id: "q09",
    category: "Pharmacy Practice",
    question:
      "What should be checked when a prescription instruction is unclear?",
    options: [
      "The instruction should be clarified",
      "The pharmacist should guess",
      "The patient should choose the dose",
      "The instruction should be ignored",
    ],
    answer: 0,
    explanation:
      "Unclear prescription directions should be clarified before dispensing.",
  },
  {
    id: "q10",
    category: "Pharmacy Practice",
    question:
      "Why is patient counselling important?",
    options: [
      "It supports safe and appropriate medicine use",
      "It removes the need for medicine labels",
      "It guarantees every medicine will work",
      "It replaces professional references",
    ],
    answer: 0,
    explanation:
      "Counselling helps patients understand how to use medicines safely and appropriately.",
  },
  {
    id: "q11",
    category: "Pharmacy Practice",
    question:
      "What is important before recommending an OTC medicine?",
    options: [
      "Assess relevant symptoms and patient factors",
      "Recommend the most expensive product",
      "Always recommend two medicines",
      "Ignore existing medicines",
    ],
    answer: 0,
    explanation:
      "A basic assessment helps identify appropriate self-care options and possible referral needs.",
  },
  {
    id: "q12",
    category: "Pharmacy Practice",
    question:
      "What should you do if a patient reports a potentially serious reaction?",
    options: [
      "Arrange appropriate medical assessment",
      "Ignore the reaction",
      "Recommend another medicine immediately",
      "Tell the patient to wait several weeks",
    ],
    answer: 0,
    explanation:
      "Potentially serious reactions require appropriate and timely assessment.",
  },
  {
    id: "q13",
    category: "Pharmacy Practice",
    question:
      "What is a useful way to check whether a patient understands counselling?",
    options: [
      "Ask the patient to explain how they will use the medicine",
      "Ask only whether they heard you",
      "Assume understanding",
      "Avoid asking questions",
    ],
    answer: 0,
    explanation:
      "Having the patient explain the instructions can reveal misunderstandings.",
  },
  {
    id: "q14",
    category: "Pharmacy Practice",
    question:
      "What should be done when patient information on a prescription appears inconsistent?",
    options: [
      "Verify the information before dispensing",
      "Ignore the discrepancy",
      "Change it without verification",
      "Dispense immediately",
    ],
    answer: 0,
    explanation:
      "Patient and prescription details should be verified when discrepancies are identified.",
  },
  {
    id: "q15",
    category: "Pharmacy Practice",
    question:
      "What is an important source for medicine storage requirements?",
    options: [
      "Approved product information",
      "The color of the package",
      "A social media comment",
      "A guess",
    ],
    answer: 0,
    explanation:
      "Storage conditions should be checked using reliable medicine information.",
  },
  {
    id: "q16",
    category: "Pharmacy Practice",
    question:
      "What should happen when symptoms persist despite self-care?",
    options: [
      "Consider further assessment or referral",
      "Continue changing medicines indefinitely",
      "Ignore the symptoms",
      "Automatically recommend antibiotics",
    ],
    answer: 0,
    explanation:
      "Persistent symptoms may require assessment beyond routine self-care.",
  },

  {
    id: "q17",
    category: "Medication Safety",
    question:
      "Why should a patient's current medicines be reviewed before adding another medicine?",
    options: [
      "To identify interactions and duplication",
      "To increase the number of medicines",
      "To avoid reading labels",
      "To determine the patient's favorite brand",
    ],
    answer: 0,
    explanation:
      "Reviewing current medicines helps identify potential interactions and duplicate therapy.",
  },
  {
    id: "q18",
    category: "Medication Safety",
    question:
      "What should you do if you cannot identify a patient's current medicine?",
    options: [
      "Verify the medicine using reliable information",
      "Guess from the tablet color",
      "Assume it is harmless",
      "Recommend another medicine",
    ],
    answer: 0,
    explanation:
      "Medicine identification should be verified before making safety-related recommendations.",
  },
  {
    id: "q19",
    category: "Medication Safety",
    question:
      "Which action is appropriate when a medicine label is unclear to a patient?",
    options: [
      "Explain the instructions clearly",
      "Tell the patient to guess",
      "Tell the patient labels are unnecessary",
      "Ignore the question",
    ],
    answer: 0,
    explanation:
      "Clear explanation of medicine directions supports safe use.",
  },
  {
    id: "q20",
    category: "Medication Safety",
    question:
      "What should be considered when an older patient takes many medicines?",
    options: [
      "Potential interactions and patient-specific factors",
      "Only the price of medicines",
      "Only tablet color",
      "Nothing different from any other situation",
    ],
    answer: 0,
    explanation:
      "Multiple medicines make medication review and patient-specific assessment especially important.",
  },

  {
    id: "q21",
    category: "OTC & Counselling",
    question:
      "A patient asks for an allergy medicine. What should be assessed first?",
    options: [
      "Symptoms and relevant patient factors",
      "Only the preferred brand",
      "Only the package size",
      "Only the price",
    ],
    answer: 0,
    explanation:
      "Understanding the symptoms and patient factors helps determine an appropriate response.",
  },
  {
    id: "q22",
    category: "OTC & Counselling",
    question:
      "Why should a pharmacist ask about other medicines before recommending an OTC product?",
    options: [
      "Some OTC products can interact with other medicines",
      "OTC medicines never have effects",
      "It is required only for expensive medicines",
      "It determines the patient's favorite color",
    ],
    answer: 0,
    explanation:
      "OTC products can have interactions, precautions, and duplicate ingredients.",
  },
  {
    id: "q23",
    category: "OTC & Counselling",
    question:
      "What is an important consideration when a parent requests medicine for a child?",
    options: [
      "The child's age and weight",
      "Only the parent's preferred brand",
      "Only the package color",
      "Only the price",
    ],
    answer: 0,
    explanation:
      "Age and weight can be important factors in pediatric medicine use.",
  },
  {
    id: "q24",
    category: "OTC & Counselling",
    question:
      "What should be done if a patient asks to use leftover antibiotics?",
    options: [
      "Do not encourage reuse without appropriate assessment",
      "Tell them to double the dose",
      "Tell them to share them",
      "Tell them to use all remaining tablets",
    ],
    answer: 0,
    explanation:
      "Leftover antibiotics should not be reused without appropriate assessment and a valid treatment plan.",
  },

  {
    id: "q25",
    category: "Pharmacology",
    question:
      "What is the main purpose of an analgesic?",
    options: [
      "To relieve pain",
      "To treat bacterial infection",
      "To reduce gastric acid only",
      "To treat allergic reactions only",
    ],
    answer: 0,
    explanation:
      "Analgesics are medicines used to relieve pain.",
  },
  {
    id: "q26",
    category: "Pharmacology",
    question:
      "What is an antipyretic used for?",
    options: [
      "Reducing fever",
      "Treating bacterial infections",
      "Increasing blood glucose",
      "Treating dehydration",
    ],
    answer: 0,
    explanation:
      "Antipyretic medicines are used to reduce fever.",
  },
  {
    id: "q27",
    category: "Pharmacology",
    question:
      "What does an antihistamine generally target?",
    options: [
      "Histamine-related effects",
      "Blood glucose production",
      "Gastric acid only",
      "Bacterial cell walls",
    ],
    answer: 0,
    explanation:
      "Antihistamines reduce effects mediated by histamine receptors.",
  },
  {
    id: "q28",
    category: "Pharmacology",
    question:
      "What is the general purpose of a proton pump inhibitor?",
    options: [
      "Reduce gastric acid secretion",
      "Increase blood pressure",
      "Treat bacterial infections directly",
      "Increase airway resistance",
    ],
    answer: 0,
    explanation:
      "Proton pump inhibitors reduce gastric acid secretion.",
  },
  {
    id: "q29",
    category: "Pharmacology",
    question:
      "What is a common therapeutic role of salbutamol?",
    options: [
      "Relief of bronchospasm",
      "Treatment of gastric ulcers",
      "Treatment of bacterial infection",
      "Reduction of blood glucose",
    ],
    answer: 0,
    explanation:
      "Salbutamol is a short-acting beta-2 agonist used for relief of bronchospasm.",
  },
  {
    id: "q30",
    category: "Pharmacology",
    question:
      "What is metformin commonly used to manage?",
    options: [
      "Type 2 diabetes",
      "Seasonal allergies",
      "Bacterial infections",
      "Acute bronchospasm",
    ],
    answer: 0,
    explanation:
      "Metformin is commonly used in the management of type 2 diabetes.",
  },

  {
    id: "q31",
    category: "Medicine Safety",
    question:
      "Why is it important to check medicine instructions before use?",
    options: [
      "To support correct and safe use",
      "To determine package color",
      "To avoid learning the medicine name",
      "To guarantee there are no side effects",
    ],
    answer: 0,
    explanation:
      "Following appropriate instructions supports safe and effective medicine use.",
  },
  {
    id: "q32",
    category: "Medicine Safety",
    question:
      "What should a patient do if they are unsure how to take a medicine?",
    options: [
      "Ask a qualified healthcare professional for clarification",
      "Guess the dose",
      "Double the dose",
      "Stop every medicine",
    ],
    answer: 0,
    explanation:
      "Uncertainty about medicine use should be clarified rather than guessed.",
  },
  {
    id: "q33",
    category: "Medicine Safety",
    question:
      "What is medication duplication?",
    options: [
      "Using medicines with overlapping therapeutic ingredients or effects unnecessarily",
      "Taking medicine with water",
      "Reading a medicine label",
      "Storing medicine correctly",
    ],
    answer: 0,
    explanation:
      "Medication duplication can occur when overlapping medicines are used unnecessarily.",
  },
  {
    id: "q34",
    category: "Medicine Safety",
    question:
      "Why should medicine storage instructions be followed?",
    options: [
      "Improper storage can affect medicine quality or stability",
      "It changes the medicine's color",
      "It makes every medicine stronger",
      "It removes the need for expiry dates",
    ],
    answer: 0,
    explanation:
      "Appropriate storage helps maintain medicine quality and stability.",
  },

  {
    id: "q35",
    category: "Calculations",
    question:
      "A dose required is 250 mg. The available dose is 125 mg in 5 mL. What volume is required?",
    options: [
      "10 mL",
      "2 mL",
      "5 mL",
      "20 mL",
    ],
    answer: 0,
    explanation:
      "Using (250 ÷ 125) × 5 gives 10 mL.",
  },
  {
    id: "q36",
    category: "Calculations",
    question:
      "A medicine contains 250 mg per tablet. How many tablets provide 500 mg?",
    options: [
      "2 tablets",
      "1 tablet",
      "3 tablets",
      "4 tablets",
    ],
    answer: 0,
    explanation:
      "500 ÷ 250 = 2 tablets.",
  },
  {
    id: "q37",
    category: "Calculations",
    question:
      "What is 5% of 200 mL?",
    options: [
      "10 mL",
      "5 mL",
      "20 mL",
      "25 mL",
    ],
    answer: 0,
    explanation:
      "5% of 200 mL is (5 ÷ 100) × 200 = 10 mL.",
  },
  {
    id: "q38",
    category: "Calculations",
    question:
      "A patient needs 750 mg. Tablets contain 250 mg each. How many tablets are required?",
    options: [
      "3 tablets",
      "2 tablets",
      "4 tablets",
      "5 tablets",
    ],
    answer: 0,
    explanation:
      "750 ÷ 250 = 3 tablets.",
  },

  {
    id: "q39",
    category: "Professional Practice",
    question:
      "What should a pharmacy professional do when information is uncertain?",
    options: [
      "Check an appropriate reliable reference",
      "Guess the answer",
      "Use social media as the only source",
      "Ignore the uncertainty",
    ],
    answer: 0,
    explanation:
      "Reliable professional references should be used when information needs verification.",
  },
  {
    id: "q40",
    category: "Professional Practice",
    question:
      "Why is accurate documentation important in pharmacy practice?",
    options: [
      "It supports continuity, accountability, and safe practice",
      "It eliminates the need for communication",
      "It guarantees no errors can occur",
      "It replaces professional judgement",
    ],
    answer: 0,
    explanation:
      "Accurate documentation supports communication, accountability, and continuity of care.",
  },
  {
    id: "q41",
    category: "Professional Practice",
    question:
      "What is an important part of professional communication?",
    options: [
      "Clear and respectful communication",
      "Using confusing terminology",
      "Avoiding patient questions",
      "Giving information without checking understanding",
    ],
    answer: 0,
    explanation:
      "Clear and respectful communication supports safe patient care.",
  },
  {
    id: "q42",
    category: "Professional Practice",
    question:
      "What should happen if a pharmacy professional identifies a possible medication error?",
    options: [
      "Follow appropriate procedures to assess and address the error",
      "Hide the error",
      "Ignore it",
      "Change records without documentation",
    ],
    answer: 0,
    explanation:
      "Medication errors should be handled using appropriate safety and reporting procedures.",
  },

  {
    id: "q43",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly associated with relief of allergy symptoms?",
    options: [
      "Cetirizine",
      "Metformin",
      "Amlodipine",
      "Omeprazole",
    ],
    answer: 0,
    explanation:
      "Cetirizine is an antihistamine commonly used for allergy symptoms.",
  },
  {
    id: "q44",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly associated with cardiovascular treatment?",
    options: [
      "Amlodipine",
      "Cetirizine",
      "Amoxicillin",
      "Omeprazole",
    ],
    answer: 0,
    explanation:
      "Amlodipine is a calcium channel blocker used in cardiovascular conditions.",
  },
  {
    id: "q45",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly associated with gastrointestinal treatment?",
    options: [
      "Omeprazole",
      "Salbutamol",
      "Amlodipine",
      "Cetirizine",
    ],
    answer: 0,
    explanation:
      "Omeprazole is commonly used in gastrointestinal conditions involving gastric acid.",
  },
  {
    id: "q46",
    category: "Drug Knowledge",
    question:
      "Which medicine is commonly associated with respiratory treatment?",
    options: [
      "Salbutamol",
      "Metformin",
      "Omeprazole",
      "Amoxicillin",
    ],
    answer: 0,
    explanation:
      "Salbutamol is commonly used for relief of bronchospasm.",
  },

  {
    id: "q47",
    category: "Patient Assessment",
    question:
      "Why should relevant patient history be considered before recommending medicines?",
    options: [
      "It can identify precautions, contraindications, or referral needs",
      "It determines the medicine package color",
      "It guarantees the medicine will work",
      "It removes the need for medicine information",
    ],
    answer: 0,
    explanation:
      "Relevant history can reveal important safety considerations and referral needs.",
  },
  {
    id: "q48",
    category: "Patient Assessment",
    question:
      "Which information can be important when assessing a child for medicine use?",
    options: [
      "Age and weight",
      "Favorite food",
      "Favorite color",
      "School uniform",
    ],
    answer: 0,
    explanation:
      "Age and weight can be important considerations for pediatric medicine use.",
  },
  {
    id: "q49",
    category: "Patient Assessment",
    question:
      "What should be considered when a patient takes several medicines?",
    options: [
      "Potential interactions and duplication",
      "Only the medicine colors",
      "Only the price",
      "Nothing additional",
    ],
    answer: 0,
    explanation:
      "Multiple medicines increase the importance of reviewing interactions and duplication.",
  },
  {
    id: "q50",
    category: "Patient Assessment",
    question:
      "What should you consider when a patient's symptoms appear severe?",
    options: [
      "Whether urgent medical assessment is required",
      "Whether the patient prefers tablets",
      "Whether the package is attractive",
      "Whether the medicine is inexpensive",
    ],
    answer: 0,
    explanation:
      "Severe symptoms can require prompt assessment rather than routine self-care.",
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

function createQuiz() {
  return shuffleArray(questionBank);
}

function Quiz() {
  const [questions, setQuestions] =
    useState(() => createQuiz());

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [score, setScore] =
    useState(0);

  const [finished, setFinished] =
    useState(false);

  const currentQuestion =
    questions[currentIndex];

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100;

  const answered =
    selectedAnswer !== null;

  const isCorrect =
    selectedAnswer ===
    currentQuestion?.answer;

  const handleAnswer = (index) => {
    if (answered) {
      return;
    }

    setSelectedAnswer(index);

    if (
      index === currentQuestion.answer
    ) {
      setScore(
        (previous) => previous + 1
      );
    }

    incrementProgress(
      "questionsCompleted"
    );

    if (
      index === currentQuestion.answer
    ) {
      incrementProgress(
        "correctAnswers"
      );
    }
  };

  const nextQuestion = () => {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (previous) => previous + 1
      );

      setSelectedAnswer(null);
    } else {
      setFinished(true);

      incrementProgress(
        "quizzesCompleted"
      );
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      );

      setSelectedAnswer(null);
    }
  };

  const startNewQuiz = () => {
    setQuestions(createQuiz());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  const percentage = useMemo(() => {
    if (!questions.length) {
      return 0;
    }

    return Math.round(
      (score / questions.length) * 100
    );
  }, [score, questions.length]);

  if (finished) {
    return (
      <div className="quiz-page">
        <section className="page-heading">
          <p className="eyebrow">
            KNOWLEDGE PRACTICE
          </p>

          <h2>
            Quiz Complete
          </h2>

          <p>
            You completed a randomized
            {` ${questions.length}-question `}
            quiz.
          </p>
        </section>

        <div className="quiz-result">
          <div className="quiz-result-icon">
            <CheckCircle size={38} />
          </div>

          <p className="result-eyebrow">
            YOUR RESULT
          </p>

          <div className="quiz-score">
            {score}
            <span>
              / {questions.length}
            </span>
          </div>

          <h3>
            {percentage}% correct
          </h3>

          <p>
            Start another quiz to receive
            a new randomized selection and
            practise different questions.
          </p>

          <button
            type="button"
            className="quiz-button"
            onClick={startNewQuiz}
          >
            <Shuffle size={18} />
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <section className="page-heading">
        <p className="eyebrow">
          KNOWLEDGE PRACTICE
        </p>

        <h2>
          Pharmacy Quiz
        </h2>

        <p>
          Test your pharmacy knowledge with
          randomized questions across
          multiple topics.
        </p>
      </section>

      <section className="quiz-container">
        <div className="quiz-top">
          <div className="quiz-topic">
            <Brain size={18} />

            <span>
              {currentQuestion.category}
            </span>
          </div>

          <div className="quiz-counter">
            Question{" "}
            {currentIndex + 1} of{" "}
            {questions.length}
          </div>
        </div>

        <div className="quiz-progress">
          <div
            className="quiz-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="quiz-content">
          <h3 className="quiz-question">
            {currentQuestion.question}
          </h3>

          <div className="answer-options">
            {currentQuestion.options.map(
              (option, index) => {
                let className =
                  "answer-option";

                if (answered) {
                  if (
                    index ===
                    currentQuestion.answer
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
                  ? "quiz-explanation correct-explanation"
                  : "quiz-explanation incorrect-explanation"
              }
            >
              <div className="explanation-title">
                <CheckCircle size={18} />

                <strong>
                  {isCorrect
                    ? "Correct"
                    : "Review this answer"}
                </strong>
              </div>

              <p>
                {
                  currentQuestion.explanation
                }
              </p>
            </div>
          )}
        </div>

        <div className="quiz-footer">
          <div className="quiz-score">
            Score:{" "}
            <strong>
              {score}
            </strong>
          </div>

          <div className="quiz-footer-actions">
            <button
              type="button"
              className="quiz-secondary-button"
              onClick={previousQuestion}
              disabled={
                currentIndex === 0
              }
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            <button
              type="button"
              className="quiz-secondary-button"
              onClick={startNewQuiz}
            >
              <RotateCcw size={16} />
              New Quiz
            </button>

            {answered && (
              <button
                type="button"
                className="quiz-button"
                onClick={nextQuestion}
              >
                {currentIndex ===
                questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}

                <ChevronRight
                  size={17}
                />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="quiz-info">
        <div className="quiz-info-icon">
          <Shuffle size={19} />
        </div>

        <div>
          <strong>
            Randomized question bank
          </strong>

          <p>
            {questionBank.length} questions
            are available across pharmacy
            topics. Each new quiz shuffles
            the questions so you can practise
            different material.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Quiz;