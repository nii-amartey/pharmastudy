import { useEffect, useState } from "react";

import {
  Pill,
  Brain,
  BookOpen,
  Calculator,
  Store,
  ArrowRight,
  Target,
} from "lucide-react";

import { getProgress } from "../utils/storage";

const quickActions = [
  {
    title: "Explore Drugs",
    description: "Review medication information",
    icon: Pill,
    page: "drugs",
  },
  {
    title: "Take a Quiz",
    description: "Test your pharmacy knowledge",
    icon: Brain,
    page: "quiz",
  },
  {
    title: "Practice Flashcards",
    description: "Review important pharmacy concepts",
    icon: BookOpen,
    page: "flashcards",
  },
  {
    title: "Practice Calculations",
    description: "Improve your calculation skills",
    icon: Calculator,
    page: "calculations",
  },
  {
    title: "Practice Scenarios",
    description: "Work through pharmacy situations",
    icon: Store,
    page: "scenarios",
  },
];

function Dashboard({ onNavigate }) {
  const [progressData, setProgressData] =
    useState(getProgress);

  useEffect(() => {
    const refreshProgress = () => {
      setProgressData(getProgress());
    };

    window.addEventListener(
      "pharmastudy-progress-updated",
      refreshProgress
    );

    return () => {
      window.removeEventListener(
        "pharmastudy-progress-updated",
        refreshProgress
      );
    };
  }, []);

  const quizAccuracy =
    progressData.questionsCompleted > 0
      ? Math.round(
          (progressData.correctAnswers /
            progressData.questionsCompleted) *
            100
        )
      : 0;

  /*
   * These targets are used only to give the dashboard
   * meaningful progress percentages.
   */
  const flashcardProgress = Math.min(
    Math.round(
      (progressData.flashcardsReviewed / 60) * 100
    ),
    100
  );

  const calculationProgress = Math.min(
    Math.round(
      (progressData.calculationsCompleted / 20) * 100
    ),
    100
  );

  const scenarioProgress = Math.min(
    Math.round(
      (progressData.scenariosCompleted / 20) * 100
    ),
    100
  );

  const studyProgress = [
    {
      name: "Flashcards",
      percentage: flashcardProgress,
    },
    {
      name: "Calculations",
      percentage: calculationProgress,
    },
    {
      name: "Pharmacology",
      percentage: quizAccuracy,
    },
    {
      name: "Scenarios",
      percentage: scenarioProgress,
    },
  ];

  const stats = [
    {
      title: "Questions Completed",
      value: progressData.questionsCompleted,
      description: "Keep practicing",
      icon: Brain,
    },
    {
      title: "Quiz Accuracy",
      value: `${quizAccuracy}%`,
      description: "Based on your answers",
      icon: Target,
    },
    {
      title: "Flashcards Reviewed",
      value: progressData.flashcardsReviewed,
      description: "Keep reviewing",
      icon: BookOpen,
    },
    {
      title: "Calculations",
      value: progressData.calculationsCompleted,
      description: "Practice completed",
      icon: Calculator,
    },
    {
      title: "Scenarios",
      value: progressData.scenariosCompleted,
      description: "Practice completed",
      icon: Store,
    },
    {
      title: "Quizzes Completed",
      value: progressData.quizzesCompleted,
      description: "Full quizzes completed",
      icon: Pill,
    },
  ];

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">
            PHARMACY LEARNING PLATFORM
          </p>

          <h2>Welcome back 👋</h2>

          <p className="welcome-text">
            Continue your pharmacy learning and keep
            building your knowledge.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="stat-card"
              key={stat.title}
            >
              <div className="stat-icon">
                <Icon size={21} />
              </div>

              <div>
                <p>{stat.title}</p>

                <h3>{stat.value}</h3>

                <span>
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <div className="section-heading">
            <div>
              <h3>Your Study Progress</h3>

              <p>
                Track your learning activity.
              </p>
            </div>
          </div>

          <div className="progress-list">
            {studyProgress.map((item) => (
              <div
                className="progress-item"
                key={item.name}
              >
                <div className="progress-label">
                  <span>{item.name}</span>

                  <strong>
                    {item.percentage}%
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="section-heading">
            <div>
              <h3>Quick Practice</h3>

              <p>
                Jump into your study tools.
              </p>
            </div>
          </div>

          <div className="quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  type="button"
                  className="quick-action"
                  key={action.title}
                  onClick={() =>
                    onNavigate(action.page)
                  }
                >
                  <div className="quick-action-icon">
                    <Icon size={19} />
                  </div>

                  <div className="quick-action-content">
                    <strong>
                      {action.title}
                    </strong>

                    <span>
                      {action.description}
                    </span>
                  </div>

                  <ArrowRight size={18} />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;