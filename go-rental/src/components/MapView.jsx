import React from "react";

const MapView = () => {

    
    

  return (
    <div className="listview-car">
      <div className="card">
        <div className="blog-widget d-flex">
          <div className="blog-img">
            <a href="listing-details.html">
              <img
                src="assets/img/car-list-5.jpg"
                className="img-fluid"
                alt="blog-img"
              />
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
                    <a href="listing-details.html">Audi A3 2019 new</a>
                  </h3>
                  <h6>
                    Category : <span>Audi</span>
                  </h6>
                </div>
                <div className="blog-list-rate">
                  <div className="list-rating">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span>150 Reviews</span>
                  </div>
                  <h6>
                    $45<span>/ Day</span>
                  </h6>
                </div>
              </div>
              <div className="listing-details-group">
                <ul>
                  <li>
                    <span>
                      <img src="assets/img/icons/car-parts-01.svg" alt="Auto" />
                    </span>
                    <p>Manual</p>
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
                    <p>Petrol</p>
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
                    <p>4 Persons</p>
                  </li>
                  <li>
                    <span>
                      <img src="assets/img/icons/car-parts-05.svg" alt={2018} />
                    </span>
                    <p>2019</p>
                  </li>
                </ul>
              </div>
              <div className="blog-list-head list-head-bottom d-flex">
                <div className="blog-list-title">
                  <div className="title-bottom">
                    <div className="car-list-icon">
                      <img src="assets/img/profiles/avatar-03.jpg" alt="user" />
                    </div>
                    <div className="address-info">
                      <h6>
                        <i className="feather-map-pin" />
                        Newyork, USA
                      </h6>
                    </div>
                    <div className="list-km">
                      <span className="km-count">
                        <img src="assets/img/icons/map-pin.svg" alt="author" />
                        3.5m
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
        </div>
      </div>
    </div>
  );
};

export default MapView;
