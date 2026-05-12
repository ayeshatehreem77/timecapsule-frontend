import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateCapsule() {
  const [form, setForm] = useState({
    title: "",
    recipientEmail: "",
    unlockDate: "",
    message: "",
    passcode: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Handle generating the preview when a file is selected
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    // Only preview if it's an image
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Clean up memory when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null); // Non-image files (videos/pdfs) won't show a preview
    }
  }, [file]);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      // Use FormData for multipart/form-data support
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("recipientEmail", form.recipientEmail);
      formData.append("unlockDate", form.unlockDate);
      formData.append("message", form.message);

      // Append the actual file from your state
      if (file) {
        formData.append("file", file);
      }

      await axios.post("http://localhost:5000/capsules", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
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
        <div className={`drop-zone-glass ${file ? 'file-loaded' : ''}`}>
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />

          <label htmlFor="fileInput" className="vessel-label">
            {/* Dynamic Header Text */}
            <p className="drop-text">
              {file ? ` ${file.name.toUpperCase()}` : "DRAG & DROP MEMORIES"}
            </p>

            <div className="main-vessel-display">
              <div className="vessel-glow-ring"></div>

              {/* CRITICAL CHANGE: 
         If preview exists, show the uploaded image. 
         Otherwise, show the teal capsule icon.
      */}
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="capsule-image-preview" />
                  <div className="hologram-overlay"></div>
                </div>
              ) : (
                <img
                  src="/icons/capsule-teal.png"
                  alt="Vessel Placeholder"
                  className="floating-vessel"
                />
              )}
            </div>
          </label>

          <p className="upload-hint">
            {file ? "CLICK TO REPLACE FILE" : "CLICK VESSEL TO SELECT MANUALLY"}
          </p>
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

          <div className="input-group">
            <label className="vessel-label-text">ENCRYPTION PASSCODE</label>
            <input
              type="password"
              className="glass-input security-font"
              placeholder="MIN 4 CHARACTERS"
              value={form.passcode}
              onChange={(e) => setForm({ ...form, passcode: e.target.value })}
              required
            />
            <p className="input-hint">This key is required to unlock the memory in the future.</p>
          </div>

          <button className="btn-seal-memory" onClick={handleCreate}>
            SEAL MEMORY
          </button>
        </div>
      </div>
    </div>
  );
}