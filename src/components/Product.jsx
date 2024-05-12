import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUnCheck } from "../shope/profile";
import Cart from "./Cart";
import ManageGap from "./ManageGap";

function Product({ cat }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(profileUnCheck());
  }, [cat]);
  return (
    <ManageGap>
      {product
        .filter((ele) => ele.category === cat)
        .map((ele) => (
          <Cart key={ele._id} product={ele} />
        ))}
    </ManageGap>
  );
}

export default memo(Product);
