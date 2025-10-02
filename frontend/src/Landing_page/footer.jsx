import React  from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import ScrollToTopLink from "../ScrollToTop";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  
  return (
    <footer className="healthcare-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8 mx-auto text-center">
              <div className="newsletter-content">
                <h4 className="newsletter-title">Stay Updated with Health Tips</h4>
                <p className="newsletter-subtitle">
                  Get weekly health insights, medical news, and exclusive offers directly in your inbox
                </p>
                <div className="newsletter-form">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope text-success"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email address"
                      aria-label="Email address"
                    />
                    <button className="btn btn-success newsletter-btn" type="button">
                      <i className="fas fa-paper-plane me-2"></i>
                      Subscribe
                    </button>
                  </div>
                </div>
                <small className="newsletter-disclaimer">
                  <i className="fas fa-lock me-1"></i>
                  We respect your privacy. Unsubscribe at any time.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-section">
                <div className="footer-brand mb-4">
                  <img 
                    src="media/images/logo.png" 
                    alt="MedSahi Logo" 
                    className="footer-logo"
                  />
                </div>
                <p className="footer-description">
                  Your trusted healthcare companion providing smart, eco-friendly medical solutions 
                  that save money and protect the planet. Quality healthcare accessible to everyone.
                </p>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-phone text-success"></i>
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope text-primary"></i>
                    <span>support@medsahi.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt text-info"></i>
                    <span>Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="footer-section">
                <h6 className="footer-title">Services</h6>
                <ul className="footer-links">
                  <li><ScrollToTopLink to="/find-medicines">Find Medicines</ScrollToTopLink></li>
                  <li><ScrollToTopLink to="/lab-tests">Lab Tests</ScrollToTopLink></li>
                  <li><ScrollToTopLink to="/consult-doctors">Online Consultation</ScrollToTopLink></li>
                  <li><ScrollToTopLink to="/medcoins">MedCoins Rewards</ScrollToTopLink></li>
                  <li><ScrollToTopLink to="/pharmacy">Online Pharmacy</ScrollToTopLink></li>
                  <li><ScrollToTopLink to="/health-packages">Health Packages</ScrollToTopLink></li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="footer-section">
                <h6 className="footer-title">Quick Links</h6>
                <ul className="footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/blog">Health Blog</Link></li>
                  <li><Link to="/doctors">Our Doctors</Link></li>
                  <li><Link to="/partner-with-us">Partner With Us</Link></li>
                  <li><Link to="/help">Help Center</Link></li>
                </ul>
              </div>
            </div>

            {/* Legal */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="footer-section">
                <h6 className="footer-title">Legal</h6>
                <ul className="footer-links">
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service">Terms of Service</Link></li>
                  <li><Link to="/refund-policy">Refund Policy</Link></li>
                  <li><Link to="/medical-disclaimer">Medical Disclaimer</Link></li>
                  <li><Link to="/accessibility">Accessibility</Link></li>
                  <li><Link to="/cookies">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* App Download & Social */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-section">
                <h6 className="footer-title">Get Our App</h6>
                <div className="app-downloads mb-4">
                  <a href="#" className="app-download-btn">
                    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                         alt="Download on App Store" className="app-badge" />
                  </a>
                  <a href="#" className="app-download-btn">
                    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                         alt="Get it on Google Play" className="app-badge" />
                  </a>
                </div>
                
                <h6 className="footer-title">Follow Us</h6>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="social-link youtube">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="social-link whatsapp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="trust-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="trust-badges">
                <div className="trust-item">
                  <i className="fas fa-shield-alt text-success"></i>
                  <span>SSL Secured</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-certificate text-primary"></i>
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-user-md text-info"></i>
                  <span>Licensed Healthcare Platform</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-leaf text-success"></i>
                  <span>Eco-Friendly Partner</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="emergency-contact">
                <span className="emergency-label">Medical Emergency:</span>
                <a href="tel:102" className="emergency-number">
                <i class="fa-solid fa-phone"></i>
                  Call 102
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {currentYear} MedSahi Healthcare Platform. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-meta">
                <span className="made-with">
                  Made with <i className="fas fa-heart text-danger heartbeat"></i> in India
                </span>
                <span className="divider">|</span>
                <span className="version">v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button className={`bact-to-top`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
}

export default Footer;