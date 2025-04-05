import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {


  const location=useLocation();




  return (
    <div className="main-wrapper font-bold text-xl  font-sans">
      <header className="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link id="mobile_btn" to="/">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
              <Link to="/" className="navbar-brand logo">
                <img
                  src="assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link to="/" className="navbar-brand logo-small">
                <img
                  src="assets/img/logo-small.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="/" className="menu-logo">
                  <img
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="/">
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <li
                  className={`has-submenu ${
                    location.pathname === "/" ? "active" : ""
                  } `}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={`has-submenu ${
                    location.pathname === "/explore-cars" ? "active" : ""
                  } `}
                >
                  <Link to="/explore-cars">Explore Cars</Link>
                </li>
                <li className="has-submenu">
                  <a href="#">
                    User <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="user-dashboard.html">Dashboard</a>
                    </li>
                    <li>
                      <a href="user-bookings.html">My Bookings</a>
                    </li>
                    <li>
                      <a href="user-reviews.html">Reviews</a>
                    </li>
                    <li>
                      <a href="user-wishlist.html">Wishlist</a>
                    </li>
                    <li>
                      <a href="user-messages.html">Messages</a>
                    </li>
                    <li>
                      <a href="user-wallet.html">My Wallet</a>
                    </li>
                    <li>
                      <a href="user-payment.html">Payments</a>
                    </li>
                    <li>
                      <a href="user-settings.html">Settings</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">
                    Pages <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Authentication</a>
                      <ul className="submenu">
                        <li>
                          <a href="register.html">Signup</a>
                        </li>
                        <li>
                          <a href="login.html">Signin</a>
                        </li>
                        <li>
                          <a href="forgot-password.html">Forgot Password</a>
                        </li>
                        <li>
                          <a href="reset-password.html">Reset Password</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Booking</a>
                      <ul className="submenu">
                        <li>
                          <a href="booking-checkout.html">Booking Checkout</a>
                        </li>
                        <li>
                          <a href="booking.html">Booking</a>
                        </li>
                        <li>
                          <a href="invoice-details.html">Invoice Details</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Error Page</a>
                      <ul className="submenu">
                        <li>
                          <a href="error-404.html">404 Error</a>
                        </li>
                        <li>
                          <a href="error-500.html">500 Error</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="pricing.html">Pricing</a>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="gallery.html">Gallery</a>
                    </li>
                    <li>
                      <a href="our-team.html">Our Team</a>
                    </li>
                    <li>
                      <a href="testimonial.html">Testimonials</a>
                    </li>
                    <li>
                      <a href="terms-condition.html">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="privacy-policy.html">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="maintenance.html">Maintenance</a>
                    </li>
                    <li>
                      <a href="coming-soon.html">Coming Soon</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">
                    Blog <i className="fas fa-chevron-down" />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="blog-list.html">Blog List</a>
                    </li>
                    <li>
                      <a href="blog-grid.html">Blog Grid</a>
                    </li>
                    <li>
                      <a href="blog-details.html">Blog Details</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/contact-us">Contact</Link>
                </li>
                <li className="login-link">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="login-link">
                  <Link to="/login">Sign In</Link>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link className="nav-link header-login" to="/login">
                  <span>
                    <i className="fa-regular fa-user" />
                  </span>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link header-reg" to="/signup">
                  <span>
                    <i className="fa-solid fa-lock" />
                  </span>
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar
