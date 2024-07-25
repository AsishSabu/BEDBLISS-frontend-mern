import { Link } from "react-router-dom"
import { Sidebar } from "flowbite-react"
import {
  // HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  // HiTable,
  HiUser,
  HiViewBoards,
  HiFlag,
} from "react-icons/hi"
import Hamburger from "hamburger-react"
import { FC } from "react";
interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar : FC<HeaderProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <Sidebar aria-label="Default sidebar example">
      <div className="flex ">
        <div className="block md:hidden">
          <Hamburger toggled={isOpen} size={20} toggle={toggleSidebar} />
        </div>
        <div className="flex justify-start pt-2">
          <Sidebar.Logo href="" img="" imgAlt="" className="">
            BEDBLISS ADMIN
          </Sidebar.Logo>
        </div>
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/admin">
            <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
          </Link>
          <Link to="/admin/users">
            <Sidebar.Item icon={HiViewBoards}>Users</Sidebar.Item>
          </Link>
          <Link to="/admin/owners">
            <Sidebar.Item icon={HiViewBoards}>Owners</Sidebar.Item>
          </Link>
          <Link to="/admin/hotels">
            <Sidebar.Item icon={HiUser}>Hotels</Sidebar.Item>
          </Link>
          <Link to="/admin/categories">
            <Sidebar.Item icon={HiInbox}>Categories</Sidebar.Item>
          </Link>
          <Link to="/admin/bookings">
            <Sidebar.Item icon={HiShoppingBag}>Bookings</Sidebar.Item>
          </Link>
          <Link to="/admin/reports">
            <Sidebar.Item icon={HiFlag}>Reports</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default AdminSidebar
