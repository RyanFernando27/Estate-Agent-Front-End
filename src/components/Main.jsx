import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Favourite from "./Favourite";

function Main() {
  return (
    <div class="container border">
      <Items />
      <Favourite />
    </div>
  );
}

export default Main;
