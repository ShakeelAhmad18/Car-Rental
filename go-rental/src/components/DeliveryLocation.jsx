import React from "react";

const DeliveryLocation = () => {
  const [deliveryLocation, setDeliveryLocation] = React.useState("");
  const [isSameLocation, setIsSameLocation] = React.useState(false);
  const [returnLocation, setReturnLocation] = React.useState("");

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

  const handleChangeReturnLocation = (e) => {
    const { value } = e.target;

    setReturnLocation(value);
  };

  return (
    <div className="booking-information-card delivery-location">
      <div className="booking-info-head">
        <span>
          <i className="bx bxs-car-garage" />
        </span>
        <h5>Location</h5>
      </div>
      <div className="booking-info-body">
        <div className="form-custom">
          <label className="form-label">Delivery Location</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mb-0"
              onChange={handleDeliveryLocationChange}
              placeholder="Add Location"
            />
            <a
              href="#"
              className="btn btn-secondary location-btn d-flex align-items-center"
            >
              <i className="bx bx-current-location me-2" />
              Current Location
            </a>
          </div>
        </div>
        <div className="input-block m-0">
          <label className="custom_check d-inline-flex location-check">
            <span>Return to same location</span>
            <input type="checkbox" name="remeber" checked={isSameLocation} onChange={handleRadioChange}/>
            <span className="checkmark" />
          </label>
        </div>
        <div className="form-custom">
          <label className="form-label">Return Location</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mb-0"
              value={returnLocation}
              onChange={handleChangeReturnLocation}
              placeholder="Add Location"
            />
            <a
              href="#"
              className="btn btn-secondary location-btn d-flex align-items-center"
            >
              <i className="bx bx-current-location me-2" />
              Current Location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocation;
