import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../redux/carSlice";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const GetAllCar = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.car);
  const [search, setSearch] = useState("");
  
   
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  

  return (
    <div className="p-6 bg-white min-h-screen mt-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold px-4">All Cars</h2>
          <div className="flex gap-2 p-2">
            <input
              type="text"
              placeholder="Search by name..."
              className="border p-2 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto p-2">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Rent-KM</th>
                <th className="border p-3">Brand</th>
                <th className="border p-3">Color</th>
                <th className="border p-3">Fuel Type</th>
                <th className="border p-3">Model</th>
                <th className="border p-3">Owner</th>
                <th className="border p-3">Contact</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    <div className="min-h-screen flex justify-center items-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center text-red-500 p-4">
                    Error: {error}
                  </td>
                </tr>
              ) : cars?.length > 0 ? (
                cars
                  ?.filter((car) =>
                    car.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((car) => (
                    <tr key={car._id} className="hover:bg-gray-100">
                      <td className="border p-2 text-center">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-12 h-12 rounded"
                        />
                      </td>
                      <td className="border p-2 text-center">{car.name}</td>
                      <td className="border p-2 text-center">
                        {car.rentPerkm}
                      </td>
                      <td className="border p-2 text-center">{car.brand}</td>
                      <td className="border p-2 text-center">{car.color}</td>
                      <td className="border p-2 text-center">{car.fuelType}</td>
                      <td className="border p-2 text-center">{car.model}</td>
                      <td className="border p-2 text-center">
                        {car.owner?.firstName}
                      </td>
                      <td className="border p-2 text-center">
                        {car.owner.phone}
                      </td>
                      <td className="border p-2 text-center flex justify-center items-center gap-3">
                        <Link
                          to={`/admindashboard/edit/${car._id}`}
                          className="text-blue-500"
                        >
                          <AiFillEdit size={30} />
                        </Link>
                        <button className="text-red-500 hover:text-red-700">
                          <AiFillDelete size={30} />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No cars found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllCar;
