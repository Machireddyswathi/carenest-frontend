// Determine API base URL automatically
const isProduction = import.meta.env.MODE === 'production';

let API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isProduction
    ? 'https://carenest-backend-1.onrender.com/api' // live backend
    : 'http://localhost:5000/api');                 // local backend

// Remove trailing slash if exists
export const API_URL = API_BASE_URL.replace(/\/$/, '');

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER_SENIOR: `${API_URL}/auth/register/senior`,
  REGISTER_CAREGIVER: `${API_URL}/auth/register/caregiver`,
  LOGIN: `${API_URL}/auth/login`,
  LOGOUT: `${API_URL}/auth/logout`,
  PROFILE: `${API_URL}/auth/profile`,

  // Caregivers
  CAREGIVERS: `${API_URL}/caregivers`,
  CAREGIVER_BY_ID: (id) => `${API_URL}/caregivers/${id}`,
  SEARCH_CAREGIVERS: `${API_URL}/caregivers/search`,

  // Seniors
  SENIORS: `${API_URL}/seniors`,
  SENIOR_BY_ID: (id) => `${API_URL}/seniors/${id}`,

  // Bookings
  BOOKINGS: `${API_URL}/bookings`,
  BOOKING_BY_ID: (id) => `${API_URL}/bookings/${id}`,
  MY_BOOKINGS: `${API_URL}/bookings/my-bookings`,
};

// Helper function to make API calls with auth token
export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_URL;
