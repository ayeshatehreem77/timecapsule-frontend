import { useState, useEffect } from "react";
import { useNotifications } from "../context/useNotifications";
import api from "../utils/api";

const NotificationBell = () => {
  const { notifications } = useNotifications();
  
  // States
  const [openNotif, setOpenNotif] = useState(false); // Yeh missing tha
  const [showUsage, setShowUsage] = useState(false);
  const [usage, setUsage] = useState({ used: 0, limit: 5 });

  // Fetch usage data from backend
  useEffect(() => {
    const getUsageData = async () => {
      try {
        // "your-backend-url" hatane ki zaroori nahi agar 'api' utility sahi set hai
        const response = await api.get("/capsules/usage"); 
        setUsage(response.data);
      } catch (error) {
        console.error("Error fetching storage usage:", error);
        // Fallback data agar API fail ho jaye (Testing ke liye)
        // setUsage({ used: 2, limit: 5 }); 
      }
    };
    getUsageData();
  }, []);

  return (
    <div className="dashboard-actions-header">
      
      {/* --- STORAGE USAGE SECTION --- */}
      <div className="action-item">
        <div className="usage-trigger" onClick={() => {
          setShowUsage(!showUsage);
          setOpenNotif(false); // Usage khule toh Notif band
        }}>
          <img src="/meds.png" alt="Usage" className="action-icon" />
        </div>

        {showUsage && usage && (
          <div className="usage-popover fade-in">
            <div className="popover-header">
              <span>STORAGE STATUS</span>
              <button className="close-mini" onClick={() => setShowUsage(false)}>×</button>
            </div>

            <div className="usage-stats-row">
              <span className="count">{usage.used} / {usage.limit}</span>
              <span className="percentage">
                {Math.round((usage.used / usage.limit) * 100)}% Used
              </span>
            </div>

            <div className="usage-progress-track">
              <div
                className="usage-progress-fill"
                style={{ width: `${Math.min((usage.used / usage.limit) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="plan-tag">STARTER PLAN ACTIVATED</p>
          </div>
        )}
      </div>

      {/* --- NOTIFICATION BELL SECTION --- */}
      <div className="action-item">
        <button className="bell-btn" onClick={() => {
          setOpenNotif(!openNotif);
          setShowUsage(false); // Notif khule toh Usage band
        }}>
          <img src='/bell.png' alt='bell' className="action-icon" />
          {notifications && notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </button>

        {openNotif && (
          <div className="notif-dropdown fade-in">
            <h6 className="notif-title">NOTIFICATIONS</h6>
            {!notifications || notifications.length === 0 ? (
              <p className="empty-notif">System clear. No alerts.</p>
            ) : (
              notifications.map((n, i) => (
                <div key={`${n.type}-${i}`} className="notif-item">
                  <b>{n.type}</b>
                  <p>{n.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default NotificationBell;