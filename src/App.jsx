import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import DrugExplorer from "./pages/DrugExplorer";
import Favorites from "./pages/Favorites";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Calculations from "./pages/Calculations";
import Scenarios from "./pages/Scenarios";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState("dashboard");

  const [medicineToOpen, setMedicineToOpen] =
    useState(null);

  const handleOpenMedicine = (medicine) => {
    setMedicineToOpen(medicine);
    setPage("drugs");
  };

  const handleNavigate = (nextPage) => {
    setPage(nextPage);

    if (nextPage !== "drugs") {
      setMedicineToOpen(null);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigate}
          />
        );

      case "drugs":
        return (
          <DrugExplorer
            medicineToOpen={medicineToOpen}
            onMedicineOpened={() =>
              setMedicineToOpen(null)
            }
          />
        );

      case "favorites":
        return (
          <Favorites
            onOpenMedicine={handleOpenMedicine}
          />
        );

      case "quiz":
        return <Quiz />;

      case "flashcards":
        return <Flashcards />;

      case "calculations":
        return <Calculations />;

      case "scenarios":
        return <Scenarios />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        page={page}
        onNavigate={handleNavigate}
      />

      <div className="main-area">
        <Header />

        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;