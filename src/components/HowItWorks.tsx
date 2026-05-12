import { Container, Row, Col } from "react-bootstrap";
import "../styles/landing.css";

export default function HowItWorks() {
  return (
    <div className="how-section text-center text-light py-5" data-aos="zoom-in-up">
      <Container>
        <h2 className="mb-5 fw-bold">How it Works</h2>

        <Row className="align-items-center">
          <Col md={4}>
            <div className="step-card">
              <img src="/steps-locked.svg" alt="create" />
              <h5 className="mt-3">1. Create & Seal (2024)</h5>
            </div>
          </Col>

          <Col md={4}>
            <div className="step-card">
              <img src="/steps-lock.svg" alt="lock" />
              <h5 className="mt-3">2. The Encrypted Wait</h5>
            </div>
          </Col>

          <Col md={4}>
            <div className="step-card">
              <img src="/steps-unlocked.svg" alt="deliver" />
              <h5 className="mt-3">3. Future Delivery (2030)</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}