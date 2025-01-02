import React from "react";
import "../index.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Favourite({
  favourites,
  setFavourites, // Receive setFavourites from props
  removeFromFavourite,
  clearFavourites,
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const droppedProperty = JSON.parse(e.dataTransfer.getData("property"));
      // Add the dropped property to the favourites if not already there
      if (!favourites.some((fav) => fav.id === droppedProperty.id)) {
        setFavourites((prev) => [...prev, droppedProperty]); // Use setFavourites here
      }
    } catch (error) {
      console.error("Error parsing dropped property:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
  };

  const handleClearAll = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (isConfirmed) {
      clearFavourites(); // Clear all favourites by calling the passed function
    }
  };

  return (
    <Container
      className="container-style"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Row className="justify-content-between align-items-center p-4">
        <Col>
          <h2 className="mb-0">Favourite</h2>
        </Col>
        <Col className="">
          <Button
            variant="danger"
            className="p-2 d-flex align-items-center justify-content-end"
            onClick={handleClearAll}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </Button>
        </Col>
      </Row>

      {favourites.length > 0 ? (
        <Row>
          {favourites.map((fav) => (
            <Col md={12} key={fav.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      <Card.Img
                        variant="top"
                        src={fav.picture || "placeholder-image-url.jpg"}
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
        <p>No items added to favourites yet.</p>
      )}
    </Container>
  );
}

export default Favourite;
