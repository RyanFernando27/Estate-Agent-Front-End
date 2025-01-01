import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { GrNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import { GrPrevious } from "react-icons/gr";
import { Row, Col, Image, Button } from "react-bootstrap"; // Import Row and Col from react-bootstrap

function PopupWindow({ popupTrigger, property, closePopup }) {
  const [selectedImage, setSelectedImage] = useState(""); // State to store selected image
  const thumbnailsRef = React.createRef(); // Reference to thumbnail container

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  // Functions to scroll the thumbnails left or right
  const scrollThumbnails = (direction) => {
    const container = thumbnailsRef.current;
    const scrollAmount = 100; // Amount to scroll when an arrow is clicked
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
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
          width: "100%", // Set the width to 100% of the browser window
          maxWidth: "1500px", // Optional: prevent the popup from becoming too wide on large screens
          margin: "0 auto", // Center the popup horizontally
          height: "80vh", // Set the height to 80% of the viewport height, or adjust as needed
          backgroundColor: "white", // Ensure the background is white for visibility
          borderRadius: "8px", // Keep the border-radius for rounded corners
          padding: "20px", // Add some padding inside the popup
          overflowY: "auto", // Ensure the content is scrollable if it overflows
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
                <Image src={selectedImage} alt={property.type} fluid />
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="link"
                    onClick={() => scrollThumbnails("left")}
                  >
                    <GrPrevious />
                  </Button>

                  {/* Scrollable Thumbnail images */}
                  <div
                    className="d-flex overflow-auto"
                    style={{ maxWidth: "100%", scrollBehavior: "smooth" }}
                    ref={thumbnailsRef}
                  >
                    {Object.keys(property.images).map((imageKey) => (
                      <Col key={imageKey} md={3} className="mb-3">
                        <Image
                          src={property.images[imageKey]}
                          alt={`Gallery ${imageKey}`}
                          thumbnail
                          className="cursor-pointer"
                          onClick={() =>
                            handleThumbnailClick(property.images[imageKey])
                          } // Change main image on click
                        />
                      </Col>
                    ))}
                  </div>

                  <Button
                    variant="link"
                    onClick={() => scrollThumbnails("right")}
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
