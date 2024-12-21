import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Records from "../properties.json";
import pic1 from "../assests/properties/prop1/prop1-1.jpg";

function CardPage({ properties }) {
  return (
    <Container className="my-4">
      <Row>
        {Records.properties.map((eachCard) => (
          <Col md={4} key={eachCard.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={eachCard.picture}
                alt={eachCard.type}
              />
              <Card.Body>
                <Card.Title>{eachCard.type}</Card.Title>
                <Card.Text>
                  <strong>Tenure:</strong> {eachCard.tenure}
                  <br />
                  <strong>Bedrooms:</strong> {eachCard.bedrooms}
                  <br />
                  <strong>Location:</strong> {eachCard.location}
                  <br />
                  <strong>Price:</strong> ${eachCard.price.toLocaleString()}
                  <br />
                </Card.Text>
                <Button variant="primary" href={eachCard.url}>
                  Add to Favourite
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardPage;
