import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Row, Col, Image, Button } from "react-bootstrap";

function PopupWindow({ popupTrigger, property, closePopup }) {
  const [selectedImage, setSelectedImage] = useState(""); // State to store selected image

  // Navigate to the next or previous image
  const navigateImage = (direction) => {
    const imageKeys = Object.keys(property.images);
    const currentIndex = imageKeys.findIndex(
      (key) => property.images[key] === selectedImage
    );

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % imageKeys.length; // Wrap around to the first image
    } else if (direction === "previous") {
      newIndex = (currentIndex - 1 + imageKeys.length) % imageKeys.length; // Wrap around to the last image
    }

    setSelectedImage(property.images[imageKeys[newIndex]]);
  };

  useEffect(() => {
    // Set the first image as the default selected image when the property changes
    if (property?.images) {
      const firstImageKey = Object.keys(property.images)[0]; // Get the first key
      setSelectedImage(property.images[firstImageKey]); // Set the first image
    }
  }, [property]);

  return popupTrigger ? (
    <div className="popup">
      <div
        className="popup-inner container"
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
          height: "80vh",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={closePopup}
        ></button>
        {property && (
          <>
            <Row>
              {/* Image Column */}
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-center position-relative">
                  {/* Previous Image Button */}
                  <Button
                    variant="link"
                    className="position-absolute start-0"
                    onClick={() => navigateImage("previous")}
                    style={{ zIndex: 10 }}
                  >
                    <GrPrevious />
                  </Button>

                  {/* Main Image */}
                  <Image src={selectedImage} alt={property.type} fluid />

                  {/* Next Image Button */}
                  <Button
                    variant="link"
                    className="position-absolute end-0"
                    onClick={() => navigateImage("next")}
                    style={{ zIndex: 10 }}
                  >
                    <GrNext />
                  </Button>
                </div>
              </Col>

              {/* Tabs Column */}
              <Col md={6}>
                <div className="popup-header">
                  <h3>{property.type}</h3>
                  <p>
                    <strong>Location:</strong> {property.location}
                    <br />
                    <strong>Price:</strong> ${property.price.toLocaleString()}
                  </p>
                </div>
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                  </TabList>

                  <TabPanel>
                    <strong>Description:</strong> {property.description}
                    <p>
                      <strong>Added on:</strong> {property.added.month}{" "}
                      {property.added.day}, {property.added.year}
                    </p>
                  </TabPanel>

                  <TabPanel>
                    <h2>Floor Plan</h2>
                    {/* Add floor plan content here */}
                  </TabPanel>

                  <TabPanel>
                    <h2>Map</h2>
                    {/* Add map content here */}
                  </TabPanel>
                </Tabs>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default PopupWindow;
