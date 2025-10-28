
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bisojob.gt.tc/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // ⚡ Ajout pour envoyer les cookies si tu utilises l'auth
  withCredentials: true,
});

// ⚡ Ajouter un interceptor pour logger toutes les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    console.log('--- ERREUR AXIOS ---');
    console.log(error);  // Affiche tout : status, message, headers
    alert(JSON.stringify(error, null, 2)); // Affiche sur l'écran du téléphone
    return Promise.reject(error);
  }
);

export default api;
