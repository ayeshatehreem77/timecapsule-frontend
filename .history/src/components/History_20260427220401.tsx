import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/capsules/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const delivered = res.data.filter(
        (c: any) => c.deliveryStatus === "delivered" || c.isOpened === true
      );
      setHistory(delivered);
    } catch (err) {
      console.log("Error fetching history:", err);
    }
  };

  return (
    <div className="history-container fade-in">
      <h2 className="component-title">HISTORY</h2>

      <div className="history-timeline">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div className="timeline-segment" key={index}>
              {/* The Glowing Dot on the line */}
              <div className="timeline-node"></div>

              {/* The Glass Card */}
              <div className="history-card">
                <div className="history-card-content">
                  <div className="history-main-info">
                    <div className="history-icon-wrapper">
                       {/* Replace with your Recraft/Flaticon asset */}
                      <img src="/icons/capsule-open-gold.png" alt="opened" className="mini-capsule-img" />
                    </div>
                    <div className="history-text">
                      <h6 className="history-title">{item.title}</h6>
                      <span className="history-date">Unlocked: {formatDate(item.unlockDate)}</span>
                    </div>
                  </div>

                  <div className="history-status">
                    <span className="delivered-tag">
                      <i className="check-icon">✓</i> Delivered
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No past memories delivered yet.</div>
        )}
      </div>
    </div>
  );
}