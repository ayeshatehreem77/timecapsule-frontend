import { Link } from "react-router-dom";
import "../../styles/landing.css";
import AboutSection from "../../components/AboutSection"
import SecurityVisual from "../../components/SecurityVisual"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PricingSection from "../../components/Pricing";
import HowItWorks from "../../components/HowItWorks";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";

// AOS Animation
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="landing-bg">

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 🔥 NAVBAR */}
        <nav className="navbar  navbar-expand-lg px-4">
          <div className="nav-logo h-100 w-100" data-aos="fade-right">
            <img src="/tc-logo.png" alt="create" />
            <a className="navbar-brand " href="#">TimeCapsule</a>
          </div>


          <div className="ms-auto nav-items" data-aos="fade-down">
            <Link className="links" to="">
              Features
            </Link>
            <Link className="links" to="">
              About
            </Link>
            <Link className="links" to="">
              Security
            </Link>
            <Link className="links" to="">
              Pricing
            </Link>
            <Link className="links" to="">
              FAQ
            </Link>
          </div>
        </nav>

        {/* 🔥 HERO SECTION */}
        <div className="container text-center mt-5 pt-5 hero-section vh-100" data-aos="zoom-in" >
          <h1 className="hero-title mt-5">
            Your Memories, Safely Stored.<br />
            Delivered Only to the Future.
          </h1>

          <p className="hero-sub mt-3">
            Create, seal, and send digital time capsules to yourself or loved ones.
          </p>

          <div className="mt-4">
            <div className="mt-5">
              <button data-bs-toggle="modal"
                data-bs-target="#signupModal" className="cta-btn mt-5 text-decoration-none">
                Get Started for Free
              </button>
            </div>
            <div className="mt-2">
              <button data-bs-toggle="modal"
                data-bs-target="#loginModal" className="links text-light text-decoration-none signup-btn">
                Sign In
              </button>
            </div>
          </div>
        </div>

        <AboutSection />

        {/* 🔥 FEATURES */}
        <div className="container mt-5 pt-5 features" data-aos="zoom-in-up">
          <h1 className="security-title mb-3 text-center">Features</h1>
          <p className="hero-sub mb-5 text-center">
            Every capsule is encrypted, isolated, and only revealed at the perfect moment.
          </p>
          <div className="row text-center">

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <DotLottieReact
                    src="/lock.lottie"
                    loop
                    autoplay
                  /></div>
                <h5 className="mt-3">Private Legacy</h5>
                <p>Store your memories securely for the <br /> future.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon"><DotLottieReact
                  src="/url.lottie"
                  loop
                  autoplay
                /></div>
                <h5 className="mt-3">Shared Futures</h5>
                <p>Send meaningful messages to loved <br /> ones.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon"><DotLottieReact
                  src="/time.lottie"
                  loop
                  autoplay
                /></div>
                <h5 className="mt-3">The Lock of Time</h5>
                <p>Capsules unlock only at the perfect <br /> time.</p>
              </div>
            </div>

          </div>
        </div>
      </div>




      <div className="container mt-5">

        <SecurityVisual />


      </div>

      <HowItWorks />
      <PricingSection />
      <FAQ />
      <Footer />

    </div>

  );
}