import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; //react Tabs styles importing
import { GrNext, GrPrevious } from "react-icons/gr";
import { Row, Col, Image, Button } from "react-bootstrap";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps"; // Google Map API import
import "./PopupWindow.css";

function PopupWindow({ popupTrigger, property, closePopup }) {
  const [selectedImage, setSelectedImage] = useState(""); // State to store selected image
  const [animationClass, setAnimationClass] = useState(""); // State for animation class

  const [position, setPosition] = useState({
    lat: parseFloat(property?.location?.lat || 0), // Set the latitude of the property
    lng: parseFloat(property?.location?.lng || 0), // Set the longitude of the property
  });

  useEffect(() => {
    if (property?.images) {
      const firstImageKey = Object.keys(property.images)[0]; // Get the first key
      setSelectedImage(property.images[firstImageKey]); // Set the first image
    }

    if (property?.location) {
      setPosition({
        lat: parseFloat(property?.mapSrc?.lat || 0),
        lng: parseFloat(property?.mapSrc?.lng || 0),
      });
    }

    // Add animation class when the popup is triggered
    if (popupTrigger) {
      setAnimationClass("popup-animate-in");
    } else {
      setAnimationClass("");
    }
  }, [property, popupTrigger]);

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

  return popupTrigger ? (
    <div className={`popup ${animationClass}`}>
      <div className="popup-inner container ">
        <button
          type="button"
          className="btn-close close-popup"
          aria-label="Close"
          onClick={closePopup}
          style={{
            zIndex: 10,
            backgroundColor: "white",
          }}
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
                    {property.location}
                    <br />${property.price.toLocaleString()}
                  </p>
                </div>
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                  </TabList>

                  <TabPanel>
                    {property.description}
                    <p>
                      <br />
                      <strong>Added on:</strong> {property.added.month}{" "}
                      {property.added.day}, {property.added.year}
                    </p>
                  </TabPanel>

                  <TabPanel>
                    <Image
                      src={property.floorPlan}
                      alt={property.type}
                      fluid
                      style={{ width: "300px", height: "auto" }}
                    />
                    {/* Add floor plan content here */}
                  </TabPanel>

                  <TabPanel>
                    <div style={{ height: "300px", width: "100%" }}>
                      <APIProvider
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                      >
                        <div style={{ height: "200px", width: "100%" }}>
                          <Map
                            zoom={9}
                            center={position}
                            mapId="a8f30e48a9a4836b"
                          >
                            <AdvancedMarker position={position}>
                              <Pin
                                background={"red"}
                                borderColor={"black"}
                                glyphColor={"grey"}
                              />
                            </AdvancedMarker>
                          </Map>
                        </div>
                      </APIProvider>
                    </div>
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
