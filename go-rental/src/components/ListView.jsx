import React, { useEffect } from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css"; // Owl Carousel CSS
import "owl.carousel"; // Owl Carousel JS

const ListView = () => {




  return (
    <div className="listview-car">
      <div className="card">
        <div className="blog-widget d-flex">
          <div className="blog-img">
            <div className="img-slider owl-carousel">
              {/* Carousel Images */}
              <div className="slide-images">
                <a href="listing-details.html">
                  <img
                    src="assets/img/cars/car-04.jpg"
                    className="img-fluid"
                    alt="Toyota"
                  />
                </a>
              </div>
              <div className="slide-images">
                <a href="listing-details.html">
                  <img
                    src="assets/img/cars/car-04.jpg"
                    className="img-fluid"
                    alt="Toyota"
                  />
                </a>
              </div>
              <div className="slide-images">
                <a href="listing-details.html">
                  <img
                    src="assets/img/cars/car-04.jpg"
                    className="img-fluid"
                    alt="Toyota"
                  />
                </a>
              </div>
              <div className="slide-images">
                <a href="listing-details.html">
                  <img
                    src="assets/img/cars/car-04.jpg"
                    className="img-fluid"
                    alt="Toyota"
                  />
                </a>
              </div>
            </div>
            {/* Favorite Icon */}
            <div className="fav-item justify-content-end">
              <span className="img-count">
                <i className="feather-image" />
                04
              </span>
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
                    <a href="listing-details.html">Ferrari 458 MM Special</a>
                  </h3>
                  <h6>
                    Category: <span>Ferrari</span>
                  </h6>
                </div>
                <div className="blog-list-rate">
                  <div className="list-rating">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span>180 Reviews</span>
                  </div>
                  <h6>
                    $160<span>/ Day</span>
                  </h6>
                </div>
              </div>
              <div className="listing-details-group">
                <ul>
                  <li>
                    <span>
                      <img src="assets/img/icons/car-parts-01.svg" alt="Auto" />
                    </span>
                    <p>Auto</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/img/icons/car-parts-02.svg"
                        alt="10 KM"
                      />
                    </span>
                    <p>10 KM</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/img/icons/car-parts-03.svg"
                        alt="Petrol"
                      />
                    </span>
                    <p>Diesel</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/img/icons/car-parts-04.svg"
                        alt="Power"
                      />
                    </span>
                    <p>Power</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/img/icons/car-parts-06.svg"
                        alt="Persons"
                      />
                    </span>
                    <p>5 Persons</p>
                  </li>
                  <li>
                    <span>
                      <img src="assets/img/icons/car-parts-05.svg" alt="2018" />
                    </span>
                    <p>2022</p>
                  </li>
                </ul>
              </div>
              <div className="blog-list-head list-head-bottom d-flex">
                <div className="blog-list-title">
                  <div className="title-bottom">
                    <div className="car-list-icon">
                      <img src="assets/img/profiles/avatar-14.jpg" alt="user" />
                    </div>
                    <div className="address-info">
                      <h6>
                        <i className="feather-map-pin" />
                        Amsterdam, Netherland
                      </h6>
                    </div>
                    <div className="list-km">
                      <span className="km-count">
                        <img src="assets/img/icons/map-pin.svg" alt="author" />
                        3.2m
                      </span>
                    </div>
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
          <div className="feature-text">
            <span className="bg-danger">Featured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
