import { useState } from "react";
import "../../styles/dashboard.css";
import Sidebar from "../../components/Sidebar";
import CreateCapsule from "../../components/CreateCapsule"
// import History from "../../components/History"
// import ActiveVaults from "../../components/ActiceVaults"

export default function Dashboard() {
  const [active, setActive] = useState("create");

  return (
    <div className="d-flex dashboard-container">

      <Sidebar active={active} setActive={setActive} />

      <div className="flex-grow-1 p-4">
        {active === "create" && <CreateCapsule />}
        {active === "vaults" && <h2>Active Vaults</h2>}
        {active === "history" && <h2>History</h2>}
      </div>

    </div>
  );
}