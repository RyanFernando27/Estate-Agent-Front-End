import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Row from "react-bootstrap/Row";
import NavBar from "./Navbar";
import Favourite from "./Favourite";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AdvanceSearch from "./AdvanceSearch";
import Records from "../properties.json";

function Main() {
  const [favourites, setFavourites] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(
    Records.properties
  );
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false); // State to toggle AdvanceSearch visibility

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
            <Items
              addToFavourite={addToFavourite}
              properties={filteredProperties}
            />
          </Col>

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
