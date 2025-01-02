import React from "react";
import CardPage from "./CardPage";

function Items({
  addToFavourite,
  properties,
  handleCardClick,
  handleDragStart,
}) {
  return (
    <div className="container container-style">
      <div className="row justify-content-center">
        <div className="border p-4 row">
          <h2>Properties</h2>
          <CardPage
            addToFavourite={addToFavourite}
            properties={properties}
            handleShowModal={handleCardClick}
            handleDragStart={handleDragStart} // Pass the correct prop name for drag event handler
          />
        </div>
      </div>
    </div>
  );
}

export default Items;
