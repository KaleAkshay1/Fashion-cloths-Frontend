import React from "react";
import { NavLink } from "react-router-dom";

function OrderItemsCard({ product }) {
  const data = new Date(product.createdAt);
  const date = data.toLocaleDateString();
  const time = data.toLocaleTimeString();
  return (
    <>
      <div className="flex relative justify-between items-center text-center px-5">
        <NavLink
          to={`/${product.itemId.category}/detail/${product.itemId._id}`}
          className="w-[35%]"
        >
          <div className="flex gap-5 w-full items-center">
            <img
              className="h-24 rounded-md border shadow-md"
              src={product.itemId.images.first}
              alt=""
            />
            <div className="w-[70%]">
              <h1 className="dark:text-slate-50 text-xl text-slate-800 font-bold">
                {product.itemId.name}
              </h1>
              <p className="dark:text-slate-400 text-slate-700">
                {product.itemId.descriptions}
              </p>
            </div>
          </div>
        </NavLink>
        <div className="dark:text-slate-100 text-slate-700 font-bold font-serif text-lg w-[7%]">
          {product.size}
        </div>
        <div className="w-[7%] dark:text-white">{product.quantity}</div>
        <div className="w-[7%]">
          <div className="dark:text-white text-center">₹{product.amount}</div>
        </div>
        <div
          className={`${
            product.paymentStatus === "SUCCESS"
              ? "text-green-600"
              : "text-red-600"
          } font-semibold`}
        >
          {product.paymentStatus}
        </div>
        <div
          className={`${
            product.delivery === "SUCCESS" ? "text-green-600" : "text-red-600"
          } font-semibold`}
        >
          {product.delivery}
        </div>
        <div className="absolute bottom-0 right-5 text-[10px] text-slate-500 dark:text-slate-400 flex gap-5">
          <span>Date: {date}</span>
          <span>Time: {time}</span>
        </div>
      </div>
      <hr className="my-2 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
    </>
  );
}

export default OrderItemsCard;
