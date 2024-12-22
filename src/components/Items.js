import React from "react";
import CardPage from "./CardPage";

function Items({ addToFavourite, filterType }) {
  return (
    <div className="container container-style">
      <div className="row justify-content-center">
        <div className="border p-4 row">
          <h1>{filterType ? `${filterType}s` : "Items"}</h1>
          <CardPage addToFavourite={addToFavourite} filterType={filterType} />
        </div>
      </div>
    </div>
  );
}

export default Items;
