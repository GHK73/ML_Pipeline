// frontend/src/components/Navbar/Navbar.jsx

import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {getCurrentUser} from "../../services/authApi";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await getCurrentUser(token);

        setUser(response.data);

      } catch (error) {

        console.log(error);

        localStorage.removeItem("token");

        localStorage.removeItem("user");

      } finally {

        setLoading(false);

      }

    };

    checkAuth();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/signin");

  };

  if (loading) {
    return null;
  }

  return (

    <nav className="navbar">

      <div className="logo">
        DeepShield AI
      </div>

      <div className="nav-links">

        <a href="#features">
          Features
        </a>

        <a href="#architecture">
          Architecture
        </a>

        <a href="#benchmarks">
          Benchmarks
        </a>

        {
          user ? (

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <>

              <Link
                to="/signin"
                className="signin-btn"
              >
                Signin
              </Link>

              <Link
                to="/signup"
                className="signup-btn"
              >
                Signup
              </Link>

            </>

          )
        }

      </div>

    </nav>

  );
}

export default Navbar;