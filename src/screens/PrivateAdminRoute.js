import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateAdminRoute;
