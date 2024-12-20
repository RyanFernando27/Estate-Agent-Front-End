import React from "react";
import Card from "./Card.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Items() {
  return (
    <div class="container  ">
      <div class="column justify-content-center ">
        <div class="">
          <div class="border p-4">
            <h1>Items</h1>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
