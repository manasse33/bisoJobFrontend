import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', // ← CHANGEMENT ICI : URL relative !
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepteur pour log les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    console.error('=== AXIOS API ERROR ===');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
