import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import Button from "react-bootstrap/Button";
import { GrLinkNext } from "react-icons/gr";
import "react-widgets/styles.css";
import { Container, Row, Col } from "react-bootstrap";

// Advance search criteria call back function search the property matched to the search send to the Main.js to display on the Items page
function AdvanceSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    type: "",
    tenure: "",
    location: "",
    bedroomsMin: null,
    bedroomsMax: null,
    priceMin: "",
    priceMax: "",
    dateRange: { start: null, end: null }, // Date range filter
  });

  // Handles changes in the filter inputs and updates the corresponding state
  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Triggers the search callback in the parent component with the current filters
  const handleSearch = () => {
    onSearch(filters); // Pass all filters criteria to the parent component
  };

  return (
    <Container className="advance-search-container glass-effect mt-4 mb-5">
      <Row className="g-3">
        <Col xs={12} md={6}>
          <label className="search-label">
            <strong>Type:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["House", "Flat"]}
            onChange={(value) => handleInputChange("type", value)}
          />
        </Col>
        <Col xs={12} md={6}>
          <label className="search-label">
            <strong>Tenure:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["Freehold", "Leasehold"]}
            onChange={(value) => handleInputChange("tenure", value)}
          />
        </Col>
        <Col xs={12}>
          <label className="search-label">
            <strong>Location:</strong>
          </label>
          <input
            className="form-control"
            placeholder="Petts Wood Road, Petts Wood, Orpington BR5"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <label className="search-label">
            <strong>Min Bedrooms:</strong>
          </label>
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMin", value)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <label className="search-label ">
            <strong>Max Bedrooms:</strong>
          </label>
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMax", value)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <label className="search-label">
            <strong>Min Price: $</strong>
          </label>
          <input
            className="form-control"
            placeholder="Min Price"
            onChange={(e) => handleInputChange("priceMin", e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <label className="search-label">
            <strong>Max Price: $</strong>
          </label>
          <input
            className="form-control"
            placeholder="Max Price"
            onChange={(e) => handleInputChange("priceMax", e.target.value)}
          />
        </Col>
        <Col xs={12} md={6}>
          <label className="search-label">
            <strong>Start Date:</strong>
          </label>
          <DatePicker
            placeholder="Start Date"
            onChange={(value) =>
              handleInputChange("dateRange", {
                ...filters.dateRange,
                start: value,
              })
            }
          />
        </Col>
        <Col xs={12} md={6}>
          <label className="search-label">
            <strong>End Date:</strong>
          </label>
          <DatePicker
            placeholder="End Date"
            onChange={(value) =>
              handleInputChange("dateRange", {
                ...filters.dateRange,
                end: value,
              })
            }
          />
        </Col>
        <Col xs={12} className="text-center mt-3">
          <Button onClick={handleSearch}>
            Search <GrLinkNext />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvanceSearch;
