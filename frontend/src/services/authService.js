import { login, logout, getUserProfile } from './api';

// Authentication service with enhanced functionality
export class AuthService {
  
  // Login user
  static async loginUser(credentials) {
    try {
      const response = await login(credentials);
      
      if (response.token) {
        // Store authentication data
        this.setAuthData(response);
        return {
          success: true,
          user: response,
          message: 'Login successful'
        };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  }

  // Logout user
  static async logoutUser() {
    try {
      await logout();
      this.clearAuthData();
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      // Clear local data even if API call fails
      this.clearAuthData();
      console.error('Logout error:', error);
      throw new Error('Logout failed, but local session cleared');
    }
  }

  // Get current user profile
  static async getCurrentUserProfile() {
    try {
      const profile = await getUserProfile();
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Get current user data
  static getCurrentUser() {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token
  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Check if user has specific role
  static hasRole(role) {
    const user = this.getCurrentUser();
    if (!user || !user.roles) return false;
    return user.roles.includes(role.toUpperCase());
  }

  // Check if user is admin
  static isAdmin() {
    return this.hasRole('ADMIN');
  }

  // Check if user is pharmacist
  static isPharmacist() {
    return this.hasRole('PHARMACIST');
  }

  // Check if user is regular user
  static isUser() {
    return this.hasRole('USER');
  }

  // Get user's primary role
  static getUserRole() {
    const user = this.getCurrentUser();
    if (!user || !user.roles || user.roles.length === 0) return null;
    return user.roles[0]; // Return first role as primary
  }

  // Set authentication data in localStorage
  static setAuthData(authResponse) {
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify({
      email: authResponse.email,
      fullName: authResponse.fullName,
      roles: authResponse.roles
    }));
  }

  // Clear authentication data from localStorage
  static clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Redirect user based on their role
  static redirectBasedOnRole() {
    const user = this.getCurrentUser();
    if (!user || !user.roles) {
      return '/login';
    }

    if (user.roles.includes('ADMIN')) {
      return '/admin-dashboard';
    } else if (user.roles.includes('PHARMACIST')) {
      return '/pharmacist-dashboard';
    } else {
      return '/';
    }
  }

  // Check if token is expired (basic check)
  static isTokenExpired() {
    const token = this.getAuthToken();
    if (!token) return true;

    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Validate user session
  static validateSession() {
    if (!this.isAuthenticated()) {
      return { valid: false, reason: 'Not authenticated' };
    }

    if (this.isTokenExpired()) {
      this.clearAuthData();
      return { valid: false, reason: 'Token expired' };
    }

    return { valid: true };
  }

  // Get user display name
  static getUserDisplayName() {
    const user = this.getCurrentUser();
    return user ? user.fullName : 'Guest';
  }

  // Get user email
  static getUserEmail() {
    const user = this.getCurrentUser();
    return user ? user.email : '';
  }

  // Check if user can access a specific route
  static canAccessRoute(route) {
    const user = this.getCurrentUser();
    if (!user) return false;

    // Define route permissions
    const routePermissions = {
      '/admin-dashboard': ['ADMIN'],
      '/pharmacist-dashboard': ['PHARMACIST'],
      '/user-dashboard': ['USER'],
      '/profile': ['USER', 'ADMIN', 'PHARMACIST']
    };

    const requiredRoles = routePermissions[route];
    if (!requiredRoles) return true; // Public route

    return requiredRoles.some(role => user.roles.includes(role));
  }

  // Get user's reward coins
  static async getUserRewardCoins() {
    try {
      const profile = await this.getCurrentUserProfile();
      return profile.rewardCoins || 0;
    } catch (error) {
      console.error('Error fetching reward coins:', error);
      return 0;
    }
  }

  // Format user data for display
  static formatUserData(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      rewardCoins: user.rewardCoins || 0,
      enabled: user.enabled !== false
    };
  }
}

export default AuthService;
