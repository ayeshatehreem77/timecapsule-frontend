import { useEffect, useState } from "react";
import axios from "axios";

export default function ActiveVaults() {
  const [capsules, setCapsules] = useState<any[]>([]);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/capsules/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // only locked ones
      const lockedCapsules = res.data.filter((c: any) => c.locked);

      setCapsules(lockedCapsules);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">ACTIVE VAULTS</h2>

      <h6 className="mb-3">GRID VIEW</h6>

      <div className="row g-4">
        {capsules.map((c) => (
          <div className="col-md-4" key={c.id}>
            <div className="vault-card">

              <div className="vault-icon">🔒</div>

              <h6 className="mt-2">{c.title}</h6>

              <p className="unlock-label">UNLOCKS IN:</p>

              <span className="unlock-time">
                {formatDate(c.unlockDate)}
              </span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// helper
const formatDate = (date: string) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear().toString().slice(-2);

  const hours = d.getHours();
  const mins = d.getMinutes();

  return `${hours}:${mins} - ${day}/${month}/${year}`;
};