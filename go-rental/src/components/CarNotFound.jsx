import React from 'react'

const CarNotFound = () => {
  return (
    <div className="error-page ">
          <div className="main-wrapper">
            <div className="error-box ">
              <img
                src="/assets/img/carnotfound.png"
                className="img-fluid"
                alt="Car not found"
              />
              <h3>Oops! Car not found!</h3>
              <p>The car was not found on your Requested Location or Date or more...</p>
            </div>
          </div>
        </div>
  )
}

export default CarNotFound
