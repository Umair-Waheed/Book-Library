import axios from "axios";

const API_URL = "http://localhost:4000"; // your backend URL

export const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token automatically if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
