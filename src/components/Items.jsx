import React from "react";
import CardPage from "./CardPage";

function Items() {
  return (
    <>
      <div className="container  ">
        <div className="row justify-content-center ">
          <div className="">
            <div className="border p-4 row ">
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
