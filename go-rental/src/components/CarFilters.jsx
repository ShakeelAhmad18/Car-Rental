import React from 'react'
import { carBrands, carCategories, carFuelTypes, carMileage, carModels, carSeats, carTransmission } from '../utils/Helper';

const CarFilters = ({setBrand,clearAllFilters,brand,fuelType ,setMileage,mileage,setTransmission,transmission, setCategory,category, setSeats,seats, setFuelType, setModel,model}) => {

    const handleBrandChange = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setBrand(value);
        }else{
          setBrand('');
        }

    }

    const handlefuelTypeChange = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setFuelType(value);
        }else{
          setFuelType('');
        }

      }

    const handleCategriesChange = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setCategory(value);
        }else{
          setCategory('');
        }
    }


    const handleModelChange = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setModel(value);
        }else{
          setModel('');
        }
    }

    const handleChangeMileage = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setMileage(value);
        }else{
          setMileage("");
        }
    }

    const handleSeatsChange = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setSeats(value);
        }else{
          setSeats('');
        }
    }
    

    const handleChangeTransmission = (event) => {
        const { checked,value } = event.target;

        if(checked){
            setTransmission(value);
        }else{
          setTransmission('');
        }
    }


    

   
  return (
    <div className="col-xl-3 col-lg-4 col-sm-12 col-12 theiaStickySidebar">
      <form action="#" autoComplete="off" className="sidebar-form">
        <div className="sidebar-heading">
          <h3>What Are You Looking For</h3>
        </div>
        <div className="product-search">
          <div className="form-custom">
            <input
              type="text"
              className="form-control"
              id="member_search1"
              placeholder
            />
            <span>
              <img src="assets/img/icons/search.svg" alt="img" />
            </span>
          </div>
        </div>
        <div className="accord-list">
          <div className="accordion" id="accordionMain1">
            <div className="card-header-new" id="headingOne">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Car Brand
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample1"
            >
              <div className="card-body-chat">
                <div className="row">
                  <div className="col-md-12">
                    <div id="checkBoxes1">
                      <div className="selectBox-cont">
                        {carBrands.map((data, i) => (
                          <label className="custom_check w-100" key={i}>
                            <input
                              type="checkbox"
                              name="username"
                              value={data}
                              checked={brand === data}
                              onClick={handleBrandChange}
                            />
                            <span className="checkmark" /> {data}
                          </label>
                        ))}
                        {/* /View All */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain2">
            <div className="card-header-new" id="headingTwo">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  Car Category
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample2"
            >
              <div className="card-body-chat">
                <div id="checkBoxes2">
                  <div className="selectBox-cont">
                    {carCategories?.map((data, i) => (
                      <label className="custom_check w-100" key={i}>
                        <input
                          type="checkbox"
                          name="username"
                          checked={category === data}
                          value={data}
                          onChange={handleCategriesChange}
                        />
                        <span className="checkmark" /> {data}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain3">
            <div className="card-header-new" id="headingYear">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseYear"
                  aria-expanded="true"
                  aria-controls="collapseYear"
                >
                  Year
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapseYear"
              className="collapse"
              aria-labelledby="headingYear"
              data-bs-parent="#accordionExample2"
            >
              <div className="card-body-chat">
                <div id="checkBoxes02">
                  <div className="selectBox-cont">
                    {carModels?.map((data, i) => (
                      <label className="custom_check w-100" key={i}>
                        <input
                          type="checkbox"
                          name="username"
                          value={data}
                          checked={model === data}
                          onChange={handleModelChange}
                        />
                        <span className="checkmark" /> {data}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain4">
            <div className="card-header-new" id="headingfuel">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsefuel"
                  aria-expanded="true"
                  aria-controls="collapsefuel"
                >
                  Fuel Type
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapsefuel"
              className="collapse"
              aria-labelledby="headingfuel"
              data-bs-parent="#accordionExample3"
            >
              <div className="card-body-chat">
                <div id="checkBoxes03">
                  <div className="selectBox-cont">
                    {carFuelTypes?.map((data, i) => (
                      <label className="custom_check w-100" key={i}>
                        <input
                          type="checkbox"
                          name="username"
                          value={data}
                          checked={fuelType === data}
                          onChange={handlefuelTypeChange}
                        />
                        <span className="checkmark" /> {data}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain5">
            <div className="card-header-new" id="headingmileage">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsemileage"
                  aria-expanded="true"
                  aria-controls="collapsemileage"
                >
                  Mileage
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapsemileage"
              className="collapse"
              aria-labelledby="headingmileage"
              data-bs-parent="#accordionExample2"
            >
              <div className="card-body-chat">
                <div id="checkBoxes03">
                  <div className="selectBox-cont">
                    {carMileage?.map((data, i) => (
                      <label className="custom_check w-100" key={i}>
                        <input
                          type="checkbox"
                          name="username"
                          value={data}
                          checked={mileage === data}
                          onChange={handleChangeMileage}
                        />
                        <span className="checkmark" /> {data}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain8">
            <div className="card-header-new" id="headingThree">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                >
                  Capacity
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample3"
            >
              <div className="card-body-chat">
                <div id="checkBoxes3">
                  <div className="selectBox-cont">
                    {carSeats?.map((data, i) => (
                      <label className="custom_check w-100" key={i}>
                        <input
                          type="checkbox"
                          value={data}
                          checked={seats === data}
                          onChange={handleSeatsChange}
                          name="bystatus"
                        />
                        <span className="checkmark" /> {data} Seater
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain4">
            <div className="card-header-new" id="headingtransmiss">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsetransmission"
                  aria-expanded="true"
                  aria-controls="collapsetransmission"
                >
                  Transmission
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapsetransmission"
              className="collapse"
              aria-labelledby="headingtransmiss"
              data-bs-parent="#accordionExample2"
            >
              <div className="card-body-chat">
                <div className="fuel-list">
                  <div id="checkBoxes3">
                    <div className="selectBox-cont">
                      {carTransmission?.map((data, i) => (
                        <label className="custom_check w-100" key={i}>
                          <input
                            type="checkbox"
                            value={data}
                            checked={transmission === data}
                            onChange={handleChangeTransmission}
                            name="bystatus"
                          />
                          <span className="checkmark" /> {data}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="accordionMain10">
            <div className="card-header-new" id="headingFive">
              <h6 className="filter-title">
                <a
                  href="javascript:void(0);"
                  className="w-100 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="true"
                  aria-controls="collapseFive"
                >
                  Rating
                  <span className="float-end">
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </a>
              </h6>
            </div>
            <div
              id="collapseFive"
              className="collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample5"
            >
              <div className="card-body-chat">
                <div id="checkBoxes4">
                  <div className="selectBox-cont">
                    <label className="custom_check w-100">
                      <input type="checkbox" name="category" />
                      <span className="checkmark" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <span className="rating-count">5.0</span>
                    </label>
                    <label className="custom_check w-100">
                      <input type="checkbox" name="category" />
                      <span className="checkmark" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span className="rating-count">4.0</span>
                    </label>
                    <label className="custom_check w-100">
                      <input type="checkbox" name="category" />
                      <span className="checkmark" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="rating-count">3.0</span>
                    </label>
                    <label className="custom_check w-100">
                      <input type="checkbox" name="category" />
                      <span className="checkmark" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="rating-count">2.0</span>
                    </label>
                    <label className="custom_check w-100">
                      <input type="checkbox" name="username" />
                      <span className="checkmark" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="rating-count">1.0</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="reset-filter text-red-600 d-inline-flex align-items-center justify-content-center btn w-100 btn-primary filter-btn"
          onClick={clearAllFilters}
        >
          Reset Filter
        </button>
      </form>
    </div>
  );
}

export default CarFilters
