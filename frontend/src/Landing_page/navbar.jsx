import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container p-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
            src="media/images/logo.png"
            style={{ width: "100px", height: "40px" }}
            alt="Logo"
          />
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 p-2">
            <li className="nav-item mx-4">
              <Link className="nav-link fw-medium text-dark" to="/find-medicines">
                <i className="fas fa-search me-1"></i>
                Find Medicines
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link fw-medium text-dark" to="/lab-tests">
                <i className="fas fa-vial me-1"></i>
                Lab Tests
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link fw-medium text-dark" to="/consult-doctors">
                <i className="fas fa-user-md me-1"></i>
                Consult Doctors
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link fw-medium text-dark" to="/medcoins">
              <img
            src="media/images/coin.svg"
            style={{ width: "25px", height: "20px" }}
            alt="Logo"
          />
                MedCoins
              </Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <Link 
              className="btn btn-outline-primary px-3 py-2 fw-medium" 
              to="/login"
            >
              <i className="fas fa-sign-in-alt me-1"></i>
              Login
            </Link>
            <Link 
              className="btn btn-primary px-3 py-2 fw-medium" 
              to="/signup"
            >
              <i className="fas fa-user-plus me-1"></i>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;