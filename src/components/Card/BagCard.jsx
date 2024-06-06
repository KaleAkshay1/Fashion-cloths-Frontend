import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addDataInBag } from "../../shope/bag";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function BagCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = async () => {
    try {
      const data = await axios(
        `/api/cart/remove-data-from-cart/${product.itemId._id}`
      );
      if (data.data.data) {
        dispatch(addDataInBag(data.data.data));
        toast.success("item remove from a cart");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toastify.error(
          "🥷🏻 Plz login first before removing product in cart or whishlist"
        );
        navigate("/login");
      } else if (error.response.status === 400) {
        toast.error("🥷🏻 product is not availabel in cart");
      }
    }
  };

  const incressQuentity = async () => {
    try {
      const data = await axios(
        `/api/cart/incress-quentity-of-item/${product.itemId._id}`
      );
      dispatch(addDataInBag(data.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const decressQuentity = async () => {
    try {
      const data = await axios(
        `/api/cart/decress-quentity-of-item/${product.itemId._id}`
      );
      dispatch(addDataInBag(data.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <NavLink
          to={`/${product.itemId.category}/detail/${product.itemId._id}`}
          className="w-[40%]"
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
        <div className="flex items-center gap-2">
          <FiMinusCircle
            size={20}
            color="red"
            className="cursor-pointer"
            onClick={decressQuentity}
          />
          <div className="text-xl dark:text-slate-200 text-slate-700 font-mono text-center min-w-10">
            {product.quantity}
          </div>
          <FiPlusCircle
            size={20}
            color="green"
            className="cursor-pointer"
            onClick={incressQuentity}
          />
        </div>
        <div>
          <div
            className="dark:text-white text-center"
            style={{ marginBottom: "-10px" }}
          >
            ₹{product.dPrice}
          </div>
          <del
            className="text-slate-500 text-center dark:text-slate-500 text-[12px]"
            style={{ marginTop: "-10px" }}
          >
            ₹{product.price}
          </del>
        </div>
        <div
          className=" p-2 rounded hover:bg-slate-200 hover:dark:bg-slate-800 cursor-pointer"
          onClick={removeFromCart}
        >
          <RxCross1 className=" dark:text-white" />
        </div>
      </div>
      <hr className="my-2 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
    </>
  );
}

export default BagCard;
