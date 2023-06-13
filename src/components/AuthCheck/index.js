import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthCheck = ({ children }) => {
  const jwtToken = Cookies.get("token");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthCheck;
