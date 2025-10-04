import React from 'react';
import toastService from '../services/toastService';

const ToastDemo = () => {
  const showSuccessToast = () => {
    toastService.success('This is a success message!', 'Success');
  };

  const showErrorToast = () => {
    toastService.error('This is an error message!', 'Error');
  };

  const showWarningToast = () => {
    toastService.warning('This is a warning message!', 'Warning');
  };

  const showInfoToast = () => {
    toastService.info('This is an info message!', 'Info');
  };

  const showApiSuccessToast = () => {
    toastService.handleApiSuccess({}, 'API call completed successfully!');
  };

  const showApiErrorToast = () => {
    toastService.handleApiError({ message: 'API call failed!' }, 'API Error');
  };

  const showLoginSuccessToast = () => {
    toastService.handleLoginSuccess();
  };

  const showLoginErrorToast = () => {
    toastService.handleLoginError({ message: 'Invalid credentials' });
  };

  const showSignupSuccessToast = () => {
    toastService.handleSignupSuccess();
  };

  const showSignupErrorToast = () => {
    toastService.handleSignupError({ message: 'Email already exists' });
  };

  const showOrderSuccessToast = () => {
    toastService.handleOrderSuccess(12345, 150.50);
  };

  const showOrderErrorToast = () => {
    toastService.handleOrderError({ message: 'Payment failed' });
  };

  const showCoinsAddedToast = () => {
    toastService.handleCoinsAddedSuccess(100);
  };

  const showNetworkErrorToast = () => {
    toastService.handleNetworkError();
  };

  const showUnauthorizedToast = () => {
    toastService.handleUnauthorized();
  };

  const showServerErrorToast = () => {
    toastService.handleServerError();
  };

  const clearAllToasts = () => {
    toastService.clear();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Toast Notification Demo</h2>
      <p>Click the buttons below to see different types of toast notifications:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        <button onClick={showSuccessToast} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Success Toast
        </button>
        
        <button onClick={showErrorToast} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Error Toast
        </button>
        
        <button onClick={showWarningToast} style={{ padding: '10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
          Warning Toast
        </button>
        
        <button onClick={showInfoToast} style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
          Info Toast
        </button>
      </div>

      <h3>API-specific Toasts:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        <button onClick={showApiSuccessToast} style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
          API Success
        </button>
        
        <button onClick={showApiErrorToast} style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
          API Error
        </button>
        
        <button onClick={showLoginSuccessToast} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login Success
        </button>
        
        <button onClick={showLoginErrorToast} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login Error
        </button>
        
        <button onClick={showSignupSuccessToast} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Signup Success
        </button>
        
        <button onClick={showSignupErrorToast} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Signup Error
        </button>
        
        <button onClick={showOrderSuccessToast} style={{ padding: '10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px' }}>
          Order Success
        </button>
        
        <button onClick={showOrderErrorToast} style={{ padding: '10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px' }}>
          Order Error
        </button>
        
        <button onClick={showCoinsAddedToast} style={{ padding: '10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
          Coins Added
        </button>
        
        <button onClick={showNetworkErrorToast} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Network Error
        </button>
        
        <button onClick={showUnauthorizedToast} style={{ padding: '10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}>
          Unauthorized
        </button>
        
        <button onClick={showServerErrorToast} style={{ padding: '10px', backgroundColor: '#e83e8c', color: 'white', border: 'none', borderRadius: '4px' }}>
          Server Error
        </button>
      </div>

      <button onClick={clearAllToasts} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', marginTop: '20px' }}>
        Clear All Toasts
      </button>
    </div>
  );
};

export default ToastDemo;
