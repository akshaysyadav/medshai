import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordStrength, setPasswordStrength] = useState({ level: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Handle password strength checking
    if (name === 'password') {
      checkPasswordStrength(value);
    }

    // Handle password confirmation matching
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (confirmPassword && password !== confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ level: '', text: '' });
      return;
    }

    let strength = 0;
    const checks = [
      password.length >= 8,
      /(?=.*[a-z])/.test(password),
      /(?=.*[A-Z])/.test(password),
      /(?=.*\d)/.test(password),
      /(?=.*[\W])/.test(password)
    ];

    strength = checks.filter(Boolean).length;

    if (strength < 3) {
      setPasswordStrength({ level: 'weak', text: 'Weak password' });
    } else if (strength < 4) {
      setPasswordStrength({ level: 'medium', text: 'Medium strength' });
    } else {
      setPasswordStrength({ level: 'strong', text: 'Strong password!' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.userType) newErrors.userType = 'Please select your role';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';

    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (formData.password) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    return newErrors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call - replace with actual API endpoint
      const response = await mockApiCall('signup', formData);

      if (response.success) {
        setMessage({ type: 'success', text: 'Account created successfully! Please check your email for verification.' });
        
        // Store pending user data
        localStorage.setItem('medshaiPendingUser', JSON.stringify(response.user));
        
        // Redirect to email verification
        setTimeout(() => {
          window.location.href = '/verify-email'; // Replace with your routing logic
        }, 2000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Signup failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    // Replace with your routing logic
    window.location.href = '/login';
  };

  const showTerms = () => {
    // Replace with your terms page logic
    alert('Terms of Service would be displayed here');
  };

  const showPrivacy = () => {
    // Replace with your privacy page logic
    alert('Privacy Policy would be displayed here');
  };

  // Mock API call - replace with actual implementation
  const mockApiCall = (endpoint, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful signup
        resolve({
          success: true,
          user: {
            id: Date.now(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            userType: data.userType,
            verified: false,
            createdAt: new Date().toISOString()
          }
        });
      }, 1500);
    });
  };

  const userTypeOptions = [
    { value: '', label: 'Select your role' },
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'admin', label: 'Healthcare Administrator' }
  ];

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTFwsC_EBZJ1-XJred62hZBW_RRC3KXQ1zA&s" 
                    style={{height:"60px"}}></img>
          <h1>MedSahi</h1>
          <p>Join Our Healthcare Platform</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter phone number"
              disabled={isLoading}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="userType">I am a</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className={errors.userType ? 'error' : ''}
              disabled={isLoading}
            >
              {userTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.userType && <span className="error-text">{errors.userType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {passwordStrength.text && (
              <div className={`password-strength strength-${passwordStrength.level}`}>
                {passwordStrength.text}
              </div>
            )}
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the 
              <button type="button" onClick={showTerms} className="link-btn">
                Terms of Service
              </button> 
              and 
              <button type="button" onClick={showPrivacy} className="link-btn">
                Privacy Policy
              </button>
            </label>
            {errors.terms && <span className="error-text">{errors.terms}</span>}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label htmlFor="newsletter" className="checkbox-label">
              I want to receive updates and health tips via email
            </label>
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="login-link">
          Already have an account?
          <button type="button" onClick={goToLogin} className="login-btn-link">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;