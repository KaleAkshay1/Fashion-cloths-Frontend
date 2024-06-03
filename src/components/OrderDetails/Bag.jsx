import { isAction } from "@reduxjs/toolkit";
import ManageGap from "../ManageGap";
import { BsFillHandbagFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

function Bag() {
  return (
    <ManageGap>
      <div className="w-full text-center text-4xl flex justify-around items-center">
        <NavLink
          to="/cart"
          end
          className={({ isActive }) => {
            return `${
              isActive
                ? "bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white"
                : "text-slate-700 dark:text-slate-200"
            }  rounded-lg overflow-hidden border`;
          }}
        >
          <div className="p-5 ">
            <BsFillHandbagFill className="w-full font-extralight" />
            <h2 className="font-bold text-3xl mt-2 font-serif w-full">
              Shoping Bag
            </h2>
          </div>
        </NavLink>

        <NavLink
          to="/cart/history"
          className={({ isActive }) => {
            return `${
              isActive
                ? "bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white"
                : "text-slate-700 dark:text-slate-200"
            }  rounded-lg overflow-hidden border`;
          }}
        >
          <div className="p-5">
            <MdWorkHistory className="w-full font-extralight" />
            <h2 className="font-bold text-3xl mt-2 font-serif w-full">
              Order History
            </h2>
          </div>
        </NavLink>
      </div>
      <Outlet></Outlet>
    </ManageGap>
  );
}

export default Bag;
