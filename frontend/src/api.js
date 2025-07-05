import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials)
};

// Customers API
export const customersAPI = {
  getAll: (params = {}) => api.get('/customers', { params }),
  getStats: () => api.get('/customers/stats'),
  create: (customerData) => api.post('/customers', customerData),
  update: (id, customerData) => api.put(`/customers/${id}`, customerData),
  delete: (id) => api.delete(`/customers/${id}`),
  getById: (id) => api.get(`/customers/${id}`)
};

// Interactions API
export const interactionsAPI = {
  getByCustomer: (customerId) => api.get(`/interactions/customer/${customerId}`),
  create: (interactionData) => api.post('/interactions', interactionData)
};

// Demo data API
export const demoAPI = {
  seed: () => api.post('/demo/seed')
};

export default api; 