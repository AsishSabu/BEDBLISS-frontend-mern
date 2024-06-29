import React from "react";
import Footer from "../components/user/Footer/Footer";
import Header from "../components/user/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-16 shadow-md z-50">
        <Header />
      </div>
      <div className="flex-1 pt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
