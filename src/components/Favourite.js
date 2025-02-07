import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Offcanvas } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";

function Favourite({
  favourites,
  setFavourites,
  removeFromFavourite,
  clearFavourites,
}) {
  const [show, setShow] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const buttonRef = React.useRef(null);

  const handleClose = () => {
    setShow(false);
    // Add small delay to show button animation
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.classList.remove('hidden');
      }
    }, 300);
  };

  const handleShow = () => {
    setShow(true);
    if (buttonRef.current) {
      buttonRef.current.classList.add('hidden');
    }
  };

  // handle Drag out  property from the favourites to remove it .
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedProperty = JSON.parse(e.dataTransfer.getData("property"));
    if (!favourites.some((fav) => fav.id === droppedProperty.id)) {
      setFavourites((prev) => [...prev, droppedProperty]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  // start drag function
  const handleDragStartFromFavourite = (e, id) => {
    e.dataTransfer.setData("favouriteId", id);
  };

  // Clear All function
  const handleClearAll = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (isConfirmed) {
      clearFavourites();
    }
  };

  return (
    <>
      {/* Floating Favourites Button with Drop Zone */}
      <div 
        className={`floating-fav-container ${isDraggingOver ? 'dragging-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        ref={buttonRef}
      >
        <IconButton
          onClick={handleShow}
          className="floating-fav-btn"
          color="error"
          size="large"
        >
          <Badge badgeContent={favourites.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        {isDraggingOver && (
          <div className="drop-indicator">
            Drop to add to favorites
          </div>
        )}
      </div>

      {/* Favourites Sidebar */}
      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="end"
        className="favourites-sidebar glass-effect"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2 className="mb-0">Favourites</h2>
          </Offcanvas.Title>
          <IconButton
            color="error"
            onClick={handleClearAll}
            className="ms-2"
          >
            <DeleteIcon />
          </IconButton>
        </Offcanvas.Header>
        <Offcanvas.Body
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {favourites.length > 0 ? (
            <Row>
              {favourites.map((fav) => (
                <Col md={12} key={fav.id} className="mb-4">
                  <Card
                    className="fav-card"
                    draggable
                    onDragStart={(e) => handleDragStartFromFavourite(e, fav.id)}
                  >
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
                          <IconButton
                            color="error"
                            onClick={() => removeFromFavourite(fav.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Favourite;
