// frontend/src/pages/Signup/Signup.jsx
import "./Signup.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { signupUser, googleSignup } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup Failed");
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
      alert(error.response?.data?.message || "Google Signup Failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        {/* Background Grid Pattern & Ambient Glow Fields */}
        <div className="grid-overlay" />
        <div className="signup-glow-left" />
        <div className="signup-glow-right" />

        <form className="signup-box" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p className="signup-subtitle">Get started with your security infrastructure deployment</p>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              required
              onChange={handleChange}
            />
          </div>

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
            Create Account
          </button>

          <div className="divider">
            <span>or sign up with</span>
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
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;