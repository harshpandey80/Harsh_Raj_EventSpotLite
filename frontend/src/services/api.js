// src/services/api.js
import axios from "axios";

const API = axios.create({ baseURL: "https://harsh-raj-eventspotlite-1.onrender.com/api" }); 

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const fetchEvents = () => API.get("/events");
export const createEvent = (eventData) => API.post("/events", eventData);

