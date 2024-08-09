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
} from "flowbite-react"
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
  const { data } = useFetchData<any>(
    user.isAuthenticated ? `${USER_API}/user/${user.id}` : ""
  )

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
      ? [{ label: "Profile", to: "/owner/profile" },
        { label: "Conversations", to: "/owner/chat" },
        { label: "Reviews", to: "/owner/reviews" },
      ]
      : []),
  ]

  const OwnerNavbarLinks = [
    { label: "Home", to: "/owner" },
    { label: "Bookings", to: "/owner/bookings" },
    { label: "My Listings", to: "/owner/hotels" },
    { label: "Add Offers", to: "/owner/addOffer" },
  ]

  const UserMobileViewSidebar = [
    { label: "My Bookings", to: "/user/profile/Mybookings" },
    { label: "My Wallet", to: "/user/profile/MyWallet" },
  ]
  const OwnerMobileViewSidebar = [
    { label: "My Account", to: "/owner/profile/MyWallet" },
  ]
  const UserNavbarLinks = [
    { label: "Home", to: "/user" },
    { label: "About", to: "/user/aboutUs" },
    { label: "Contact", to: "/user/contactUs" },
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
        <div className="bg-Marine_blue inline-block mx-2 p-2">
          <img src={logo} className="h-10  w-fit" alt="BedBliss Logo" />
        </div>
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
                    user.isAuthenticated
                      ? user.image !== ""
                        ? user.image
                        : noProfile
                      : noProfile
                  }
                  alt="Author Name"
                  className="w-10 h-10 cursor-pointer"
                />
              </div>
              <div className="px-2 hidden md:block">
                {user && <div>{user.name}</div>}
              </div>
            </>
          }
        >
          <div className="md:hidden">
            {(user.role === "owner" ? OwnerNavbarLinks : UserNavbarLinks).map(
              (dropdownItem, index) => (
                <Link key={index} to={dropdownItem.to}>
                  <DropdownItem>{dropdownItem.label}</DropdownItem>
                </Link>
              )
            )}
            <DropdownDivider />
            {(user.role === "owner"
              ? OwnerMobileViewSidebar
              : UserMobileViewSidebar
            ).map((dropdownItem, index) => (
              <Link key={index} to={dropdownItem.to}>
                <DropdownItem>{dropdownItem.label}</DropdownItem>
              </Link>
            ))}
          </div>
          <DropdownDivider />
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
      </div>
      <div className="hidden"></div>
      <NavbarCollapse>
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
