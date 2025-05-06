import React, { useEffect, useState } from "react";
import { FaServicestack } from "react-icons/fa6";
import { MdGpsFixed } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addExtraService, getExtraServices } from "../redux/bookingSlice";
import ServiceItem from "../components/ServiceItem";

const Services = () => {
  const { services } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExtraServices());
  }, [dispatch]);

  
 
  return (
    <div className="col-lg-8 text-2xl">
      <div className="booking-information-main">
        <div className="booking-information-card">
          <div className="booking-info-head justify-content-between">
            <div className="d-flex align-items-center">
              <span>
                <i class="bx bx-add-to-queue"></i>
              </span>
              <h5>Add-Ons</h5>
            </div>
            <h6>Total : {services?.length} Add-ons</h6>
          </div>
          <div className="booking-info-body">
            {services.map((service) => (
              <ServiceItem service={service} />
            ))}
          </div>
        </div>
        <div className="booking-info-btns d-flex justify-content-end">
          <a href="booking-checkout.html" className="btn btn-secondary">
            Back to Location &amp; Time
          </a>
          <button className="btn btn-primary continue-book-btn" type="submit">
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
