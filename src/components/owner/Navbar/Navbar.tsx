import React, { useEffect, useState } from "react"
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
import { useSocket } from "../../../redux/contexts/SocketContext"


const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const socket=useSocket()
  const [newMessageCount, setNewMessageCount] = useState<number>(0)

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
  }, [socket])


  useEffect(() => {
    const handleNotification = ({
      count,
    }: {
      count: number
    }) => {
        setNewMessageCount(prev => prev + count)
    }
    socket?.on("msgCount", handleNotification)
    return () => {
      socket?.off("msgCount", handleNotification)
    }
  }, [])


  const handleLogOut = () => {
    dispatch(clearUser())
    navigate("/auth/login")
  }
  const Dropdowns = [
    { label: "Personal Info", to: "/owner/profile" },
    { label: "Account", to: "/owner/account" },
    { label: "Listings", to: "/owner/hotels" },
    ...(user.isAuthenticated ? [{ label: "Profile", to: "/owner/profile" }] : [])
  ];

  
  const NavbarLinks = [
   
    { label: " Home", to: "/owner" },
    { label: "About", to: "/owner/about" },
    { label: "Listings", to: "/owner/hotels" },

  ]

  return (
    
    <Navbar fluid rounded shadow-lg>
      <NavbarBrand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-14 " alt="BedBliss Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          BedBliss
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 justify-center">
        <button
          // onClick={handleLogOut}
          className="relative inline-flex mt-3  justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Switch To Travelling
          </span>
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
          {Dropdowns.map(Dropdown => (
            <Link to={Dropdown.to}>
              <DropdownItem>{Dropdown.label}</DropdownItem>
            </Link>
          ))}
          <DropdownDivider />
          {user.isAuthenticated && user.role === "user" ? (
            <DropdownItem onClick={handleLogOut}>Sign out</DropdownItem>
          ) : (
            <>
              <Link to="/auth/login">
                <DropdownItem>Sign In</DropdownItem>
              </Link>
              <Link to="/user/profile">
                <DropdownItem>Sign out</DropdownItem>
              </Link>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {NavbarLinks.map((navbar)=>(
          <Link to={navbar.to}>
          <NavbarLink >{navbar.label}</NavbarLink></Link>
        ))}
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header
