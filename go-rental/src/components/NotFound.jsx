import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="main-wrapper">
        <div className="error-box">
          <img
            src="assets/img/404.png"
            className="img-fluid"
            alt="Page not found"
          />
          <h3>Oops! Page not found!</h3>
          <p>The page you requested was not found.</p>
          <div className="back-button">
            <Link to="/" className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
