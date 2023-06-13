import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginApi } from "../../Routes";

const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const jwtToken = Cookies.get("token");
  if (jwtToken) {
    return <Navigate to="/" />;
  }

  const handleInputName = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("token", jwtToken, { expires: 30, path: "/" });
    navigate("/");
  };

  const handleLoginForm = async (event) => {
    event.preventDefault();
    try {
      const response = await loginApi(data);
      onSubmitSuccess(response.data.token);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="login-form-page">
      <div className="login-form-card-container">
        <img
          className="login-form-card-container-logo"
          src="https://res.cloudinary.com/dxnwg4dyz/image/upload/v1686639462/logo_txrrx8.png"
          alt="logo-light-theme"
        />
        <form className="login-form" onSubmit={handleLoginForm}>
          <div className="login-form-input-container">
            <label className="login-form-label">EMAIL</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInputName}
            />
          </div>
          <div className="login-form-input-container">
            <label className="login-form-label">PASSWORD</label>
            <input
              className="login-form-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputName}
            />
          </div>
          {/* <div className="show-password-container">
            <input type="checkbox" className="checkbox-input" />
            <p className="checkbox-title">Show Password</p>
          </div> */}
          <div className="login-form-button-container">
            <button type="submit" className="login-form-button">
              Login
            </button>
          </div>
          <div className="login-form-new-user-alert-container">
            <p className="new-user-alert">
              If you're new user <span className="new-user-span">Register</span>{" "}
            </p>
            <Link to="/register" className="router-link">
              <TbExternalLink className="rediect-to-register-form-icon" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
