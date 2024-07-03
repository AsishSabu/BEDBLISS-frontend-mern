import { useAppDispatch } from "../../redux/store/store";
import { clearUser } from "../../redux/slices/userSlice";
import showToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  // HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  // HiTable,
  HiUser,
  HiViewBoards,
  HiOutlineLogout,
  HiFlag
} from "react-icons/hi";

const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logout success", "success");
    navigate("/admin/login");
  };

  return (
    <Sidebar aria-label="Default sidebar example">
            <Sidebar.Logo href="" img="" imgAlt="">
            BEDBLISS ADMIN
      </Sidebar.Logo>
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
          <Link to="/admin/bookings">
            <Sidebar.Item icon={HiShoppingBag}>Bookings</Sidebar.Item>
          </Link>
          <Link to="/admin/reports">
            <Sidebar.Item icon={HiFlag}>Reports</Sidebar.Item>
          </Link>
          <div onClick={handleLogout}>
            <Sidebar.Item icon={HiOutlineLogout}>Log Out</Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
