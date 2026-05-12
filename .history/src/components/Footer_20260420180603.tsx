import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer-section text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={6}>
            <h5>TimeCapsule</h5>
            <p>Built with the MERN Stack</p>
          </Col>

          <Col md={6} className="text-md-end">
            <p>Features | Security | FAQ | Contact</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}