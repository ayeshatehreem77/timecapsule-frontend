import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import { useAlert } from '../context/useAlert';

export default function SignupModal() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { showAlert } = useAlert();

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("signup"); // 🔥 FIX

  // 🔐 SIGNUP
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://time-capsule-16y0.onrender.com/auth/register",
        form
      );
      console.log(res)

      showAlert("OTP sent to your email", "success");
      setStep("otp");
    } catch (err: any) {
      showAlert(err.response?.data?.message || "Signup failed", "error");
    }
  };

  // 🔐 VERIFY OTP
  const verifyOtp = async () => {
    try {
      await axios.post("https://time-capsule-16y0.onrender.com/auth/verify-otp", {
        email: form.email,
        otp,
      });

      showAlert("Account verified! Now login", 'success');
      window.location.reload();

    } catch (err: any) {
      showAlert(err.response?.data?.message || "OTP failed", 'error');
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