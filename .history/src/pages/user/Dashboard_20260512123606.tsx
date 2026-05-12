import { useState, useEffect } from "react";
import "../../styles/dashboard.css";
import "../../styles/landing.css";
import Sidebar from "../../components/Sidebar";
import CreateCapsule from "../../components/CreateCapsule"
import History from "../../components/History"
import ActiveVaults from "../../components/ActiceVaults"
import Legacy from "../../components/Legacy"
import Profile from "../../components/Profile"
import { useNavigate } from 'react-router-dom';
import Pricing from '../../components/Pricing'
import NotificationBell from '../../components/NotificationBell'
import api from "../../utils/api"

export default function Dashboard() {
  const [active, setActive] = useState("profile");
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [usage, setUsage] = useState({ used: 0, limit: 5 })


  useEffect(() => {
  // Aapka API call yahan hoga
  const fetchUsage = async () => {
    try {
      const res = await api.get("/capsules/usage"); 
      setUsage(res.data);
    } catch (err) {
      console.log("Usage fetch error", err);
    }
  };
  fetchUsage();
}, []);
console.log(usage)
    
  

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      setIsReady(true);
    } catch (err) {
      navigate("/");
    }


  }, []);

  if (!isReady) return null;

  return (
    <div className="d-flex dashboard-container">

      <Sidebar active={active} setActive={setActive} />
      <NotificationBell  />


      <div className="flex-grow-1 p-4">

        {active === "profile" && <Profile />}
        {active === "create" && <CreateCapsule />}
        {active === "vaults" && <ActiveVaults />}
        {active === "legacy" && <Legacy />}
        {active === "history" && <History />}
        {active === "upgrade" && <Pricing />}
      </div>



    </div>
  );
}