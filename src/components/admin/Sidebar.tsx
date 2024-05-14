import { useAppDispatch } from "../../redux/store/store";
import { clearUser } from "../../redux/slices/userSlice";
import showToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import { TbBrandBooking } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logout success", "success");
    navigate("/admin/login");
  };

  return (
    <aside
      id="default-sidebar"
      className="relative w-full h-screen "
      aria-label="Sidebar"
      
    >
      <div className="h-full px-3 py-4 overflow-y-auto  bg-adminDash border-black border-x">
        <ul className="space-y-5 font-medium">
          <li>
            <Link
              to=""
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <TbBrandBooking fontSize={22} />{" "}
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center p-2 text-white  rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <CgProfile fontSize={22} />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap"> Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/owners"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <CgProfile fontSize={22} />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Owners</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <MdFavoriteBorder fontSize={22} />{" "}
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
            </Link>
          </li>
          <div onClick={handleLogout} className= "items-center text-red-900 flex flex-row gap-2">
           <HiOutlineLogout fontSize={20}/>
          <div >Logout</div>
        </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
