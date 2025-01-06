import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import logo from "../assets/logo.png";

function NavBar({ filterProperties, resetFilter }) {
  // State to control nav bar search by location or tenure
  const [searchInput, setSearchInput] = useState("");

  // Event handler for the search property and show the relevant properties on the items page
  const handleSearch = (type) => {
    filterProperties(type, searchInput);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-red mb-5 ">
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand href="#home" onClick={resetFilter}>
          <img
            alt=""
            src={logo}
            className="d-inline-block align-top "
            height="70"
          />{" "}
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-content " />
        <div>
          {/* Collapsible Content */}
          <Navbar.Collapse id="navbar-content">
            <div className="mt-3 w-100 d-flex flex-column align-items-center ">
              {/* Search Bar */}
              <input
                className="searchbar mb-2"
                type="text"
                placeholder="Search by location or tenure"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ maxWidth: "100%" }}
              />

              {/* Search Buttons */}
              <div className="d-flex justify-content-end align-items-center mt-1 gap-2">
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
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
