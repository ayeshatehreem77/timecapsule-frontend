import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css"; // Ensure your modal CSS is here

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  
  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decryptedData, setDecryptedData] = useState<{message: string, fileUrl?: string} | null>(null);

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
      const res = await axios.get("http://localhost:5000/capsules/received", {
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

  // --- RE-OPEN LOGIC ---
  const handleView = async (id: string) => {
    // Note: Since it's already in history, you can either ask for passcode 
    // again for security, or if your backend allows, just fetch it.
    const passcode = prompt("Enter passcode to re-view memory:");
    if (!passcode) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/capsules/${id}`, {
        params: { passcode },
        headers: { Authorization: `Bearer ${token}` },
      });

      setDecryptedData(res.data);
      setIsModalOpen(true);
    } catch (err) {
      alert("Verification failed. Please use the correct passcode.");
    }
  };

  return (
    <div className="history-container fade-in">
      <h2 className="component-title">HISTORY</h2>

      <div className="history-timeline">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div className="timeline-segment" key={index}>
              <div className="timeline-node"></div>

              {/* Added cursor pointer and onClick to the card */}
              <div className="history-card" onClick={() => handleView(item.id)} style={{ cursor: 'pointer' }}>
                <div className="history-card-content">
                  <div className="history-main-info">
                    <div className="history-icon-wrapper">
                      <img src="/icons/capsule-open-gold.png" alt="opened" className="mini-capsule-img" />
                    </div>
                    <div className="history-text">
                      <h6 className="history-title">{item.title}</h6>
                      <span className="history-date">Unlocked: {formatDate(item.unlockDate)}</span>
                    </div>
                  </div>

                  <div className="history-status">
                    <span className="delivered-tag">
                      <i className="check-icon">✓</i> {item.isOpened ? "Opened" : "Delivered"}
                    </span>
                    <p className="re-view-hint">Click to View</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No past memories delivered yet.</div>
        )}
      </div>

      {/* --- DECRYPTION MODAL --- */}
      {isModalOpen && decryptedData && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="decrypt-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">SECURE MEMORY</h2>
            <div className="message-box">
              <p>{decryptedData.message}</p>
            </div>
            {decryptedData.fileUrl && (
              <a href={decryptedData.fileUrl} target="_blank" rel="noreferrer" className="download-btn">
                VIEW ATTACHMENT
              </a>
            )}
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}