import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeContext } from "../context/ThemeContext";

const Layout = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Navbar />
      {/* <main> */}
        <Outlet />
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default Layout;
