import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { refreshToken } from "../apis/users";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Notifications from "../components/Notifications";
import { IState, LocalData, NotificationTypes, Types } from "../types";

const Layout: React.FC<IProps> = () => {
  const { accessToken } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(LocalData.RefreshToken);
      if (token) {
        try {
          const response = await refreshToken(token);
          const { accessToken, refreshToken: newToken, user } = response.data;
          dispatch({
            type: Types.USER_LOGIN,
            payload: { accessToken, refreshToken: newToken, user }
          });
        } catch (error) {
          dispatch({
            type: Types.SET_NOTIFICATION,
            payload: { type: NotificationTypes.Info, message: "Session expired! Please login" }
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  }, [accessToken]);

  return (
    <main style={layoutStyles}>
      <NavBar />
      <Notifications />
      <div style={contentWrapperStyles}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

export interface IProps {}

const layoutStyles: React.CSSProperties = {
  backgroundColor: "#f1f3f6"
};
const contentWrapperStyles: React.CSSProperties = {
  minHeight: "calc(100vh - 358px)",
  padding: "0 16px",
};