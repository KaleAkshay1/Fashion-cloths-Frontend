import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ManageGap from "../ManageGap";
import { GoHeart } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";
import Wishlistcard from "../Card/Wishlistcard";

function Wishlists() {
  const data = useLoaderData();
  const [items, setItems] = useState(data.data.data);
  const whishlist = useSelector((state) => state.whishlist);

  useEffect(() => {
    (async () => {
      const data = await axios("/api/whishlist/access-items-from-whishlist");
      setItems(data.data.data);
    })();
  }, [whishlist]);
  return (
    <ManageGap>
      <div className="text-center text-5xl w-full">
        <GoHeart className="w-full dark:text-slate-100 text-slate-800 font-extralight" />
        <h2 className="font-bold dark:text-slate-200 text-4xl text-slate-700 my-2 font-serif w-full">
          My Wishlist
        </h2>
      </div>
      <div className="w-full flex flex-wrap gap-10">
        {items.map((ele, ind) => (
          <Wishlistcard key={ind} product={ele} />
        ))}
      </div>
    </ManageGap>
  );
}

export default Wishlists;
