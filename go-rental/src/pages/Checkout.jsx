import React, { use, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DeliveryLocation from "../components/DeliveryLocation";
import SelfpickupLocation from "../components/SelfpickupLocation";
import BookingDateTime from "../components/BookingDateTime";
import { format } from "date-fns";

const Checkout = () => {

    const { selectedCar, pickupType,deliveryFee,basePrice,subTotal,tax ,extraServices,pickupLocation,pickupDate,returnDate,returnLocation,deliveryLocation} = useSelector((state) => state.booking);
    const location=useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])


  return (
    <div className="main-wrapper">
      <Navbar />
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Checkout</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Checkout
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="booking-new-module">
        <div className="container">
          <div className="booking-wizard-head ">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-3">
                <div className="booking-head-title">
                  <h4>Reserve Your Car</h4>
                  <p>Complete the following steps</p>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9">
                <div className="booking-wizard-lists">
                  <ul>
                    <li className="active">
                      <span>
                        <img
                          src="/assets/img/icons/booking-head-icon-01.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Location &amp; Time</h6>
                    </li>
                    <li
                      className={
                        location.pathname === "/checkout/services"
                          ? "active"
                          : ""
                      }
                    >
                      <span>
                        <img
                          src="/assets/img/icons/booking-head-icon-02.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Extra Services</h6>
                    </li>
                    <li>
                      <span>
                        <img
                          src="/assets/img/icons/booking-head-icon-03.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Detail</h6>
                    </li>
                    <li>
                      <span>
                        <img
                          src="/assets/img/icons/booking-head-icon-04.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Checkout</h6>
                    </li>
                    <li>
                      <span>
                        <img
                          src="/assets/img/icons/booking-head-icon-05.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Booking Confirmed</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-detail-info">
            <div className="row">
              <div className="col-lg-4 theiaStickySidebar">
                <div className="booking-sidebar">
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head">
                      <h5>Car Details</h5>
                    </div>
                    <div className="booking-sidebar-body">
                      <div className="booking-car-detail">
                        <span className="car-img">
                          <img
                            src={selectedCar?.image}
                            className="img-fluid"
                            alt="Car"
                          />
                        </span>
                        <div className="care-more-info">
                          <h5>{selectedCar?.name}</h5>
                          <p>
                            {selectedCar?.address?.street},
                            {selectedCar?.address?.city},
                            {selectedCar?.address?.country}
                          </p>
                          <Link to={`/car-details/${selectedCar?._id}`}>
                            View Car Details
                          </Link>
                        </div>
                      </div>
                      <div className="booking-vehicle-rates">
                        <ul>
                          <li>
                            <div className="rental-charge">
                              <h6>Rental Charges Rate</h6>
                              <span className="text-danger">
                                (This does not include fuel)
                              </span>
                            </div>
                            <h5>+ ${basePrice}</h5>
                          </li>
                          {pickupType === "Delivery" && (
                            <li>
                              <h6>Door delivery</h6>
                              <h5>+ ${deliveryFee}</h5>
                            </li>
                          )}
                          <li>
                            <h6>Tax</h6>
                            <h5>+ ${tax?.toFixed(2)}</h5>
                          </li>
                          {extraServices?.length > 0 &&
                            extraServices.map((data, i) => (
                              <li key={i}>
                                <h6>{data?.serviceName}</h6>
                                <h5>+ ${data?.daily_price}/Daily</h5>
                              </li>
                            ))}
                          <li className="total-rate">
                            <h6>Subtotal</h6>
                            <h5>${subTotal}</h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="booking-sidebar-card">
                    <div class="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Location Details</h5>
                      <Link
                        to={`/car-details/${selectedCar?._id}`}
                        class="d-flex align-items-center"
                      >
                        <i class="bx bx-edit-alt me-2"></i>Edit
                      </Link>
                    </div>
                    <div class="booking-sidebar-body">
                      <ul class="location-address-info">
                        <li>
                          <h6>Booking Type</h6>
                          <p>{pickupType}</p>
                        </li>
                        {pickupType === "Delivery" && (
                          <li>
                            <h6>Delivery Location & Date</h6>
                            <p>{deliveryLocation}</p>
                            <p>{format(pickupDate)}</p>
                          </li>
                        )}
                        {pickupType === "self-pickup" && (
                          <li>
                            <h6>Pickup Location & Date</h6>
                            <p>{pickupLocation}</p>
                            <p>{format(pickupDate, "EEE, d MMM yyyy")}</p>
                          </li>
                        )}
                        <li>
                          <h6>Return Location & Date</h6>
                          <p>{returnLocation}</p>
                          <p>{format(returnDate, "EEE, d MMM yyyy")}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Coupon</h5>
                      <a className="coupon-view">View Coupons</a>
                    </div>
                    <div className="booking-sidebar-body">
                      <form action="booking-checkout.html">
                        <div className="d-flex align-items-center">
                          <div className="form-custom flex-fill">
                            <input
                              type="text"
                              className="form-control mb-0"
                              placeholder="Coupon code"
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-secondary apply-coupon-btn d-flex align-items-center ms-2"
                          >
                            Apply
                            <i className="feather-arrow-right ms-2" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="total-rate-card">
                    <div className="vehicle-total-price">
                      <h5>Estimated Total</h5>
                      <span>{subTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
              {location.pathname === "/checkout" ? (
                <div className="col-lg-8">
                  <div className="booking-information-main">
                    <form action="booking-addon.html">
                      <div className="booking-information-card">
                        <div className="booking-info-head">
                          <span>
                            <i className="bx bxs-car-garage" />
                          </span>
                          <h5>Rental Type</h5>
                        </div>
                        <div className="booking-info-body">
                          <ul className="booking-radio-btns">
                            <li>
                              <label className="booking_custom_check">
                                <input
                                  type="radio"
                                  name="rent_type"
                                  id="location_delivery"
                                  checked={pickupType === "Delivery"}
                                />
                                <span className="booking_checkmark">
                                  <span className="checked-title">
                                    Delivery
                                  </span>
                                </span>
                              </label>
                            </li>
                            <li>
                              <label className="booking_custom_check">
                                <input
                                  type="radio"
                                  name="rent_type"
                                  id="location_pickup"
                                  checked={pickupType === "self-pickup"}
                                />
                                <span className="booking_checkmark">
                                  <span className="checked-title">
                                    Self Pickup
                                  </span>
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {pickupType === "Delivery" && <DeliveryLocation />}
                      {pickupType === "self-pickup" && <SelfpickupLocation />}
                      <div className="booking-information-card booking-type-card">
                        <div className="booking-info-head">
                          <span>
                            <i className="bx bxs-location-plus" />
                          </span>
                          <h5>Booking Date &amp; Time</h5>
                        </div>
                        <BookingDateTime />
                      </div>
                      <div className="booking-info-btns d-flex justify-content-end">
                        <Link
                          to={`/car-details/${selectedCar?._id}`}
                          className="btn btn-secondary"
                        >
                          Back to Car details
                        </Link>
                        <Link
                          to="/checkout/services"
                          className="btn btn-primary continue-book-btn"
                        >
                          Continue Booking
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
