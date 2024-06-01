import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataInWishlist } from "../../shope/whishlist";

function BigCards({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [forTimeout, setForTimeout] = useState([]);
  const whishlist = useSelector((state) => state.whishlist);
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

  const addToWishlist = async () => {
    try {
      const data = await axios(
        `/api/whishlist/add-item-in-whishlist/${product._id}`
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
      }
    }
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

  return (
    <>
      <div className="w-[250px] p-2 relative h-[360px] rounded-xl overflow-hidden  max-w-sm bg-white border dark:border-slate-800 dark:shadow-slate-800 dark:shadow-sm shadow-md dark:bg-slate-950 ">
        <div className="relative">
          <NavLink to={`/:${product.category}/detail/${product._id}`}>
            <img
              className="h-[250px] w-full cursor-pointer rounded-md"
              src={product.images.all[imageIndex]}
              alt="product image"
              onMouseEnter={imageScrolling}
              onMouseLeave={stopScrolling}
            />
          </NavLink>
        </div>
        <NavLink to={`/:${product.category}/detail/${product._id}`}>
          <div className="cursor-pointer flex flex-col gap-1">
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
          </div>
          {product.priceInfo.isOnSale && (
            <div className="absolute top-3 text-white text-center -left-9 px-10 bg-purple-900 -rotate-45">
              -{product.priceInfo.discountLabel}
            </div>
          )}
        </NavLink>
        <div className="absolute top-3 right-3 cursor-pointer hover:bg-slate-200  rounded p-2">
          {whishlist.some((ele) => ele === product._id) ? (
            <FaHeart
              className="text-lg"
              color="red"
              onClick={removeFromWishlist}
            />
          ) : (
            <FaRegHeart className="text-lg" onClick={addToWishlist} />
          )}
        </div>
      </div>
    </>
  );
}

export default BigCards;
