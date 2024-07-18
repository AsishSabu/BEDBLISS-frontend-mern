import { Outlet } from "react-router-dom"
import ProfileSidebar from "../../components/owner/ProfileSidebar"

const Profile = () => {
  return (
    <div className="flex flex-row gap-2">
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}

export default Profile
