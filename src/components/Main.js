import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Navbar";
import Favourite from "./Favourite";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AdvanceSearch from "./AdvanceSearch";
import Records from "../properties.json";
import PopupWindow from "./PopupWindow.js";
import Items from "./Items"; // Import Items component

function Main() {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(
    Records.properties
  );
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false); // State to toggle AdvanceSearch visibility

  const handleShowModal = (id) => {
    const property = Records.properties.find((prop) => prop.id === id);
    setSelectedProperty(property);
    setPopupTrigger(true);
  };

  const handleCloseModal = () => {
    setPopupTrigger(false);
    setSelectedProperty(null);
  };

  const addToFavourite = (item) => {
    if (favourites.some((fav) => fav.id === item.id)) {
      alert("Item is already added");
    } else {
      setFavourites([...favourites, item]);
    }
  };


  const removeFromFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const filterProperties = (type, searchInput) => {
    const filtered = Records.properties.filter(
      (property) =>
        property.type === type &&
        (property.location.toLowerCase().includes(searchInput.toLowerCase()) ||
          property.tenure.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredProperties(filtered);
  };

  const resetFilter = () => {
    setFilteredProperties(Records.properties);
  };

  return (
    <>
      <div className="container">
        <NavBar filterProperties={filterProperties} resetFilter={resetFilter} />
        <Row className="mb-3">
          {/* Button to toggle the Advance Search component */}
          <Button onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}>
            {showAdvanceSearch ? "Hide Advance Search" : "Show Advance Search"}
          </Button>
        </Row>

        {/* Conditionally render the AdvanceSearch component */}
        {showAdvanceSearch && (
          <Row className="mb-3">
            <Col>
              <AdvanceSearch />
            </Col>
          </Row>
        )}

        <Row>
          <Col sm={8}>
            {/* Use Items instead of CardPage */}
            <Items
              addToFavourite={addToFavourite}
              properties={filteredProperties}
              handleCardClick={handleShowModal}
            />
          </Col>

          {/* PopupWindow component */}
          <PopupWindow
            popupTrigger={popupTrigger}
            property={selectedProperty}
            closePopup={handleCloseModal}
          />

          <Col sm={4}>
            <Favourite
              favourites={favourites}
              removeFromFavourite={(id) =>
                setFavourites(favourites.filter((fav) => fav.id !== id))
              }
              clearFavourites={() => setFavourites([])}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
