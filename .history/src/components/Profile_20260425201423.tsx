import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/users/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>

      <h2 className="mb-4">User Dashboard</h2>

      {/* TOP CARD */}
      <div className="profile-card mb-4 p-4 d-flex justify-content-between">

        <div className="d-flex align-items-center gap-3">
          <div className="avatar"></div>

          <div>
            <h4>{user.name}</h4>
            <p className="tier">Premium Legacy Tier</p>
          </div>
        </div>

        <div className="stats-box">
          <p>Total Vaults: {user.totalCapsules || 0}</p>
        </div>

      </div>

      {/* ACCOUNT DETAILS */}
      <div className="row g-4">

        <div className="col-md-6">
          <div className="glass-card p-3">

            <h5>Account Details</h5>

            <input
              className="form-control custom-input mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="form-control custom-input mb-2"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <button
              className="btn seal-btn w-100"
              onClick={handleUpdate}
            >
              Save Changes
            </button>

          </div>
        </div>

        {/* SECURITY */}
        <div className="col-md-6">
          <div className="glass-card p-3">

            <h5>Security</h5>

            <input
              type="password"
              placeholder="New Password"
              className="form-control custom-input mb-2"
            />

            <button className="btn seal-btn w-100">
              Update Password
            </button>

          </div>
        </div>

      </div>

      {/* LOGOUT */}
      <button
        className="btn btn-danger mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}