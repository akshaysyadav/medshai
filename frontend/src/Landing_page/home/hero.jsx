import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { 
      value: "₹2,000", 
      label: "average monthly savings", 
      icon: "fas fa-rupee-sign", 
      color: "success" 
    },
    { 
      value: "50,000+", 
      label: "medicines available", 
      icon: "fas fa-pills", 
      color: "primary" 
    },
    { 
      value: "1,200+", 
      label: "certified doctors", 
      icon: "fas fa-user-md", 
      color: "info" 
    },
    { 
      value: "24/7", 
      label: "customer support", 
      icon: "fas fa-headset", 
      color: "warning" 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="hero-section position-relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="animated-bg"></div>

      {/* Wave Background */}
      <div className="wave-background">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="gentle-wave" d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(40, 167, 69, 0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(40, 167, 69, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(40, 167, 69, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255, 1)" />
          </g>
        </svg>
      </div>

      <div className="container">
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-8 mx-auto text-center">
            {/* Top Badge with Animation */}
            <div className="d-flex justify-content-center mb-4">
              <div className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill position-relative overflow-hidden">
                <div className="badge-shine"></div>
                <i className="fas fa-leaf me-2"></i>
                🌱 Eco-Friendly Healthcare Platform
                <i className="fas fa-heart text-danger ms-2 heartbeat"></i>
              </div>
            </div>

            {/* Main Heading with Typewriter Effect */}
            <h1 className="display-3 fw-bold text-dark mb-4 hero-title">
              Smart Healthcare{" "}
              <span className="text-success position-relative">
                Choices
                <svg className="underline-svg" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10,7 Q95,3 190,7" stroke="#28a745" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              That{" "}
              <span className="text-success position-relative gradient-text">
                Save Money
                <svg className="underline-svg" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10,7 Q95,3 190,7" stroke="#28a745" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              and the{" "}
              <span className="text-primary position-relative gradient-text-blue">
                Planet
                <svg className="underline-svg" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10,7 Q50,3 90,7" stroke="#0d6efd" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="lead text-muted mb-5 px-lg-5 fs-4">
              Whether you're looking to save money, get expert medical advice, or contribute to environmental sustainability, 
              <strong className="text-success"> MedSahi</strong> is your trusted healthcare companion
            </p>

            {/* Animated Stats Card */}
            <div className="stats-carousel bg-white rounded-4 shadow-lg p-4 mb-5 d-inline-block position-relative">
              <div className="d-flex align-items-center justify-content-center">
                <div className={`stats-icon bg-${stats[currentStat].color} bg-opacity-10 rounded-circle p-3 me-3`}>
                  <i className={`${stats[currentStat].icon} text-${stats[currentStat].color} fs-3`}></i>
                </div>
                <div className="text-start">
                  <div className={`h2 mb-1 text-${stats[currentStat].color} fw-bold counter-animation`}>
                    {stats[currentStat].value}
                  </div>
                  <div className="text-muted">{stats[currentStat].label}</div>
                </div>
              </div>
              {/* Progress indicators */}
              <div className="stats-indicators mt-3">
                {stats.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === currentStat ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
              <Link 
                to="/find-medicines" 
                className="btn btn-success btn-lg px-5 py-3 rounded-pill shadow-lg cta-primary"
              >
                <i className="fas fa-pills me-2"></i>
                Find Medicines
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
              <Link 
                to="/consult-doctors" 
                className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill cta-secondary"
              >
                <i className="fas fa-user-md me-2"></i>
                Consult Doctors
              </Link>
              <Link 
                to="/lab-tests" 
                className="btn btn-outline-info btn-lg px-5 py-3 rounded-pill cta-secondary"
              >
                <i className="fas fa-flask me-2"></i>
                Book Lab Tests
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators mb-5">
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <div className="trust-badge bg-white bg-opacity-80 rounded-3 p-3 border">
                    <i className="fas fa-shield-alt text-success fs-4 mb-2"></i>
                    <div className="small fw-bold">100% Secure</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="trust-badge bg-white bg-opacity-80 rounded-3 p-3 border">
                    <i className="fas fa-clock text-primary fs-4 mb-2"></i>
                    <div className="small fw-bold">24/7 Support</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="trust-badge bg-white bg-opacity-80 rounded-3 p-3 border">
                    <i className="fas fa-certificate text-warning fs-4 mb-2"></i>
                    <div className="small fw-bold">Licensed Doctors</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="trust-badge bg-white bg-opacity-80 rounded-3 p-3 border">
                    <i className="fas fa-leaf text-success fs-4 mb-2"></i>
                    <div className="small fw-bold">Eco-Friendly</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Journey Cards */}
            <div className="journey-section">
              <h3 className="text-dark mb-4 fw-bold">Choose Your Healthcare Journey</h3>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="journey-card bg-white rounded-4 p-4 h-100 shadow-lg border-0 position-relative overflow-hidden">
                    <div className="card-glow card-glow-green"></div>
                    <div className="journey-icon bg-success bg-opacity-10 rounded-circle p-4 mb-3 mx-auto" style={{width: 'fit-content'}}>
                      <i className="fas fa-wallet text-success fs-2"></i>
                    </div>
                    <h5 className="fw-bold mb-3 text-success">💰 Save Money</h5>
                    <p className="text-muted mb-4">Compare prices across multiple pharmacies and find the best deals on medicines and healthcare services. Save up to 70% on your medical expenses.</p>
                    <div className="features-list">
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Price comparison tool</small>
                      </div>
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Discount coupons</small>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Bulk order discounts</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="journey-card bg-white rounded-4 p-4 h-100 shadow-lg border-0 position-relative overflow-hidden">
                    <div className="card-glow card-glow-blue"></div>
                    <div className="journey-icon bg-primary bg-opacity-10 rounded-circle p-4 mb-3 mx-auto" style={{width: 'fit-content'}}>
                      <i className="fas fa-stethoscope text-primary fs-2"></i>
                    </div>
                    <h5 className="fw-bold mb-3 text-primary">👨‍⚕️ Expert Care</h5>
                    <p className="text-muted mb-4">Get professional medical advice from certified doctors online. Book consultations, get digital prescriptions, and access your medical records anytime.</p>
                    <div className="features-list">
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        <small>Video consultations</small>
                      </div>
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        <small>Digital prescriptions</small>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        <small>Follow-up care</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mx-auto">
                  <div className="journey-card bg-white rounded-4 p-4 h-100 shadow-lg border-0 position-relative overflow-hidden">
                    <div className="card-glow card-glow-green"></div>
                    <div className="journey-icon bg-success bg-opacity-10 rounded-circle p-4 mb-3 mx-auto" style={{width: 'fit-content'}}>
                      <i className="fas fa-leaf text-success fs-2"></i>
                    </div>
                    <h5 className="fw-bold mb-3 text-success">🌱 Eco-Friendly</h5>
                    <p className="text-muted mb-4">Reduce your carbon footprint with digital prescriptions, eco-conscious packaging, and sustainable healthcare choices that benefit both you and the planet.</p>
                    <div className="features-list">
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Digital prescriptions</small>
                      </div>
                      <div className="feature-item mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Eco-friendly packaging</small>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Carbon offset program</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="floating-elements">
        <div className="floating-pill pill-1">
          <i className="fas fa-pills text-success"></i>
        </div>
        <div className="floating-pill pill-2">
          <i className="fas fa-heartbeat text-danger"></i>
        </div>
        <div className="floating-pill pill-3">
          <i className="fas fa-leaf text-success"></i>
        </div>
        <div className="floating-pill pill-4">
          <i className="fas fa-user-md text-primary"></i>
        </div>
        <div className="floating-pill pill-5">
          <i className="fas fa-flask text-info"></i>
        </div>
      </div>
    </section>
  );
}

export default Hero;