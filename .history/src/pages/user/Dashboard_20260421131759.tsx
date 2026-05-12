import "../../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container d-flex">

      {/* SIDEBAR */}
      <div className="sidebar p-3">
        <h4 className="logo">⏳ TimeCapsule</h4>

        <ul className="nav flex-column mt-4">
          <li className="nav-item">👤 User Profile</li>
          <li className="nav-item active">📩 Create Capsule</li>
          <li className="nav-item">🔒 Active Vaults</li>
          <li className="nav-item">🌐 Legacy</li>
          <li className="nav-item">🕘 History</li>
        </ul>

        <button className="btn seal-btn mt-auto">
          SEAL NEW MEMORY
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content p-4 w-100">

        <h2 className="mb-4">User Dashboard</h2>

        {/* TOP CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="stat-card">
              <p>Total Capsules Sealed</p>
              <h3>12</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <p>Active Vaults (Waiting)</p>
              <h3>8</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <p>Next Reveal</p>
              <h3>Jan 14, 2030</h3>
            </div>
          </div>
        </div>

        {/* GRID */}
        <h5 className="mb-3">GRID VIEW</h5>

        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="col-md-4" key={item}>
              <div className="capsule-card">
                <h6>Graduation Wish</h6>
                <p>Unlocks in:</p>
                <span>3:31 - 27/02/2030</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}