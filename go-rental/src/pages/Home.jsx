import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

//const API_KEY = "QrkPx0NbC9WTYGmetR7eg_vo0xUoWa8jp4JHeG_0gVc";


const Home = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [pickupDate, setpickupDate] = useState(new Date());
  const [returnDate,setReturnDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(null); // Stores lat & lng

  document.title = "Go Rental-Home";


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (address.length > 2) {
        try {
          const res = await axios.get(
            `https://autosuggest.search.hereapi.com/v1/autosuggest`,
            {
              params: {
                q: address, // User input
                apiKey: import.meta.env.VITE_API_KEY, // HERE Maps API Key
                at: "40.730610,-73.935242", // Example location (New York) - optional
                limit: 5, // Number of results
              },
            }
          );
          setSuggestions(res.data.items);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching autocomplete suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    fetchSuggestions();
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  const handleSelectAddress = (suggestion) => {
    setAddress(suggestion.title); // Set the selected address
    setSelectedLocation(suggestion.position); // Store lat & lng
    setShowDropdown(false); // Hide dropdown
  };


 
  return (
    <div className="main-wrapper">
      <Navbar />
      <section className="banner-section banner-slider">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-down">
                <p className="explore-text">
                  {" "}
                  <span>
                    <i className="fa-solid fa-thumbs-up me-2" />
                  </span>
                  100% Trusted car rental platform in the World
                </p>
                <h1>
                  <span>Find Your Best</span> <br />
                  Dream Car for Rental
                </h1>
                <p>
                  Experience the ultimate in comfort, performance, and
                  sophistication with our luxury car rentals. From sleek sedans
                  and stylish coupes to spacious SUVs and elegant convertibles,
                  we offer a range of premium vehicles to suit your preferences
                  and lifestyle.{" "}
                </p>
                <div className="view-all">
                  <Link
                    to="/explore-cars"
                    className="btn btn-view d-inline-flex align-items-center"
                  >
                    View all Cars{" "}
                    <span>
                      <i className="feather-arrow-right ms-2" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-down">
                <div className="banner-imgs">
                  <img
                    src="assets/img/car-right.png"
                    className="img-fluid aos"
                    alt="bannerimage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-search">
        <div className="container">
          <div className="search-box-banner">
            <form action="listing-grid.html">
              <ul className="align-items-center">
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Location</label>
                    <div className="group-img">
                      <div
                        className="relative w-full max-w-md mx-auto"
                        ref={dropdownRef}
                      >
                        <div className="relative">
                          {/* Input Field with More Placeholder Space */}
                          <input
                            type="text"
                            className="w-full pl-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter City, Airport, or Address"
                          />
                          {/* Icon (Adjust Position) */}
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                        </div>
                        {/* Dropdown */}
                        {showDropdown && suggestions.length > 0 && (
                          <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectAddress(suggestion)}
                              >
                                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                                {suggestion.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widget">
                      <div className="group-img flex w-full pb-2">
                        <DatePicker
                          selected={pickupDate}
                          onChange={(date) => setpickupDate(date)}
                          minDate={new Date()}
                          dateFormat="eee d MMMM yyyy"
                          className="rounded-lg w-full lg:w-48"
                        />
                        <span>
                          <i className="feather-calendar pb-1" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <input
                          type="time"
                          className="form-control timepicker"
                          placeholder="11:00 AM"
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Return Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widge">
                      <div className="group-img w-full flex pb-2">
                        <DatePicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                          minDate={new Date(pickupDate)}
                          dateFormat="eee d MMMM yyyy"
                          className="rounded-lg lg:w-48"
                        />
                        <span>
                          <i className="feather-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <input
                          type="time"
                          className="form-control timepicker"
                          placeholder="11:00 AM"
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      {<Link to='/explore-cars'> <button className="btn search-button" type="submit">
                      
                        <i className="fa fa-search" aria-hidden="true" />
                        Search
                      </button> </Link>}
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <section className="section services">
        <div className="service-right">
          <img
            src="assets/img/bg/service-right.svg"
            className="img-fluid"
            alt="services right"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>How It Works</h2>
            <p>
              Booking a car rental is a straightforward process that typically
              involves the following steps
            </p>
          </div>
          {/* /Heading title */}
          <div className="services-work">
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-date flex-fill">
                  <div className="services-icon border-secondary">
                    <img
                      className="icon-img bg-secondary"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>1. Choose Date &amp; Locations</h3>
                    <p>
                      Determine the date &amp; location for your car rental.
                      Consider factors such as your travel itinerary,
                      pickup/drop-off locations (e.g., airport, city center),
                      and duration of rental.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-loc flex-fill">
                  <div className="services-icon border-warning">
                    <img
                      className="icon-img bg-warning"
                      src="assets/img/icons/services-icon-02.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>2. Pick-Up Locations</h3>
                    <p>
                      Check the availability of your desired vehicle type for
                      your chosen dates and location. Ensure that the rental
                      rates, taxes, fees, and any additional charges.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-book flex-fill">
                  <div className="services-icon border-dark">
                    <img
                      className="icon-img bg-dark"
                      src="assets/img/icons/services-icon-03.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>3. Book your Car</h3>
                    <p>
                      Once you've found car rental option, proceed to make a
                      reservation. Provide the required information, including
                      your details, driver&apos;s license, contact info, and
                      payment details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section popular-services popular-explore">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Explore Most Popular Cars</h2>
            <p>
              Here's a list of some of the most popular cars globally, based on
              sales and customer preferences
            </p>
          </div>
          {/* /Heading title */}
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="listing-tabs-group">
                <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs">
                  <li>
                    <a
                      className="active"
                      aria-current="true"
                      data-bs-toggle="tab"
                      href="#Carmazda"
                    >
                      <span>
                        <img
                          src="assets/img/icons/car-icon-01.svg"
                          alt="Mazda"
                        />
                      </span>
                      Mazda
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#Caraudi">
                      <span>
                        <img
                          src="assets/img/icons/car-icon-02.svg"
                          alt="Audi"
                        />
                      </span>
                      Audi
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#Carhonda">
                      <span>
                        <img
                          src="assets/img/icons/car-icon-03.svg"
                          alt="Honda"
                        />
                      </span>
                      Honda
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#Cartoyota">
                      <span>
                        <img
                          src="assets/img/icons/car-icon-04.svg"
                          alt="Toyota"
                        />
                      </span>
                      Toyota
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#Caracura">
                      <span>
                        <img
                          src="assets/img/icons/car-icon-05.svg"
                          alt="Acura"
                        />
                      </span>
                      Acura
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#Cartesla">
                      <span>
                        <img
                          src="assets/img/icons/car-icon-06.svg"
                          alt="Tesla"
                        />
                      </span>
                      Tesla
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane active" id="Carmazda">
              <div className="row">
                {/* col */}
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="listing-item">
                    <div className="listing-img">
                      <div className="img-slider owl-carousel">
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/car-01.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/car-01-slide1.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/car-01-slide2.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/car-01-slide3.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="fav-item justify-content-end">
                        <span className="img-count">
                          <i className="feather-image" />
                          04
                        </span>
                        <a href="javascript:void(0)" className="fav-icon">
                          <i className="feather-heart" />
                        </a>
                      </div>
                      <span className="featured-text">Toyota</span>
                    </div>
                    <div className="listing-content">
                      <div className="listing-features d-flex align-items-end justify-content-between">
                        <div className="list-rating">
                          <a href="javascript:void(0)" className="author-img">
                            <img
                              src="assets/img/profiles/avatar-04.jpg"
                              alt="author"
                            />
                          </a>
                          <h3 className="listing-title">
                            <a href="listing-details.html">
                              Toyota Camry SE 350
                            </a>
                          </h3>
                          <div className="list-rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span>(4.0) 138 Reviews</span>
                          </div>
                        </div>
                        <div className="list-km">
                          <span className="km-count">
                            <img
                              src="assets/img/icons/map-pin.svg"
                              alt="author"
                            />
                            3.2m
                          </span>
                        </div>
                      </div>
                      <div className="listing-details-group">
                        <ul>
                          <li>
                            <span>
                              <img
                                src="assets/img/icons/car-parts-01.svg"
                                alt="Auto"
                              />
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
                            <p>Petrol</p>
                          </li>
                        </ul>
                        <ul>
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
                                src="assets/img/icons/car-parts-05.svg"
                                alt={2018}
                              />
                            </span>
                            <p>2018</p>
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
                          Washington
                        </div>
                        <div className="listing-price">
                          <h6>
                            $160 <span>/ Day</span>
                          </h6>
                        </div>
                      </div>
                      <div className="listing-button">
                        <a
                          href="listing-details.html"
                          className="btn btn-order"
                        >
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section popular-car-type">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Most Popular Car Types</h2>
            <p>
              Most popular worldwide Car Category due to their reliability,
              affordability, and features.
            </p>
          </div>
          {/* /Heading title */}
          <div className="row">
            <div className="popular-slider-group">
              <div className="owl-carousel popular-cartype-slider owl-theme">
                {/* owl carousel item */}
                <div className="listing-owl-item">
                  <div className="listing-owl-group">
                    <div className="listing-owl-img">
                      <img
                        src="assets/img/cars/mp-vehicle-01.svg"
                        className="img-fluid"
                        alt="Popular Cartypes"
                      />
                    </div>
                    <h6>Crossover</h6>
                    <p>35 Cars</p>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="listing-owl-item">
                  <div className="listing-owl-group">
                    <div className="listing-owl-img">
                      <img
                        src="assets/img/cars/mp-vehicle-02.svg"
                        className="img-fluid"
                        alt="Popular Cartypes"
                      />
                    </div>
                    <h6>Sports Coupe</h6>
                    <p>45 Cars</p>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="listing-owl-item">
                  <div className="listing-owl-group">
                    <div className="listing-owl-img">
                      <img
                        src="assets/img/cars/mp-vehicle-03.svg"
                        className="img-fluid"
                        alt="Popular Cartypes"
                      />
                    </div>
                    <h6>Sedan</h6>
                    <p>15 Cars</p>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="listing-owl-item">
                  <div className="listing-owl-group">
                    <div className="listing-owl-img">
                      <img
                        src="assets/img/cars/mp-vehicle-04.svg"
                        className="img-fluid"
                        alt="Popular Cartypes"
                      />
                    </div>
                    <h6>Pickup</h6>
                    <p>17 Cars</p>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="listing-owl-item">
                  <div className="listing-owl-group">
                    <div className="listing-owl-img">
                      <img
                        src="assets/img/cars/mp-vehicle-05.svg"
                        className="img-fluid"
                        alt="Popular Cartypes"
                      />
                    </div>
                    <h6>Family MPV</h6>
                    <p>24 Cars</p>
                  </div>
                </div>
                {/* /owl carousel item */}
              </div>
            </div>
          </div>
          {/* View More */}
          <div className="view-all text-center" data-aos="fade-down">
            <a
              href="listing-grid.html"
              className="btn btn-view d-inline-flex align-items-center"
            >
              View all Cars{" "}
              <span>
                <i className="feather-arrow-right ms-2" />
              </span>
            </a>
          </div>
          {/* View More */}
        </div>
      </section>
      <section className="section facts-number">
        <div className="facts-left">
          <img
            src="assets/img/bg/facts-left.png"
            className="img-fluid"
            alt="facts left"
          />
        </div>
        <div className="facts-right">
          <img
            src="assets/img/bg/facts-right.png"
            className="img-fluid"
            alt="facts right"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2 className="title text-white">Facts By The Numbers</h2>
            <p className="description">
              Here are some dreamsrent interesting facts presented by the
              numbers
            </p>
          </div>
          {/* /Heading title */}
          <div className="counter-group">
            <div className="row">
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <img src="assets/img/icons/bx-heart.svg" alt="Icon" />
                    </div>
                    <div className="count-content">
                      <h4>
                        <span className="counterUp">16</span>K+
                      </h4>
                      <p>Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <img src="assets/img/icons/bx-car.svg" alt="Icon" />
                    </div>
                    <div className="count-content">
                      <h4>
                        <span className="counterUp">2547</span>+
                      </h4>
                      <p>Count of Cars</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <img src="assets/img/icons/bx-headphone.svg" alt="Icon" />
                    </div>
                    <div className="count-content">
                      <h4>
                        <span className="counterUp">625</span>+
                      </h4>
                      <p>Car Center Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="count-group flex-fill">
                  <div className="customer-count d-flex align-items-center">
                    <div className="count-img">
                      <img src="assets/img/icons/bx-history.svg" alt="Icon" />
                    </div>
                    <div className="count-content">
                      <h4>
                        <span className="counterUp">15000</span>+
                      </h4>
                      <p>Total Kilometer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section popular-services">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>Recommended Car Rental deals</h2>
            <p>Here are some versatile options that cater to different needs</p>
          </div>
          {/* /Heading title */}
          <div className="row">
            <div className="popular-slider-group">
              <div className="owl-carousel rental-deal-slider owl-theme">
                {/* owl carousel item */}
                <div className="rental-car-item">
                  <div className="listing-item mb-0">
                    <div className="listing-img">
                      <a href="listing-details.html">
                        <img
                          src="assets/img/cars/rental-car-01.jpg"
                          className="img-fluid"
                          alt="Toyota"
                        />
                      </a>
                      <div className="fav-item justify-content-end">
                        <a href="javascript:void(0)" className="fav-icon">
                          <i className="feather-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="listing-content">
                      <div className="listing-features">
                        <div className="fav-item-rental">
                          <div className="featured-text">
                            $400<span>/day</span>
                          </div>
                        </div>
                        <div className="list-rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <span>(5.0)</span>
                        </div>
                        <h3 className="listing-title">
                          <a href="listing-details.html">
                            BMW 640 XI Gran Turismo
                          </a>
                        </h3>
                      </div>
                      <div className="listing-details-group">
                        <ul>
                          <li>
                            <span>
                              <img
                                src="assets/img/icons/car-parts-01.svg"
                                alt="Auto"
                              />
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
                        </ul>
                        <ul>
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
                                src="assets/img/icons/car-parts-07.svg"
                                alt={2018}
                              />
                            </span>
                            <p>AC</p>
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
                      <div className="listing-button">
                        <a
                          href="listing-details.html"
                          className="btn btn-order"
                        >
                          <span>
                            <i className="feather-calendar me-2" />
                          </span>
                          Rent Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="rental-car-item">
                  <div className="listing-item mb-0">
                    <div className="listing-img">
                      <a href="listing-details.html">
                        <img
                          src="assets/img/cars/rental-car-02.jpg"
                          className="img-fluid"
                          alt="Toyota"
                        />
                      </a>
                      <div className="fav-item justify-content-end">
                        <a href="javascript:void(0)" className="fav-icon">
                          <i className="feather-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="listing-content">
                      <div className="listing-features">
                        <div className="fav-item-rental">
                          <div className="featured-text">
                            $210<span>/day</span>
                          </div>
                        </div>
                        <div className="list-rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <span>(5.0)</span>
                        </div>
                        <h3 className="listing-title">
                          <a href="listing-details.html">
                            Camz Ferrari Portofino M
                          </a>
                        </h3>
                      </div>
                      <div className="listing-details-group">
                        <ul>
                          <li>
                            <span>
                              <img
                                src="assets/img/icons/car-parts-01.svg"
                                alt="Auto"
                              />
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
                            <p>30 KM</p>
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
                        </ul>
                        <ul>
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
                                src="assets/img/icons/car-parts-07.svg"
                                alt={2018}
                              />
                            </span>
                            <p>AC</p>
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
                      <div className="listing-button">
                        <a
                          href="listing-details.html"
                          className="btn btn-order"
                        >
                          <span>
                            <i className="feather-calendar me-2" />
                          </span>
                          Rent Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="rental-car-item">
                  <div className="listing-item mb-0">
                    <div className="listing-img">
                      <div className="img-slider owl-carousel owl-theme">
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/rental-car-03.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/rental-car-03-slider1.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/rental-car-03-slider2.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                        <div className="slide-images">
                          <a href="listing-details.html">
                            <img
                              src="assets/img/cars/rental-car-03-slider3.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="fav-item justify-content-end">
                        <a href="javascript:void(0)" className="fav-icon">
                          <i className="feather-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="listing-content">
                      <div className="listing-features">
                        <div className="fav-item-rental">
                          <div className="featured-text">
                            $380<span>/day</span>
                          </div>
                        </div>
                        <div className="list-rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <span>(5.0)</span>
                        </div>
                        <h3 className="listing-title">
                          <a href="listing-details.html">Mercedes-Benz</a>
                        </h3>
                      </div>
                      <div className="listing-details-group">
                        <ul>
                          <li>
                            <span>
                              <img
                                src="assets/img/icons/car-parts-01.svg"
                                alt="Auto"
                              />
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
                            <p>30 KM</p>
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
                        </ul>
                        <ul>
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
                                src="assets/img/icons/car-parts-07.svg"
                                alt={2018}
                              />
                            </span>
                            <p>AC</p>
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
                      <div className="listing-button">
                        <a
                          href="listing-details.html"
                          className="btn btn-order"
                        >
                          <span>
                            <i className="feather-calendar me-2" />
                          </span>
                          Rent Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /owl carousel item */}
                {/* owl carousel item */}
                <div className="rental-car-item">
                  <div className="listing-item mb-0">
                    <div className="listing-img">
                      <a href="listing-details.html">
                        <img
                          src="assets/img/cars/rental-car-04.jpg"
                          className="img-fluid"
                          alt="Toyota"
                        />
                      </a>
                      <div className="fav-item justify-content-end">
                        <a href="javascript:void(0)" className="fav-icon">
                          <i className="feather-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="listing-content">
                      <div className="listing-features">
                        <div className="fav-item-rental">
                          <span className="featured-text">$250/day</span>
                        </div>
                        <div className="list-rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <span>(4.5)</span>
                        </div>
                        <h3 className="listing-title">
                          <a href="listing-details.html">Range Rover</a>
                        </h3>
                      </div>
                      <div className="listing-details-group">
                        <ul>
                          <li>
                            <span>
                              <img
                                src="assets/img/icons/car-parts-01.svg"
                                alt="Auto"
                              />
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
                            <p>28 KM</p>
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
                        </ul>
                        <ul>
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
                                src="assets/img/icons/car-parts-07.svg"
                                alt={2018}
                              />
                            </span>
                            <p>AC</p>
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
                      <div className="listing-button">
                        <a
                          href="listing-details.html"
                          className="btn btn-order"
                        >
                          <span>
                            <i className="feather-calendar me-2" />
                          </span>
                          Rent Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /owl carousel item */}
              </div>
            </div>
          </div>
          {/* View More */}
          <div className="view-all text-center" data-aos="fade-down">
            <a
              href="listing-grid.html"
              className="btn btn-view d-inline-flex align-items-center"
            >
              Go to all Cars{" "}
              <span>
                <i className="feather-arrow-right ms-2" />
              </span>
            </a>
          </div>
          {/* View More */}
        </div>
      </section>
      <section className="section why-choose popular-explore">
        <div className="choose-left">
          <img
            src="assets/img/bg/choose-left.png"
            className="img-fluid"
            alt="Why Choose Us"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="row">
            <div className="col-lg-4 mx-auto">
              <div className="section-heading" data-aos="fade-down">
                <h2>Why Choose Us</h2>
                <p>We are innovative and passionate about the work we do. </p>
              </div>
            </div>
          </div>
          {/* /Heading title */}
          <div className="why-choose-group">
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-black">
                      <img src="assets/img/icons/bx-selection.svg" alt="Icon" />
                    </div>
                    <div className="choose-content">
                      <h4>Easy &amp; Fast Booking</h4>
                      <p>
                        Completely carinate e business testing process whereas
                        fully researched customer service. Globally extensive
                        content with quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-secondary">
                      <img src="assets/img/icons/bx-crown.svg" alt="Icon" />
                    </div>
                    <div className="choose-content">
                      <h4>Many Pickup Location</h4>
                      <p>
                        Enthusiastically magnetic initiatives with
                        cross-platform sources. Dynamically target testing
                        procedures through effective.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-primary">
                      <img
                        src="assets/img/icons/bx-user-check.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="choose-content">
                      <h4>Customer Satisfaction</h4>
                      <p>
                        Globally user centric method interactive. Seamlessly
                        revolutionize unique portals orporate collaboration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
