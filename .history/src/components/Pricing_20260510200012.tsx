import "../styles/landing.css";
import api from "../utils/api"
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function PricingSection() {
  const [user, setUser] = useState<any>(null);
  const handlePayment = async (plan: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await api.post(
        "/payments/create-checkout-session",
        {
          plan,
          userId: localStorage.getItem("userId"),
        }
      );

      const stripe = await stripePromise;

      if (!stripe) return;

      window.location.href = res.data.url;

    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  const handleDowngrade = async () => {
    try {
      await api.put("/auth/downgrade-plan");

      setUser((prev: any) => ({
        ...prev,
        plan: "starter",
      }));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className="pricing-section text-center" >

      <h1 className="pricing-title mb-5">Choose Your Plan</h1>

      <div className="container">
        <div className="row justify-content-center gap-5">

          {/* STARTER */}
          <div className="col-md-3">
            <div className="pricing-card active3">
              <h4>Starter</h4>
              <h2>$0</h2>
              <p>Basic features</p>

              <ul>
                <li>✔ 5 capsules </li>
                <li>✔ Basic storage</li>
                <li>✔ Email notifications</li>
              </ul>

              {user?.plan === "pro" && (
                <button
                  className="downgrade-btn"
                  onClick={handleDowngrade}
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>

          {/* PRO (Highlighted) */}
          <div className="col-md-3">
            <div className="pricing-card card-1">
              <h4>Pro</h4>
              <h2>$9/mo</h2>
              <p>Best for active users</p>

              <ul>
                <li>✔ Unlimited capsules</li>
                <li>✔ File uploads</li>
                <li>✔ Priority delivery</li>
              </ul>

              <button
                className="cta-btn me-3 text-decoration-none"
                onClick={() => handlePayment("pro")}
                disabled={user?.plan === "pro"}
              >
                {user?.plan === "pro" ? "Subscribed" : "Upgrade"}
              </button>
            </div>
          </div>

          {/* PREMIUM
          <div className="col-md-3">
            <div className="pricing-card active2">
              <h4>Premium</h4>
              <h2>$19/mo</h2>
              <p>Ultimate experience</p>

              <ul>
                <li>✔ Everything in Pro</li>
                <li>✔ Public capsule links</li>
                <li>✔ Advanced encryption</li>
              </ul>

              <button className="cta-btn me-3 text-decoration-none" onClick={() => handlePayment("premium")}>Upgrade</button>
            </div>
          </div> */}

        </div>
      </div>

    </section>
  );
}