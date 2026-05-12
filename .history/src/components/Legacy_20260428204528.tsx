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
                    <div className="decrypt-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">SECURE MEMORY</h2>

                        <div className="message-box">
                            <p>{decryptedData.message}</p>
                        </div>

                        {/* --- MEDIA PREVIEW SECTION --- */}
                        {decryptedData.fileUrl && (
                            <div className="media-preview-container">
                                {decryptedData.fileUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video controls className="modal-media">
                                        <source src={decryptedData.fileUrl} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        src={decryptedData.fileUrl}
                                        alt="Memory attachment"
                                        className="modal-media"
                                    />
                                )}
                            </div>
                        )}

                        <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                            CLOSE VAULT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}