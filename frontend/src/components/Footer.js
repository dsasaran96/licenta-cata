import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Catalin's Store
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            Acest proiect a fost construit folosind ReactJS, Express & MongoDB.
            Reprezinta proiectul meu de licenta.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
