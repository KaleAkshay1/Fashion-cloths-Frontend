import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { foundUser, notFoundUser } from "../shope/user";
import { toast } from "react-toastify";

function ProfileDropdown({ name, closeProfile, onMouseLeave, admin }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutUser = async () => {
    try {
      const val = await axios.get("/api/user/logout");
      if (val.data.data) {
        navigate("/");
      }
      dispatch(notFoundUser());
      toast.success(val.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const logoutWithGoogle = () => {
    window.open("/api/user/logout-with-google", "_self");
  };

  return (
    <div
      onMouseLeave={onMouseLeave}
      className="origin-top-right absolute right-5 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden dark:bg-gray-700 dark:text-white"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <NavLink
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 dark:text-white"
        role="menuitem"
        onClick={closeProfile}
      >
        {name} Profile
      </NavLink>
      <hr className="mx-2" />
      {admin && (
        <>
          <NavLink
            to="admin"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-white"
            onClick={closeProfile}
          >
            Admin Panel
          </NavLink>
          <hr className="mx-2" />
        </>
      )}

      <button
        className="block px-4 py-2 dark:text-white active:bg-gray-800 w-full text-sm text-gray-700"
        role="menuitem"
        onClick={!user?.googleId ? logOutUser : logoutWithGoogle}
      >
        Log out
      </button>
    </div>
  );
}

export default ProfileDropdown;
