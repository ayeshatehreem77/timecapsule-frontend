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
          <img src='/user.png' alt='' style={{width: '22px', height: '22px'}}></img> My Profile
        </div>

        <div
          className={`nav-item ${active === "create" && "active"}`}
          onClick={() => setActive("create")}
        >
          <img src='/plus.png' alt='' style={{width: '22px', height: '22px'}}></img> Create Capsule
        </div>

        <div
          className={`nav-item ${active === "vaults" && "active"}`}
          onClick={() => setActive("vaults")}
        >
          <img src='/active-vault.png' alt='' style={{width: '22px', height: '22px'}}></img> Active Vaults
        </div>

        <div
          className={`nav-item ${active === "legacy" && "active"}`}
          onClick={() => setActive("legacy")}
        >
          <img src='/unlocked.png' alt='' style={{width: '22px', height: '22px'}}></img> legacy
        </div>

        <div
          className={`nav-item ${active === "history" && "active"}`}
          onClick={() => setActive("history")}
        >
          <img src='/history.png' alt=''></img> History
        </div>

      </div>

      <div className="sidebar-footer">
        <button className="nav-logout-btn" onClick={handleLogout}>
          <span className="logout-icon">⏻</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>



    </div>
  );
}