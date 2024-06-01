import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUnCheck } from "../shope/profile";
import ManageGap from "./ManageGap";
import axios from "axios";
import { newProducts } from "../shope/product";
import Carosel from "./Card/Carosel.jsx";
import { NavLink } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const Slider1Images = ["/1slider1.jpg", "/1slider2.gif", "/1slider3.jpg"];
  const Slider3Images = ["/2slider1.webp", "/2slider2.jpg", "/2slider3.jpg"];
  const Slider2Images = ["/3slider1.jpg", "/3slider2.jpg", "/3slider3.jpg"];
  const Slider4Images = ["/4slider1.jpg", "/4slider2.jpg", "/4slider3.jpg"];
  const categoryType = [
    {
      image: "/women.jpeg",
      cat: "Women",
    },
    {
      image: "/men.jpg",
      cat: "Men",
    },
    { image: "/kids.png", cat: "Kids" },
  ];

  useEffect(() => {
    (async () => {
      const pData = await axios("/api/product/fetch-product-data");
      dispatch(newProducts(pData?.data?.data));
    })();
    dispatch(profileUnCheck());
  }, []);

  return (
    <>
      <ManageGap>
        {/* slider 1 */}
        <Carosel images={Slider1Images} />
        {/* end slider 1 */}
        {/* category different */}
        <div className="flex w-full justify-between items-center">
          {categoryType.map((ele, ind) => (
            <NavLink
              key={ind}
              className="w-[30%] h-52"
              to={`/${ele.cat.toLowerCase()}`}
            >
              <div className="h-full w-full cursor-pointer overflow-hidden relative">
                <img
                  className="h-full w-full transition-all duration-500 transform-gpu hover:scale-110 hover:brightness-50 brightness-90"
                  src={ele.image}
                  alt=""
                />
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black px-2 py-1 rounded bg-opacity-50">
                  {ele.cat}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
        {/* end category different */}
        {/* popular in womens */}
        <div className="w-full text-slate-800 dark:text-slate-200 text-center">
          <h2 className="text-4xl">Most Seller In Women's</h2>
          <div className="flex justify-between dark:border-white p-2 my-5">
            {product
              .filter((ele, ind) => ele.category === "women")
              .map((ele, ind) => (
                <NavLink
                  key={ind}
                  to={`/${ele.category}/detail/${ele._id}/${ele.product_varients[0].color}`}
                >
                  <div className="h-full w-full cursor-pointer overflow-hidden relative">
                    <img
                      key={ele._id}
                      className="h-full w-full transition-all duration-500 transform-gpu hover:scale-110 hover:brightness-50 brightness-90"
                      src={ele.product_varients[0].images[0]}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black px-2 py-1 rounded bg-opacity-70">
                      <p>{ele.title}</p>
                      <p className="text-purple-500 font-semibold">
                        ₹{ele.price}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
        {/* end popular in womens */}
        {/* slider 2 */}
        <Carosel images={Slider2Images} />
        {/* end slider 2 */}
        {/* popular in men */}
        <div className="w-full text-slate-800 dark:text-slate-200 text-center">
          <h2 className="text-4xl">Most Seller In Men's</h2>
          <div className="flex justify-between dark:border-white p-2 my-5">
            {product
              .filter((ele, ind) => ele.category === "men")
              .map((ele, ind) => (
                <NavLink
                  key={ind}
                  to={`/${ele.category}/detail/${ele._id}/${ele.product_varients[0].color}`}
                >
                  <div className="h-full w-full cursor-pointer overflow-hidden relative">
                    <img
                      key={ele._id}
                      className="h-full w-full transition-all duration-500 transform-gpu hover:scale-110 hover:brightness-50 brightness-90"
                      src={ele.product_varients[0].images[0]}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black px-2 py-1 rounded bg-opacity-70">
                      <p>{ele.title}</p>
                      <p className="text-purple-500 font-semibold">
                        ₹{ele.price}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
        {/* end popular in men */}
        {/* slider 3 */}
        <Carosel images={Slider3Images} />
        {/* end slider 3 */}
        {/* popular in kids */}
        <div className="w-full text-slate-800 dark:text-slate-200 text-center">
          <h2 className="text-4xl">Most Seller In Men's</h2>
          <div className="flex justify-between dark:border-white p-2 my-5">
            {product
              .filter((ele, ind) => ele.category === "kids")
              .map((ele, ind) => (
                <NavLink
                  to={`/${ele.category}/detail/${ele._id}/${ele.product_varients[0].color}`}
                >
                  <div className="h-full w-full cursor-pointer overflow-hidden relative">
                    <img
                      key={ele._id}
                      className="h-full w-full transition-all duration-500 transform-gpu hover:scale-110 hover:brightness-50 brightness-90"
                      src={ele.product_varients[0].images[0]}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black px-2 py-1 rounded bg-opacity-70">
                      <p>{ele.title}</p>
                      <p className="text-purple-500 font-semibold">
                        ₹{ele.price}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
        {/* end popular in kids */}
        {/* slider 4 */}
        <Carosel images={Slider4Images} />
        {/* end slider 4 */}
      </ManageGap>
    </>
  );
}

export default Home;
