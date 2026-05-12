import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

export default function Legacy() {
    const [capsules, setCapsules] = useState<any[]>([]);

    useEffect(() => {
        fetchSentCapsules();
    }, []);

    const formatDate = (date: string) => {
        if (!date) return "—";
        // Matching the cyan/purple date style in the image
        return new Date(date).toLocaleDateString("en-GB");
    };

    const fetchSentCapsules = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/capsules:id",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCapsules(res.data);
        } catch (err) {
            console.log("Error fetching legacy data:", err);
        }
    };

    return (
        <div className="legacy-container fade-in">
            <h2 className="component-title">LEGACY</h2>

            <div className="legacy-glass-table">
                {/* TABLE HEADER */}
                <div className="legacy-header-row">
                    <div className="header-col">Capsule</div>
                    <div className="header-col">Recipient</div>
                    <div className="header-col">Created Date</div>
                    <div className="header-col">Unlocks On</div>
                    <div className="header-col text-right">Action</div>
                </div>

                {/* TABLE BODY */}
                <div className="legacy-body">
                    {capsules.length > 0 ? (
                        capsules.map((c, i) => (
                            <div key={i} className="legacy-item-row">
                                {/* CAPSULE INFO */}
                                <div className="legacy-col capsule-info">
                                    <div className="capsule-mini-icon">
                                        <img src="/icons/capsule-teal.png" alt="icon" /> 
                                    </div>
                                    <span className="capsule-name">{c.title || "Shared Capsule"}</span>
                                </div>

                                {/* RECIPIENT */}
                                <div className="legacy-col recipient-info">
                                    <div className="user-avatar-small">
                                        {/* Fallback avatar if no image */}
                                        {c.recipientName?.charAt(0) || "U"}
                                    </div>
                                    <span className="recipient-name">{c.recipientName || c.recipientEmail}</span>
                                </div>

                                {/* CREATED DATE */}
                                <div className="legacy-col date-col">
                                    {formatDate(c.createdAt)}
                                </div>

                                {/* UNLOCK DATE - Glowing Purple Highlight */}
                                <div className="legacy-col unlock-col">
                                    <span className="glow-text-purple">
                                        {formatDate(c.unlockDate)}
                                    </span>
                                </div>

                                {/* ACTION BUTTON */}
                                <div className="legacy-col action-col text-right">
                                    <button className="btn-manage-access">
                                        Manage Access
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No legacy capsules found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}