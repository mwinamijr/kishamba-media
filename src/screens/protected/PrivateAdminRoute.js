import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role === "admin" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateAdminRoute;
