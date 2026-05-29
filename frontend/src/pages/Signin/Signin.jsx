// frontend/src/pages/Signin/Signin.jsx
import "./Signin.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { signinUser, googleSignup } from "../../services/authApi";
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
      const response = await signinUser(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signin Failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await googleSignup(token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Google Signin Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="signin-container">
        {/* Mirroring landing page grid background schema */}
        <div className="grid-overlay" />
        
        <div className="signin-glow-left" />
        <div className="signin-glow-right" />

        <form className="signin-box" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="signin-subtitle">Enter your credentials to access your console</p>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              theme="filled_dark"
              shape="rectangular"
              width="100%"
              onError={() => {
                console.error("Google Login Failed");
              }}
            />
          </div>

          <p className="redirect-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signin;