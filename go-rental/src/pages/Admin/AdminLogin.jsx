import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adminLogin } from "../../redux/adminSlice";

const AdminLogin = () => {

    const dispatch=useDispatch();
    const [input,setInput]=useState({
        email:'',
        password:''
    })


    const handleSubmit=(e)=>{
           e.preventDefault();
           dispatch(adminLogin(input))

           setInput({
            email:"",
            password:""
           })
    }

     

  return (
    <div className="login-wrapper">
      <div className="loginbox">
        <div className="login-auth">
          <div className="login-auth-wrap">
            <div className="sign-group">
              <Link to="/" className="btn sign-up">
                <span>
                  <i
                    className="fe feather-corner-down-left"
                    aria-hidden="true"
                  />
                </span>{" "}
                Back To Home
              </Link>
            </div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input type="email" value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})} className="form-control" placeholder />
              </div>
              <div className="input-block">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="pass-group">
                  <input
                    type="password"
                    className="form-control pass-input"
                    value={input.password}
                    onChange={(e)=>setInput({...input,password:e.target.value})}
                    placeholder
                  />
                  <span className="fas fa-eye-slash toggle-password" />
                </div>
              </div>
              <div className="input-block m-0">
                <label className="custom_check d-inline-flex">
                  <span>Remember me</span>
                  <input type="checkbox" name="remeber" />
                  <span className="checkmark" />
                </label>
              </div>
              <button
                className="btn btn-outline-light w-100 btn-size mt-1"
              >
                Sign In
              </button>
              <div className="login-or">
                <span className="or-line" />
                <span className="span-or-log">Or, log in with your email</span>
              </div>
              {/* Social Login */}
              <div className="social-login">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                >
                  <span>
                    <img
                      src="assets/img/icons/google.svg"
                      className="img-fluid"
                      alt="Google"
                    />
                  </span>
                  Log in with Google
                </a>
              </div>
              <div className="social-login">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                >
                  <span>
                    <img
                      src="assets/img/icons/facebook.svg"
                      className="img-fluid"
                      alt="Facebook"
                    />
                  </span>
                  Log in with Facebook
                </a>
              </div>
              {/* /Social Login */}
              <div className="text-center dont-have">
                Don't have an account yet? <Link to="/adminRegister">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="log-footer">
        <div className="container-fluid">
          {/* Copyright */}
          <div className="copyright">
            <div className="copyright-text">
              <p>© 2025 Dreams Rent. All Rights Reserved.</p>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
