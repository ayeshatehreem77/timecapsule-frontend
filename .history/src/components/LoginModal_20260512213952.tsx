import { useState } from "react";
import "../styles/auth.css";
import { useAlert } from '../context/useAlert';
// import api from "../utils/api";
import axios from "axios";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { showAlert } = useAlert();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://time-capsule-16y0.onrender.com/auth/auth/login", {
                email,
                password,
            });

            const token = res.data?.accessToken;
            const user = res.data?.user;

            if (!token || !user) {
                showAlert("Invalid server response", "error");
                return;
            }

            if (user.isBlocked) {
                showAlert("Account blocked", "error");
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // 🔥 IMPORTANT FIX
            localStorage.setItem("userId", user.id);

            showAlert("Login successful", "success");

            window.location.href =
                user.role === "admin" ? "/admin" : "/dashboard";

        } catch (err: any) {
            showAlert(err.response?.data?.message || "Login failed", "error");
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

                    <h5 className="text-center text-light mb-3 glow-text">
                        Enter the Vault
                    </h5>

                    <div className="card-inner p-4">


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
                            LOGIN
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}