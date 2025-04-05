import React from 'react'

const GridView = () => {
  return (
    <div className="row">
      {/* col */}
      <div className="col-xxl-4 col-lg-6 col-md-6 col-12">
        <div className="listing-item">
          <div className="listing-img">
            <a href="listing-details.html">
              <img
                src="assets/img/cars/car-04.jpg"
                className="img-fluid"
                alt="Audi"
              />
            </a>
            <div className="fav-item justify-content-end">
              <a href="javascript:void(0)" className="fav-icon">
                <i className="feather-heart" />
              </a>
            </div>
            <span className="featured-text">Ferrai</span>
          </div>
          <div className="listing-content">
            <div className="listing-features d-flex align-items-end justify-content-between">
              <div className="list-rating">
                <a href="javascript:void(0)" className="author-img">
                  <img src="assets/img/profiles/avatar-04.jpg" alt="author" />
                </a>
                <h3 className="listing-title">
                  <a href="listing-details.html">Ferrari 458 MM Speciale</a>
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
              <div className="list-km">
                <span className="km-count">
                  <img src="assets/img/icons/map-pin.svg" alt="author" />
                  3.5m
                </span>
              </div>
            </div>
            <div className="listing-details-group">
              <ul>
                <li>
                  <span>
                    <img src="assets/img/icons/car-parts-05.svg" alt="Manual" />
                  </span>
                  <p>Manual</p>
                </li>
                <li>
                  <span>
                    <img src="assets/img/icons/car-parts-02.svg" alt="14 KM" />
                  </span>
                  <p>14 KM</p>
                </li>
                <li>
                  <span>
                    <img src="assets/img/icons/car-parts-03.svg" alt="Diesel" />
                  </span>
                  <p>Diesel</p>
                </li>
              </ul>
              <ul>
                <li>
                  <span>
                    <img src="assets/img/icons/car-parts-04.svg" alt="Basic" />
                  </span>
                  <p>Basic</p>
                </li>
                <li>
                  <span>
                    <img src="assets/img/icons/car-parts-05.svg" alt={2022} />
                  </span>
                  <p>2022</p>
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
              </ul>
            </div>
            <div className="listing-location-details">
              <div className="listing-price">
                <span>
                  <i className="feather-map-pin" />
                </span>
                Newyork, USA
              </div>
              <div className="listing-price">
                <h6>
                  $160 <span>/ Day</span>
                </h6>
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
          <div className="feature-text">
            <span className="bg-danger">Featured</span>
          </div>
        </div>
      </div>
      {/* /col */}
    </div>
  );
}

export default GridView
