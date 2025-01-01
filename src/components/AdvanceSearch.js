import React, { useState } from "react";
import Combobox from "react-widgets/Combobox";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import Button from "react-bootstrap/Button";
import { GrLinkNext } from "react-icons/gr";
import "react-widgets/styles.css";
import { Container } from "react-bootstrap";

function AdvanceSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    type: "",
    tenure: "",
    location: "",
    bedroomsMin: null,
    bedroomsMax: null,
    priceMin: "",
    priceMax: "",
    date: null,
  });

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2">
      <div className="search-container">
        <div className="search-row">
          <label className="search-label">
            <strong>Type:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["House", "Flat"]}
            onChange={(value) => handleInputChange("type", value)}
          />
        </div>

        <div className="search-row">
          <label className="search-label">
            <strong>Tenure:</strong>
          </label>
          <DropdownList
            defaultValue=""
            data={["Freehold", "Leasehold"]}
            onChange={(value) => handleInputChange("tenure", value)}
          />
        </div>

        <div className="search-row">
          <label className="search-label">
            <strong>Location:</strong>
          </label>
          <input
            className="search-input"
            placeholder="Enter location"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div className="search-row">
          <label className="search-label">
            <strong>Bedrooms:</strong>
          </label>
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMin", value)}
            placeholder="Min"
          />
          <NumberPicker
            max={5}
            min={0}
            onChange={(value) => handleInputChange("bedroomsMax", value)}
            placeholder="Max"
          />
        </div>

        <div className="search-row">
          <label className="search-label">
            <strong>Min Price: $</strong>
          </label>
          <input
            className="search-input"
            placeholder="Min Price"
            onChange={(e) => handleInputChange("priceMin", e.target.value)}
          />
        </div>

        <div className="search-row">
          <label className="search-label">
            <strong>Max Price: $</strong>
          </label>
          <input
            className="search-input"
            placeholder="Max Price"
            onChange={(e) => handleInputChange("priceMax", e.target.value)}
          />
        </div>

        {/* <div className="search-row">
          <label className="search-label">
            <strong>Date:</strong>
          </label>
          <DatePicker
            placeholder="m/dd/yy"
            onChange={(value) => handleInputChange("date", value)}
          />
        </div> */}

        <div>
          <Button onClick={handleSearch}>
            Search
            <GrLinkNext />
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default AdvanceSearch;
