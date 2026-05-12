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

  const [usage, setUsage] = useState<any>(null);
  const [showUsage, setShowUsage] = useState(false);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    const res = await api.get("/capsules/usage");
    setUsage(res.data);
  };

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
      

      <div className="flex-grow-1 p-4">

        {active === "profile" && <Profile />}
        {active === "create" && <CreateCapsule />}
        {active === "vaults" && <ActiveVaults />}
        {active === "legacy" && <Legacy />}
        {active === "history" && <History />}
        {active === "upgrade" && <Pricing />}
      </div>

      <div className="status-actions">
        <NotificationBell />
        {/* Usage Toggle Button */}
        <div className="usage-icon-wrapper" onClick={() => setShowUsage(!showUsage)}>
          <img src="/storage-icon.png" alt="Usage" className="nav-icon" />

          {/* Tooltip style popup */}
          {showUsage && usage && usage.limit && (
            <div className="usage-popover fade-in">
              <div className="popover-header">
                <span>STORAGE STATUS</span>
                <button className="close-mini" onClick={() => setShowUsage(false)}>×</button>
              </div>

              <div className="usage-stats-row">
                <span className="count">{usage.used} / {usage.limit}</span>
                <span className="percentage">{Math.round((usage.used / usage.limit) * 100)}% Used</span>
              </div>

              <div className="usage-progress-track">
                <div
                  className="usage-progress-fill"
                  style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                ></div>
              </div>
              <p className="plan-tag">STARTER PLAN ACTIVATED</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}