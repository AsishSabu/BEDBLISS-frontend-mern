import React from "react";
import { FcBullish} from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import ClassNames from "classnames";
import { useAppDispatch } from "../../redux/store/store";
import { clearUser } from "../../redux/slices/userSlice";
import showToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
   showToast("Logout success","success");
    navigate("/admin/login");

  };

  return (
    <div className="bg-gray-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-lg  text-white">AdminPanel</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5 ">
        <div className="p-2">Dashboard</div>
        <div className="p-2 ">Users</div>
        <div className="p-2 ">Owners</div>
      </div>
      <div className="flex flex-col gap-3 py-3 pt-2 border-t border-neutral-700">
        <div>Help & Support</div>
        <div onClick={handleLogout} className= "items-center text-red-900 flex flex-row gap-2">
           <HiOutlineLogout fontSize={20}/>
          <div >Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
