import ProfileSidebar from "../../components/user/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/user/Navbar/Navbar";

const Profile = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex flex-row gap-2">
        <ProfileSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
