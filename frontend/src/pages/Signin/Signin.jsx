// frontend/src/pages/Signin/Signin.jsx

import "./Signin.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  signinUser,
  googleSignup
} from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Signin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response =
        await signinUser(formData);

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

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signin Failed"
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
        "Google Signin Failed"
      );

    }

  };

  return (

    <>
    
      <Navbar />

      <div className="signin-container">

        <form
          className="signin-box"
          onSubmit={handleSubmit}
        >

          <h1>Welcome Back</h1>

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
            Signin
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

          <p className="redirect-text">

            Don't have an account?

            <Link to="/signup">
              Signup
            </Link>

          </p>

        </form>

      </div>

    </>

  );
}

export default Signin;