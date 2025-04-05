import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoLocation } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  FaCar,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaCalendarAlt,
  FaSnowflake,
  FaBarcode,
  FaDoorOpen,
  FaBolt,
  FaTimes,
  FaChair,
  FaUser,
  FaCity,
} from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getOwners } from "../../redux/onwerSlice";
import { addCar } from "../../redux/carSlice";
import Loader from "../../components/Loader";


const AddCar = () => {
  const [image, setImage] = useState(null);
  const { loading } = useSelector((state) => state.car);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  

  const [formData, setFormData] = useState({
    owner: "",
    name: "",
    brand: "",
    model: "",
    color: "",
    fuelType: "",
    AC: "",
    doors: "",
    rentPerkm: "",
    seats: "",
    driveTrain: "",
    VIN: "",
    Engine: "",
    mileage: "",
    category: "",
    transmission: "",
    description: "",
    street: "",
    city: "",
    country: "",
    lat: "",
    lng: "",
  });

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { onwers } = useSelector((state) => state.onwer);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = new FormData();
    carData.append("owner", formData.owner);
    carData.append("name", formData.name);
    carData.append("brand", formData.brand);
    carData.append("model", formData.model);
    carData.append("color", formData.color);
    carData.append("fuelType", formData.fuelType);
    carData.append("rentPerkm", formData.rentPerkm);
    carData.append("AC", formData.AC);
    carData.append("doors", formData.doors);
    carData.append("seats", formData.seats);
    carData.append("driveTrain", formData.driveTrain);
    carData.append("VIN", formData.VIN);
    carData.append("Engine", formData.Engine);
    carData.append("mileage", formData.mileage);
    carData.append("category", formData.category);
    carData.append("transmission", formData.transmission);
    carData.append("image", formData.image);
    carData.append("description", formData.description);
    carData.append("street", formData.street);
    carData.append("city", formData.city);
    carData.append("country", formData.country);
    carData.append("lat", formData.lat);
    carData.append("lng", formData.lng);

    dispatch(addCar(carData));

    setFormData({
      owner: "",
      name: "",
      brand: "",
      model: "",
      color: "",
      fuelType: "",
      AC: "",
      doors: "",
      rentPerkm: "",
      seats: "",
      driveTrain: "",
      VIN: "",
      Engine: "",
      mileage: "",
      category: "",
      transmission: "",
      description: "",
      street: "",
      city: "",
      country: "",
      lat: "",
      lng: ""
    });

    removeImage();
  };


  

  useEffect(() => {
    const fetchSuggestions = async () => {

      if (formData.street.length > 2) {
        try {
          const res = await axios.get(
            `https://autosuggest.search.hereapi.com/v1/autosuggest`,
            {
              params: {
                q: formData.street, // User input
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
  }, [formData.street]);

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

    setFormData({
      ...formData,
      street: suggestion.title,
      lat: suggestion.position.lat,
      lng: suggestion.position.lng
    })
    setShowDropdown(false); 

  };

    

  if (loading) {
    return <Loader />
  }
  

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center bg-gradient-to p-6 pt-20">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center p-12">Add New Car</h2>
        <form className="text-black lg:mt-2 p-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">
                <FaUser /> Onwer
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                required
              >
                <option>Select Onwer</option>
                {onwers?.map((data, i) => (
                  <option key={i} value={data._id}>
                    {data.firstName} {data.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaTachometerAlt /> Car Name
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Car Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCogs /> Brand
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.brand}
                name="brand"
                required
              >
                <option>Select Brand</option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
                <option>Tesla</option>
                <option>Lexus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCogs /> Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.category}
                name="category"
                required
              >
                <option>Select Category</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Coupe</option>
                <option>Truck</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCogs /> Transmission
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.transmission}
                name="transmission"
                required
              >
                <option>Select Transmission</option>
                <option>Manual</option>
                <option>Automatic</option>
                <option>CVT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaGasPump /> Fuel Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.fuelType}
                name="fuelType"
                required
              >
                <option>Select Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaTachometerAlt /> Mileage
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Mileage"
                onChange={handleInputChange}
                value={formData.mileage}
                name="mileage"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaTachometerAlt /> Color
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Color"
                onChange={handleInputChange}
                value={formData.color}
                name="color"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCogs /> Drivetrain
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Drivetrain"
                onChange={handleInputChange}
                value={formData.driveTrain}
                name="driveTrain"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCogs /> Rent Per KM
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                placeholder="Rent Per KM"
                onChange={handleInputChange}
                value={formData.rentPerkm}
                name="rentPerkm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaCalendarAlt /> Model
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Year"
                onChange={handleInputChange}
                value={formData.model}
                name="model"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaSnowflake /> AC
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.AC}
                name="AC"
                required
              >
                <option>Select AC</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaBarcode /> VIN
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter VIN"
                onChange={handleInputChange}
                value={formData.VIN}
                name="VIN"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaDoorOpen /> Doors
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.doors}
                name="doors"
                required
              >
                <option>Select Doors</option>
                <option>2</option>
                <option>4</option>
                <option>6</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaChair /> Seats
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.seats}
                name="seats"
                required
              >
                <option>Select Seats</option>
                <option>2</option>
                <option>4</option>
                <option>5</option>
                <option>7</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaBolt /> Engine (Hp)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Engine Power"
                onChange={handleInputChange}
                value={formData.Engine}
                name="Engine"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">
                <IoLocation />
                Street
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Address"
                onChange={handleInputChange}
                value={formData.street}
                name="street"
                required
              />
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
            <div>
              <label className="block text-sm font-medium">
                <FaCity />
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Address"
                onChange={handleInputChange}
                value={formData.city}
                name="city"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <IoLocation />
                Country
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Country"
                onChange={handleInputChange}
                value={formData.country}
                name="country"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <IoLocation />
                Latitude
              </label>
              <input
                type="text"
                className="w-full bg-gray-300 px-3 py-2 border rounded"
                placeholder="Latitude"
                onChange={handleInputChange}
                value={formData.lat}
                name="lat"
                disabled
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <IoLocation />
                Longitude
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Longitude"
                onChange={handleInputChange}
                value={formData.lng}
                name="lng"
                disabled
                required
              />
            </div>
          </div>
          <div className="py-4">
            <label className="block text-sm font-medium">
              <BiDetail /> Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Description"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
              required
            />
          </div>
          <div className="flex flex-col items-center mb-6 mt-4">
            {/* Image Upload Box */}
            <div className="relative w-[300px] h-[200px] flex items-center justify-center rounded-md flow-hidden border-4 border-gray-300 bg-gray-100">
              {image ? (
                <img
                  src={image}
                  alt="Car"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaCar className="text-gray-400 text-6xl" />
              )}
            </div>
            {/* Upload & Remove Buttons */}
            <div className="mt-3 flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                id="upload"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="upload"
                className="cursor-pointer text-blue-500 text-sm"
              >
                Upload Image
              </label>
              {image && (
                <button
                  onClick={removeImage}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes /> Remove
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 mb-3">
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Car
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
