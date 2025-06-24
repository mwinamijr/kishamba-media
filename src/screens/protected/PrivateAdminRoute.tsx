import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust path as needed

interface PrivateAdminRouteProps {
  children: ReactElement;
}

const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({ children }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo.role === "admin" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateAdminRoute;
