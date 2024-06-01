import React, { useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { addDataInWishlist } from "../../shope/whishlist";
import { toast } from "react-toastify";
import axios from "axios";
import { addDataInBag } from "../../shope/bag";

function Wishlistcard({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [forTimeout, setForTimeout] = useState([]);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageScrolling = () => {
    const imageLength = product.images.all.length;
    for (let i = 0; i < imageLength - 1; i++) {
      let timeout = setTimeout(() => {
        setImageIndex(i + 1);
      }, 1000 * i);
      setForTimeout((pre) => [...pre, timeout]);
    }
  };

  const stopScrolling = async () => {
    await Promise.all(forTimeout.map((ele) => clearTimeout(ele)));
    setForTimeout([]);
    setImageIndex(0);
  };

  const removeFromWishlist = async () => {
    try {
      const data = await axios(
        `/api/whishlist/remove-items-from-whishlist/${product._id}`
      );
      dispatch(addDataInWishlist(data.data.data));
    } catch (error) {
      if (error.response.status === 401) {
        toast("🥷🏻 Plz login first before adding product in card or whishlist", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
        });
        navigate("/login");
      } else if (error.response.status === 400) {
        toast("🥷🏻 product is not availabel in wishlist", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
        });
      }
    }
  };

  const addItemToCart = async () => {
    try {
      if (size) {
        const data = await axios(
          `/api/cart/add-data-from-cart/${product._id}/${size}`
        );
        if (data.data.data) {
          console.log(data);
          dispatch(addDataInBag(data.data.data));
          toast.success(data.data.message);
        }
      } else {
        toast.error("Plz select size first");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="w-[22%] p-2 relative rounded-xl overflow-hidden  dark:bg-slate-950 bg-transparent ">
        <div>
          <NavLink to={`/:${product.category}/detail/${product._id}`}>
            <img
              className="h-[250px] w-full shadow-md cursor-pointer rounded-md"
              src={product.images.all[imageIndex]}
              alt="product image"
              onMouseEnter={imageScrolling}
              onMouseLeave={stopScrolling}
            />
          </NavLink>
        </div>

        <div className="cursor-pointer flex flex-col gap-1">
          <NavLink to={`/:${product.category}/detail/${product._id}`}>
            <h5 className="text-xl overflow-hidden  truncate dark:font-semibold font-bold tracking-tight text-gray-800 dark:text-white text-center">
              {product.name}
            </h5>
            <h3 className=" overflow-hidden text-center truncate text-[14px] font-semibold tracking-tight text-gray-700 dark:text-slate-400">
              {product.descriptions}
            </h3>
            <div className="flex w-full items-center justify-around ">
              <span className="text-xl font-bold dark:font-semibold text-pink-700 dark:text-pink-600 p-1 rounded-md">
                {product.priceInfo.formatedFinalPrice}
              </span>
              {product.priceInfo.isOnSale && (
                <>
                  <del className="text-[16px] dark:text-orange-400 text-orange-600">
                    {product.priceInfo.formattedInitialPrice}
                  </del>
                </>
              )}
            </div>
            {product.priceInfo.isOnSale && (
              <div className="absolute top-3 text-white text-center -left-9 px-10 bg-purple-900 -rotate-45">
                -{product.priceInfo.discountLabel}
              </div>
            )}
          </NavLink>

          <div className="py-2 flex gap-2 justify-around flex-wrap">
            {Object.keys(product.sizes).map(
              (ele, ind) =>
                product.sizes[ele] > 0 && (
                  <input
                    key={ind}
                    onClick={(e) => setSize(e.target.value)}
                    className={`inline outline-none cursor-pointer p-1 rounded-[50%] w-8 h-8 text-center text-sm border dark:bg-slate-600  hover:border-pink-600 hover:text-pink-600
    dark:hover:text-pink-400 dark:hover:border-pink-400 ${
      size === ele
        ? "border-pink-600 text-pink-600"
        : "border-slate-600 text-slate-800 dark:text-slate-100  dark:border-slate-100"
    }`}
                    type="text"
                    readOnly
                    value={ele}
                  />
                )
            )}
          </div>
          <button
            className="bg-blue-600 rounded p-1 flex items-center gap-3 justify-center text-white"
            onClick={addItemToCart}
          >
            <BsHandbagFill /> <span className="font-semibold"> Add To Bag</span>
          </button>
        </div>

        <div className="absolute top-3 right-3 cursor-pointer hover:bg-slate-200  rounded p-2">
          <RxCross2
            className="font-bold text-xl"
            onClick={removeFromWishlist}
          />
        </div>
      </div>
    </>
  );
}

export default Wishlistcard;
