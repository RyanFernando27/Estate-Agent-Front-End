import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CardPage({ addToFavourite, properties }) {
  return (
    <Container className="my-4">
      <Row>
        {properties.map((eachCard) => (
          <Col md={4} key={eachCard.id} className="mb-4">
            <Card className="item-card">
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
                <Button
                  variant="primary"
                  onClick={() => addToFavourite(eachCard)}
                >
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
