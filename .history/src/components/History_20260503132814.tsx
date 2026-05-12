import { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/dashboard.css"; 
import { useAlert } from '../context/useAlert';

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const {showAlert} = useAlert();

  interface DecryptedCapsule {
  title: string;
  message: string;
  fileUrl?: string;
  senderName: string; // Backend se sender ka naam lazmi bhejein
  createdDate: string;
}

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decryptedData, setDecryptedData] = useState<DecryptedCapsule | null>(null);

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
      const res = await api.get("/capsules/received", {
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
      const res = await api.get(`/capsules/${id}`, {
        params: { passcode },
        headers: { Authorization: `Bearer ${token}` },
      });

      setDecryptedData(res.data);
      setIsModalOpen(true);
    } catch (err) {
      showAlert("Verification failed. Please use the correct passcode.", 'error');
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
                      <img src="/unlocked.png" alt="opened" className="mini-capsule-img" />
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
        <div className="vault-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="secure-vault-modal" onClick={(e) => e.stopPropagation()}>

            {/* 1. TOP HEADER SECTION (META DATA) */}
            <div className="vault-header">
              <div className="header-prefix">DECRYPTED TRANSMISSION</div>
              <h2 className="vault-title">{decryptedData.title || "Untitled Memory"}</h2>
              <div className="vault-meta">
                <span className="meta-item">
                  <span className="label">Origin:</span> {decryptedData.senderName || "Unknown"}
                </span>
                <span className="meta-separator">|</span>
                <span className="meta-item">
                  <span className="label">Sealed:</span> {formatDate(decryptedData.createdDate)}
                </span>
              </div>
            </div>

            {/* 2. MEDIA SECTION (THE FIX) */}
            {decryptedData.fileUrl && (
              <div className="vault-media-container neon-highlight">
                {decryptedData.fileUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video controls className="vault-media-asset">
                    <source src={decryptedData.fileUrl} />
                    Protocol Error: Video format not supported.
                  </video>
                ) : (
                  <img
                    src={decryptedData.fileUrl}
                    alt="Memory transmission"
                    className="vault-media-asset"
                  />
                )}
              </div>
            )}

            {/* 3. BOTTOM DESCRIPTION SECTION */}
            <div className="vault-description">
              <h4 className="desc-label">TRANSMITTED MESSAGE</h4>
              <p className="desc-text">{decryptedData.message}</p>
            </div>

            {/* 4. FOOTER / CLOSE */}
            <div className="vault-footer">
              <button className="close-vault-btn" onClick={() => setIsModalOpen(false)}>
                RE-SEAL VAULT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}