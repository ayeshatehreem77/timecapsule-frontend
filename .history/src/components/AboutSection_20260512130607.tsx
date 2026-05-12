
import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="about-section d-flex align-items-center justify-content-center text-center" data-aos="zoom-in-up">


      <div className="about-content container">

        <h1 className="about-title mb-4">
          Why TimeCapsule?
        </h1>

        <p className="about-text mb-5">
          In an age of instant gratification, we built TimeCapsule to celebrate the beauty of waiting.
          Whether it's a graduation wish, a wedding anniversary surprise, or a personal goal for 2030,
          we provide the secure, digital bridge between who you are today and who you will become.
        </p>

        {/* <Link className="cta-btn me-3 text-decoration-none" to='/register'>
          Start Your Legacy
        </Link> */}

      </div>

    </section>
  );
}