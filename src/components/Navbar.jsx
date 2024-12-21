import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../assests/logo.jpg";
import React from "react";

function NavBar() {
  return (
    <Navbar className="bg-body-tertiary bg-red mb-5">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          Real State
        </Navbar.Brand>
        <div className="mt-3">
          <input type="text" placeholder="London"></input>
          <div className="d-flex justify-content-center align-items-center mt-1 gap-2">
            <Button variant="outline-success">House</Button>
            <Button variant="outline-success">Flat</Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
