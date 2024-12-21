import React from "react";
import CardPage from "./CardPage";
import "bootstrap/dist/css/bootstrap.min.css";

function Items() {
  return (
    <>
      <div class="container  ">
        <div class="row justify-content-center ">
          <div class="">
            <div class="border p-4 row ">
              <h1>Items</h1>
              <CardPage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
