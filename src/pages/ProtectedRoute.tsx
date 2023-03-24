import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import { IState, LocalData } from "../types";

const ProtectedRoute: React.FC<IProps> = () => {
  const { currentUser } = useSelector((state: IState) => state.users);
  const location = useLocation();
  const loggedInUserId = localStorage.getItem(LocalData.LoggedInUserId);


  if (!currentUser && !loggedInUserId) {
    return <Navigate to={routes.login.path} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

export interface IProps {}
