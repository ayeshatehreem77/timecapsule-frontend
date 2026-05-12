import { useState } from "react";
import { useNotifications } from "../context/useNotifications";

const NotificationBell = () => {
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);
  const [usage, setUsage] = useState<any>(null);
  const [showUsage, setShowUsage] = useState(false);

  return (
    <div className="notif-wrapper">
      <div className="status-actions">
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
        <div className="notif-trigger">
          <NotificationBell />
        </div>
      </div>
      <button className="bell-btn" onClick={() => setOpen(!open)}>
        <img src='/bell.png' alt='bell'></img>
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          {notifications.length === 0 ? (
            <p>No notifications</p>
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
  );
};

export default NotificationBell;