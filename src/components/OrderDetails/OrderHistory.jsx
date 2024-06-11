import React, { memo, useLayoutEffect, useState } from "react";
import axios from "axios";
import OrderItemsCard from "../Card/OrderItemsCard";

function orderItems() {
  const [orderItems, setOrderItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [end, setEnd] = useState(5);
  useLayoutEffect(() => {
    (async () => {
      let query = { start: 0, end: end };
      const data = await axios("/api/order/access-order-history", {
        params: query,
      });
      setOrderItems(data.data.data.items);
      setTotalItems(data.data.data.total);
    })();
  }, [end]);
  return (
    <div className="w-full dark:border-slate-500 dark:shadow-slate-600 dark:shadow-sm shadow-md dark:border rounded p-5 bg-white dark:bg-black">
      <h2 className="text-slate-700 py-2 font-semibold text-3xl dark:text-slate-200 text-center">
        Order History
      </h2>
      <div className="flex justify-between items-center text-center text-black px-5 dark:text-white">
        <div className="w-[35%] text-left px-20">ITEMS</div>
        <div className="w-[7%]">Size</div>
        <div className="w-[7%]">Qty</div>
        <div className="w-[7%]">Price</div>
        <div className="w-[10%]">Paymetn Status</div>
        <div className="w-[10%]">Delivery Status</div>
      </div>
      <hr className="mb-5 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
      {orderItems.map((ele, ind) => (
        <OrderItemsCard key={ind} product={ele} />
      ))}
      {orderItems.length < totalItems && (
        <div
          className="text-blue-500 px-10 py-5 cursor-pointer inline-block"
          onClick={() => setEnd((pre) => pre + 5)}
        >
          See more ...
        </div>
      )}
    </div>
  );
}

export default memo(orderItems);
