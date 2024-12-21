import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import Row from "react-bootstrap/Row";
import NavBar from "./Navbar";
import Favourite from "./Favourite";
import Col from "react-bootstrap/Col";

function Main() {
  return (
    <>
      <div className="container">
        <NavBar />
        <Row>
          <Col sm={8}>
            <Items />
          </Col>
          <Col sm={4}>
            <Favourite />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
