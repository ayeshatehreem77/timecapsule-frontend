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
      await axios.post("http://localhost:5000/capsules", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Memory Sealed Successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Encryption Failed");
    }
  };

  return (
    <div className="create-capsule-container fade-in">
      <h2 className="component-title">CREATE CAPSULE</h2>

      <div className="create-grid">
        {/* LEFT: THE DROP ZONE (VISUAL VESSEL) */}
        <div className="vessel-upload-section">
          <div className="drop-zone-glass">
            <p className="drop-text">Drag & Drop Your Memories</p>
            <div className="main-vessel-display">
              <div className="vessel-glow-ring"></div>
              <img 
                src="/icons/capsule-teal.png" 
                alt="Time Vessel" 
                className="floating-vessel" 
              />
            </div>
            <p className="upload-hint">Supported: Video, Audio, Photo, PDF</p>
          </div>
        </div>

        {/* RIGHT: THE FORM SECTION */}
        <div className="form-section-glass">
          <div className="input-wrapper">
            <label>Capsule Title</label>
            <input
              className="custom-input"
              placeholder="e.g., Letter to My 2030 Self"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="input-wrapper">
            <label>Recipient(s)</label>
            <input
              className="custom-input"
              placeholder="Enter email address"
              onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
            />
          </div>

          <div className="input-wrapper">
            <label>Unlock Date</label>
            <input
              type="datetime-local"
              className="custom-input"
              onChange={(e) => setForm({ ...form, unlockDate: e.target.value })}
            />
          </div>

          <div className="input-wrapper">
            <label>The Message</label>
            <textarea
              className="custom-textarea"
              placeholder="Write the message that will travel through time..."
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button className="btn-seal-memory" onClick={handleCreate}>
            SEAL MEMORY
          </button>
        </div>
      </div>
    </div>
  );
}