import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
             
             
             
const Footer = () => {

    useEffect(() => {
      AOS.init();
    }, []);

  return (
   
  <footer className="footer flex">	
    {/* Footer Top */}	
    <div className="footer-top aos" data-aos="fade-down">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                {/* Footer Widget */}
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">About Company</h5>
                  <ul>
                    <li>
                      <a href="about.html">Our Company</a>
                    </li>
                    <li>
                      <a href="">Shop Toyota</a>
                    </li>
                    <li>
                      <a href="">Dreamsrentals USA</a>
                    </li>
                    <li>
                      <a href="">Dreamsrentals Worldwide</a>
                    </li>
                    <li>
                      <a href="">Dreamsrental Category</a>
                    </li>										
                  </ul>
                </div>
                {/* /Footer Widget */}
              </div>
              <div className="col-lg-4 col-md-6">
                {/* Footer Widget */}
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">Vehicles Type</h5>
                  <ul>
                    <li>
                      <a href="">All  Vehicles</a>
                    </li>
                    <li>
                      <a href="">SUVs</a>
                    </li>
                    <li>
                      <a href="">Trucks</a>
                    </li>
                    <li>
                      <a href="">Cars</a>
                    </li>
                    <li>
                      <a href="">Crossovers</a>
                    </li>								
                  </ul>
                </div>
                {/* /Footer Widget */}
              </div>
              <div className="col-lg-4 col-md-6">
                {/* Footer Widget */}
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">Quick links</h5>
                  <ul>
                    <li>
                      <a href="">My Account</a>
                    </li>
                    <li>
                      <a href="">Champaigns</a>
                    </li>
                    <li>
                      <a href="">Dreamsrental Dealers</a>
                    </li>
                    <li>
                      <a href="">Deals and Incentive</a>
                    </li>
                    <li>
                      <a href="">Financial Services</a>
                    </li>								
                  </ul>
                </div>
                {/* /Footer Widget */}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="footer-contact footer-widget">
              <h5 className="footer-title">Contact Info</h5>
              <div className="footer-contact-info">									
                <div className="footer-address">											
                  <span><i className="feather-phone-call" /></span>
                  <div className="addr-info">
                    <a href="tel:+1(888)7601940">+ 1 (888) 760 1940</a>
                  </div>
                </div>
                <div className="footer-address">
                  <span><i className="feather-mail" /></span>
                  <div className="addr-info">
                    <a href="/cdn-cgi/l/email-protection#1f6c6a6f6f706d6b5f7a677e726f737a317c7072">example@gmail.com</a>
                  </div>
                </div>
                <div className="update-form">
                  <form action="#">
                    <span><i className="feather-mail" /></span> 
                    <input type="email" className="form-control" placeholder="Enter You Email Here" />
                    <button type="submit" className="btn btn-subscribe"><span><i className="feather-send" /></span></button>
                  </form>
                </div>
              </div>								
              <div className="footer-social-widget">
                <ul className="nav-social">
                  <li>
                    <a href=""><i className="fa-brands fa-facebook-f fa-facebook fi-icon" /></a>
                  </li>
                  <li>
                    <a href=""><i className="fab fa-instagram fi-icon" /></a>
                  </li>
                  <li>
                    <a href=""><i className="fab fa-behance fi-icon" /></a>
                  </li>
                  <li>
                    <a href=""><i className="fab fa-twitter fi-icon" /> </a>
                  </li>
                  <li>
                    <a href=""><i className="fab fa-linkedin fi-icon" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>					
      </div>
    </div>
    {/* /Footer Top */}
    {/* Footer Bottom */}
    <div className="footer-bottom">
      <div className="container">
        {/* Copyright */}
        <div className="copyright">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="copyright-text">
                <p>© 2024 Dreams Rent. All Rights Reserved.</p>
              </div>
            </div>
            <div className="col-md-6">
              {/* Copyright Menu */}
              <div className="copyright-menu">
                <div className="vistors-details">
                  <ul className="d-flex">											
                    <li><a href=""><img className="img-fluid" src="assets/img/icons/paypal.svg" alt="Paypal" /></a></li>											
                    <li><a href=""><img className="img-fluid" src="assets/img/icons/visa.svg" alt="Visa" /></a></li>
                    <li><a href=""><img className="img-fluid" src="assets/img/icons/master.svg" alt="Master" /></a></li>
                    <li><a href=""><img className="img-fluid" src="assets/img/icons/applegpay.svg" alt="applegpay" /></a></li>
                  </ul>										   								
                </div>
              </div>
              {/* /Copyright Menu */}
            </div>
          </div>
        </div>
        {/* /Copyright */}
      </div>
    </div>
    {/* /Footer Bottom */}			
  </footer>

  )
}

export default Footer
