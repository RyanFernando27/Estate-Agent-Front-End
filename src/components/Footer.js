import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="gy-3">
          {/* Column 1: About Section */}
          <Col md={6}>
            <h5>About Us</h5>
            <p>
              We are a leading real estate platform dedicated to helping you
              find your dream property. Explore properties with ease and
              confidence.
            </p>
          </Col>

          {/* Column 3: Contact Information */}
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> support@propertystate.com
              <br />
              <strong>Phone:</strong> +1 234 567 890
              <br />
              <strong>Address:</strong> 123 Real Estate St, Property City
            </p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Real Estate Co. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
