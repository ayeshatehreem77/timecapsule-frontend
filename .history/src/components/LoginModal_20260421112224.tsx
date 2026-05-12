import { useState } from "react";
import axios from "axios";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user.role);

      window.location.href =
        res.data.user.role === "admin" ? "/admin" : "/dashboard";
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content login-card p-4">

          <h3 className="text-center text-light mb-4 glow-text">LOGIN</h3>

          <div className="card-inner p-4">
            <h5 className="text-center text-light mb-3">
              Enter the Vault
            </h5>

            <input
              type="email"
              className="form-control mb-3 custom-input"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3 custom-input"
              placeholder="Secure Passcode"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn w-100 unlock-btn"
              onClick={handleLogin}
            >
              UNLOCK
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}