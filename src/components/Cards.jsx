import pic1 from "../assests/properties/prop1/prop1-1.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";

function Cards() {
  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={pic1} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Cards;
