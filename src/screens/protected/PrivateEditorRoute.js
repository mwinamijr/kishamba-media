import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateEditorRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role === "editor" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateEditorRoute;
