import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Records from "../properties.json";
import pic1 from "../assests/properties/prop1/prop1-1.jpg";

function CardPage({ properties }) {
  return (
    <div className="d-flex flex-wrap">
      {Records.map((eachCard) => (
        <div className="col-md-4 mb-4" key={eachCard.id}>
          <Card style={{ width: "15rem" }}>
            <Card.Img
              variant="top"
              src={eachCard.picture}
              alt={eachCard.type}
            />
            <Card.Body>
              <Card.Title>{eachCard.type}</Card.Title>
              <Card.Text>
                <strong>Tenure:</strong> {eachCard.tenure}
                <br />
                <strong>Bedrooms:</strong> {eachCard.bedrooms}
                <br />
                <strong>Location:</strong> {eachCard.location}
                <br />
                <strong>Price:</strong> ${eachCard.price.toLocaleString()}
                <br />
              </Card.Text>
              <Button variant="primary" href={eachCard.url}>
                Add to Favourite
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CardPage;
