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
    <>
      <Container className="my-4">
        <Row>
          {properties.map((eachCard) => (
            <Col md={4} key={eachCard.id} className="mb-4">
              <Tilt options={defaultOptions}>
                <Card
                  className="item-card h-100"
                  draggable // Enable dragging for the card
                  onDragStart={(e) => handleDragStart(e, eachCard)} // Use the passed drag start handler
                >
                  <button
                    className="card-pic-btn"
                    onClick={() => handleShowModal(eachCard.id)} // Trigger the modal
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
                      <br />
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
    </>
  );
}

export default CardPage;
