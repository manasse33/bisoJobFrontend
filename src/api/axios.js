import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bisojob.gt.tc/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // envoi des cookies
});

// Intercepteur pour log les erreurs de façon détaillée
api.interceptors.response.use(
  response => response,
  error => {
    console.error('=== AXIOS API ERROR ===');

    if (error.response) {
      // La requête a été envoyée et le serveur a répondu avec un code d'erreur
      console.error('Status:', error.response.status);
      console.error('StatusText:', error.response.statusText);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // La requête a été envoyée mais aucune réponse reçue
      console.error('No response received:', error.request);
    } else {
      // Erreur sur la configuration de la requête
      console.error('Axios configuration error:', error.message);
    }

    console.error('Full error object:', error);

    return Promise.reject(error);
  }
);

export default api;
