import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? children : <Navigate to="/login" />;
};

export const PrivateReporterOrEditorRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo &&
    (userInfo.role === "reporter" || userInfo.role === "editor") ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};
