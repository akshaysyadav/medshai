import React from "react";
import { Link } from "react-router-dom";

const primaryGreen = '#2d7d32';
const secondaryGreen = '#4caf50';
const hoverDarkGreen = '#1b5e20';

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
            alt="Logo"/>
                MedCoins
              </Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
    {/* 1. OUTLINE (Login) BUTTON */}
    <Link 
        className="btn px-3 py-2 fw-medium" 
        to="/login"
        style={{
            color: primaryGreen, 
            borderColor: primaryGreen, 
            backgroundColor: 'transparent',
            border: '1px solid',
            transition: 'all 0.2s ease', // Essential for smooth transition
        }}
        // Hover: Invert the colors for a professional click feel
        onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.backgroundColor = primaryGreen;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = primaryGreen;
            e.currentTarget.style.backgroundColor = 'transparent';
        }}
        // Active/Click: Slightly darken on press
        onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = hoverDarkGreen;
        }}
        onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = primaryGreen; // Revert to hover color
        }}
    >
        <i className="fas fa-sign-in-alt me-1"></i>
        Login
    </Link>

    {/* 2. FILLED (Sign Up) BUTTON */}
    <Link 
        className="btn px-3 py-2 fw-medium" 
        to="/signup"
        style={{
            color: '#ffffff',
            background: `linear-gradient(135deg, ${primaryGreen}, ${secondaryGreen})`, 
            border: 'none',
            boxShadow: '0 4px 10px rgba(45, 125, 50, 0.3)', // Base shadow
            transition: 'all 0.2s ease', // Essential for smooth transition
        }}
        // Hover: Darken the gradient and slightly lift
        onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${hoverDarkGreen}, ${primaryGreen})`;
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(45, 125, 50, 0.45)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${primaryGreen}, ${secondaryGreen})`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(45, 125, 50, 0.3)';
        }}
        // Active/Click: Bring it back down for a press effect
        onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 5px rgba(45, 125, 50, 0.5)';
        }}
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