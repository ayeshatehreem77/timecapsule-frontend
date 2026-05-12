import { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from '../context/AlertContext';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const { showAlert } = useAlert();

  const AVATAR_OPTIONS = [
    "/Avatars/avatar1.jpg",
    "/Avatars/avatar2.jpg",
    "/Avatars/avatar3.jpg",
    "/Avatars/avatar4.jpg",
    "/Avatars/avatar5.jpg",
    "/Avatars/avatar6.jpg",
    "/Avatars/avatar7.jpg",
    "/Avatars/avatar8.jpg",
    "/Avatars/avatar9.jpg",
    "/Avatars/avatar10.jpg",
    "/Avatars/avatar11.jpg",
    "/Avatars/avatar12.jpg",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email });

      // IMPORTANT: Refresh par image wapas laane ke liye ye line add karein
      if (res.data.profilePic) {
        setSelectedAvatar(res.data.profilePic);
      } else {
        // Agar user ne abhi tak koi avatar select nahi kiya toh pehla wala default set kar dein
        setSelectedAvatar("/Avatars/avatar1.jpg");
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/Avatars/edit.png",
        { avatarUrl: url },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedAvatar(url); // State update
      setIsPickerOpen(false); // Modal close
      showAlert("IDENTITY UPDATED", "success");
    } catch (err) {
      showAlert("SYNC FAILED", "error");
    }
  }

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/auth/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert("Vault Identity Updated!", 'success');
    } catch (err: any) {
      showAlert(err.response?.data?.message || "Update failed", 'error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return <div className="loading-state">Decrypting Identity...</div>;

  return (
    <div className="profile-container fade-in">
      <h2 className="component-title">USER DASHBOARD</h2>

      {/* IDENTITY ANCHOR (TOP CARD) */}
      <div className="identity-anchor-card">
        <div className="profile-main-info">
          <div className="avatar-wrapper" onClick={() => setIsPickerOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="avatar-glow"></div>
            <img
              src={selectedAvatar }
              alt="Edit pfp"
              className="profile-img"
            />
            {/* <div className="edit-hint">CHANGE IDENTITY</div> */}
          </div>

          {/* Avatar Picker Modal */}
          {isPickerOpen && (
            <div className="modal-overlay" onClick={() => setIsPickerOpen(false)}>
              <div className="avatar-picker-modal" onClick={e => e.stopPropagation()}>
                <h3 className="modal-title">SELECT NEW AVATAR</h3>

                <div className="avatar-grid">
                  {AVATAR_OPTIONS.map((url, index) => (
                    <div
                      key={index}
                      className={`avatar-option ${selectedAvatar === url ? 'active' : ''}`}
                      onClick={() => handleAvatarUpdate(url)}
                    >
                      <img src={url} alt={`Avatar ${index}`} />
                    </div>
                  ))}
                </div>

                <button className="close-vault-btn" onClick={() => setIsPickerOpen(false)}>
                  DISMISS
                </button>
              </div>
            </div>
          )}

          <div className="user-text-info">
            <h3>{user.name}</h3>
            <p className="tier-badge">PREMIUM LEGACY TIER <span className="lock-icon">🔒</span></p>
          </div>
        </div>
      </div>

      <div className="profile-settings-grid">
        {/* ACCOUNT DETAILS */}
        <div className="settings-card glass-card">
          <h5>ACCOUNT DETAILS</h5>
          <div className="input-group-custom">
            <label>Full Name</label>
            <input
              className="custom-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="input-group-custom">
            <label>Email Address (Verified)</label>
            <input
              className="custom-input"
              value={form.email}
              readOnly={true} // Usually email shouldn't be edited freely
            />
          </div>
          <button className="btn-seal-gold w-100" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>

        {/* SECURITY & AUTH */}
        <div className="settings-card glass-card">
          <h5>SECURITY & AUTHENTICATION</h5>
          <div className="input-group-custom">
            <label>New Passcode</label>
            <input type="password" placeholder="••••••••" className="custom-input" />
          </div>
          <div className="security-status-line">
            <span className="status-indicator active"></span>
            <p>TWO-FACTOR AUTHENTICATION (2FA): <strong>ACTIVE</strong></p>
          </div>
          <button className="btn-outline-cyan w-100">Update Password</button>
        </div>
      </div>

      <button className="logout-link-btn" onClick={handleLogout}>
        Delete Account or Logout
      </button>
    </div>
  );
}