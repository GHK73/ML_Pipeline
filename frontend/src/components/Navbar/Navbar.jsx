// frontend/src/components/Navbar/Navbar.jsx
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authApi";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await getCurrentUser(token);
        setUser(response.data);
      } catch (error) {
        console.error("Auth verification failed:", error);
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
      <div className="navbar-container">
        
        {/* Left Section: Logo */}
        <Link to="/" className="logo">
          DeepShield AI
        </Link>

        {/* Center Section: Navigation Links */}
        <div className="nav-links">
          <a href="#features" className="nav-item">Features</a>
          <a href="#architecture" className="nav-item">Architecture</a>
          <a href="#benchmarks" className="nav-item">Benchmarks</a>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="nav-actions">
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" className="signin-btn">
                Sign in
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;