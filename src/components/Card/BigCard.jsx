import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataInUserOrders } from "../../shope/userOrders";

function BigCard({ product }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userOrder = useSelector((state) => state.userOrder);
  const [varientIndex, setVarientIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.product_varients[0].color);
  const [whishlistButton, setWhishlistButton] = useState(false);
  const navigate = useNavigate();
  const [hoverCart, setHoverCart] = useState(false);
  const [forTimeout, setForTimeout] = useState([]);
  useEffect(() => {
    if (Object.keys(userOrder).length > 0) {
      const out = userOrder?.whishlist.some(
        (ele, ind) => ele.productId === product._id && ele.color === color
      );
      setWhishlistButton(out);
    }
  }, [color]);

  function findColor(colur, ind) {
    setVarientIndex(ind);
    setColor(colur);
  }
  const imageScrolling = async () => {
    const imageLength = product.product_varients[varientIndex].images.length;
    for (let i = 0; i < imageLength; i++) {
      let timeout = setTimeout(() => {
        setImageIndex(i);
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
    if (Object.keys(user).length) {
      try {
        const data = await axios(
          `/api/orders/add-whishlist/${product._id}/${color}`
        );
        dispatch(addDataInUserOrders(data?.data?.data));
        setWhishlistButton(true);
        alert("product added in whishlist succesfully");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Plz login first");
      navigate("/login");
    }
  };

  return (
    <>
      <div
        className="w-[250px] h-[400px]  max-w-sm bg-white  shadow dark:bg-slate-950 "
        onMouseEnter={() => setHoverCart(true)}
        onMouseLeave={() => setHoverCart(false)}
      >
        <div className="relative">
          <NavLink to={`/:${product.category}/detail/${product._id}/${color}`}>
            <img
              className="h-[300px] w-full cursor-pointer"
              src={product.product_varients[varientIndex].images[imageIndex]}
              alt="product image"
              onMouseEnter={imageScrolling}
              onMouseLeave={stopScrolling}
            />
          </NavLink>
          <div className="absolute top-3 right-2 flex flex-col gap-2">
            {product.product_varients.map((ele, ind) => (
              <div
                key={ind}
                className={`border cursor-pointer border-black p-2 rounded-full`}
                onClick={() => findColor(ele.color, ind)}
                style={{
                  background: ["golden", "skin"].some(
                    (item) => item === ele.color
                  )
                    ? ele.color === "skin"
                      ? "#D4B996"
                      : ele.color === "golden" && "#cd9e62"
                    : ele.color,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="px-3 cursor-pointer">
          {hoverCart ? (
            !whishlistButton ? (
              <button
                className="dark:text-white w-full border mt-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:hover:bg-gray-700 hover:bg-pink-600 hover:border-pink-600 hover:text-white dark:hover:border-gray-600"
                onClick={addToWishlist}
              >
                <FaRegHeart className="inline-block mr-2 mb-1" />
                Add to Whishlist
              </button>
            ) : (
              <button
                className="dark:text-white w-full border mt-2  dark:bg-gray-700 hover:bg-pink-600 border-pink-600 text-white dark:border-gray-600"
                onClick={addToWishlist}
              >
                <FaRegHeart className="inline-block mr-2 mb-1" />
                Add to Whishlist
              </button>
            )
          ) : (
            <>
              <h5 className="text-md dark:font-semibold font-bold tracking-tight text-gray-800 dark:text-white">
                {product.title}
              </h5>
              <h3 className=" overflow-hidden truncate text-[12px] font-semibold tracking-tight text-gray-600 dark:text-slate-400">
                {product.description}
              </h3>
            </>
          )}
          <NavLink to={`/:${product.category}/detail/${product._id}/${color}`}>
            <div className="flex items-center mt-1">
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
            </div>
            <div className="flex items-center gap-3 ">
              <span className="text-md font-semibold text-gray-900 dark:text-white">
                ₹{product.dPrice}
              </span>
              <del className="text-[12px] dark:text-slate-500 text-slate-600">
                ₹{product.price}
              </del>
              <span className="text-[10px] text-orange-500">
                (₹{product.price - product.dPrice} OFF)
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default BigCard;
