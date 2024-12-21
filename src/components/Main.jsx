import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Row from "react-bootstrap/Row";
import NavBar from "./Navbar";
import Favourite from "./Favourite";
import Col from "react-bootstrap/Col";

function Main() {
  const [favourites, setFavourites] = useState([]);

  const addToFavourite = (item) => {
    if (favourites.some((fav) => fav.id === item.id)) {
      // Show alert if the item is already in the favourites list
      alert("Item is already added");
    } else {
      setFavourites([...favourites, item]);
    }
  };

  const removeFromFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  return (
    <>
      <div className="container">
        <NavBar />
        <Row>
          <Col sm={8}>
            <Items addToFavourite={addToFavourite} />
          </Col>
          <Col sm={4}>
            <Favourite
              favourites={favourites}
              removeFromFavourite={removeFromFavourite}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Main;
