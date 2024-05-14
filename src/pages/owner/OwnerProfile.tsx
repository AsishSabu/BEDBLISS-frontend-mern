import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../components/owner/ProfileSidebar";
import Navbar from "../../components/owner/Navbar/Navbar";

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
