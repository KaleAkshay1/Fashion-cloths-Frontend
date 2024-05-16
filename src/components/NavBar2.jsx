import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdSunny, MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { BsFillHandbagFill } from "react-icons/bs";
import ProfileDropdown from "./ProfileDropdown";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { foundUser, notFoundUser } from "../shope/user";
import { addDataInUserOrders } from "../shope/userOrders";
import { changeDropdownStateOfProfile, profileUnCheck } from "../shope/profile";
import { modeChange } from "../shope/mode";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const profileDropdown = useSelector((state) => state.profileDropdown);
  const mode = useSelector((store) => store.darkMode);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkUser = async () => {
    try {
      const data = await axios.get("/api/user/check-owner");
      dispatch(foundUser(data.data.data));
      const udate = await axios.get("/api/orders/access-user-order");
      if (udate.data.data) {
        dispatch(addDataInUserOrders(udate.data.data));
      }
    } catch (error) {
      dispatch(notFoundUser());
      console.log(error.massage);
    }
  };
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(profileUnCheck());
    }
    checkUser();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  function changeMode() {
    if (!mode) {
      document.getElementsByTagName("html")[0].className = "dark";
      dispatch(modeChange());
    } else {
      document.getElementsByTagName("html")[0].className = "light";
      dispatch(modeChange());
    }
  }

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
  };

  return (
    <header
      className={`sticky top-0 bg-white dark:bg-black dark:text-white z-10`}
    >
      <nav className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-1">
          <img className="h-10" src="/logo.png" alt="Logo" />
          <h1 className="text-lg font-semibold hidden sm:block">Myntra</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 font-semibold text-gray-800 text-sm dark:text-gray-200">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/men" className="nav-link">
            Men
          </NavLink>
          <NavLink to="/women" className="nav-link">
            Women
          </NavLink>
          <NavLink to="/kids" className="nav-link">
            Kids
          </NavLink>
        </div>
        {/* End Desktop Menu */}
        {/* serch box */}
        <div className="flex gap-2 items-center justify-center border px-3 rounded-full py-1 text-sm">
          <input
            placeholder="Serch here"
            className="bg-transparent border-none w-[50px] sm:w-40 outline-none"
            type="text"
          />
          <FaMagnifyingGlass className="cursor-pointer" />
        </div>
        {/* end serch box */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={changeMode} className="text-xl focus:outline-none">
            {darkMode ? <MdDarkMode /> : <MdSunny />}
          </button>

          {/* Notifications */}
          {Object.keys(user).length > 0 ? (
            <>
              <div className="relative hidden text-md sm:block">
                <FaHeart className="ml-2" />
                {/* Notification Badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                <span className="text-[10px] right-0 left-0 top-4 absolute">
                  Whishlist
                </span>
              </div>
              <div className="relative ml-3 hidden sm:block">
                <NavLink to="/cart">
                  <BsFillHandbagFill className="" />
                </NavLink>
                {/* Notification Badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                <span className="text-[10px] text-center absolute">Bag</span>
              </div>
              {/* Profile Section */}
              <button
                className="bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-800 dark:focus:ring-white dark:focus:ring-offset-gray-800 relative hidden sm:block"
                id="user-menu"
                aria-haspopup="true"
                onClick={() => dispatch(changeDropdownStateOfProfile())}
              >
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={
                    user?.profile_image
                      ? user.profile_image
                      : "https://tse2.mm.bing.net/th?id=OIP.rBroxJeka0Jj81uw9g2PwAHaHa&pid=Api&P=0&h=180"
                  }
                  alt="Profile"
                />
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="border hidden sm:block px-5 py-0 text-[16px] font-semibold shadow-lg rounded-full text-slate-900 active:bg-slate-200 border-black dark:text-slate-200 dark:border-white dark:active:bg-slate-700"
            >
              Log In
            </NavLink>
          )}

          {/* Hamburger menu icon */}
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* End Hamburger menu icon */}
        </div>
      </nav>
      {/* Sidebar for mobile */}
      <div
        className={`sm:hidden fixed top-16 right-0 bg-white dark:bg-black w-1/2 h-full shadow-md transition-all duration-300 ${
          menuOpen ? "" : "translate-x-full"
        }`}
      >
        <ul className="mt-4">
          <NavLink
            to="/"
            className="block py-2 px-4"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/men"
            className="block py-2 px-4"
            onClick={() => setMenuOpen(false)}
          >
            Men
          </NavLink>
          <NavLink
            to="/women"
            className="block py-2 px-4"
            onClick={() => setMenuOpen(false)}
          >
            Women
          </NavLink>
          <NavLink
            to="/kids"
            className="block py-2 px-4"
            onClick={() => setMenuOpen(false)}
          >
            Kids
          </NavLink>
        </ul>
      </div>
      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black opacity-25 z-10"
          onClick={toggleMenu}
        ></div>
      )}
      {/* End Sidebar Overlay */}
      {/* End Sidebar for mobile */}
      {profileDropdown && (
        <ProfileDropdown name={user.username} admin={user.admin} />
      )}
    </header>
  );
};

export default Navbar;
