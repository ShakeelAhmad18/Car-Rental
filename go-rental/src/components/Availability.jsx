import React, { use, useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme css
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setDates } from "../redux/bookingSlice";
import { Link } from "react-router-dom";
import DeliveryAvaiablity from "./DeliveryAvaiablity";
import PickupAvailability from "./PickupAvailability";

const Availability = ({ pickupAddress, pickupDate, returnDate }) => {
  const [availability, setAvailability] = useState("self-pickup");
  const [showPicker, setShowPicker] = useState(false);
  const { pickupType } = useSelector((state) => state.booking);

  const pickerRef = useRef(null);
  const dispatch = useDispatch();

  const [range, setRange] = useState([
    {
      startDate: new Date(pickupDate),
      endDate: new Date(returnDate),
      key: "selection",
    },
  ]);
  
  
  
  useEffect(() => {
    if (availability) {
      dispatch(
        setAddress({
          pickupType: availability
        })
      );
    }
  }, [dispatch, availability]);

  const formattedRange = `${format(
    range[0].startDate,
    "EEE, d MMM yyyy"
  )} - ${format(range[0].endDate, "EEE, d MMM yyyy")}`;

  // Handle outside click to close picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  
  return (
    <div className="review-sec mt-0">
      <div className="review-header">
        <h4>Check Availability</h4>
      </div>
      <div className="location-content">
        <div className="delivery-tab">
          <ul className="nav">
            <li>
              <label
                className="booking_custom_check"
                data-bs-toggle="tab"
                data-bs-target="#delivery"
              >
                <input
                  type="radio"
                  name="rent_type"
                  onChange={() => setAvailability("Delivery")}
                />
                <span className="booking_checkmark">
                  <span className="checked-title">Delivery</span>
                </span>
              </label>
            </li>
            <li>
              <label
                className="booking_custom_check"
                data-bs-toggle="tab"
                data-bs-target="#pickup"
              >
                <input
                  type="radio"
                  name="rent_type"
                  defaultChecked
                  onChange={() => setAvailability("self-pickup")}
                />
                <span className="booking_checkmark">
                  <span className="checked-title">Self Pickup</span>
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          {
            <div className="tab-pane fade active show" id="delivery">
              <form>
                <ul>
                  <li className="column-group-main">
                    {availability === "Delivery" && <DeliveryAvaiablity />}
                    {availability === "self-pickup" && (
                      <PickupAvailability pickup={pickupAddress} />
                    )}
                  </li>
                  <li className="column-group-main">
                    <div className="input-block m-0">
                      <label>Pickup Date & Return Date</label>
                    </div>
                    <div className="input-block-wrapp sidebar-form">
                      <div className="input-block me-lg-2">
                        <div className="group-img">
                          <div
                            className="form-wrap flex flex-col items-center justify-center p-4 shadow-lg rounded-lg w-fit mx-auto mt-10 relative"
                            ref={pickerRef}
                          >
                            {/* Show selected date and toggle calendar on click */}
                            <div
                              onClick={() => setShowPicker((prev) => !prev)}
                              className="cursor-pointer text-[16px] px-4 py-2 bg-orange-100 text-orange-700 font-medium rounded-lg shadow hover:bg-orange-200 transition"
                            >
                              {formattedRange}
                            </div>

                            {/* Date picker appears only when showPicker is true */}
                            {showPicker && (
                              <div className="mt-3">
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) => {
                                    const { startDate, endDate } =
                                      item.selection;
                                    setRange([item.selection]);

                                    // Dispatch to Redux
                                    dispatch(
                                      setDates({
                                        pickupDate: startDate.toISOString(),
                                        returnDate: endDate.toISOString(),
                                      })
                                    );
                                  }}
                                  moveRangeOnFirstSelection={false}
                                  ranges={range}
                                  rangeColors={["#f0c241"]}
                                  className="rounded-xl"
                                  minDate={new Date()}
                                  calendarFocus="forward"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="column-group-last">
                    <div className="input-block mb-0">
                      <div className="search-btn">
                        <Link
                          to="/checkout"
                          className="btn btn-primary check-available w-100"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Availability;
