import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateReporterRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role === "reporter" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateReporterRoute;
