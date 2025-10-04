import axios from 'axios';
import toastService from './toastService';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and success
api.interceptors.response.use(
  (response) => {
    // Show success toast for certain operations
    const url = response.config.url;
    const method = response.config.method;
    
    // Don't show toasts for GET requests (except specific ones)
    if (method === 'get' && !url.includes('/auth/login') && !url.includes('/auth/register')) {
      return response;
    }
    
    // Show success toasts for specific operations
    if (url.includes('/auth/register')) {
      toastService.handleSignupSuccess();
    } else if (url.includes('/auth/login')) {
      toastService.handleLoginSuccess();
    } else if (url.includes('/auth/logout')) {
      toastService.handleLogoutSuccess();
    } else if (url.includes('/user/add-coins')) {
      const coins = response.config.params?.coins || response.data?.total || 0;
      toastService.handleCoinsAddedSuccess(coins);
    } else if (url.includes('/order/place')) {
      const orderId = response.data?.orderId;
      const totalAmount = response.data?.totalAmount;
      if (orderId && totalAmount) {
        toastService.handleOrderSuccess(orderId, totalAmount);
      }
    }
    
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toastService.handleUnauthorized();
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      toastService.handleServerError();
    } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      toastService.handleNetworkError();
    } else {
      // Show specific error messages based on endpoint
      const url = error.config?.url || '';
      
      if (url.includes('/auth/login')) {
        toastService.handleLoginError(error);
      } else if (url.includes('/auth/register')) {
        toastService.handleSignupError(error);
      } else if (url.includes('/medicine/search')) {
        toastService.handleMedicineSearchError();
      } else if (url.includes('/order/place')) {
        toastService.handleOrderError(error);
      } else {
        toastService.handleApiError(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// ==================== AUTH ENDPOINTS ====================

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register/user', {
      fullName: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admin Registration
export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('/auth/register/admin', {
      fullName: adminData.name,
      email: adminData.email,
      phone: adminData.phone,
      password: adminData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Pharmacist Registration
export const registerPharmacist = async (pharmacistData) => {
  try {
    const response = await api.post('/auth/register/pharmacist', {
      fullName: pharmacistData.name,
      email: pharmacistData.email,
      phone: pharmacistData.phone,
      licenseNumber: pharmacistData.licenseNumber,
      password: pharmacistData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login (Universal for all user types)
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        fullName: response.data.fullName,
        roles: response.data.roles
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return response.data;
  } catch (error) {
    // Clear local storage even if API call fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    throw error.response?.data || error.message;
  }
};

// ==================== USER ENDPOINTS ====================

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add Med Coins
export const addMedCoins = async (coins) => {
  try {
    const response = await api.post(`/user/add-coins?coins=${coins}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Lab Test Options
export const getLabTestOptions = async () => {
  try {
    const response = await api.get('/user/labtest');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Doctor Consultation Options
export const getDoctorConsultation = async () => {
  try {
    const response = await api.get('/user/consult');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Subscription Details
export const getSubscriptionDetails = async () => {
  try {
    const response = await api.get('/user/subscription');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== MEDICINE ENDPOINTS ====================

// Search Branded Medicine
export const searchBrandedMedicine = async (keyword) => {
  try {
    const response = await api.get(`/medicine/search/branded?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Search Generic Medicine
export const searchGenericMedicine = async (keyword) => {
  try {
    const response = await api.get(`/medicine/search/generic?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== ORDER ENDPOINTS ====================

// Place Order
export const placeOrder = async (medicineIds) => {
  try {
    const response = await api.post('/order/place', medicineIds);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Order History
export const getOrderHistory = async () => {
  try {
    const response = await api.get('/order/place');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== ADMIN ENDPOINTS ====================

// Get All Users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Toggle User Status
export const toggleUserStatus = async (userId) => {
  try {
    const response = await api.put(`/admin/toggle/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete User
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== PHARMACIST ENDPOINTS ====================

// Add Branded Medicine
export const addBrandedMedicine = async (medicineData) => {
  try {
    const response = await api.post('/pharmacist/add/branded', medicineData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add Generic Medicine
export const addGenericMedicine = async (brandedMedicineId, genericData) => {
  try {
    const response = await api.post(`/pharmacist/add/generic/${brandedMedicineId}`, genericData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update Medicine
export const updateMedicine = async (medicineId, medicineData) => {
  try {
    const response = await api.put(`/pharmacist/update/${medicineId}`, medicineData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete Medicine
export const deleteMedicine = async (medicineId) => {
  try {
    const response = await api.delete(`/pharmacist/delete/${medicineId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get My Medicines
export const getMyMedicines = async () => {
  try {
    const response = await api.get('/pharmacist/my-medicines');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Top Sold Analytics
export const getTopSoldAnalytics = async () => {
  try {
    const response = await api.get('/pharmacist/analytics/top-sold');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Top Waste Analytics
export const getTopWasteAnalytics = async () => {
  try {
    const response = await api.get('/pharmacist/analytics/top-waste');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
