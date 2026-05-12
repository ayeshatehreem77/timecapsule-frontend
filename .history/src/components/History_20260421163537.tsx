import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/capsules/my-capsules",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // only delivered/opened capsules
      const delivered = res.data.filter(
        (c: any) =>
          c.deliveryStatus === "delivered" || c.isOpened === true
      );

      setHistory(delivered);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">HISTORY</h2>

      <div className="timeline">

        {history.map((item, index) => (
          <div className="timeline-item" key={index}>

            <div className="timeline-dot"></div>

            <div className="timeline-card">

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">
                  <span className="timeline-icon">🟢</span>

                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">
                      {formatDate(item.unlockDate)}
                    </small>
                  </div>
                </div>

                <span className="status-badge">
                  ✔ Delivered
                </span>

              </div>

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

  return d.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};