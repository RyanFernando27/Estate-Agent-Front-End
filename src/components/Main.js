import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AdvanceSearch from "./AdvanceSearch";
import Favourite from "./Favourite"; // Import Favourite component
import PopupWindow from "./PopupWindow.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Records from "../properties.json";
import Items from "./Items"; // Import Items component
import Footer from "./Footer";

function Main() {
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property)); // Store property data in the drag event
  };
  const [properties, setProperties] = useState(Records.properties);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(
    Records.properties
  );
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleShowModal = (id) => {
    const property = Records.properties.find((prop) => prop.id === id);
    setPopupTrigger(true);
    setSelectedProperty(property);
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
      dateRange,
    } = filters;

    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    const filtered = properties.filter((property) => {
      const addedDate = new Date(
        `${property.added.month} ${property.added.day}, ${property.added.year}`
      );

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
      const matchesDateRange =
        (!startDate || addedDate >= startDate) &&
        (!endDate || addedDate <= endDate);

      return (
        matchesType &&
        matchesTenure &&
        matchesLocation &&
        matchesBedrooms &&
        matchesPrice &&
        matchesDateRange
      );
    });

    setFilteredProperties(filtered);
  };
  const toggleAdvanceSearch = () => {
    setShowAdvanceSearch((prev) => !prev);
  };
  const handleDropOutside = (e) => {
    e.preventDefault();
    const draggedFavouriteId = e.dataTransfer.getData("favouriteId");
    setFavourites((prev) =>
      prev.filter((fav) => fav.id !== draggedFavouriteId)
    );
  };

  return (
    <>
      <div
        className="container-fluid"
        onDrop={handleDropOutside} // Handle drop outside of favourites
        onDragOver={(e) => e.preventDefault()} // Allow dropping
      >
        <Navbar
          filterProperties={handleNavBarFilter}
          resetFilter={resetNavBarFilter}
        />
        <Button onClick={toggleAdvanceSearch} className="mb-2">
          {showAdvanceSearch ? "Hide Advanced Search" : "Show Advanced Search"}
        </Button>
        {showAdvanceSearch && (
          <AdvanceSearch onSearch={handleAdvanceSearchFilter} />
        )}

        <Row>
          <Col md={8}>
            <Items
              handleDragStart={handleDragStart} // Pass drag event handler
              properties={filteredProperties}
              addToFavourite={addToFavourite}
              handleCardClick={handleShowModal}
            />
          </Col>
          <PopupWindow
            popupTrigger={popupTrigger}
            property={selectedProperty}
            closePopup={handleCloseModal}
          />
          <Col md={4}>
            <Favourite
              favourites={favourites}
              setFavourites={setFavourites} // Ensure this is passed correctly
              removeFromFavourite={removeFromFavourite}
              clearFavourites={clearFavourites}
            />
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
}

export default Main;
