import { useState } from "react";
import { useNotifications } from "../context/useNotifications";

const NotificationBell = () => {
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="notif-wrapper">
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