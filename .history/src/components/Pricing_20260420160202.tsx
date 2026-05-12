import "../styles/landing.css";


export default function PricingSection() {
  return (
    <section className="pricing-section text-center py-5">

      <h1 className="pricing-title mb-5">Choose Your Plan</h1>

      <div className="container">
        <div className="row justify-content-center">

          {/* STARTER */}
          <div className="col-md-3">
            <div className="pricing-card active3">
              <h4>Starter</h4>
              <h2>$0</h2>
              <p>Basic features</p>

              <ul>
                <li>✔ Create capsules</li>
                <li>✔ Basic storage</li>
                <li>✔ Email notifications</li>
              </ul>

              <button className="cta-btn me-3 text-decoration-none">Get Started</button>
            </div>
          </div>

          {/* PRO (Highlighted) */}
          <div className="col-md-3">
            <div className="pricing-card active">
              <h4>Pro</h4>
              <h2>$9/mo</h2>
              <p>Best for active users</p>

              <ul>
                <li>✔ Unlimited <br/> capsules</li>
                <li>✔ File uploads</li>
                <li>✔ Priority <br/> delivery</li>
              </ul>

              <button className="cta-btn me-3 text-decoration-none">Upgrade</button>
            </div>
          </div>

          {/* PREMIUM */}
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

              <button className="cta-btn me-3 text-decoration-none">Upgrade</button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}