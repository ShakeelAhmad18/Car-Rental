import React from 'react'
import { useSelector } from 'react-redux';

const SelfpickupLocation = () => {

   const {pickupLocation,returnLocation}= useSelector((state) => state.booking);


  return (
    <div className="booking-information-card pickup-location">
      <div className="booking-info-head">
        <span>
          <i className="bx bxs-car-garage" />
        </span>
        <h5>Location</h5>
      </div>
      <div className="booking-info-body">
        <div className="form-custom">
          <label className="form-label">Pickup Location</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mb-0"
              value={pickupLocation}
              placeholder="Add Location"
            />
          </div>
        </div>
        <div className="input-block m-0">
          <label className="custom_check d-inline-flex location-check">
            <span>Return to same location</span>
            <input type="checkbox" name="remeber" />
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
              defaultValue="Newyork Office - 78, 10th street Laplace USA"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfpickupLocation
