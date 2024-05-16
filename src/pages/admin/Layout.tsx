import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="fixed left-0 w-64  bg-white shadow-md z-40 mt-20">
        <Sidebar />
      </div>

      <div className="flex flex-grow overflow-y-auto ml-64 mt-20  p-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
