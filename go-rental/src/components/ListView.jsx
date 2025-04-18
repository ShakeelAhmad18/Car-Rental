import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { calculateDistance } from "../utils/Calculatedistance";
import { getRentalDays } from "../utils/GetRentalDays";
import Pagination from "./Pagination";

const ListView = ({ cars, loader, selectedLocation,pickupDate, returnDate,viewPage }) => {
  const [carsWithDistance, setCarsWithDistance] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  const [diffDays, setdiffDays] = useState(1);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const days = getRentalDays(pickupDate, returnDate);
      setdiffDays(days);
    }
  }, [pickupDate, returnDate]);

  //start pagination

  const itemsPerPage = viewPage;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems =
    carsWithDistance?.length === 0
      ? []
      : carsWithDistance?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(carsWithDistance?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % carsWithDistance?.length;

    setItemOffset(newOffset);
  };

  //pagination end

  useEffect(() => {
    if (
      !Array.isArray(cars?.data) ||
      !selectedLocation?.lat ||
      !selectedLocation?.lng
    ) {
      return;
    }

    const updatedCars = cars.data.map((car) => {
      const distance = calculateDistance(
        selectedLocation.lat,
        selectedLocation.lng,
        car.address?.lat,
        car.address?.lng
      );

      return {
        ...car,
        distanceInKm: distance,
        distanceText:
          distance < 1
            ? `${Math.round(distance * 1000)} m`
            : `${distance.toFixed(2)} km`,
      };
    });

    setCarsWithDistance(updatedCars);
  }, [cars, selectedLocation]);

  if (loader) {
    return <Loader />;
  }

  if (
    !Array.isArray(cars?.data) ||
    !selectedLocation?.lat ||
    !selectedLocation?.lng
  ) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h2 className="text-2xl text-black font-bold">
          Find Your Dream Car Near to Its Location
        </h2>
        <h3>Please Enter his Address!</h3>
      </div>
    );
  }


  if (currentItems?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl text-black font-bold">
          No Cars Found on this Location
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="listview-car">
        {currentItems?.map((data) => (
          <div className="card">
            <div className="blog-widget d-flex">
              <div className="blog-img">
                <a href="listing-details.html">
                  <img src={data.image} className="img-fluid" alt="blog-img" />
                </a>
                <div className="fav-item justify-content-end">
                  <a href="javascript:void(0)" className="fav-icon">
                    <i className="feather-heart" />
                  </a>
                </div>
              </div>
              <div className="bloglist-content w-100">
                <div className="card-body">
                  <div className="blog-list-head d-flex">
                    <div className="blog-list-title">
                      <h3>
                        <a href="listing-details.html">{data.name}</a>
                      </h3>
                      <h6>
                        Category : <span>{data.category}</span>
                      </h6>
                    </div>
                    <div className="blog-list-rate">
                      <div className="list-rating">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star" />
                        <span>165 Reviews</span>
                      </div>
                      <h6>
                        ${data.rentPerkm * diffDays} <span>/ -</span>
                      </h6>
                    </div>
                  </div>
                  <div className="listing-details-group">
                    <ul>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-05.svg"
                            alt="Auto"
                          />
                        </span>
                        <p>{data?.transmission}</p>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-02.svg"
                            alt="10 KM"
                          />
                        </span>
                        <p>{data.mileage}</p>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-03.svg"
                            alt="Petrol"
                          />
                        </span>
                        <p>{data.fuelType}</p>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-04.svg"
                            alt="Power"
                          />
                        </span>
                        <p>Normal</p>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-06.svg"
                            alt="Persons"
                          />
                        </span>
                        <p>{data?.seats} Persons</p>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/icons/car-parts-05.svg"
                            alt={2018}
                          />
                        </span>
                        <p>{data.model}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="blog-list-head list-head-bottom d-flex">
                    <div className="blog-list-title">
                      <div className="title-bottom">
                        <div className="car-list-icon">
                          <img src={data.owner?.image?.filePath} alt="user" />
                        </div>
                        <div className="address-info">
                          <h6>
                            <i className="feather-map-pin" />
                            {data.address?.city},{data.address?.country}
                          </h6>
                        </div>
                        {data.distanceText === "NaN km" ? (
                          ""
                        ) : (
                          <div className="list-km">
                            <span className="km-count">
                              <img
                                src="assets/img/icons/map-pin.svg"
                                alt="author"
                              />
                              {data.distanceText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="listing-button">
                      <a href="listing-details.html" className="btn btn-order">
                        <span>
                          <i className="feather-calendar me-2" />
                        </span>
                        Rent Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </div>
  );
};

export default ListView;
