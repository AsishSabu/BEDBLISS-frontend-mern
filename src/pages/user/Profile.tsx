import ProfileSidebar from "../../components/user/ProfileSidebar"
import { Outlet } from "react-router-dom"


const Profile = () => {
  return (
    <div className="flex flex-row gap-2">
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}

export default Profile
