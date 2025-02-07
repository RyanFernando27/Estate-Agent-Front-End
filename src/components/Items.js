import React from "react";
import CardPage from "./CardPage";

// Container that hold the Card pages and send props to the child component .
function Items({
  addToFavourite,
  properties,
  handleCardClick,
  handleDragStart,
}) {
  return (
    <div className="items-container glass-effect">
      <h2>Properties</h2>
      <CardPage
        addToFavourite={addToFavourite}
        properties={properties}
        handleShowModal={handleCardClick}
        handleDragStart={handleDragStart}
      />
    </div>
  );
}

export default Items;
