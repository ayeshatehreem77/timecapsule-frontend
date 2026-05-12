export default function Sidebar({ active, setActive }: any) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="sidebar d-flex flex-column">
      {/* 🟢 Refined Logo Container (No h-100/w-100) */}
      <div className="sidebar-header" >
        <div className="nav-logo">
          <img src="/tc-logo.svg" alt="TimeCapsule Icon" />
          <a className="navbar-brand orbitron-text" href="#">TimeCapsule</a>
        </div>
      </div>

      {/* 🟡 Separator Line */}
      <div className="sidebar-separator"></div>

      <div className="sidebar-menu p-3">
        <div
          className={`nav-item ${active === "profile" && "active"}`}
          onClick={() => setActive("profile")}
        >
          <img src='/user.png' alt='' /> My Profile
        </div>

        <div
          className={`nav-item ${active === "create" && "active"}`}
          onClick={() => setActive("create")}
        >
          <img src='/plus.png' alt='' /> Create Capsule
        </div>

        <div
          className={`nav-item ${active === "vaults" && "active"}`}
          onClick={() => setActive("vaults")}
        >
          <img src='/active-vault.png' alt='' /> Active Vaults
        </div>

        <div
          className={`nav-item ${active === "legacy" && "active"}`}
          onClick={() => setActive("legacy")}
        >
          <img src='/unlocked.png' alt='' /> Legacy
        </div>

        <div
          className={`nav-item ${active === "history" && "active"}`}
          onClick={() => setActive("history")}
        >
          <img src='/history.png' alt='' /> History
        </div>
      </div>

      <div className="sidebar-footer p-3">
        <button className="nav-logout-btn" onClick={handleLogout}>
          <span className="logout-icon">⏻</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </div>
  );
}