import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/reducer/reducer"
import { useAppDispatch } from "../../../redux/store/store"
import { clearUser, setUser } from "../../../redux/slices/userSlice"
import { logo, noProfile } from "../../../assets/images"
import {
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
import NotificationComponent from "../../NotificationComponent"
import { useSocket } from "../../../redux/contexts/SocketContext"
import { useFetchData } from "../../../utils/fetcher"

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const socket = useSocket()
  const [newMessageCount, setNewMessageCount] = useState<number>(0)
  const { data, isError } = useFetchData<any>(`${USER_API}/user/${user.id}`)

  useEffect(() => {
    if (data && data.user) {
      const unreadCount = data.user.notifications.filter(
        (notification: any) => !notification.read
      ).length
      setNewMessageCount(unreadCount)
      const profilePic = data.user.profilePic || ""
      dispatch(
        setUser({
          ...user,
          image: profilePic,
        })
      )
    }
  }, [data])

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to socket")
      })

      socket.emit("addUser", user.id)

      socket.on("getUsers", users => {
        console.log(users)
      })

      return () => {
        socket.off("getUsers")
      }
    }
  }, [socket, user.id])

  useEffect(() => {
    const handleNotification = ({ count }: { count: number }) => {
      if (
        location.pathname !== "/owner/notifications" &&
        location.pathname !== "/user/notifications"
      ) {
        setNewMessageCount(prev => prev + count)
      }
    }

    socket?.on("notificationCount", handleNotification)

    return () => {
      socket?.off("notificationCount", handleNotification)
    }
  }, [socket, location.pathname])

  const handleLogOut = () => {
    dispatch(clearUser())
    navigate("/")
  }

  const UserDropdowns = [
    { label: "Personal Info", to: "/user/profile" },

    ...(user.isAuthenticated && user.role === "user"
      ? [{ label: "Saved", to: "/user/saved" }]
      : []),
  ]

  const OwnerDropdowns = [
    ...(user.isAuthenticated
      ? [{ label: "Profile", to: "/owner/profile" }]
      : []),
  ]

  const OwnerNavbarLinks = [
    { label: "Home", to: "/owner" },
    { label: "Bookings", to: "/owner/bookings" },
    { label: "My Listings", to: "/owner/hotels" },
    { label: "Add Offers", to: "/owner/addOffer" },
    { label: "Conversations", to: "/owner/chat" },
  ]

  const UserNavbarLinks = [
    { label: "Home", to: "/user" },
    { label: "About", to: "/user/about" },
    { label: "Contact", to: "/user/contact" },
  ]

  const handleClick = () => {
    setNewMessageCount(0)
    user.role === "owner"
      ? navigate("/owner/notifications")
      : navigate("/user/notifications")
  }

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
        <div onClick={handleClick}>
          <NotificationComponent count={newMessageCount} />
        </div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <>
              <div className="text-white rounded-full border border-gray-500 overflow-hidden">
                <img
                  src={
                    user.image !== ""&& user.isAuthenticated
                      ? user.image
                      : noProfile
                  }
                  alt="Author Name"
                  className="w-10 h-10 cursor-pointer"
                />
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
              <Link to="/auth/register">
                <DropdownItem>Sign Up</DropdownItem>
              </Link>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse className=" ">
        {(user.role === "owner" ? OwnerNavbarLinks : UserNavbarLinks).map(
          (navbar, index) => (
            <Link key={index} to={navbar.to}>
              <NavbarLink
                className="text-varWhite text-lg"
                active={location.pathname === navbar.to}
                as={"div"}
              >
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
