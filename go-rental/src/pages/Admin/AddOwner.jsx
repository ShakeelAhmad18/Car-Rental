import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaCity,
  FaUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addOnwer } from "../../redux/onwerSlice";

const AddOwner = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {loading}=useSelector((state)=>state.onwer);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    identityNumber: "",
    state: "",
    city: "",
    address: "",
    image: null,
  });



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prevState) => ({ ...prevState, image: file })); // Fix here
    }
  };

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData((prevState) => ({ ...prevState, [name]: value })); // Fix here
 };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerData = new FormData();
    ownerData.append("firstName", formData.firstName);
    ownerData.append("lastName", formData.lastName);
    ownerData.append("phone", formData.phone);
    ownerData.append("identityNumber", formData.identityNumber);
    ownerData.append("state", formData.state);
    ownerData.append("city", formData.city);
    ownerData.append("address", formData.address);
    ownerData.append("image", formData.image); // Ensure image is included

    // await AddOwner(ownerData);
    dispatch(addOnwer(ownerData));


    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      identityNumber: "",
      state: "",
      city: "",
      address: "",
      image: null,
    });
    setImage(null);
  };


    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }
   

  return (
    <div className="flex items-center ml-6 mr-6 justify-center h-screen w-screen bg-gradient-to-r bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add Owner
        </h2>
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                <FaUpload size={40} />
              </div>
            )}
          </div>
          <label
            htmlFor="upload"
            className="mt-3 cursor-pointer text-blue-600 font-medium hover:underline"
          >
            Upload Image
          </label>
          <input
            type="file"
            className="hidden"
            id="upload"
            onChange={handleImageChange}
            name="image"
            required
          />
        </div>
        {/* Form */}
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter First Name"
                onChange={handleInputChange}
                name="firstName"
                value={formData.firstName}
                required
              />
            </div>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter Last Name"
                onChange={handleInputChange}
                name="lastName"
                value={formData.lastName}
                required
              />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter Contact Number"
                onChange={handleInputChange}
                name="phone"
                value={formData.phone}
                required
              />
            </div>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter ID Number"
                name="identityNumber"
                onChange={handleInputChange}
                value={formData.identityNumber}
                required
              />
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter State"
                name="state"
                onChange={handleInputChange}
                value={formData.state}
                required
              />
            </div>
            <div className="relative">
              <FaCity className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter City"
                onChange={handleInputChange}
                name="city"
                value={formData.city}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative mt-6">
              <textarea
                className="w-full pl-4 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                placeholder="Enter Address"
                onChange={handleInputChange}
                name="address"
                value={formData.address}
                required
              ></textarea>
            </div>
          </div>
          {/* Submit Buttons */}
          <div className="flex justify-between rounded-2xl mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOwner;
