import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import logo from "../assests/logo.png";

function NavBar({ filterProperties, resetFilter }) {
  // State to controll nav bar search by location or tenure
  const [searchInput, setSearchInput] = useState("");

  // Event handler for the search property  and show the relevant properties on the items page
  const handleSearch = (type) => {
    filterProperties(type, searchInput);
  };

  return (
    <Navbar className="bg-body-tertiary bg-red mb-5">
      <Container>
        <Navbar.Brand href="#home" onClick={resetFilter}>
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <div>Real Estate Properties</div>
        <div className="mt-3">
          <input
            className="searchbar"
            type="text"
            placeholder="Search by location or tenure"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="d-flex justify-content-center align-items-center mt-1 gap-2">
            <Button
              variant="outline-success"
              onClick={() => handleSearch("House")}
            >
              House
            </Button>
            <Button
              variant="outline-success"
              onClick={() => handleSearch("Flat")}
            >
              Flat
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
