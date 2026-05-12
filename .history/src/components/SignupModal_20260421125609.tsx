import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function SignupModal() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("signup"); // 🔥 FIX

  // 🔐 SIGNUP
  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/auth/register", form);

      alert("OTP sent to your email");
      setStep("otp"); // 🔥 switch UI

    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  // 🔐 VERIFY OTP
  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:5000/auth/verify-otp", {
        email: form.email,
        otp,
      });

      alert("Account verified! Now login");
      window.location.reload();

    } catch (err: any) {
      alert(err.response?.data?.message || "OTP failed");
    }
  };

  return (
    <div className="modal fade" id="signupModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content login-card p-4">

          <h3 className="text-center text-light mb-4 glow-text">
            {step === "signup" ? "SIGN UP" : "VERIFY OTP"}
          </h3>

          <div className="card-inner p-4">

            {step === "signup" ? (
              <>
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

                <button
                  className="btn w-100 unlock-btn"
                  onClick={handleSignup}
                >
                  CREATE ACCOUNT
                </button>
              </>
            ) : (
              <>
                <input
                  placeholder="Enter OTP"
                  className="form-control mb-3 custom-input"
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  className="btn w-100 unlock-btn"
                  onClick={verifyOtp}
                >
                  VERIFY OTP
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}