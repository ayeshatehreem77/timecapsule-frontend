import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function SignupModal() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/auth/signup", form);

      alert("Account created!");
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="modal fade" id="signupModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content login-card p-4">

          <h3 className="text-center text-light mb-4 glow-text">
            SIGN UP
          </h3>
          <p className="text-center">New to capsule? Create a lagacy.</p>

          <div className="card-inner p-4">
            <input
              type="text"
              className="form-control mb-3 custom-input"
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              className="form-control mb-3 custom-input"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-3 custom-input"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="btn w-100 unlock-btn" onClick={handleSignup}>
              CREATE ACCOUNT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}