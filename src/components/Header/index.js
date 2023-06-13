import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogoutButton = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <div className="header-container">
      <h1 className="header-title-log">Taj Hotel</h1>
      <ul className="header-nav-items-container">
        <Link to="/" className="default-link">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/rooms" className="default-link">
          <li className="nav-item">Rooms</li>
        </Link>
        <Link to="/bookings" className="default-link">
          <li className="nav-item">Bookings</li>
        </Link>
        <Link to="/login" className="default-link">
          <li className="nav-item nav-item-button" onClick={handleLogoutButton}>
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
