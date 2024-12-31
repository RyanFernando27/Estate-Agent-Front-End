import React from "react";
import CardPage from "./CardPage";

function Items({ addToFavourite, properties, handleCardClick }) {
  return (
    <div className="container container-style">
      <div className="row justify-content-center">
        <div className="border p-4 row">
          <h2>Properties</h2>
          <CardPage
            addToFavourite={addToFavourite}
            properties={properties}
            handleShowModal={handleCardClick} // Fix: Pass the correct prop name
          />
        </div>
      </div>
    </div>
  );
}

export default Items;
