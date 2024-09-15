import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!Cookies.get("user"); // Check if 'user' cookie exists

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the children if authenticated
};

export default ProtectedRoute;
