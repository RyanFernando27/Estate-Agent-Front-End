import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Row from "react-bootstrap/Row";
import NavBar from "./Navbar";
import Favourite from "./Favourite";
import Col from "react-bootstrap/Col";
import Records from "../properties.json";
import PropertyPage from "./PropertyPage.js";

function Main() {
  const [favourites, setFavourites] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(
    Records.properties
  );

  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  // Function to clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  const filterProperties = (type, searchInput) => {
    const searchQuery = searchInput.toLowerCase();
    const filtered = Records.properties.filter(
      (property) =>
        property.type === type &&
        (property.location.toLowerCase().includes(searchQuery) ||
          property.tenure.toLowerCase().includes(searchQuery))
    );
    setFilteredProperties(filtered);
  };

  const resetFilter = () => {
    setFilteredProperties(Records.properties);
  };
  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setPopupTrigger(true);
  };

  return (
    <>
      <div className="container">
        <NavBar filterProperties={filterProperties} resetFilter={resetFilter} />

        <Row>
          <Col sm={8}>
            <Items
              addToFavourite={addToFavourite}
              properties={filteredProperties}
              handleCardClick={handleCardClick}
            />
          </Col>
          <PropertyPage trigger={popupTrigger} property={selectedProperty} />

          <Col sm={4}>
            <Favourite
              favourites={favourites}
              removeFromFavourite={removeFromFavourite}
              clearFavourites={clearFavourites}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
