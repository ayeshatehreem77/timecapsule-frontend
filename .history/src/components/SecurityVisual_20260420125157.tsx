import "./landing.css";

export default function SecurityVisual() {
  return (
    <section className="security-section container-fluid py-5">
      <div className="row align-items-center">

        {/* LEFT SIDE (LOCK VISUAL) */}
        <div className="col-md-6 text-center position-relative">
          <div className="lock-wrapper">
            <div className="lock-glow"></div>
            <img
              src="/lock.png"   // 👈 add your lock image here
              alt="lock"
              className="lock-img"
            />
          </div>
        </div>

        {/* RIGHT SIDE (CONTENT) */}
        <div className="col-md-6">
          <h1 className="security-title mb-4">Security</h1>

          <div className="security-card active">
            <h5>End-to-End Encryption</h5>
            <p>Your memories are encrypted before they even reach our database.</p>
          </div>

          <div className="security-card">
            <h5>Immutable Storage</h5>
            <p>Once sealed, unlock dates can never be altered.</p>
          </div>

          <div className="security-card">
            <h5>Secure Onboarding</h5>
            <p>Authentication via JWT ensures only you have access to your vault.</p>
          </div>

        </div>

      </div>
    </section>
  );
}