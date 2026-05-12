import { useState } from "react";
import { useNotifications } from "../context/useNotifications";

const NotificationBell = ({ usage }) => { // Usage prop se le rahe hain
  const { notifications } = useNotifications();
  const [openNotif, setOpenNotif] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  return (
    <div className="dashboard-actions-header">
      
      {/* --- STORAGE USAGE SECTION --- */}
      <div className="action-item">
        <div className="usage-trigger" onClick={() => {
          setShowUsage(!showUsage);
          setOpenNotif(false); // Ek khule to dusra band ho jaye
        }}>
          <img src="/meds.png" alt="Usage" className="action-icon" />
        </div>

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

      {/* --- NOTIFICATION BELL SECTION --- */}
      <div className="action-item">
        <button className="bell-btn" onClick={() => {
          setOpenNotif(!openNotif);
          setShowUsage(false); // Usage band kar do
        }}>
          <img src='/bell.png' alt='bell' className="action-icon" />
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </button>

        {openNotif && (
          <div className="notif-dropdown fade-in">
            <h6 className="notif-title">NOTIFICATIONS</h6>
            {notifications.length === 0 ? (
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