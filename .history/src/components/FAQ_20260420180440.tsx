import { Accordion, Container } from "react-bootstrap";

export default function FAQ() {
  return (
    <div className="faq-section py-5 text-light">
      <Container>
        <h2 className="text-center mb-4 fw-bold">FAQ</h2>

        <Accordion defaultActiveKey="0">

          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What is passcode capsule?
            </Accordion.Header>
            <Accordion.Body>
              A passcode capsule is protected with an extra security layer.
              Only users with the correct passcode can open it.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              What if I lose my passcode?
            </Accordion.Header>
            <Accordion.Body>
              Currently, passcodes cannot be recovered. Make sure to store
              it safely before sealing your capsule.
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Container>
    </div>
  );
}