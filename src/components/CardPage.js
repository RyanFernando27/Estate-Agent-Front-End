import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Tilt } from 'react-tilt';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

function CardPage({
  addToFavourite,
  properties,
  handleShowModal,
  handleDragStart,
}) {
  const defaultOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {properties.map((eachCard) => (
          <Col key={eachCard.id}>
            <Tilt options={defaultOptions}>
              <Card
                className="item-card h-100"
                draggable
                onDragStart={(e) => handleDragStart(e, eachCard)}
              >
                <button
                  className="card-pic-btn"
                  onClick={() => handleShowModal(eachCard.id)}
                >
                  <Card.Img
                    variant="top"
                    src={eachCard.picture}
                    alt={eachCard.type}
                  />
                </button>

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
                  </Card.Text>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToFavourite(eachCard);
                    }}
                    className="favorite-btn"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Card.Body>
              </Card>
            </Tilt>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardPage;
