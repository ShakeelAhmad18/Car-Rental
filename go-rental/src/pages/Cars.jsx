import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AOS from "aos";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import MapView from "../components/MapView";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { getAvailableCars } from "../redux/carSlice";
import { useDispatch, useSelector } from "react-redux";
import CarFilters from "../components/CarFilters";
import { setDates } from "../redux/bookingSlice";
import TimePicker from 'react-time-picker';


const Cars = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [pickupDate, setpickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isReturnDateTouched, setIsReturnDateTouched] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [view, setView] = useState("grid");
  const dispatch = useDispatch();
  const {cars}=useSelector((state) => state.car);
  const {loading}=useSelector((state) => state.car);
  const [viewPage,setViewPage]=useState(3);
  const [brand,setBrand]=useState('');
  const [model,setModel]=useState('');
  const [year,setYear]=useState('');
  const [transmission,setTransmission]=useState('');
  const [fuelType,setFuelType]=useState('');
  const [seats, setSeats] = useState("");
  const [category,setCategory]=useState('');
  const [mileage, setMileage] = useState("");


  useEffect(() => {
    AOS.init();
  }, []);
   

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

  const handleView = (views) => {
    setView(views);
  };


  //handle pickuodate 

  const handlePickupDateChange = (date) => {
    setpickupDate(date);

    // If return date wasn't manually touched or is before pickup
    if (!isReturnDateTouched || date > returnDate) {
      setReturnDate(date); // match pickupDate initially
      setIsReturnDateTouched(false);
    }
  };

  //handle return date

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setIsReturnDateTouched(true); // user manually selected it
  };


  //dispatch SetDate 

  useEffect(()=>{

    dispatch(
      setDates({
        pickupDate: pickupDate.toISOString(),
        returnDate: returnDate.toISOString(),
      })
    );


  },[returnDate,pickupDate,dispatch])


  const clearAllFilters = (e) => {
    e.preventDefault();

    setBrand("");
    setCategory("");
    setModel("");
    setSeats("");
    setFuelType("");
    setMileage("");
    setTransmission("");
  };

  //formdata for search and fetch avaiables cars

  useEffect(() => {

   const formData = {
     pickupDate: pickupDate?.toISOString(),
     returnDate: returnDate?.toISOString(),
     lat: selectedLocation?.lat,
     lng: selectedLocation?.lng,
     filters: {
       brand,
       category,
       model,
       fuelType,
       mileage,
       seats,
       transmission
     },
   };

    if(formData.lat && formData.lng && formData.pickupDate && formData.returnDate){
    dispatch(getAvailableCars({ data: formData }))
    }
   
    

  },[address,returnDate,pickupDate,selectedLocation,dispatch,brand,model,year,mileage,transmission,fuelType,seats,category])




   
  return (
    <div className="main-wrapper listing-page text-xl font-bold font-serif">
      <Navbar />
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Car Listings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/explore-cars">Listings</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Car Listings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="section-search page-search">
        <div className="container">
          <div className="search-box-banner">
            <form>
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
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            placeholder="Enter City, Airport, or Address"
                          />
                        </div>
                        {/* Dropdown */}
                        {showDropdown && suggestions.length > 0 && (
                          <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectAddress(suggestion)}
                              >
                                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                                {suggestion.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <span>
                        <i className="feather-map-pin" />
                      </span>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widget">
                      <div className="group-img text-sm sm:mb-3 sm:w-full">
                        <DatePicker
                          selected={pickupDate}
                          onChange={handlePickupDateChange}
                          minDate={new Date()}
                          dateFormat="eee, d MMMM yyyy"
                          className="rounded-lg w-full lg:w-48"
                        />
                        <span>
                          <i className="feather-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <input
                          type="text"
                          className="form-control timepicker"
                          placeholder="11:00 AM"
                        />
                        <span>
                          <i className="feather-clock" />
                        </span>
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
                      <div className="group-img text-sm sm:mb-3 sm:w-full">
                        <DatePicker
                          selected={returnDate}
                          onChange={handleReturnDateChange}
                          minDate={new Date(pickupDate)}
                          dateFormat="eee, d MMMM yyyy"
                          className="rounded-lg"
                        />
                        <span>
                          <i className="feather-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <input
                          type="text"
                          className="form-control timepicker"
                          placeholder="11:00 AM"
                        />
                        <span>
                          <i className="feather-clock" />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      <button className="btn search-button">
                        <i className="fa fa-search" aria-hidden="true" />
                        Search
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <div className="sort-section">
        <div className="container">
          <div className="sortby-sec">
            <div className="sorting-div">
              <div className="row d-flex align-items-center">
                <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                  <div className="count-search">
                    <p>Showing {cars?.data?.length || 0} Cars</p>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                  <div className="product-filter-group">
                    <div className="sortbyset">
                      <ul>
                        <li>
                          <span className="sortbytitle">Show : </span>
                          <div className="sorting-select select-one">
                            <select
                              className="form-control select"
                              onChange={(e) => setViewPage(e.target.value)}
                            >
                              <option value={3}>3</option>
                              <option value={6}>6</option>
                              <option value={9}>9</option>
                              <option value={12}>12</option>
                              <option value={15}>15</option>
                            </select>
                          </div>
                        </li>
                        <li>
                          <span className="sortbytitle">Sort By </span>
                          <div className="sorting-select select-two">
                            <select className="form-control select">
                              <option>Newest</option>
                              <option>Relevance</option>
                              <option>Low to High</option>
                              <option>High to Low</option>
                              <option>Best Rated</option>
                              <option>Distance</option>
                              <option>Popularity</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="grid-listview">
                      <ul>
                        <li>
                          <button
                            onClick={() => handleView("grid")}
                            className={
                              view === "grid" ? "active text-[#ebaa54]" : ""
                            }
                          >
                            <i className="feather-grid" />
                          </button>
                        </li>
                        <li>
                          <button
                            className={
                              view === "list" ? "active text-[#ebaa54]" : ""
                            }
                            onClick={() => handleView("list")}
                          >
                            <i className="feather-list" />
                          </button>
                        </li>
                        <li>
                          <button
                            className={
                              view === "map" ? "active text-[#ebaa54]" : ""
                            }
                            onClick={() => handleView("map")}
                          >
                            <i className="feather-map-pin" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cars && (
        <section className="section car-listing pt-0">
          <div className="container">
            <div className="row">
              <CarFilters
                setBrand={setBrand}
                clearAllFilters={clearAllFilters}
                setSeats={setSeats}
                seats={seats}
                setMileage={setMileage}
                mileage={mileage}
                fuelType={fuelType}
                category={category}
                brand={brand}
                setTransmission={setTransmission}
                transmission={transmission}
                setCategory={setCategory}
                setFuelType={setFuelType}
                model={model}
                setModel={setModel}
              />
              <div className="col-lg-9">
                {view === "grid" && (
                  <GridView
                    cars={cars}
                    loader={loading}
                    selectedLocation={selectedLocation}
                    pickupDate={pickupDate}
                    returnDate={returnDate}
                    viewPage={viewPage}
                  />
                )}
                {view === "list" && (
                  <ListView
                    cars={cars}
                    loader={loading}
                    selectedLocation={selectedLocation}
                    pickupDate={pickupDate}
                    returnDate={returnDate}
                    viewPage={viewPage}
                  />
                )}
                {view === "map" && (
                  <MapView
                    cars={cars}
                    loader={loading}
                    selectedLocation={selectedLocation}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Cars;
