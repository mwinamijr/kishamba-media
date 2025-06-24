import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust path as needed

interface PrivateReporterRouteProps {
  children: ReactElement;
}

const PrivateReporterRoute: React.FC<PrivateReporterRouteProps> = ({
  children,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo.role === "reporter" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateReporterRoute;
