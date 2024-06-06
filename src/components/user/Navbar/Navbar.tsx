import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/reducer/reducer"
import { useAppDispatch } from "../../../redux/store/store"
import { clearUser, setUser } from "../../../redux/slices/userSlice"
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
import axios from "axios"
import { USER_API } from "../../../constants"

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRole = async () => {
    const role = user.role === "user" ? { role: "owner" } : { role: "user" }
    try {
      const response = await axios.post(USER_API + "/changeRole", role, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      const newUser = response.data.user
      dispatch(
        setUser({
          isAuthenticated: true,
          name: newUser.name,
          role: newUser.role,
          id: newUser._id,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

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
    <Navbar fluid rounded className="bg-Marine_blue text-varWhite">
      <NavbarBrand>
        <div className="bg-White inline-block mx-2 rounded-2xl">
          <img src={logo} className="h-14 rounded-2xl" alt="BedBliss Logo" />
        </div>

        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          BedBliss
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 justify-center">
        <button
          onClick={handleRole}
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
            <>
              <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 relative top-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="px-2">{user && <div>{user.name}</div>}</div>
            </>
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
          {user.isAuthenticated ? (
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
              <NavbarLink className="text-varWhite text-lg">
                {navbar.label}
              </NavbarLink>
            </Link>
          )
        )}
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
