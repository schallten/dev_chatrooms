/**
 * API Service
 * Handles all HTTP requests to the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Add token to request headers
const getAuthHeader = () => {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      let message = `HTTP ${response.status}`;
      if (error.detail) {
        if (typeof error.detail === 'string') {
          message = error.detail;
        } else {
          // sometimes detail is an array of validation errors
          message = JSON.stringify(error.detail);
        }
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error.message || error);
    throw error;
  }
};

// Auth endpoints
export const authAPI = {
  register: (name, email, password, workspaceId) =>
    fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        workspace_id: workspaceId || 1,
      }),
    }),

  login: (email, password) =>
    fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => fetchAPI('/api/auth/me'),
};

// Room endpoints
export const roomAPI = {
  listRooms: () => fetchAPI('/api/rooms'),

  getRoomMessages: (roomId) =>
    fetchAPI(`/api/rooms/${roomId}/messages`),
};

// Export token management
export const tokenAPI = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => getToken(),
  clearToken: () => localStorage.removeItem('token'),
  hasToken: () => !!getToken(),
};
