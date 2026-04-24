import axios from 'axios';

const API = axios.create({
  baseURL:         process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
  timeout:         30000, // 30s timeout — handles Render free tier cold start
});

export default API;
