import React from "react";
import Navbar from "../../components/user/Navbar/Navbar";
import ProfileSidebar from "../../components/user/ProfileSidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-row gap-2">
        <ProfileSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
