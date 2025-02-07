import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { BsSun, BsMoon, BsGear } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";

function NavBar({ filterProperties, resetFilter, isDarkMode, toggleTheme }) {
  // State to control nav bar search by location or tenure
  const [searchInput, setSearchInput] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Event handler for the search property and show the relevant properties on the items page
  const handleSearch = (type) => {
    filterProperties(type, searchInput);
  };

  return (
    <Navbar 
      expand="lg" 
      className={`${isDarkMode ? 'navbar-dark' : 'navbar-light'} ${isScrolled ? 'scrolled' : ''}`}
      fixed="top"
    >
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand href="#home" onClick={resetFilter}>
          <img
            alt=""
            src={logo}
            className="d-inline-block align-top"
            height="70"
          />{" "}
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-content" />
        <div>
          {/* Collapsible Content */}
          <Navbar.Collapse id="navbar-content">
            <div className="mt-3 w-100 d-flex flex-column align-items-center ">
              {/* Search Bar */}
              <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                <input
                  className="searchbar mb-2 mb-md-0"
                  type="text"
                  placeholder="Search by location or tenure"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="d-flex gap-2">
                  <ButtonGroup>
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
                  </ButtonGroup>

                  <Dropdown>
                    <Dropdown.Toggle 
                      variant={isDarkMode ? "outline-light" : "outline-dark"}
                      id="theme-settings"
                    >
                      <BsGear className="me-1" />
                      Theme
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={isDarkMode ? 'dropdown-menu-dark' : ''}>
                      <Dropdown.Item 
                        onClick={toggleTheme}
                        active={!isDarkMode}
                      >
                        <BsSun className="me-2" /> Light Mode
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={toggleTheme}
                        active={isDarkMode}
                      >
                        <BsMoon className="me-2" /> Dark Mode
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
