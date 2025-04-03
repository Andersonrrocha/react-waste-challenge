import axios, { AxiosInstance } from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 