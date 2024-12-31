import React from "react";
import Combobox from "react-widgets/Combobox";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import { Container, Row, Col } from "react-bootstrap";

function AdvanceSearch() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-2">
        <div className="search-container">
          <div className="search-row">
            <label className="search-label">
              <strong>Type:</strong>
            </label>
            <DropdownList
              defaultValue="House"
              data={["House", "Flat"]}
              className="search-input"
            />
          </div>

          <div className="search-row">
            <label className="search-label">
              <strong>Tenure:</strong>
            </label>
            <DropdownList
              defaultValue="Household"
              data={["Household", "Leasehold"]}
              className="search-input"
            />
          </div>

          <div className="search-row">
            <label className="search-label">
              <strong>Location:</strong>
            </label>
            <input
              name="myInput "
              className="search-input"
              placeholder="Oak Avenue"
            />
          </div>
          <div className="search-row">
            <label className="search-label">
              <strong>Bedrooms:</strong>
            </label>
            <NumberPicker max={5} className="search-label" />
          </div>
          <div className="search-row">
            <label className="search-label">
              <strong>Min Price: $</strong>
            </label>
            <input
              name="myInput "
              className="search-input"
              placeholder="40000"
            />
          </div>
          <div className="search-row">
            <label className="search-label">
              <strong>Max Price: $</strong>
            </label>
            <input
              name="myInput "
              className="search-input"
              placeholder="1000000"
            />
          </div>

          <div className="search-row">
            <label className="search-label">
              <strong>Date:</strong>
            </label>
            <DatePicker placeholder="m/dd/yy" className="search-input" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default AdvanceSearch;
