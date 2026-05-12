export default function Sidebar({ active, setActive }: any) {
  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to home or login
    window.location.href = "/";
  };
  return (
    <div className="sidebar p-3 d-flex flex-column">

      <h4 className="logo">⏳ TimeCapsule</h4>

      <div className="mt-4">
        <div
          className={`nav-item ${active === "profile" && "active"}`}
          onClick={() => setActive("profile")}
        >
          🕘 My Profile
        </div>

        <div
          className={`nav-item ${active === "create" && "active"}`}
          onClick={() => setActive("create")}
        >
          📩 Create Capsule
        </div>

        <div
          className={`nav-item ${active === "vaults" && "active"}`}
          onClick={() => setActive("vaults")}
        >
          🔒 Active Vaults
        </div>

        <div
          className={`nav-item ${active === "legacy" && "active"}`}
          onClick={() => setActive("legacy")}
        >
          🕘 legacy
        </div>

        <div
          className={`nav-item ${active === "history" && "active"}`}
          onClick={() => setActive("history")}
        >
          🕘 History
        </div>

      </div>

      <div className="sidebar-footer">
        <button className="nav-logout-btn" onClick={handleLogout}>
          <span className="logout-icon">⏻</span>
          <span className="logout-text">Terminate Session</span>
        </button>
      </div>



    </div>
  );
}