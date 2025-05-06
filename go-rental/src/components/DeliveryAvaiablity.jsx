import React, { useState } from "react";

const DeliveryAvaiablity = () => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [isSameLocation, setIsSameLocation] = useState(false);
  const [returnLocation, setReturnLocation] = useState("");

  const handleRadioChange = () => {
    setIsSameLocation(!isSameLocation);
    if (!isSameLocation) {
      setReturnLocation(deliveryLocation); // Set return location to pickup location
    } else {
      setReturnLocation(""); // Clear return location if checkbox is unchecked
    }
  };

  const handleDeliveryLocationChange = (e) => {
    setDeliveryLocation(e.target.value);
    if (isSameLocation) {
      setReturnLocation(e.target.value); // Update return location if checkbox is checked
    }
  };

  return (
    <div>
      <div className="input-block">
        <label>Delivery Location</label>
        <div className="group-img">
          <div className="form-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your location"
              value={deliveryLocation}
              onChange={handleDeliveryLocationChange}
            />
            <span className="form-icon">
              <i className="fa-solid fa-location-crosshairs" />
            </span>
          </div>
        </div>
      </div>
      <div className="input-block">
        <label className="custom_check d-inline-flex location-check m-0">
          <span>Return to same location</span>
          <input
            type="checkbox"
            name="remember"
            required
            checked={isSameLocation}
            onChange={handleRadioChange}
          />
          <span className="checkmark" />
        </label>
      </div>
      <div className="input-block">
        <label>Return Location</label>
        <div className="group-img">
          <div className="form-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your location"
              value={isSameLocation ? deliveryLocation : returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
            />
            <span className="form-icon">
              <i className="fa-solid fa-location-crosshairs" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAvaiablity;
