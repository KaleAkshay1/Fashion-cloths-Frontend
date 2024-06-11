import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import { MdSunny, MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { BsFillHandbagFill } from "react-icons/bs";
import ProfileDropdown from "./ProfileDropdown";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { modeChange } from "../shope/mode";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const mode = useSelector((store) => store.darkMode);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const whishlist = useSelector((state) => state.whishlist);
  const bag = useSelector((state) => state.bag);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setProfile(false);
    }
  }, [user]);

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

  return (
    <>
      <header
        className={`sticky top-0 bg-white dark:bg-black dark:text-white z-50`}
      >
        <nav className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-1">
            <img className="h-10" src="/logo.png" alt="Logo" />
            <h1 className="text-lg font-semibold hidden sm:block">Myntra</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 font-semibold text-gray-800 text-sm dark:text-gray-200">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? " border-purple-800"
                    : "border-white dark:border-black"
                } border-b-2 pb-2 `
              }
            >
              Home
            </NavLink>
            <NavLink
              end
              to="/men"
              className={({ isActive }) =>
                `${
                  isActive
                    ? " border-purple-800"
                    : "border-white dark:border-black"
                } border-b-2 pb-2 `
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/women"
              end
              className={({ isActive }) =>
                `${
                  isActive
                    ? " border-purple-800"
                    : "border-white dark:border-black"
                } border-b-2 pb-2 `
              }
            >
              Women
            </NavLink>
            <NavLink
              end
              to="/both"
              className={({ isActive }) =>
                `${
                  isActive
                    ? " border-purple-800"
                    : "border-white dark:border-black"
                } border-b-2 pb-2 `
              }
            >
              Both
            </NavLink>
          </div>
          {/* End Desktop Menu */}
          {/* serch box */}
          <div className="flex gap-2 items-center justify-center border px-3 rounded-full py-1 text-sm">
            <input
              placeholder="Serch here"
              className="bg-transparent border-none w-[50px] sm:w-40   outline-none"
              type="text"
            />
            <FaMagnifyingGlass className="cursor-pointer" />
          </div>
          {/* end serch box */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button onClick={changeMode} className="text-xl focus:outline-none">
              {!mode ? <MdDarkMode /> : <MdSunny />}
            </button>

            {/* Notifications */}
            {Object.keys(user).length > 0 ? (
              <>
                <div className="relative cursor-pointer hidden text-md sm:block">
                  <NavLink end to={"/wishlist"}>
                    <FaHeart className="ml-2" />
                    {/* Notification Badge */}
                    <span className="absolute  -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {whishlist.length > 9 ? (
                        <span>
                          9<sup>+</sup>
                        </span>
                      ) : (
                        whishlist.length
                      )}
                    </span>
                    <span className="text-[10px] right-0 left-0 top-4 absolute">
                      Whishlist
                    </span>
                  </NavLink>
                </div>
                <div className="relative cursor-pointer ml-3 hidden sm:block">
                  <NavLink end to="/cart">
                    <BsFillHandbagFill className="" />

                    {/* Notification Badge */}
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {bag.length > 9 ? (
                        <span>
                          9<sup>+</sup>
                        </span>
                      ) : (
                        bag.length
                      )}
                    </span>
                    <span className="text-[10px] text-center absolute">
                      Bag
                    </span>
                  </NavLink>
                </div>
                {/* Profile Section */}
                <button
                  className="bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-800 dark:focus:ring-white dark:focus:ring-offset-gray-800 relative hidden sm:block"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setProfile((pre) => !pre)}
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
                end
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
              end
              className="block py-2 px-4"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              end
              to="/men"
              className="block py-2 px-4"
              onClick={() => setMenuOpen(false)}
            >
              Men
            </NavLink>
            <NavLink
              end
              to="/women"
              className="block py-2 px-4"
              onClick={() => setMenuOpen(false)}
            >
              Women
            </NavLink>
            <NavLink
              end
              to="/both"
              className="block py-2 px-4"
              onClick={() => setMenuOpen(false)}
            >
              Both
            </NavLink>
            {Object.keys(user).length > 0 ? (
              <NavLink
                end
                to="/"
                className="block py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                Home1
              </NavLink>
            ) : (
              <NavLink
                end
                to="/login"
                className="block py-2 px-4 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </NavLink>
            )}
          </ul>
        </div>
        {/* Sidebar Overlay */}
        {menuOpen && (
          <div
            className="fixed top-16 left-0 w-[50%] bottom-0 bg-black opacity-25 z-10"
            onClick={toggleMenu}
          ></div>
        )}
        {/* End Sidebar Overlay */}
        {/* End Sidebar for mobile */}
        {profile && (
          <ProfileDropdown
            name={user.username}
            onMouseLeave={() => setProfile(false)}
            admin={user.admin}
            closeProfile={() => setProfile(false)}
          />
        )}
        <hr className="mx-8" />
      </header>
    </>
  );
};

export default Navbar;
