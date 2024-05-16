import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataInUserOrders } from "../shope/userOrders";
import { RiDeleteBinFill } from "react-icons/ri";

function ProductDetail({ product, colors }) {
  const user = useSelector((state) => state.user);
  const userOrder = useSelector((state) => state.userOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState(colors);
  const [selectedColor, setSelectedColor] = useState(
    product.product_varients.filter((ele) => ele.color === color)[0]
  );
  const [size, setSize] = useState(Object.keys(selectedColor.sizes));
  const [imageIndex, setImageIndex] = useState(0);
  const [whishlistButton, setWhishlistButton] = useState(false);

  useEffect(() => {
    setWhishlistButton(false);
    if (Object.keys(userOrder).length) {
      userOrder?.whishlist.forEach((ele, ind) => {
        if (ele.productId === product._id && ele.color === color) {
          setWhishlistButton(true);
        }
      });
    }
  }, [color, whishlistButton]);

  const changeColor = (color) => {
    setColor(color);
    setSelectedColor(
      product.product_varients.filter((ele) => ele.color === color)[0]
    );
    setImageIndex(0);
  };
  const addWhishlist = async () => {
    if (Object.keys(user).length) {
      try {
        const data = await axios(
          `/api/orders/add-whishlist/${product._id}/${color}`
        );
        dispatch(addDataInUserOrders(data?.data?.data));
        setWhishlistButton(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Plz login first");
      navigate("/login");
    }
  };

  const removeWhishlist = async () => {
    try {
      const data = await axios(
        `/api/orders/remove-product-in-wishlist/${product._id}/${color}`
      );
      dispatch(addDataInUserOrders(data?.data?.data));
      setWhishlistButton(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className=" h-[90vh] overflow-hidden m-5 grid grid-cols-12 gap-2">
      <div className="col-span-1 h-full overflow-hidden overflow-y-auto product-detail-images  flex flex-col gap-3">
        {selectedColor.images.map((ele, ind) => (
          <img
            className="rounded-md border dark:border-slate-800 border-slate-400 cursor-pointer"
            key={ind}
            src={ele}
            onMouseEnter={() => setImageIndex(ind)}
            alt=""
          />
        ))}
      </div>
      <div className="col-span-5 h-full flex items-center justify-center overflow-y-auto">
        <img
          className="rounded-lg border border-slate-400 dark:border-slate-800 h-full cursor-pointer"
          src={selectedColor.images[imageIndex]}
          alt=""
        />
      </div>
      <div className="col-span-6 p-2 overflow-y-auto product-detail-images">
        <h1 className="dark:text-slate-200 text-slate-800 text-3xl font-semibold mb-1">
          {product.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl mb-3">
          {product.description}
        </p>
        <pre className="border inline-block border-slate-400 dark:border-slate-600 rounded-sm py-0.5 text-slate-700 dark:text-slate-200 text-[12px] px-3  items-center mb-3">
          <span className="font-semibold">4.5</span>{" "}
          <FaStar className="inline text-yellow-400 mb-1" /> | 100 Ratings
        </pre>
        <hr className="bg-slate-700" />
        <div className="p-1">
          <div className="flex gap-5 mt-2">
            <p className="dark:text-slate-200 text-slate-800 text-xl font-bold dark:font-semibold">
              ₹{product.dPrice}
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-400">
              MRP <del className="text-xl font-semibold">₹{product.price}</del>
            </p>
            <p className="text-xl font-semibold text-orange-500 dark:text-orange-400">
              ( ₹{product.price - product.dPrice} OFF )
            </p>
          </div>
          <p className="text-sm my-3 font-bold dark:font-semibold text-green-600 dark:text-green-500 ">
            inclusive of all taxes
          </p>
          {product.product_varients.length !== 1 && (
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              MORE COLORS
            </h3>
          )}
          <div className="flex flex-wrap gap-3 my-2">
            {product.product_varients
              .filter((ele) => ele.color !== color)
              .map((ele, ind) => (
                <NavLink
                  key={ind}
                  to={`/${product.category}/detail/${product._id}/${ele.color}`}
                >
                  <img
                    className="w-14 rounded-sm cursor-pointer"
                    onClick={() => changeColor(ele.color)}
                    src={ele.images[0]}
                    alt=""
                  />
                </NavLink>
              ))}
          </div>
          <div className="my-3 gap-16 flex">
            <p className="dark:text-slate-300 font-semibold ">SELECT SIZE</p>
            <p className="text-pink-600 cursor-pointer dark:text-pink-400 font-semibold">
              SIZE CHART {">"}
            </p>
          </div>
          <div className="py-3 flex gap-5 flex-wrap">
            {size.map(
              (ele, ind) =>
                selectedColor.sizes[ele] > 0 && (
                  <input
                    key={ind}
                    className="inline outline-none cursor-pointer p-2 rounded-[50%] w-10 h-10 text-center text-xl bg-slate-100 dark:bg-slate-600 text-slate-800 dark:text-slate-100 border border-slate-600 dark:border-slate-100 hover:border-pink-600 hover:text-pink-600
              dark:hover:text-pink-400 dark:hover:border-pink-400 "
                    type="text"
                    readOnly
                    value={ele}
                  />
                )
            )}
          </div>
          <div className="my-5 flex gap-5">
            <div className="flex w-[40%] gap-3 items-center justify-center hover:text-white text-pink-600 py-3 bg-transparent border-2 border-pink-600 rounded-md hover:bg-pink-700 font-semibold text-center cursor-pointer">
              <BsFillHandbagFill className="inline-block" />{" "}
              <button>ADD TO CART</button>
            </div>

            {whishlistButton ? (
              <div
                className="flex w-[60%] gap-3 items-center justify-center text-red-700 hover:text-white py-2 bg-transparent border-2 border-red-700 rounded-md hover:bg-red-700 font-semibold text-center cursor-pointer"
                onClick={removeWhishlist}
              >
                <RiDeleteBinFill />
                <button>REMOVE FROM WHISHLIST</button>
              </div>
            ) : (
              <div
                className="flex w-[40%] gap-3 items-center justify-center text-purple-600 hover:text-white py-3 bg-transparent border-2 border-purple-600 rounded-md hover:bg-purple-700 font-semibold text-center cursor-pointer"
                onClick={addWhishlist}
              >
                <FaHeart />
                <button>WHISHLIST</button>
              </div>
            )}
          </div>
          <hr />
          <p className="my-3 text-slate-900 dark:text-slate-50 font-semibold">
            PRODUCT DETAILS
          </p>
          <div className="flex flex-wrap justify-around">
            {product.product_details.map((ele, ind) => (
              <div key={ind} className="w-[40%] my-2">
                <p className="px-2 text-[12px] text-slate-600 dark:text-slate-400">
                  {ele.main}
                </p>
                <p className="px-2 text-[16px] text-slate-900 dark:text-slate-50">
                  {ele.sub}
                </p>
                <hr className="m-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
