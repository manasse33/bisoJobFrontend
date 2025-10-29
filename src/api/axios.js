import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bisojob.gt.tc/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // permet l'envoi des cookies
});

// Intercepteur pour log les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
