import { Search, Bell } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="search-container">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search drugs, topics, quizzes..."
        />
      </div>

      <div className="header-actions">
        <button className="icon-button">
          <Bell size={20} />
        </button>

        <div className="profile">
          <div className="avatar">PS</div>

          <div className="profile-info">
            <strong>Pharmacy Student</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;