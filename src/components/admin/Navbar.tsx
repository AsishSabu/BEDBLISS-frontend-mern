import { Avatar, Dropdown, Navbar } from "flowbite-react"
import { useAppDispatch } from "../../redux/store/store"
import { useNavigate } from "react-router-dom"
import { clearUser } from "../../redux/slices/userSlice"
import showToast from "../../utils/toast"
import Hamburger from "hamburger-react"
import { FC } from "react";
interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ isOpen, toggleSidebar }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(clearUser())
    showToast("Logout success", "success")
    navigate("/admin/login")
  }
  return (
    <Navbar fluid rounded>
      <div className="block md:hidden">
        <Hamburger toggled={isOpen} toggle={toggleSidebar} />
      </div>
      <Navbar.Brand href="/admin">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Admin</span>
            <span className="block truncate text-sm font-medium">
              admin@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

    </Navbar>
  )
}
export default Header
