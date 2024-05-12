import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";

function SideBar() {
  return (
    <>
      <div
        to="/admin"
        className=" w-[20%] min-h-[85vh]  flex flex-col items-center gap-3 py-3"
      >
        <NavLink className="dark:text-white w-[80%] rounded p-2 px-4 bg-gray-100 active:bg-gray-100 dark:active:bg-slate-800 dark:bg-slate-700 flex items-center gap-3">
          <FaCartPlus className="text-2xl" /> Add Product
        </NavLink>
        <NavLink
          to="/admin/list"
          className="dark:text-white w-[80%] rounded p-2 px-4 bg-gray-100 active:bg-gray-200 dark:active:bg-slate-800 dark:bg-slate-700 flex items-center gap-3"
        >
          <GoFileDirectoryFill className="text-2xl" /> Product List
        </NavLink>
      </div>
    </>
  );
}

export default SideBar;
