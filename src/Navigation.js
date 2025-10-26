import { Link } from "react-router-dom";
import { FaHome, FaFeather} from "react-icons/fa"; // Font Awesome Home
import { MdDashboard } from "react-icons/md";

import "./Navigation.css";
import Logo from "./Logo.png";

const Navigation = () => {
  return (
    <div className="navigation-bar">
        <p className="logo-name">TaskTrack <FaFeather/></p>
      {/* <img src={Logo} alt="Logo" className="logo-image" /> */}
      <div className="nav-item">
        <Link to="/home" className="links">
          <FaHome className="icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/dashboard" className="links">
          <MdDashboard className="icon" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
