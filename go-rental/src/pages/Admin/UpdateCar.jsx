import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarById, updateCar } from "../../redux/carSlice";
import { BiDetail } from "react-icons/bi";
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
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import axios from "axios";

const UpdateCar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { car, loading } = useSelector((state) => state.car);
  const [image, setImage] = useState(null);

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

  //handle image change
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

  // Fetch car details
  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  // Update form data when car is available
  useEffect(() => {
    if (car) {
      setFormData({
        owner: car.owner || "",
        name: car.name || "",
        brand: car.brand || "",
        model: car.model || "",
        color: car.color || "",
        fuelType: car.fuelType || "",
        AC: car.AC || "",
        doors: car.doors || "",
        rentPerkm: car.rentPerkm || "",
        seats: car.seats || "",
        driveTrain: car.driveTrain || "",
        VIN: car.VIN || "",
        Engine: car.Engine || "",
        mileage: car.mileage || "",
        category: car.category || "",
        transmission: car.transmission || "",
        description: car.description || "",
        street: car.address?.street || "",
        city: car.address?.city || "",
        country: car.address?.country || "",
        lat: car.address?.lat || "",
        lng: car.address?.lng || "",
      });
    }
  }, [car]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCar({ id, car:formData }));
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
      lng: suggestion.position.lng,
    });
    setShowDropdown(false);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center bg-gradient-to p-6 pt-20">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center p-12 mb-6">Update Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-4">
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
              <select
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Mileage"
                onChange={handleInputChange}
                value={formData.mileage}
                name="mileage"
                required
              >
                <option>Select Mileage</option>
                <option>Limited</option>
                <option>Unlimited</option>
              </select>
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
          <div className="flex justify-center items-center mb-3">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-[200px] mt-4"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
