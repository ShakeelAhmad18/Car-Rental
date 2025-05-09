import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { AiOutlineInsurance } from "react-icons/ai";
import { FaServicestack } from "react-icons/fa6";



const AdminDashboard = () => {

  const location=useLocation();


  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Admin Dashboard</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admindashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Admin Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-section font-bold text-2xl">
        <div className="container">
          <div className="col">
            <div className="col-lg-12">
              <div className="dashboard-menu">
                <ul>
                  <li>
                    <Link
                      to="/admindashboard"
                      className={`${
                        location.pathname === "/admindashboard" ? "active" : ""
                      }`}
                    >
                      <img
                        src="assets/img/icons/dashboard-icon.svg"
                        alt="Icon"
                      />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="allbookings"
                      className={`${
                        location.pathname === "/admindashboard/allbookings"
                          ? "active"
                          : ""
                      }`}
                    >
                      <img src="assets/img/icons/booking-icon.svg" alt="Icon" />
                      <span>All Bookings</span>
                    </Link>
                  </li>
                  <li className="flex ">
                    <Link
                      to="allcars"
                      className={`${
                        location.pathname === "/admindashboard/allcars"
                          ? "active"
                          : ""
                      }`}
                    >
                      <IoCarSport size={24} className="mb-1" />
                      <span className="text-xl">All Cars</span>
                    </Link>
                  </li>
                  <li className="flex ">
                    <Link
                      to="add-owner"
                      className={`${
                        location.pathname === "/admindashboard/add-owner"
                          ? "active"
                          : ""
                      }`}
                    >
                      <FaUserTie size={20} className="mb-2" />
                      <span className="text-xl">Add Owner</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="add-car"
                      className={`${
                        location.pathname === "/admindashboard/add-car"
                          ? "active"
                          : ""
                      }`}
                    >
                      <IoCarSport size={24} className="mb-1" />
                      <span className="text-xl">Add Car</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admindashboard/add-insurance"
                      className={`${
                        location.pathname === "/admindashboard/add-insurance"
                          ? "active"
                          : ""
                      }`}
                    >
                      <AiOutlineInsurance size={24} className="mb-1" />
                      <span className="text-xl">Insurance</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admindashboard/extra-services"
                      className={`${
                        location.pathname === "/admindashboard/extra-services"
                          ? "active"
                          : ""
                      }`}
                    >
                      <FaServicestack size={24} className="mb-1" />
                      <span>Extra Services</span>
                    </Link>
                  </li>
                  <li>
                    <a href="user-payment.html">
                      <img src="assets/img/icons/payment-icon.svg" alt="Icon" />
                      <span>Payments</span>
                    </a>
                  </li>
                  <li>
                    <a href="user-settings.html">
                      <img
                        src="assets/img/icons/settings-icon.svg"
                        alt="Icon"
                      />
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {location.pathname === "/admindashboard" ? (
        <div className="content dashboard-content">
          <div className="container">
            {/* Status List */}
            <ul className="status-lists">
              <li className="approve-item">
                <div className="status-info">
                  <span>
                    <i className="fa-solid fa-calendar-days" />
                  </span>
                  <p>Your Booking has been Approved by admin</p>
                </div>
                <a href="javascript:void(0);" className="view-detail">
                  View Details
                </a>
              </li>
              <li>
                <div className="status-info">
                  <span>
                    <i className="fa-solid fa-money-bill" />
                  </span>
                  <p>
                    Your Refund request has been approved by admin &amp; your
                    payment will be updated in 3 days.
                  </p>
                </div>
                <a href="javascript:void(0);" className="close-link">
                  <i className="feather-x" />
                </a>
              </li>
              <li className="bg-danger-light">
                <div className="status-info">
                  <span>
                    <i className="fa-solid fa-money-bill" />
                  </span>
                  <p>
                    Your Refund request has been rejected by admin{" "}
                    <a href="javascript:void(0);">View Reason</a>
                  </p>
                </div>
                <a href="javascript:void(0);" className="close-link">
                  <i className="feather-x" />
                </a>
              </li>
            </ul>
            {/* /Status List */}
            {/* Content Header */}
            <div className="content-header">
              <h4>Dashboard</h4>
            </div>
            {/* /Content Header */}
            {/* Dashboard */}
            <div className="row">
              {/* Widget Item */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="widget-box flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>My Bookings</h6>
                      <h3>450</h3>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <img src="assets/img/icons/book-icon.svg" alt="icon" />
                      </span>
                    </div>
                  </div>
                  <a href="user-bookings.html" className="view-link">
                    View all Bookings <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              {/* /Widget Item */}
              {/* Widget Item */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="widget-box flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>Wallet Balance</h6>
                      <h3>$24,665</h3>
                    </div>
                    <div className="widget-icon">
                      <span className="bg-warning">
                        <img
                          src="assets/img/icons/balance-icon.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                  </div>
                  <a href="user-wallet.html" className="view-link">
                    View Balance <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              {/* /Widget Item */}
              {/* Widget Item */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="widget-box flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>Total Transactions</h6>
                      <h3>$15,210</h3>
                    </div>
                    <div className="widget-icon">
                      <span className="bg-success">
                        <img
                          src="assets/img/icons/transaction-icon.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                  </div>
                  <a href="user-payment.html" className="view-link">
                    View all Transactions <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              {/* /Widget Item */}
              {/* Widget Item */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="widget-box flex-fill">
                  <div className="widget-header">
                    <div className="widget-content">
                      <h6>Wishlist Cars</h6>
                      <h3>24</h3>
                    </div>
                    <div className="widget-icon">
                      <span className="bg-danger">
                        <img src="assets/img/icons/cars-icon.svg" alt="icon" />
                      </span>
                    </div>
                  </div>
                  <a href="user-wishlist.html" className="view-link">
                    Go to Wishlist <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              {/* /Widget Item */}
            </div>
            <div className="row">
              {/* Last 5 Bookings */}
              <div className="col-lg-8 d-flex">
                <div className="card user-card flex-fill">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-sm-5">
                        <h5>Last 5 Bookings</h5>
                      </div>
                      <div className="col-sm-7 text-sm-end">
                        <div className="booking-select">
                          <select className="form-control select">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                          </select>
                          <a href="user-bookings.html" className="view-link">
                            View all Bookings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive dashboard-table dashboard-table-info">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-04.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Ferrari 458 MM Speciale
                                  </a>
                                  <p>Rent Type : Hourly</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>15 Sep 2023, 11:30 PM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>15 Sep 2023, 1:30 PM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$200</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-secondary">
                                Upcoming
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-05.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">Kia Soul 2016</a>
                                  <p>Rent Type : Hourly</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>15 Sep 2023, 09:00 AM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>15 Sep 2023, 1:30 PM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$300</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-secondary">
                                Upcoming
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-01.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Toyota Camry SE 350
                                  </a>
                                  <p>Rent Type : Day</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>18 Sep 2023, 09:00 AM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>18 Sep 2023, 05:00 PM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$600</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-warning">
                                Inprogress
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-03.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Audi A3 2019 new
                                  </a>
                                  <p>Rent Type : Weekly</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>10 Oct 2023, 10:30 AM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>16 Oct 2023, 10:30 AM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$800</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-05.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    2018 Chevrolet Camaro
                                  </a>
                                  <p>Rent Type : Hourly</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>14 Nov 2023, 02:00 PM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>14 Nov 2023, 04:00 PM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$240</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-success">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-lg flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-06.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Acura Sport Version
                                  </a>
                                  <p>Rent Type : Monthly</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Start date</h6>
                              <p>01 Dec 2023, 08:15 AM</p>
                            </td>
                            <td>
                              <h6>End Date</h6>
                              <p>01 Jan 2024, 08:15 AM</p>
                            </td>
                            <td>
                              <h6>Price</h6>
                              <h5 className="text-danger">$1000</h5>
                            </td>
                            <td>
                              <span className="badge badge-light-danger">
                                Cancelled
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Last 5 Bookings */}
              {/* Recent Transaction */}
              <div className="col-lg-4 d-flex">
                <div className="card user-card flex-fill">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-sm-6">
                        <h5>Recent Transaction</h5>
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        <div className="booking-select">
                          <select className="form-control select">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive dashboard-table dashboard-table-info">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="border-0">
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-md flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-04.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Ferrari 458 MM Speciale
                                  </a>
                                  <p>Rent Type : Hourly</p>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 text-end">
                              <span className="badge badge-light-secondary">
                                Upcoming
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} className="pt-0">
                              <div className="status-box">
                                <p>
                                  <span>Status : </span>On 15 Sep 2023, 11:30 PM
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-0">
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-md flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-07.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Chevrolet Pick Truck 3.5L
                                  </a>
                                  <p>Rent Type : Day</p>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 text-end">
                              <span className="badge badge-light-warning">
                                Refund started{" "}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} className="pt-0">
                              <div className="status-box">
                                <p>
                                  <span>Status : </span>Yet to recieve
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-0">
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-md flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-08.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Toyota Tacoma 4WD
                                  </a>
                                  <p>Rent Type : Weekly</p>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 text-end">
                              <span className="badge badge-light-danger">
                                Cancelled
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} className="pt-0">
                              <div className="status-box">
                                <p>
                                  <span>Status : </span>On 15 Sep 2023, 11:30 PM
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-0">
                              <div className="table-avatar">
                                <a
                                  href="user-bookings.html"
                                  className="avatar avatar-md flex-shrink-0"
                                >
                                  <img
                                    className="avatar-img"
                                    src="assets/img/cars/car-01.jpg"
                                    alt="Booking"
                                  />
                                </a>
                                <div className="table-head-name flex-grow-1">
                                  <a href="user-bookings.html">
                                    Ford Mustang 4.0 AT
                                  </a>
                                  <p>Rent Type : Monthly</p>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 text-end">
                              <span className="badge badge-light-success">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} className="pt-0 pb-0 border-0">
                              <div className="status-box">
                                <p>
                                  <span>Status : </span>On 20 Dec 2023, 05:20 PM
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Recent Transaction */}
            </div>
            {/* /Dashboard */}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default AdminDashboard;
