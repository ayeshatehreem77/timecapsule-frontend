import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-bg">

      {/* 🔥 NAVBAR */}
      <nav className="navbar navbar-expand-lg px-4">
        <a className="navbar-brand" href="#">TimeCapsule</a>

        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/login">
            Sign In
          </Link>
          <Link className="btn btn-light" to="/register">
            Get Started
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <div className="container text-center mt-5 pt-5">
        <h1 className="hero-title">
          Your Memories, Safely Stored.<br />
          Delivered Only to the Future.
        </h1>

        <p className="hero-sub mt-3">
          Create, seal, and send digital time capsules to yourself or loved ones.
        </p>

        <div className="mt-4">
          <Link to="/register" className="cta-btn me-3">
            Get Started for Free
          </Link>

          <Link to="/login" className="text-light">
            Sign In
          </Link>
        </div>
      </div>

      {/* 🔥 FEATURES */}
      <div className="container mt-5 pt-5">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h5 className="mt-3">Private Legacy</h5>
              <p>Store your memories securely for the future.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h5 className="mt-3">Shared Futures</h5>
              <p>Send meaningful messages to loved ones.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">⏳</div>
              <h5 className="mt-3">The Lock of Time</h5>
              <p>Capsules unlock only at the perfect time.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}