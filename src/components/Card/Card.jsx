import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataInWishlist } from "../../shope/whishlist";

function Card({ product }) {
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
      <div className="w-[200px] p-2 relative h-[310px] rounded-xl overflow-hidden  max-w-sm bg-white border dark:border-slate-800 dark:shadow-slate-800 dark:shadow-sm shadow-md dark:bg-slate-950 ">
        <div className="relative">
          <NavLink to={`/${product.gender}/detail/${product._id}`}>
            <img
              className="h-[210px] w-full cursor-pointer rounded-md"
              src={product.images.all[imageIndex]}
              alt="product image"
              onMouseEnter={imageScrolling}
              onMouseLeave={stopScrolling}
            />
          </NavLink>
        </div>
        <NavLink to={`/:${product.category}/detail/${product._id}`}>
          <div className="cursor-pointer flex flex-col gap-1">
            <h5 className="text-md overflow-hidden  truncate dark:font-semibold font-bold tracking-tight text-gray-800 dark:text-white text-center">
              {product.name}
            </h5>
            <h3 className=" overflow-hidden text-center truncate text-[12px] font-semibold tracking-tight text-gray-700 dark:text-slate-400">
              {product.descriptions}
            </h3>

            {/* <div className="flex items-center mt-1">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                5.0
              </span>
            </div> */}
            <div className="flex w-full items-center justify-around ">
              <span className="text-lg font-bold dark:font-semibold text-pink-700 dark:text-pink-600 p-1 rounded-md">
                {product.priceInfo.formatedFinalPrice}
              </span>
              {product.priceInfo.isOnSale && (
                <>
                  <del className="text-[14px] dark:text-orange-400 text-orange-600">
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
            <FaHeart color="red" onClick={removeFromWishlist} />
          ) : (
            <FaRegHeart onClick={addToWishlist} />
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
