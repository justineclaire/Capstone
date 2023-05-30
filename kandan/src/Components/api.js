import axios from 'axios';

const API_BASE_URL = 'https://libretranslate.de';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy service URL

const api = axios.create({
  baseURL: CORS_PROXY_URL + API_BASE_URL,
});

export default api;
