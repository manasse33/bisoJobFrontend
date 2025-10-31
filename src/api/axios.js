import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-production-23730.up.railway.app/api/v1', // ← ici
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // ok pour CORS si tu n'utilises pas les cookies
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // ou où vous stockez votre token
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
      console.error('Axios configuration error:', error.message);
    }
    console.error('Full error object:', error);
    return Promise.reject(error);
  }
);

export default api;
