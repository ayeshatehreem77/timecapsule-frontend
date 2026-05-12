import { useEffect, useState } from "react";
import api from "../utils/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ActiveVaults() {
  const [capsules, setCapsules] = useState<any[]>([]);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/capsules/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Show capsules that are still locked (waiting for time)
      const lockedCapsules = res.data.filter((c: any) => c.locked);
      setCapsules(lockedCapsules);
    } catch (err) {
      console.log("Error fetching active vaults:", err);
    }
  };

  const formatVaultDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');

    return `${hours}:${mins} - ${day}/${month}/${year}`;
  };

  return (
    <div className="active-vaults-container fade-in">
      <h2 className="component-title">ACTIVE VAULTS</h2>
      <p className="grid-label">GRID VIEW</p>

      <div className="vaults-grid">
        {capsules.length > 0 ? (
          capsules.map((c) => (
            <div className="vault-card-wrapper" key={c.id}>
              <div className="vault-card-glass">
                {/* The 3D Vessel Icon */}
                <div className="vault-vessel-container">
                  <DotLottieReact
                    src="/Hourglass.lottie"
                    loop
                    autoplay
                  />
                </div>

                <div className="vault-info">
                  <h6 className="vault-title">{c.title || "Graduation Wish"}</h6>
                  <div className="unlock-status">
                    <p className="unlock-label">UNLOCKS IN:</p>
                    <span className="unlock-time-glow">
                      {formatVaultDate(c.unlockDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No active vaults found. Sealing a new memory?</div>
        )}
      </div>
    </div>
  );
}