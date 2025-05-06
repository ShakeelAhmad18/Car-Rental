import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { calculateDistance } from "../utils/Calculatedistance";
import { Link } from "react-router-dom";
import { getRentalDays } from "../utils/GetRentalDays";
import Pagination from "./Pagination";
import CarNotFound from "./CarNotFound";
import SearchByLocation from "./SearchByLocation";


const GridView = ({ cars, loader, selectedLocation , pickupDate , returnDate,viewPage}) => {
  const [carsWithDistance, setCarsWithDistance] = useState([]);
  const [diffDays, setdiffDays] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  
useEffect(() => {
  if (pickupDate && returnDate) {
    const days=getRentalDays(pickupDate, returnDate);
    setdiffDays(days);
  }
}, [pickupDate, returnDate]);



  useEffect(() => {
    if (
      !Array.isArray(cars?.data) ||
      !selectedLocation?.lat ||
      !selectedLocation?.lng
    ) {
      return
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


  
  //start pagination
  
    const itemsPerPage = viewPage;
  
    const endOffset = itemOffset + itemsPerPage;
    const currentItems =
      carsWithDistance?.length === 0
        ? []
        : carsWithDistance?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(carsWithDistance?.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % carsWithDistance?.length;
      
      setItemOffset(newOffset);
    };
  
   //pagination end

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
        <SearchByLocation/>
      </div>
    );
  }



  if (currentItems?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <CarNotFound />
      </div>
    );
  }
   
  
  return (
    <div>
      <div className="row">
        {/* col */}
        {currentItems?.map((data) => (
          <div className="col-xxl-4 col-lg-6 col-md-6 col-12" key={data._id}>
            <div className="listing-item">
              <div className="listing-img">
                <a href="listing-details.html">
                  <img src={data.image} className="img-fluid" alt="Audi" />
                </a>
                <div className="fav-item justify-content-end">
                  <a href="javascript:void(0)" className="fav-icon">
                    <i className="feather-heart" />
                  </a>
                </div>
                <span className="featured-text">{data.brand}</span>
              </div>
              <div className="listing-content">
                <div className="listing-features d-flex align-items-end justify-content-between">
                  <div className="list-rating">
                    <a href="javascript:void(0)" className="author-img">
                      <img src={data.owner?.image?.filePath} alt="author" />
                    </a>
                    <h3 className="listing-title">
                      <Link to={`/car-details/${data._id}`}>{data.name}</Link>
                    </h3>
                    <div className="list-rating">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span>(4.0) 160 Reviews</span>
                    </div>
                  </div>
                  {data?.distanceText === "NaN km" ? (
                    ""
                  ) : (
                    <div className="list-km">
                      <span className="km-count">
                        <img src="assets/img/icons/map-pin.svg" alt="author" />
                        {data?.distanceText}
                      </span>
                    </div>
                  )}
                </div>
                <div className="listing-details-group">
                  <ul>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-05.svg"
                          alt="Manual"
                        />
                      </span>
                      <p>{data.transmission}</p>
                    </li>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-02.svg"
                          alt="14 KM"
                        />
                      </span>
                      <p>{data.mileage}</p>
                    </li>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-03.svg"
                          alt="Diesel"
                        />
                      </span>
                      <p>{data.fuelType}</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-04.svg"
                          alt="Basic"
                        />
                      </span>
                      <p>Basic</p>
                    </li>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-05.svg"
                          alt={2022}
                        />
                      </span>
                      <p>{data.model}</p>
                    </li>
                    <li>
                      <span>
                        <img
                          src="assets/img/icons/car-parts-06.svg"
                          alt="Persons"
                        />
                      </span>
                      <p>{data.seats} Persons</p>
                    </li>
                  </ul>
                </div>
                <div className="listing-location-details">
                  <div className="listing-price">
                    <span>
                      <i className="feather-map-pin" />
                    </span>
                    {data.address?.city}
                  </div>
                  <div className="listing-price">
                    <h6>
                      ${data.rentPerkm * diffDays} <span>/ -</span>
                    </h6>
                  </div>
                </div>
                <div className="listing-button">
                  <Link
                    to={`/car-details/${data._id}`}
                    className="btn btn-order"
                  >
                    <span>
                      <i className="feather-calendar me-2" />
                    </span>
                    Rent Now
                  </Link>
                </div>
              </div>
              <div className="feature-text">
                <span className="bg-danger">Featured</span>
              </div>
            </div>
          </div>
        ))}
        {/* /col */}
      </div>
      {/* Pagination */}
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} /> 
    </div>
  );
};

export default GridView;
