import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }: any) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSwitchToAdmin = () => {
    navigate("/admin");
  };

  

  return (
    <div className="sidebar p-3 d-flex flex-column">

      {/* Logo */}
      <div className="sidebar-header">
        <div className="nav-logo">
          <img src="/tc-logo.svg" alt="TimeCapsule Icon" />
          <a className="navbar-brand orbitron-text" href="#">
            TimeCapsule
          </a>
        </div>
      </div>

      {/* NAV ITEMS */}
      <div className="mt-4">

        <div className={`nav-item ${active === "profile" && "active"}`}
          onClick={() => setActive("profile")}>
          <img src='/user.png' style={{ width: 22, height: 22 }} />
          My Profile
        </div>

        <div className={`nav-item ${active === "create" && "active"}`}
          onClick={() => setActive("create")}>
          <img src='/plus.png' style={{ width: 22, height: 22 }} />
          Create Capsule
        </div>

        <div className={`nav-item ${active === "vaults" && "active"}`}
          onClick={() => setActive("vaults")}>
          <img src='/active-vault.png' style={{ width: 22, height: 22 }} />
          Active Vaults
        </div>

        <div className={`nav-item ${active === "legacy" && "active"}`}
          onClick={() => setActive("legacy")}>
          <img src='/unlocked.png' style={{ width: 22, height: 22 }} />
          Legacy
        </div>

        <div className={`nav-item ${active === "history" && "active"}`}
          onClick={() => setActive("history")}>
          <img src='/history.png' />
          History
        </div>
      </div>

      {/* SWITCH + LOGOUT */}
      <div className="sidebar-footer">
        {user?.role === "admin" && (
          <button
            className="nav-switch-btn"
            onClick={handleSwitchToAdmin}
          >
            Switch to Admin
          </button>
        )}

        {/* <button className="nav-logout-btn" onClick={handleLogout}>
          ⏻ Logout
        </button> */}

      </div>

    </div>
  );
}