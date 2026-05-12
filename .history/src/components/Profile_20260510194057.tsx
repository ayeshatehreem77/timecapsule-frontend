import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAlert } from '../context/useAlert';

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
    "/Avatars/avatar13.jpg",
    "/Avatars/avatar14.jpg",
    "/Avatars/avatar15.jpg",
    "/Avatars/avatar16.jpg",
    "/Avatars/avatar17.jpg",
    "/Avatars/avatar18.jpg",
    "/Avatars/avatar19.jpg",
    "/Avatars/avatar20.jpg",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true); // Start loading
    try {
      const res = await api.get("/auth/me");

      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email });
      setSelectedAvatar(res.data.profilePic || "/Avatars/avatar1.jpg");

    } catch (err: any) {
      console.log("Error fetching profile:", err);

      // 🛑 AGAR TOKEN EXPIRED HAI YA ERROR HAI TOH LOGOUT KARWA DEIN
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
      }

      showAlert("Failed to sync identity", "error");
    } finally {
      setLoading(false); // ✅ Har haal mein loading khatam hogi
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    try {
      await api.put(
        "/auth/update-avatar",
        { avatarUrl: url },
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
      await api.put("/auth/update", form);
      showAlert("Vault Identity Updated!", 'success');
    } catch (err: any) {
      showAlert(err.response?.data?.message || "Update failed", 'error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) return <div className="loading-state">Decrypting Identity...</div>;

  if (!loading && !user) {
    return <div className="error-state">Session expired. Please login again.</div>;
  }

  return (
    <div className="profile-container fade-in">
      <h2 className="component-title">PROFILE</h2>

      {/* IDENTITY ANCHOR (TOP CARD) */}
      <div className="identity-anchor-card">
        <div className="profile-main-info">
          <div className="avatar-wrapper" onClick={() => setIsPickerOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="avatar-glow"></div>
            <img
              src={selectedAvatar}
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
            <p className="tier-badge">
              {user.plan?.toUpperCase()} PLAN <span className="lock-icon">🔒</span>
            </p>
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

      </div>

      <button className="logout-link-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}