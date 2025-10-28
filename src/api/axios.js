import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bisojob.gt.tc/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true,
});

export default api;
