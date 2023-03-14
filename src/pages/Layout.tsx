import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout: React.FC<IProps> = () => {
  return (
    <main style={layoutStyles}>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

export interface IProps {}

const layoutStyles: React.CSSProperties = {
  padding: "0 16px",
};