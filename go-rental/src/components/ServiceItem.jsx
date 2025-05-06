import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaServicestack } from "react-icons/fa6";

import {
  addExtraService,
  calculateSubTotal,
  removeExtraService,
} from "../redux/bookingSlice";
import toast from "react-hot-toast";

const ServiceItem = ({ service }) => {
  const [showInfo, setShowInfo] = useState(null);
  const dispatch = useDispatch();

  const { _id: id, name, daily_price, description } = service || {};
  // Get current services from Redux state (adjust the path as needed)
  const extraServices = useSelector((state) => state.booking.extraServices);

  const isServiceAdded = extraServices.some(
    (service) => service.serviceId === id
  );

  const toggleDescription = (id) => {
    setShowInfo((prev) => (prev === id ? null : id));
  };

  const handleAddService = () => {
    if (isServiceAdded) {
      dispatch(removeExtraService(id)); // Remove by serviceId
      dispatch(calculateSubTotal()); // Recalculate subtotal after removing service
      toast.success("Service removed successfully!");
    } else {
      // Add the service
      const newService = { serviceId: id, serviceName: name, daily_price };
      dispatch(addExtraService(newService));
      dispatch(calculateSubTotal()); // Recalculate subtotal after adding service
      toast.success("Service added successfully!");
    }
  };

  
  

  return (
    <ul className="adons-lists p-3">
      <li key={id}>
        <div className="adons-types">
          <div className="d-flex align-items-center adon-name-info">
            <span className="adon-icon">
              <FaServicestack />
            </span>
            <div className="adon-name">
              <h6>{name}</h6>
              <button className="btn" onClick={() => toggleDescription(id)}>
                <i className="bx bx-info-circle me-2 text-sm" />
                More information
                <i
                  className={`bx ms-2 arrow-icon ${
                    showInfo === id ? "bx-chevron-up" : "bx-chevron-down"
                  }`}
                />
              </button>
            </div>
          </div>
          <span className="adon-price">${daily_price}</span>
          <button
            className={`${
              isServiceAdded
                ? "btn btn-secondary remove-adon-btn"
                : "btn add-addon-btn"
            }`}
            onClick={handleAddService}
          >
            <i
              className={`${
                isServiceAdded
                  ? "bx bx-minus-circle me-2"
                  : "bx bx-plus-circle me-2"
              }`}
            />
            {isServiceAdded ? "Remove" : "Add"}
          </button>
        </div>
        <div
          className={`more-adon-info transition-all duration-300 ease-in-out overflow-hidden ${
            showInfo === id
              ? "max-h-[1000px] opacity-100 pt-3"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-black text-base">
            {description || "No description available"}
          </p>
        </div>
      </li>
    </ul>
  );
};

export default ServiceItem;
