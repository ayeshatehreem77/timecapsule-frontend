import { useState, useEffect } from "react";
import "../../styles/dashboard.css";
import Sidebar from "../../components/Sidebar";
import CreateCapsule from "../../components/CreateCapsule"
import History from "../../components/History"
import ActiveVaults from "../../components/ActiceVaults"
import Legacy from "../../components/Legacy"
import Profile from "../../components/Profile"
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [active, setActive] = useState("profile");
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (!token || role === "admin") {
      localStorage.clear();
      navigate("/");
    } else {
      setIsReady(true);
    }
  }, [navigate]);

  if (!isReady) return null;

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