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
<div className="flex">
<div className="z-40 mt-20 h-screen w-2/12">
          <Sidebar />
        </div>

        <div className=" mt-20 w-10/12">
          <Outlet />
        </div>
</div>
     
      </div>
  );
};

export default Layout;
