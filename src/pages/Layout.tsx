import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Notifications from "../components/Notifications";

const Layout: React.FC<IProps> = () => {
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
  padding: "0 16px",
  backgroundColor: "#f1f3f6"
};
const contentWrapperStyles: React.CSSProperties = {
  minHeight: "calc(100vh - 358px)"
};