// frontend/src/services/authApi.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 429) {
      alert("Too many requests. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export const signupUser = async (userData) =>
  API.post("/signup", userData);

export const googleSignup = async (token) =>
  API.post("/google", { token });

export const signinUser = async (userData) =>
  API.post("/signin", userData);

export const getCurrentUser = async (token) =>
  API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });