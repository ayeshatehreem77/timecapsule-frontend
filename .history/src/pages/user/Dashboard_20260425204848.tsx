import { useState } from "react";
import "../../styles/dashboard.css";
import Sidebar from "../../components/Sidebar";
import CreateCapsule from "../../components/CreateCapsule"
import History from "../../components/History"
import ActiveVaults from "../../components/ActiceVaults"
import Legacy from "../../components/Legacy"
import Profile from "../../components/Profile"

export default function Dashboard() {
  const [active, setActive] = useState("create");

  return (
    <div className="d-flex dashboard-container">

      <Sidebar active={active} setActive={setActive} />

      <div className="flex-grow-1 p-4">

        {active === "profile" && <Profile />}
        {active === "create" && <CreateCapsule />}
        {active === "vaults" && <ActiveVaults />}
        {active === "legacy" && <Legacy />}
        {active === "history" && <History />}
      </div>

    </div>
  );
}