import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { notFoundUser } from "../../shope/user";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutUser = async () => {
    console.log("this run");
    try {
      const val = await axios.get("/api/user/logout");
      if (val.data.data) {
        navigate("/");
      }
      dispatch(notFoundUser());
    } catch (error) {
      console.log(error.message);
    }
  };
  const logoutWithGoogle = () => {
    window.open("/api/user/logout-with-google", "_self");
  };
  return (
    <div className="grid grid-cols-12 mx-10 my-5 gap-2">
      <div className="col-span-3  p-5 border-r border-slate-500 flex flex-col gap-3 h-[85vh] dark:text-white ">
        {[
          { text: "Personal Information", to: "/profile" },
          { text: "My Orders", to: "/profile/orders" },
          { text: "Manage Address", to: "/" },
        ].map((ele, ind) => (
          <NavLink
            to={ele.to}
            key={ind}
            end
            className={({ isActive }) => {
              return `${
                isActive
                  ? "bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white"
                  : ""
              } border-2 rounded-lg`;
            }}
          >
            <div className="p-2">{ele.text}</div>
          </NavLink>
        ))}
        <div
          className="p-2 border-2 rounded-lg cursor-pointer"
          onClick={!user?.googleId ? logOutUser : logoutWithGoogle}
        >
          LogOut
        </div>
      </div>
      <div className="col-span-9 h-[85vh] overflow-x-hidden edit-profile p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
