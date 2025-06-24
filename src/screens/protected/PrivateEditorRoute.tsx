import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust the import path as needed

interface PrivateEditorRouteProps {
  children: ReactElement;
}

const PrivateEditorRoute: React.FC<PrivateEditorRouteProps> = ({
  children,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo.role === "editor" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default PrivateEditorRoute;
