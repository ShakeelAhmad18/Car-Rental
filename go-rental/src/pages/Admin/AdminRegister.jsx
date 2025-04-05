import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { adminRegister } from "../../redux/adminSlice";

const AdminRegister = () => {

    const dispatch=useDispatch();
    const [input,setInput]=useState({
      name:'',
      email:'',
      password:''
    });


    const handleSubmit=async (e)=>{
      e.preventDefault();
      dispatch(adminRegister(input))
    }
    

  return (
    <div>
      <div className="login-wrapper bg-amber-200">
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
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" value={input.name} onChange={(e)=>setInput({...input,name:e.target.value})} className="form-control" placeholder />
                </div>
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
                      value={input.password}
                      onChange={(e)=>setInput({...input,password:e.target.value})}
                      className="form-control pass-input"
                      placeholder
                    />
                    <span className="fas fa-eye-slash toggle-password" />
                  </div>
                </div>
                <button
                  className="btn btn-outline-light w-100 btn-size mt-1"
                >
                  Sign Up
                </button>
                <div className="login-or">
                  <span className="or-line" />
                  <span className="span-or">
                    Or, Create an account with your email
                  </span>
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
                  Already have an Account? <Link to="/adminlogin">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="log-footer">
        <div className="container-fluid">
          {/* Copyright */}
          <div className="copyright">
            <div className="copyright-text">
              <p>© 2024 Dreams Rent. All Rights Reserved.</p>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </footer>
    </div>
  );
};

export default AdminRegister;
