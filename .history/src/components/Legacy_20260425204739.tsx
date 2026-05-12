import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";

export default function Legacy() {
  const [capsules, setCapsules] = useState<any[]>([]);

  useEffect(() => {
    fetchSentCapsules();
  }, []);

  const fetchSentCapsules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/capsules/sent",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCapsules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="legacy-container">
      <h3 className="section-title">LEGACY</h3>

      <div className="legacy-table">

        {/* HEADER */}
        <div className="legacy-header d-flex">
          <div className="col">Capsule</div>
          <div className="col">Recipient</div>
          <div className="col">Created Date</div>
          <div className="col">Unlocks On</div>
          <div className="col text-end">Action</div>
        </div>

        {/* ROWS */}
        {capsules.map((c, i) => (
          <div key={i} className="legacy-row d-flex align-items-center">

            <div className="col d-flex align-items-center gap-2">
              <span className="capsule-icon">🧪</span>
              <span>{c.title || "Shared Capsule"}</span>
            </div>

            <div className="col">
              {c.recipientEmail || "—"}
            </div>

            <div className="col">
              {new Date(c.createdAt).toLocaleDateString()}
            </div>

            <div className="col unlock-date">
              {new Date(c.unlockDate).toLocaleDateString()}
            </div>

            <div className="col text-end">
              <button className="manage-btn">
                Manage Access
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}