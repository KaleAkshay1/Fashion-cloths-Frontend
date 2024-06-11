import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdminProductCard from "../Card/AdminProductCard";

function MyProductsList() {
  const data = useLoaderData();
  const [items, setItems] = useState(data.data.data);

  useEffect(() => {
    setItems(data.data.data);
  }, []);

  return (
    <>
      <div className="col-span-8 p-5 bg-white rounded shadow-lg border m-2 mr-5">
        <div className="flex justify-between items-center text-center text-black px-5 dark:text-white">
          <div className="w-[7%]">Id code</div>
          <div className="w-[35%] text-left px-20">ITEMS</div>
          <div className="w-[7%]">Price</div>
          <div className="w-[7%]">category</div>
          <div className="w-[7%]">Action</div>
        </div>
        <hr className="my-3 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
        {items.map((ele, ind) => (
          <AdminProductCard key={ind} item={ele} />
        ))}
      </div>
    </>
  );
}

export default MyProductsList;
