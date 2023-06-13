import { TbExternalLink } from "react-icons/tb";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerApi } from "../../Routes";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const jwtToken = Cookies.get("token");
  if (jwtToken) {
    return <Navigate to="/" />;
  }

  const handleInputName = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleRegisterForm = async (event) => {
    event.preventDefault();
    try {
      await registerApi(userData);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      // alert(error.response.data);
    }
  };
  return (
    <div className="register-page">
      <div className="register-page-card-container">
        <img
          className="register-page-card-container-logo"
          src="https://res.cloudinary.com/dxnwg4dyz/image/upload/v1686639462/logo_txrrx8.png"
          alt="register-form-logo"
        />
        <form onSubmit={handleRegisterForm}>
          <div className="register-form-input-container">
            <label className="register-form-label">USERNAME</label>
            <input
              className="register-form-input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInputName}
            />
          </div>
          <div className="register-form-input-container">
            <label className="register-form-label">EMAIL</label>
            <input
              className="register-form-input"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInputName}
            />
          </div>
          <div className="register-form-input-container">
            <label className="register-form-label">PASSWORD</label>
            <input
              className="register-form-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputName}
            />
          </div>
          <div className="register-form-input-container">
            <label className="register-form-label">CONFIRM PASSWORD</label>
            <input
              className="register-form-input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInputName}
            />
          </div>
          <div className="register-form-button-container">
            <button type="submit" className="register-form-button">
              Register
            </button>
          </div>

          <div className="login-form-already-user-alert-container">
            <p className="already-user-alert">
              Already a user <span className="already-user-span">Login</span>{" "}
            </p>
            <Link to="/login" className="router-link">
              <TbExternalLink className="rediect-to-login-form-icon" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
