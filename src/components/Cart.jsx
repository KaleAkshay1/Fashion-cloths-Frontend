import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Cart({ product }) {
  const [varientIndex, setVarientIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.product_varients[0].color);
  const [forTimeout, setForTimeout] = useState([]);
  function findColor(colur, ind) {
    setVarientIndex(ind);
    setColor(colur);
  }
  const imageScrolling = async () => {
    const imageLength = product.product_varients[varientIndex].images.length;
    // await Promise.all(
    //   product.product_varients[varientIndex].images.map(async (ele, ind) => {
    //     setTimeout(() => {
    //       console.log("ele");
    //       setImageIndex(ind);
    //     }, 2000 * ind);
    //   })
    // );
    for (let i = 0; i < imageLength; i++) {
      let timeout = setTimeout(() => {
        setImageIndex(i);
      }, 2000 * i);
      setForTimeout((pre) => [...pre, timeout]);
    }
  };
  const stopScrolling = async () => {
    console.log(forTimeout);
    await Promise.all(forTimeout.map((ele) => clearTimeout(ele)));
    setForTimeout([]);
    setImageIndex(0);
  };
  return (
    <div className="w-[230px] h-[380px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <NavLink to={`/detail/${product._id}/${color}`}>
          <img
            className="h-[250px] w-[250px] rounded-t-lg cursor-pointer"
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
      <div className="px-5 cursor-pointer">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <h3 className="cart-description text-sm font-semibold tracking-tight text-gray-700 dark:text-slate-400">
          {product.description}
        </h3>
        <div className="flex items-center mt-1.5 mb-1.5">
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
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Rs: 599
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
