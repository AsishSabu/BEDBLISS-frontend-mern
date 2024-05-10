import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

const Layout = () => {
  return (
    // <div className='flex flex-row bg-green-200 h-screen w-screen overflow-hidden'>

    //     <div className='flex-1'>
    //     <Navbar/>
    //     <div>{<Outlet/>}</div>
    //     </div>
    // </div>
    <div className="flex flex-col overflow-hidden">
    <Navbar/>
    <div className="flex flex-row ">
      <Sidebar />
      <div>{ <Outlet />}</div>
     
    </div>
  </div>
  );
};

export default Layout;
