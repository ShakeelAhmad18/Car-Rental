import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {

    document.title = "Go Rental/Contact-us";

  return (
    <div>
      <Navbar />
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Contact us</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">Pages</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section">
        <div className="container">
          <div className="contact-info-area">
            <div className="row">
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
                data-aos-duration={1200}
                data-aos-delay="0.1"
              >
                <div className="single-contact-info flex-fill">
                  <span>
                    <i className="feather-phone-call" />
                  </span>
                  <h3>Phone Number</h3>
                  <a href="tel:(888)888-8888">(888) 888-8888</a>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
                data-aos-duration={1200}
                data-aos-delay="0.2"
              >
                <div className="single-contact-info flex-fill">
                  <span>
                    <i className="feather-mail" />
                  </span>
                  <h3>Email Address</h3>
                  <a href="/cdn-cgi/l/email-protection#056f6a6d6b76686c716d45607d64687569602b666a68">
                    <span
                      className="__cf_email__"
                      data-cfemail="cca6a3a4a2bfa1a5b8a48ca9b4ada1bca0a9e2afa3a1"
                    >
                      [email&nbsp;protected]
                    </span>
                  </a>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
                data-aos-duration={1200}
                data-aos-delay="0.3"
              >
                <div className="single-contact-info flex-fill">
                  <span>
                    <i className="feather-map-pin" />
                  </span>
                  <h3>Location</h3>
                  <a href="javascript:void(0);">367 Hillcrest Lane,USA</a>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-12 d-flex"
                data-aos="fade-down"
                data-aos-duration={1200}
                data-aos-delay="0.4"
              >
                <div className="single-contact-info flex-fill">
                  <span>
                    <i className="feather-clock" />
                  </span>
                  <h3>Opening Hours</h3>
                  <a href="javascript:void(0);">
                    Mon - Sat (10.00AM - 05.30PM)
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="form-info-area"
            data-aos="fade-down"
            data-aos-duration={1200}
            data-aos-delay="0.5"
          >
            <div className="row">
              <div className="col-lg-6 d-flex">
                <img
                  src="assets/img/contact-info.jpg"
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
              <div className="col-lg-6">
                <form action="#">
                  <div className="row">
                    <h1>Get in touch!</h1>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Phone number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block">
                        <label>
                          Comments <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows={4}
                          cols={50}
                          placeholder
                          defaultValue={"\t\t\t\t\t\t\t\t\t\t\t"}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn contact-btn">Send Enquiry</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
