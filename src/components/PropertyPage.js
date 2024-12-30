import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GrNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import { GrPrevious } from "react-icons/gr";
import "react-tabs/style/react-tabs.css";

const PropertyPage = ({ properties }) => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // State to store selected image
  const thumbnailsRef = React.createRef(); // Reference to thumbnail container

  useEffect(() => {
    // Find the property based on the ID passed in the URL
    const selectedProperty = properties.find((prop) => prop.id === id);
    setProperty(selectedProperty);
    setSelectedImage(selectedProperty?.picture); // Set the first image as the selected image
  }, [id, properties]);

  if (!property) {
    return <div>Loading property details...</div>; // Fallback if property is not found
  }

  // Format the added date to a string
  const formattedDate = `${property.added.month} ${property.added.day}, ${property.added.year}`;

  // Function to change the selected image
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

  return (
    <Container className="my-4">
      <Link to="/" className="btn btn-primary mb-4">
        <GrLinkPrevious />
      </Link>
      <Row>
        <Col md={6}>
          {/* Display the main image */}
          <Image src={selectedImage} alt={property.type} fluid />
          <div className="d-flex justify-content-center mt-3">
            <Button variant="link" onClick={() => scrollThumbnails("left")}>
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

            <Button variant="link" onClick={() => scrollThumbnails("right")}>
              <GrNext />
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <h1>{property.type}</h1>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Tenure:</strong> {property.tenure}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>Price:</strong> ${property.price.toLocaleString()}
              </p>
              <p>
                <strong>Description:</strong> {property.description}
              </p>
              <p>
                <strong>Added on:</strong> {formattedDate}
              </p>
            </TabPanel>

            {/* Image Gallery Panel */}
            <TabPanel>
              <h2>Image Gallery</h2>
            </TabPanel>
            <TabPanel>
              <iframe
                src={property.mapSrc}
                width="600"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </TabPanel>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyPage;
