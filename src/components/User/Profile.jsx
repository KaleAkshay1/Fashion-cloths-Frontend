import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="grid grid-cols-12 mx-10 my-5 gap-2">
      <div className="col-span-3  p-5 border-r border-slate-500 flex flex-col gap-3 h-[85vh] ">
        {[
          { text: "Personal Information", to: "/" },
          { text: "My Orders", to: "/" },
          { text: "Manage Address", to: "/" },
          { text: "Logout", to: "/" },
        ].map((ele, ind) => (
          <NavLink to={ele.to}>
            <div className="border-2 p-2 rounded-lg">{ele.text}</div>
          </NavLink>
        ))}
      </div>
      <div className="col-span-9 h-[85vh] overflow-x-hidden edit-profile p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
