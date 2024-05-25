import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/reducer/reducer"
import { useAppDispatch } from "../../../redux/store/store"
import { clearUser } from "../../../redux/slices/userSlice"
import { logo } from "../../../assets/images"
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react"

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(clearUser())
    navigate("/auth/login")
  }

  const UserDropdowns = [
    { label: "Personal Info", to: "/user/profile" },
    { label: "Account", to: "/user/account" },
    { label: "Docs", to: "/user/docs" },
    ...(user.isAuthenticated && user.role === "user"
      ? [{ label: "Profile", to: "/user/profile" }]
      : []),
  ]

  const OwnerDropdowns = [
    { label: "Personal Info", to: "/owner/profile" },
    { label: "Account", to: "/owner/account" },
    { label: "Listings", to: "/owner/hotels" },
    ...(user.isAuthenticated
      ? [{ label: "Profile", to: "/owner/profile" }]
      : []),
  ]

  const OwnerNavbarLinks = [
    { label: "Home", to: "/owner" },
    { label: "About", to: "/owner/about" },
    { label: "Listings", to: "/owner/hotels" },
  ]

  const UserNavbarLinks = [
    { label: "Home", to: "/user" },
    { label: "About", to: "/user/about" },
    { label: "Services", to: "/user/services" },
    { label: "Pricing", to: "/user/pricing" },
    { label: "Contact", to: "/user/contact" },
  ]

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-14" alt="BedBliss Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          BedBliss
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 justify-center">
        <button
          // onClick={handleLogOut}
          className="relative inline-flex mt-3 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          {user.role === "owner" ? (
            <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Switch To Traveling
            </span>
          ) : (
            <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Switch To Hosting
            </span>
          )}
        </button>
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
          {(user.role === "owner" ? OwnerDropdowns : UserDropdowns).map(
            (dropdownItem, index) => (
              <Link key={index} to={dropdownItem.to}>
                <DropdownItem>{dropdownItem.label}</DropdownItem>
              </Link>
            )
          )}
          <DropdownDivider />
          {user.isAuthenticated  ? (
            <DropdownItem onClick={handleLogOut}>Sign out</DropdownItem>
          ) : (
            <>
              <Link to="/auth/login">
                <DropdownItem>Sign In</DropdownItem>
              </Link>
              <Link to="/user/register">
                <DropdownItem>Sign Up</DropdownItem>
              </Link>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {(user.role === "owner" ? OwnerNavbarLinks : UserNavbarLinks).map(
          (navbar, index) => (
            <Link key={index} to={navbar.to}>
              <NavbarLink>{navbar.label}</NavbarLink>
            </Link>
          )
        )}
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
