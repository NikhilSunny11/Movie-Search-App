import axios from 'axios';

/**
 * API Client
 * 
 * In development, Vite proxies /api to the backend (port 5000).
 * In production, set VITE_API_BASE_URL to your deployed backend URL.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — unwrap the { success, data, error, meta } envelope
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
