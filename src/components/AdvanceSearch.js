import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import Button from "react-bootstrap/Button";
import { GrLinkNext } from "react-icons/gr";
import "react-widgets/styles.css";
import { Container, Row, Col } from "react-bootstrap";

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

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters); // Pass all filters, including the date range, to the parent component
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="gy-3">
        {/* Row 1: Type and Tenure */}
        <Col md={6}>
          <label className="search-label">
            <strong>Type:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["House", "Flat"]}
            onChange={(value) => handleInputChange("type", value)}
          />
        </Col>
        <Col md={6}>
          <label className="search-label">
            <strong>Tenure:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["Freehold", "Leasehold"]}
            onChange={(value) => handleInputChange("tenure", value)}
          />
        </Col>

        {/* Row 2: Location */}
        <Col md={12}>
          <label className="search-label">
            <strong>Location:</strong>
          </label>
          <input
            className="form-control"
            placeholder="Petts Wood Road, Petts Wood, Orpington BR5"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </Col>

        {/* Row 3: Bedrooms */}
        <Col md={6}>
          <label className="search-label">
            <strong>Min Bedrooms:</strong>
          </label>
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMin", value)}
          />
        </Col>
        <Col md={6}>
          <label className="search-label ">
            <strong>Max Bedrooms:</strong>
          </label>
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMax", value)}
          />
        </Col>

        {/* Row 4: Price */}
        <Col md={6}>
          <label className="search-label">
            <strong>Min Price: $</strong>
          </label>
          <input
            className="form-control"
            placeholder="Min Price"
            onChange={(e) => handleInputChange("priceMin", e.target.value)}
          />
        </Col>
        <Col md={6}>
          <label className="search-label">
            <strong>Max Price: $</strong>
          </label>
          <input
            className="form-control"
            placeholder="Max Price"
            onChange={(e) => handleInputChange("priceMax", e.target.value)}
          />
        </Col>

        {/* Row 5: Date Range */}
        <Col md={6}>
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
        <Col md={6}>
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

        {/* Row 6: Search Button */}
        <Col md={12} className="text-center mt-3">
          <Button onClick={handleSearch}>
            Search <GrLinkNext />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvanceSearch;
