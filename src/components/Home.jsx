import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUnCheck } from "../shope/profile";
import Cart from "./Cart";
import ManageGap from "./ManageGap";

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(profileUnCheck());
  }, []);

  return (
    <>
      <ManageGap>
        {product.map((ele, ind) => (
          <Cart key={ele._id} product={ele} />
        ))}
      </ManageGap>
    </>
  );
}

export default Home;
