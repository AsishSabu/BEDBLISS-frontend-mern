import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const activeClassName = "selected navlink";
const activeStyleCallback = ({ isActive }: { isActive: Boolean }) =>
  isActive ? "text-blue-600" : "navlink";

const NavLinks = (props) => {
  return (
    <>
      <NavLink to="/" activeClassName={activeClassName} className={activeStyleCallback}>
        Home
      </NavLink>
      <NavLink to="/blog" activeClassName={activeClassName} className={activeStyleCallback}>
        Blog
      </NavLink>
      {props.data.isAuthenticated && props.data.role === "user" ? (
        <NavLink to="/user/profile" activeClassName={activeClassName} className={activeStyleCallback}>
          Profile
        </NavLink>
      ) : (
        ""
      )}
    </>
  );
};

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="flex flex-[1] items-center justify-end overflow-hidden">
        <div className="hidden justify-end md:flex">
          <NavLinks data={props.user} />
        </div>
        <div className="w-[75px]"></div>
        <div className="flex w-[75px] justify-end md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full items-end">
          <NavLinks data={props.user} />
        </div>
      )}
    </>
  );
};

export default Nav;
