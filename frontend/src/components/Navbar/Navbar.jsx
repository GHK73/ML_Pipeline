import "./Navbar.css";

import { Link } from "react-router-dom";

function Navbar() {

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

        <Link
          to="/signup"
          className="signup-btn"
        >
          Signup
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;