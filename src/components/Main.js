import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Navigation bar component
import AdvanceSearch from "./AdvanceSearch"; // Advanced search component
import Favourite from "./Favourite"; // Component for displaying favourites
import PopupWindow from "./popUpWindow/PopupWindow"; // Popup window for property details
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Records from "../properties.json"; // Importing property data
import Items from "./Items"; // Component for displaying property items
import Footer from "./Footer"; // Footer component

function Main() {
  // Drag event handler to pass property data during drag
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property)); // Store property data in the drag event
  };

  // State for all properties
  const [properties, setProperties] = useState(Records.properties);

  // State to control popup visibility
  const [popupTrigger, setPopupTrigger] = useState(false);

  // State for the currently selected property in the popup
  const [selectedProperty, setSelectedProperty] = useState(null);

  // State for favourite properties
  const [favourites, setFavourites] = useState([]);

  // State for filtered properties based on searches/filters
  const [filteredProperties, setFilteredProperties] = useState(
    Records.properties
  );

  // State to toggle advanced search visibility
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

  // Load favourites from localStorage when the component mounts
  // Load favourites from localStorage on component mount
  // Load favourites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
      if (storedFavourites) {
        setFavourites(storedFavourites);
      }
    } catch (error) {
      console.error("Failed to load favourites from localStorage:", error);
    }
  }, []);

  // Save favourites to localStorage whenever favourites state changes
  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (error) {
      console.error("Failed to save favourites to localStorage:", error);
    }
  }, [favourites]);
  // Show the popup window with property details
  const handleShowModal = (id) => {
    const property = Records.properties.find((prop) => prop.id === id);
    setPopupTrigger(true);
    setSelectedProperty(property);
  };

  // Close the popup window
  const handleCloseModal = () => {
    setPopupTrigger(false);
    setSelectedProperty(null);
  };

  // Add a property to favourites
  const addToFavourite = (item) => {
    if (favourites.some((fav) => fav.id === item.id)) {
      alert("Item is already added");
    } else {
      setFavourites([...favourites, item]);
    }
  };

  // Remove a property from favourites
  const removeFromFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  // Filter properties based on Navbar search
  const handleNavBarFilter = (type, searchInput) => {
    const filtered = properties.filter(
      (property) =>
        property.type === type &&
        (property.location.toLowerCase().includes(searchInput.toLowerCase()) ||
          property.tenure.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredProperties(filtered);
  };

  // Reset properties to show all in Navbar
  const resetNavBarFilter = () => {
    setFilteredProperties(properties);
  };

  // Filter properties based on Advanced Search criteria
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

  // Toggle the visibility of the Advanced Search section
  const toggleAdvanceSearch = () => {
    setShowAdvanceSearch((prev) => !prev);
  };

  // Handle dropping an item outside the favourites container
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
        {/* Navigation bar for search */}
        <Navbar
          filterProperties={handleNavBarFilter}
          resetFilter={resetNavBarFilter}
        />

        {/* Toggle button for Advanced Search */}
        <Button onClick={toggleAdvanceSearch} className="mb-2">
          {showAdvanceSearch ? "Hide Advanced Search" : "Show Advanced Search"}
        </Button>

        {/* Advanced Search filter */}
        {showAdvanceSearch && (
          <AdvanceSearch onSearch={handleAdvanceSearchFilter} />
        )}

        <Row>
          <Col md={8}>
            {/* Property cards */}
            <Items
              handleDragStart={handleDragStart} // Pass drag event handler
              properties={filteredProperties}
              addToFavourite={addToFavourite}
              handleCardClick={handleShowModal}
            />
          </Col>

          {/* Popup window for property details */}
          <PopupWindow
            popupTrigger={popupTrigger}
            property={selectedProperty}
            addToFavourite={addToFavourite}
            closePopup={handleCloseModal}
          />

          <Col md={4}>
            {/* Favourites list */}
            <Favourite
              favourites={favourites}
              setFavourites={setFavourites} // Ensure this is passed correctly
              removeFromFavourite={removeFromFavourite}
              clearFavourites={clearFavourites}
            />
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
