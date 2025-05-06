import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelfPickupLocation } from '../redux/bookingSlice';

const PickupAvailability = ({ pickup }) => {
  const [pickupAddress, setPickupAddress] = React.useState(pickup);
  const [isSameLocation, setIsSameLocation] = React.useState(false);
  const [returnAddress, setReturnLocation] = React.useState("");

 

  const  dispatch = useDispatch();

  const handleRadioChange = () => {
    setIsSameLocation(!isSameLocation);
    if (!isSameLocation) {
      setReturnLocation(pickupAddress); // Set return location to pickup location
    } else {
      setReturnLocation(""); // Clear return location if checkbox is unchecked
    }
  };

  const handlePickupChange = (e) => {
    setPickupAddress(e.target.value);
    if (isSameLocation) {
      setReturnLocation(e.target.value); // Update return location if checkbox is checked
    }
  };
   

  useEffect(() => {
    if (pickupAddress && returnAddress) {
      dispatch(
        setSelfPickupLocation({
          pickupLocation: pickupAddress,
          returnLocation: returnAddress
        })
      );
    }
  }, [dispatch, pickupAddress, returnAddress]);

   

  return (
    <div>
      <div className="input-block">
        <label>Pickup Location</label>
        <div className="group-img">
          <div className="form-wrap">
            <input
              type="text"
              value={pickupAddress}
              onChange={handlePickupChange}
              disabled
              className="form-control"
              required
              placeholder="Enter your location"
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
              value={returnAddress}
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

export default PickupAvailability
