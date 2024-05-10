import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import { useAppDispatch } from "../../../redux/store/store";
import { clearUser } from "../../../redux/slices/userSlice";
import { Menu, X } from "lucide-react";
import { logo } from "../../../assets/images";


const Navbar:React.FC= () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearUser());
    navigate("/auth/login");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Account", to: "/user/account" },
    { label: "Docs", to: "/user/docs" },
    ...(user.isAuthenticated && user.role === "user"
      ? [{ label: "Profile", to: "/user/profile" }]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full ps-8 py-2 text-white bg-varBlue rounded-none shadow-md h-max bg-opacity-100 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900 flex-wrap">
        
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 text-2xl font font-head leading-relaxed flex gap-2"
        >
           <img src={logo} className="h-8" alt="BEDBLISS Logo" />
          BedBliss
        </Link>
   
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navLinks.map((navLink, index) => (
                <li key={index} className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <Link to={navLink.to} className="flex items-center">
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-x-1">
            {user.isAuthenticated && user.role === "user" ? (
              <button
                onClick={handleLogOut}
                className="hidden px-4 py-2 font-sans text-xs bg-white font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                <span>SIGN OUT</span>
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="hidden px-4 py-2 font-sans text-xs bg-white font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                >
                  <span>SIGN IN</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="hidden px-4 py-2 font-sans text-xs bg-white font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                >
                  <span>SIGN UP</span>
                </Link>
              </>
            )}
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            onClick={toggleNavbar}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed right-0 h-auto w-auto bg-inherit shadow-lg z-20 flex flex-col items-end p-4 md:hidden">
          {navLinks.map((navLink, index) => (
            <Link key={index} to={navLink.to} className="my-2">
              {navLink.label}
            </Link>
          ))}
          {user.isAuthenticated && user.role === "user" ? (
            <>
              <button onClick={handleLogOut} className="my-2">
                SIGN OUT
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="my-2">
                Sign In
              </Link>
              <Link to="/user/profile" className="my-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
