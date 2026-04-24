import axios from "axios";

/*
  This creates a reusable Axios instance
  that always talks to backend (port 5000)
*/
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export default API;