import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import BackgroundImage from "./BackgroundImage";
import RegistrationForm from "./RegistrationForm";

const RegistrationCard = ({ backgroundImage, logoImage, formProps }) => {
  return (
    <Card className="registration-card">
      <Row className="g-0">
        <Col md={6} className="left-side">
          <BackgroundImage
            backgroundImage={backgroundImage}
            logoImage={logoImage}
          />
        </Col>
        <Col md={6} className="right-side">
          <Card.Body>
            <h2 className="text-center mb-4">REGISTER</h2>
            <RegistrationForm {...formProps} />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default RegistrationCard;
