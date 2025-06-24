import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust this path as needed

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo ? children : <Navigate to="/login" replace />;
};

export const PrivateReporterOrEditorRoute: React.FC<PrivateRouteProps> = ({
  children,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo &&
    (userInfo.role === "reporter" || userInfo.role === "editor") ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};
