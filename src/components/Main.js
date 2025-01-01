import React, { useState } from "react";
import Navbar from "./Navbar";
import AdvanceSearch from "./AdvanceSearch";
import Favourite from "./Favourite"; // Import Favourite component
import PopupWindow from "./PopupWindow.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Records from "../properties.json";
import Collapse from "react-bootstrap/Collapse";
import Items from "./Items"; // Import Items component

function Main() {
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState(Records.properties);
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

  // Methods for NavBar search
  const handleNavBarFilter = (type, searchInput) => {
    const filtered = properties.filter(
      (property) =>
        property.type === type &&
        (property.location.toLowerCase().includes(searchInput.toLowerCase()) ||
          property.tenure.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredProperties(filtered);
  };

  const resetNavBarFilter = () => {
    setFilteredProperties(properties);
  };

  // Methods for AdvanceSearch
  const handleAdvanceSearchFilter = (filters) => {
    const {
      type,
      tenure,
      location,
      bedroomsMin,
      bedroomsMax,
      priceMin,
      priceMax,
      date,
    } = filters;

    const filtered = properties.filter((property) => {
      const matchesType = !type || property.type === type;
      const matchesTenure = !tenure || property.tenure === tenure;
      const matchesLocation =
        !location ||
        property.location.toLowerCase().includes(location.toLowerCase());
      const matchesBedrooms =
        (!bedroomsMin || property.bedrooms >= bedroomsMin) &&
        (!bedroomsMax || property.bedrooms <= bedroomsMax);
      const matchesPrice =
        (!priceMin || property.price >= priceMin) &&
        (!priceMax || property.price <= priceMax);

      return (
        matchesType &&
        matchesTenure &&
        matchesLocation &&
        matchesBedrooms &&
        matchesPrice
      );
    });

    setFilteredProperties(filtered);
  };

  const resetAdvanceSearchFilter = () => {
    setFilteredProperties(properties);
  };

  // Toggle AdvanceSearch visibility
  const toggleAdvanceSearch = () => {
    setShowAdvanceSearch((prev) => !prev);
  };

  return (
    <div className="container-fluid">
      <Navbar
        filterProperties={handleNavBarFilter}
        resetFilter={resetNavBarFilter}
      />
      {/* Button to toggle AdvanceSearch */}
      <Button onClick={toggleAdvanceSearch} className="mb-2">
        {showAdvanceSearch ? "Hide Advanced Search" : "Show Advanced Search"}
      </Button>
      {/* Conditionally render AdvanceSearch */}
      {showAdvanceSearch && (
        <AdvanceSearch onSearch={handleAdvanceSearchFilter} />
      )}

      {/* Row containing Items and Favourite components */}
      <Row>
        <Col md={8}>
          <Items
            properties={filteredProperties}
            addToFavourite={addToFavourite}
            handleCardClick={handleShowModal}
          />
        </Col>
        {/* PopupWindow component */}
        <PopupWindow
          popupTrigger={popupTrigger}
          property={selectedProperty}
          closePopup={handleCloseModal}
        />
        <Col md={4}>
          <Favourite
            favourites={favourites}
            removeFromFavourite={removeFromFavourite}
            clearFavourites={clearFavourites}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Main;
