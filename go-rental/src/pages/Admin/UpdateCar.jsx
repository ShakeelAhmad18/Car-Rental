import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarById } from "../../redux/carSlice";
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
} from "react-icons/fa";

const UpdateCar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car,loading } = useSelector((state) => state.car);

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
  });

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
      });
    }
  }, [car]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  // Handle form submission
  /*const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCa({ id, formData }));
  };*/


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
        <form onSubmit={""}>
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
