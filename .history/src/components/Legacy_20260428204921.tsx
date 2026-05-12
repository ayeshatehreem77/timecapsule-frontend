import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

export default function Legacy() {
    const [capsules, setCapsules] = useState<any[]>([]);
    const [userPasscode, setUserPasscode] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    interface DecryptedCapsule {
        title: string;
        message: string;
        fileUrl?: string;
        senderName: string; // Backend se sender ka naam lazmi bhejein
        createdDate: string;
    }
    const [decryptedData, setDecryptedData] = useState<DecryptedCapsule | null>(null);


    useEffect(() => {
        fetchLegacyCapsules();
    }, []);

    const fetchLegacyCapsules = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/capsules/my", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // 2. Filter for Legacy: Not locked and not already opened
            const legacyOnly = res.data.filter((c: any) => !c.locked && !c.isOpened);
            setCapsules(legacyOnly);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

     const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

    const handleOpen = async (id: string) => {
        const passcode = prompt("Enter the secret passcode to decrypt:");
        if (!passcode) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/capsules/${id}`, {
                params: { passcode: passcode },
                headers: { Authorization: `Bearer ${token}` }
            });

            // Set data and open modal
            setDecryptedData(res.data);
            setIsModalOpen(true);

            // Refresh the list so the opened capsule moves to History
            fetchLegacyCapsules();
        } catch (err) {
            alert("Invalid passcode or decryption failed.");
        }
    };

    return (
        <div className="legacy-container fade-in">
            <h2 className="component-title">LEGACY</h2>

            <div className="legacy-glass-table">
                <div className="legacy-header-row">
                    <div className="header-col">Capsule</div>
                    <div className="header-col text-right">Action</div>
                </div>

                <div className="legacy-body">
                    {capsules.length > 0 ? (
                        // 4. Fixed: Removed extra curly braces here
                        capsules.map((cap) => (
                            <div key={cap.id} className="legacy-card">
                                <h3>{cap.title}</h3>
                                <button className="seal-btn" onClick={() => handleOpen(cap.id)}>
                                    Decrypt Memory
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No legacy capsules found.</div>
                    )}
                </div>
            </div>
            {isModalOpen && decryptedData && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
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