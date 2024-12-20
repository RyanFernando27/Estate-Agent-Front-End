import pic1 from "../assests/properties/prop1/prop1-1.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Card() {
  return (
    <>
      <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="..."></img>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}
export default Card;
