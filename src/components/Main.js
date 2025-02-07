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

  // Add theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

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
      date,
    } = filters;

    const selectedDate = date ? new Date(date) : null;

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
      const matchesDate = !selectedDate || 
        (addedDate.getFullYear() === selectedDate.getFullYear() &&
         addedDate.getMonth() === selectedDate.getMonth() &&
         addedDate.getDate() === selectedDate.getDate());

      return (
        matchesType &&
        matchesTenure &&
        matchesLocation &&
        matchesBedrooms &&
        matchesPrice &&
        matchesDate
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

  // Add theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Apply theme to body
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  return (
    <>
      <div
        className={`container-fluid main ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
        onDrop={handleDropOutside} // Handle drop outside of favourites
        onDragOver={(e) => e.preventDefault()} // Allow dropping
      >
        {/* Navigation bar for search */}
        <Navbar
          filterProperties={handleNavBarFilter}
          resetFilter={resetNavBarFilter}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
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
          <Col>
            {/* Property cards */}
            <Items
              handleDragStart={handleDragStart}
              properties={filteredProperties}
              addToFavourite={addToFavourite}
              handleCardClick={handleShowModal}
              isDarkMode={isDarkMode}
            />
          </Col>
        </Row>

        {/* Popup window for property details */}
        <PopupWindow
          popupTrigger={popupTrigger}
          property={selectedProperty}
          addToFavourite={addToFavourite}
          closePopup={handleCloseModal}
        />

        {/* Favourites as floating button and sidebar */}
        <Favourite
          favourites={favourites}
          setFavourites={setFavourites}
          removeFromFavourite={removeFromFavourite}
          clearFavourites={clearFavourites}
        />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Main;
