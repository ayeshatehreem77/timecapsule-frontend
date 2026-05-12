export default function Sidebar({ active, setActive }: any) {
  return (
    <div className="sidebar p-3 d-flex flex-column">

      <h4 className="logo">⏳ TimeCapsule</h4>

      <div className="mt-4">

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
          className={`nav-item ${active === "history" && "active"}`}
          onClick={() => setActive("history")}
        >
          🕘 History
        </div>

      </div>

      <button
        className="btn seal-btn mt-auto"
        onClick={() => setActive("create")}
      >
        SEAL NEW MEMORY
      </button>

    </div>
  );
}