import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import { IState, LocalData } from "../types";

const ProtectedRoute: React.FC<IProps> = () => {
  const { currentUser } = useSelector((state: IState) => state.users);
  const location = useLocation();
  const token = localStorage.getItem(LocalData.RefreshToken);

  if (!currentUser && !token) {
    return <Navigate to={routes.login.path} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

export interface IProps {}
