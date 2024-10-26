// src/services/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:2000/api" }); // you can adjust this url as required from where you are sending requests

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // sending jwt token from browser on every request 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const fetchEvents = () => API.get("/events");
export const createEvent = (eventData) => API.post("/events", eventData);
//all of our request exported from here;
