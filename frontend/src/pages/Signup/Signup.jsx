// frontend/src/pages/Signup/Signup.jsx

import "./Signup.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  signupUser,
  googleSignup
} from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await signupUser(formData);

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);
      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );

    }
  };

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {

    try {

      const token =
        credentialResponse.credential;

      const response =
        await googleSignup(token);

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);
      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Google Signup Failed"
      );

    }
  };

  return (
    <>
    <Navbar />
    <div className="signup-container">

      <form
        className="signup-box"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Create Account
        </button>

        <div className="divider">
          OR
        </div>

        <div className="google-login">

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log(
                "Google Login Failed"
              );
            }}
          />

        </div>

      </form>
    </div>
  </>
  );
}

export default Signup;