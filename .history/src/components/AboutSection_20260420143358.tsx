
import "../styles/landing.css";

export default function AboutSection() {
  return (
    <section className="about-section d-flex align-items-center justify-content-center text-center">


      <div className="about-content container">

        <h1 className="about-title mb-4">
          Why TimeCapsule?
        </h1>

        <p className="about-text mb-5">
          In an age of instant gratification, we built TimeCapsule to celebrate the beauty of waiting.
          Whether it's a graduation wish, a wedding anniversary surprise, or a personal goal for 2030,
          we provide the secure, digital bridge between who you are today and who you will become.
        </p>

        <button className="btn btn-light">
          Start Your Legacy
        </button>

      </div>

    </section>
  );
}