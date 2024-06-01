import React, { useLayoutEffect, useState } from "react";
import ManageGap from "../ManageGap";
import { BsFillHandbagFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import BagCard from "../Card/BagCard";
import axios from "axios";

function Bag() {
  const bag = useSelector((state) => state.bag);
  const [items, setItems] = useState([]);
  useLayoutEffect(() => {
    (async () => {
      try {
        const data = await axios("/api/cart/acces-data-from-cart");
        if (data?.data?.data) {
          setItems(data.data.data);
        }
      } catch (error) {}
    })();
  }, [bag]);
  return (
    <ManageGap>
      <div className="w-full text-center text-5xl ">
        <BsFillHandbagFill className="w-full text-slate-800 dark:text-slate-100 font-extralight" />
        <h2 className="font-bold dark:text-slate-200 text-4xl text-slate-700 my-2 font-serif w-full">
          Shoping Bag
        </h2>
      </div>
      <div className="w-full grid grid-cols-7 gap-2 ">
        <div className="col-span-5 dark:border-slate-500 dark:shadow-slate-600 dark:shadow-sm shadow-md dark:border rounded p-5 bg-white dark:bg-black">
          <div className="flex justify-between items-center">
            <div className="text-slate-700 font-semibold text-2xl dark:text-slate-200">
              Shoping Bag
            </div>
            <div className="text-slate-500 dark:text-slate-300">
              {bag.length} Items
            </div>
          </div>
          <hr className="my-5 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
          {items.map((ele, ind) => (
            <BagCard key={ind} product={ele} />
          ))}
        </div>
        <div className="shadow-md rounded dark:border dark:border-slate-500 dark:shadow-slate-600 dark:shadow-sm col-span-2 bg-white dark:bg-black"></div>
      </div>
    </ManageGap>
  );
}

export default Bag;
