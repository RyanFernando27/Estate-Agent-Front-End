import React from "react";
import "../index.css";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import pic1 from "../assests/properties/prop1/prop1-1.jpg";

function Favourite({ favourites, removeFromFavourite }) {
  return (
    <Container className="container-style">
      <h1>Favourite</h1>
      {/* Checking array has any items */}
      {favourites.length > 0 ? (
        // If favourites is not empty, it maps over the array and renders each favourite property inside a Row and Col layout.
        <Row>
          {favourites.map((fav) => (
            <Col md={12} key={fav.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      <Card.Img
                        variant="top"
                        src={pic1 || "placeholder-image-url.jpg"}
                        alt={fav.type}
                      />
                    </Col>
                    <Col sm={8}>
                      <Card.Title>{fav.type}</Card.Title>
                      <Card.Text>
                        <strong>Tenure:</strong> {fav.tenure}
                        <br />
                        <strong>Bedrooms:</strong> {fav.bedrooms}
                        <br />
                        <strong>Location:</strong> {fav.location}
                        <br />
                        <strong>Price:</strong> ${fav.price.toLocaleString()}
                      </Card.Text>
                      {/* Remove button  for remove each item */}
                      <Button
                        variant="danger"
                        onClick={() => removeFromFavourite(fav.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        // If there is no items in the favourite list this paragraph will display
        <p>No items added to favourites yet.</p>
      )}
    </Container>
  );
}

export default Favourite;
