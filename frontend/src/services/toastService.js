import React from 'react';
import ReactDOM from 'react-dom/client';

// Toast service for managing notifications
class ToastService {
  constructor() {
    this.toasts = [];
    this.container = null;
    this.nextId = 1;
    this.init();
  }

  // Initialize toast container
  init() {
    if (typeof window === 'undefined') return;
    
    // Create container if it doesn't exist
    let existingContainer = document.getElementById('toast-container');
    if (!existingContainer) {
      existingContainer = document.createElement('div');
      existingContainer.id = 'toast-container';
      existingContainer.className = 'toast-container';
      document.body.appendChild(existingContainer);
    }
    
    this.container = existingContainer;
  }

  // Show a toast notification
  show(options) {
    if (!this.container) this.init();
    
    const id = this.nextId++;
    const toast = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration || 5000,
      onClose: (toastId) => this.remove(toastId)
    };

    this.toasts.push(toast);
    this.render();

    return id;
  }

  // Show success toast
  success(message, title = 'Success', duration = 5000) {
    return this.show({
      type: 'success',
      title,
      message,
      duration
    });
  }

  // Show error toast
  error(message, title = 'Error', duration = 7000) {
    return this.show({
      type: 'error',
      title,
      message,
      duration
    });
  }

  // Show warning toast
  warning(message, title = 'Warning', duration = 6000) {
    return this.show({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  // Show info toast
  info(message, title = 'Info', duration = 5000) {
    return this.show({
      type: 'info',
      title,
      message,
      duration
    });
  }

  // Remove a specific toast
  remove(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.render();
  }

  // Clear all toasts
  clear() {
    this.toasts = [];
    this.render();
  }

  // Render toasts to DOM
  render() {
    if (!this.container) return;

    // Clear existing content
    this.container.innerHTML = '';

    // Render each toast
    this.toasts.forEach(toast => {
      const toastElement = document.createElement('div');
      this.container.appendChild(toastElement);

      // Dynamically import and render Toast component
      import('../components/Toast').then(({ default: Toast }) => {
        const root = ReactDOM.createRoot(toastElement);
        root.render(React.createElement(Toast, toast));
      });
    });
  }

  // API response handlers
  handleApiSuccess(response, message = 'Operation completed successfully') {
    this.success(message);
  }

  handleApiError(error, defaultMessage = 'An error occurred') {
    const errorMessage = error?.message || error?.response?.data?.message || defaultMessage;
    this.error(errorMessage);
  }

  // Specific API handlers
  handleLoginSuccess() {
    this.success('Login successful!', 'Welcome back');
  }

  handleLoginError(error) {
    this.error('Invalid credentials. Please try again.', 'Login Failed');
  }

  handleSignupSuccess() {
    this.success('Account created successfully!', 'Welcome to MedSahi');
  }

  handleSignupError(error) {
    const message = error?.message || 'Failed to create account. Please try again.';
    this.error(message, 'Signup Failed');
  }

  handleLogoutSuccess() {
    this.info('You have been logged out', 'Goodbye');
  }

  handleMedicineSearchSuccess(count) {
    this.success(`Found ${count} medicine${count !== 1 ? 's' : ''}`, 'Search Complete');
  }

  handleMedicineSearchError() {
    this.error('Failed to search medicines. Please try again.', 'Search Failed');
  }

  handleOrderSuccess(orderId, totalAmount) {
    this.success(`Order #${orderId} placed successfully! Total: ₹${totalAmount}`, 'Order Confirmed');
  }

  handleOrderError(error) {
    this.error('Failed to place order. Please try again.', 'Order Failed');
  }

  handleProfileUpdateSuccess() {
    this.success('Profile updated successfully!', 'Profile Updated');
  }

  handleProfileUpdateError() {
    this.error('Failed to update profile. Please try again.', 'Update Failed');
  }

  handleCoinsAddedSuccess(amount) {
    this.success(`${amount} MedCoins added to your account!`, 'Coins Added');
  }

  handleCoinsAddedError() {
    this.error('Failed to add coins. Please try again.', 'Transaction Failed');
  }

  handleNetworkError() {
    this.error('Network error. Please check your connection.', 'Connection Failed');
  }

  handleUnauthorized() {
    this.warning('Your session has expired. Please login again.', 'Session Expired');
  }

  handleServerError() {
    this.error('Server error. Please try again later.', 'Server Error');
  }
}

// Create singleton instance
const toastService = new ToastService();

export default toastService;
