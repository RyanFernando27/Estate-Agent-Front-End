import React from "react";
import Combobox from "react-widgets/Combobox";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import { Container } from "react-bootstrap";

function AdvanceSearch() {
  return (
    <>
      <Container className="w-50">
        <p>
          <strong>Type</strong>
          <DropdownList defaultValue="House" data={["House", "Flat"]} />
        </p>
        <DropdownList
          defaultValue="Household"
          data={["Household", "Leasehold"]}
        />
        <input type="text" defaultValue="hello" className="w-10" />
        <DatePicker placeholder="m/dd/yy" />;
      </Container>
    </>
  );
}

export default AdvanceSearch;
