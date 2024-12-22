import React from "react";
import CardPage from "./CardPage";

function Items({ addToFavourite, properties }) {
  return (
    <div className="container container-style">
      <div className="row justify-content-center">
        <div className="border p-4 row">
          <h1>Properties</h1>
          <CardPage addToFavourite={addToFavourite} properties={properties} />
        </div>
      </div>
    </div>
  );
}

export default Items;
