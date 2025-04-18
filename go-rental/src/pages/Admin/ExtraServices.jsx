import React, { useState } from "react";
import { AiOutlineInsurance } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addExtraService } from "../../redux/carSlice";

const ExtraServices = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      daily_price:0,
      description: "",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
        dispatch(addExtraService(formData));

        setFormData({
            name: "",
            daily_price:0,
            description: "",
        });
    
    }

    const handleClose = () => {
        setShow(false);
    }


  return (
    <div className="flex items-center ml-6 mr-6 justify-center  bg-gradient-to-r bg-white p-6">
      {!show && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative flex">
                <h3>Basic</h3>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => setShow(!show)}
          >
            Add
          </button>
        </>
      )}
      {show && (
        <div className="w-full max-w-4xl bg-white p-8 transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Extra Services
          </h2>
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="insuranceName" className="block text-black">
                  Service Name
                </label>
                <input
                  type="text"
                  id="insuranceName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="insuranceCompany" className="block text-black">
                  Daily Price
                </label>
                <input
                  type="number"
                  id="insuranceCompany"
                  name="daily_price"
                  value={formData.daily_price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
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
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center text-black justify-between mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Add Services
              </button>
              <button
                onClick={handleClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExtraServices;