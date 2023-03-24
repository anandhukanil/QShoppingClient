import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserById } from "../apis/users";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Notifications from "../components/Notifications";
import { LocalData, Types } from "../types";

const Layout: React.FC<IProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localLoggedInUser = localStorage.getItem(LocalData.LoggedInUserId);
    if (localLoggedInUser) {
      const loggedInUser = getUserById(localLoggedInUser);
      console.log("🚀 ~ file: Layout.tsx:17 ~ useEffect ~ loggedInUser:", loggedInUser);
      if (!loggedInUser) return;
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: {...loggedInUser, hash: ""}
      });
    }
  }, []);

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