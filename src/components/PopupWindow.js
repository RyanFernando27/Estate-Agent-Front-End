import React from "react";

function PopupWindow({ trigger, property, closePopup }) {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={closePopup}>
          Close
        </button>
        {property && (
          <div>
            <h1>{property.type}</h1>

            <p>
              <strong>Tenure:</strong> {property.tenure}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Price:</strong> ${property.price.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupWindow;
