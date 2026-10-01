import {
  LayoutDashboard,
  Pill,
  Brain,
  BookOpen,
  Calculator,
  Store,
  Settings,
  Star,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    page: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Drug Explorer",
    page: "drugs",
    icon: Pill,
  },
  {
    label: "Saved Medicines",
    page: "favorites",
    icon: Star,
  },
  {
    label: "Quizzes",
    page: "quiz",
    icon: Brain,
  },
  {
    label: "Flashcards",
    page: "flashcards",
    icon: BookOpen,
  },
  {
    label: "Calculations",
    page: "calculations",
    icon: Calculator,
  },
  {
    label: "Scenarios",
    page: "scenarios",
    icon: Store,
  },
];

function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <Pill size={22} />
        </div>

        <div>
          <h1>PharmaStudy</h1>

          <span>
            Learn. Practice. Reference.
          </span>
        </div>
      </div>

      <nav className="navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.page}
              type="button"
              className={`nav-item ${
                page === item.page
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onNavigate(item.page)
              }
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className={`nav-item ${
            page === "settings"
              ? "active"
              : ""
          }`}
          onClick={() =>
            onNavigate("settings")
          }
        >
          <Settings size={20} />

          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;