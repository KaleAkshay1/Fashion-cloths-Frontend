import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { modeChange } from "../shope/mode";
import Cookies from "js-cookie";
import { foundUser, notFoundUser } from "../shope/user";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";
import { changeDropdownStateOfProfile, profileUnCheck } from "../shope/profile";
import { newProducts } from "../shope/product";

function NavBar() {
  const profileDropdown = useSelector((state) => state.profileDropdown);
  const mode = useSelector((store) => store.darkMode);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkUser = async () => {
    try {
      const pData = await axios("/api/product/fetch-product-data");
      dispatch(newProducts(pData?.data?.data));
      const data = await axios.get("/api/user/check-owner");
      dispatch(foundUser(data.data.data));
    } catch (error) {
      dispatch(notFoundUser());
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(profileUnCheck());
    }
    checkUser();
  }, []);

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
      <header className="dark:bg-black z-10 sticky top-0 bg-white dark:text-white">
        <nav className="px-14 flex justify-between align-middle">
          <div className="flex items-center gap-2 justify-center">
            <img className="h-[70%]" src="/logo.png" alt="" />
            <h1 className="text-2xl text-slate-800 font-semibold dark:text-slate-200">
              Myntra
            </h1>
          </div>
          <ul className="flex gap-10 items-center font-semibold text-slate-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `dark:text-slate-200 ${
                  isActive &&
                  "border-pink-900 border-b-4 p-2 dark:border-pink-500 "
                }`
              }
            >
              <li className="cursor-pointer">Home</li>
            </NavLink>
            <NavLink
              to="/men"
              className={({ isActive }) =>
                `dark:border-pink-500 dark:text-slate-200 ${
                  isActive && "border-pink-900 border-b-4 p-2"
                }`
              }
            >
              <li className="cursor-pointer">Men</li>
            </NavLink>
            <NavLink
              to="/women"
              className={({ isActive }) =>
                ` dark:text-slate-200 ${
                  isActive &&
                  "border-pink-900 border-b-4 p-2 dark:border-pink-500"
                }`
              }
            >
              <li className="cursor-pointer">Women</li>
            </NavLink>
            <NavLink
              to="/kids"
              className={({ isActive }) =>
                ` dark:text-slate-200 ${
                  isActive &&
                  "border-pink-900 border-b-4 p-2 dark:border-pink-500"
                }`
              }
            >
              <li className="cursor-pointer">Kids</li>
            </NavLink>
          </ul>
          <div className="flex items-center gap-6 text-2xl">
            {Object.keys(user).length > 0 && (
              <div className="relative">
                <NavLink to="/cart">
                  <BsCart4 />
                </NavLink>
                <p className="absolute bg-red-500 px-1 py-0 rounded-[50%] text-sm bottom-4 left-4 text-white">
                  0
                </p>
              </div>
            )}

            {mode ? (
              <MdSunny
                className="cursor-pointer"
                onClick={() => {
                  changeMode();
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  changeMode();
                }}
              />
            )}
            {!(Object.keys(user).length > 0) ? (
              <NavLink
                to="/login"
                className="border px-5 py-0 text-[16px] font-semibold shadow-lg rounded-full text-slate-900 active:bg-slate-200 border-black dark:text-slate-200 dark:border-white dark:active:bg-slate-700"
              >
                Log In
              </NavLink>
            ) : (
              <>
                <button
                  className="bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-800 dark:focus:ring-white dark:focus:ring-offset-gray-800"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user?.profile_image
                        ? user.profile_image
                        : "https://tse2.mm.bing.net/th?id=OIP.rBroxJeka0Jj81uw9g2PwAHaHa&pid=Api&P=0&h=180"
                    }
                    alt=""
                    onClick={() => dispatch(changeDropdownStateOfProfile())}
                  />
                </button>
              </>
            )}
          </div>
        </nav>
        {profileDropdown && (
          <ProfileDropdown name={user.username} admin={user.admin} />
        )}
      </header>
      <hr className="mx-2" />
    </>
  );
}

export default NavBar;
