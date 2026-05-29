// frontend/src/services/authApi.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const signupUser = async (userData) => {
  return API.post("/signup", userData);
};

export const googleSignup = async (token) => {
  return API.post("/google", {
    token
  });
};

export const signinUser = async (userData) => {

  return API.post(
    "/signin",
    userData
  );

};
export const getCurrentUser = async (token) => {
  return API.get(
    "/me",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

};