import { useState } from "react";
import axios from "axios";

export default function CreateCapsule() {

  const [form, setForm] = useState({
    title: "",
    recipientEmail: "",
    unlockDate: "",
    message: "",
  });

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/capsules",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Capsule created!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>

      <h2 className="mb-4">CREATE CAPSULE</h2>

      <div className="row g-4">

        {/* LEFT DROP AREA */}
        <div className="col-md-6">
          <div className="upload-box text-center p-5">
            <p>Drag & Drop Your Memories</p>
            <div className="vault-icon">🔒</div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-6">

          <input
            className="form-control mb-3 custom-input"
            placeholder="Capsule Title"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="form-control mb-3 custom-input"
            placeholder="Recipient Email"
            onChange={(e) =>
              setForm({ ...form, recipientEmail: e.target.value })
            }
          />

          <input
            type="datetime-local"
            className="form-control mb-3 custom-input"
            onChange={(e) =>
              setForm({ ...form, unlockDate: e.target.value })
            }
          />

          <textarea
            className="form-control mb-3 custom-input"
            placeholder="Write your message..."
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            className="btn w-100 seal-btn"
            onClick={handleCreate}
          >
            SEAL MEMORY
          </button>

        </div>

      </div>
    </div>
  );
}