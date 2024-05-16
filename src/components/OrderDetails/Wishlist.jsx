import React from "react";
import ManageGap from "../ManageGap";
import WhishlistCard from "../Card/WhishlistCard";
import { useSelector } from "react-redux";

function Wishlist() {
  const whishlist = useSelector((state) => state.userOrder);
  return (
    <>
      <ManageGap>
        <div className="text-white flex flex-wrap gap-10">
          {whishlist.whishlist.map((ele, ind) => (
            <WhishlistCard key={ind} />
          ))}
        </div>
      </ManageGap>
    </>
  );
}

export default Wishlist;
