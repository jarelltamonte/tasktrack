import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFeather, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./Navigation.css";
import Logo from "./Logo.png";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Hamburger icon (mobile only) */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`navigation-bar ${menuOpen ? "active" : ""}`}>
        <p className="logo-name">
          TaskTrack <FaFeather />
        </p>

        <div className="nav-item">
          <Link to="/home" className="links" onClick={() => setMenuOpen(false)}>
            <FaHome className="icon" />
            <span>Home</span>
          </Link>
        </div>

        <div className="nav-item">
          <Link
            to="/dashboard"
            className="links"
            onClick={() => setMenuOpen(false)}
          >
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;