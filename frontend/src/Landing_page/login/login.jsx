import React, { useState } from 'react';
import './login.css'; // Import the external CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add your login logic here
    alert(`Login attempt for: ${formData.email}. Remember me: ${formData.rememberMe}`);
  };

  return (
    // Use className "login-container" for background and centering
    <div className="login-container">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            {/* Use className "login-card" for styling */}
            <div className="login-card"> 
              
              {/* Header Section */}
              <div className="text-center medical-cross-wrapper">
                <div>
                  <div className="medical p-3">
                    <span className="cross-horizontal"></span>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTFwsC_EBZJ1-XJred62hZBW_RRC3KXQ1zA&s" 
                    style={{height:"60px"}}></img>
                    <span className="cross-vertical"></span>
                  </div>
                </div>
                <h2 className="brand-name">MedShai</h2>
                <p className="brand-tagline">Your Healthcare Companion</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} style={{marginBottom: '1.5rem'}}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label-custom">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    className="custom-input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label-custom">
                    🔒 Password
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="custom-input"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input custom-checkbox"
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe" style={{fontSize: '0.95rem', color: '#2c3e50', cursor: 'pointer'}}>
                      Remember me
                    </label>
                  </div>
                  
                  <a href="#" className="forgot-password-link">
                    Forgot your password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="custom-btn"
                >
                   Sign In
                </button>
              </form>

              {/* Sign Up Section */}
              <div style={{marginTop: '1.5rem'}}>
                <hr className="form-divider" />
                <p className="text-center signup-text">
                  Don't have an account? 
                  <a href="/signup" className="signup-link"> Sign up here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;