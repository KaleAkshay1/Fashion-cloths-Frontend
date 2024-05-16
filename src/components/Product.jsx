import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUnCheck } from "../shope/profile";
import Cart from "./Card/Cart.jsx";
import { newProducts } from "../shope/product";
import ManageGap from "./ManageGap";
import axios from "axios";
import Carosel from "./Card/Carosel.jsx";
import { BsFilterLeft, BsFilterRight } from "react-icons/bs";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import BigCard from "./Card/BigCard.jsx";

function Product({ cat }) {
  const dispatch = useDispatch();
  const productfilteringData = useSelector((state) => state.optionData);
  const product = useSelector((state) => state.product);
  const [total, setTotal] = useState([]);
  const [slot, setSlot] = useState(0);
  const [filter, setFilter] = useState(true);
  const [sidebarFilters, setSidebarFilters] = useState({
    color: null,
    showColor: true,
    showSize: true,
    size: null,
    showCategory: true,
    subCategory: null,
  });

  useEffect(() => {
    (async () => {
      const data = await axios(`/api/product/fetch-product-cat-data/${cat}`);
      dispatch(newProducts(data?.data?.data?.data));
      const arraylength = Math.ceil(data?.data?.data?.count / 8);
      const array = new Array(arraylength).fill(0).map((_, index) => index * 8);
      setTotal(array);
    })();

    dispatch(profileUnCheck());
  }, [cat]);

  const accessMoreProduct = async (val, ind) => {
    const data = await axios(
      `/api/product/fetch-product-cat-data/${cat}/${val}`
    );
    setSlot(ind);
    dispatch(newProducts(data?.data?.data));
  };

  const accessNextOrPreviousProduct = async (val) => {
    let data;
    if (val === "N") {
      data = await axios(
        `/api/product/fetch-product-cat-data/${cat}/${total[slot + 1]}`
      );
      setSlot((pre) => pre + 1);
    } else {
      data = await axios(
        `/api/product/fetch-product-cat-data/${cat}/${total[slot - 1]}`
      );
      setSlot((pre) => pre - 1);
    }
    dispatch(newProducts(data?.data?.data));
  };

  const changeData = (type, ele) => {
    if (sidebarFilters[type] === ele) {
      setSidebarFilters((pre) => ({ ...pre, [type]: null }));
    } else {
      setSidebarFilters((pre) => ({ ...pre, [type]: ele }));
    }
  };

  return (
    <>
      <ManageGap>
        <Carosel
          images={[
            "/2slider2.jpg",
            "/1slider1.jpg",
            "/3slider1.jpg",
            "/4slider3.jpg",
          ]}
        />
      </ManageGap>

      <div className="grid-cols-10 grid">
        {/* show and hide sidebar */}
        <div
          className="mx-5 col-span-10 dark:text-white text-2xl items-center flex gap-2 cursor-pointer"
          onClick={() => setFilter((pre) => !pre)}
        >
          {filter ? (
            <GrFormPrevious />
          ) : (
            <BsFilterLeft className="inline-block" />
          )}
          <p className="font-semibold">Filter's</p>

          {filter ? <BsFilterRight /> : <MdNavigateNext />}
        </div>
        {/* end show and hide sidebar */}
        {/* sidebar */}
        <div
          className={`${
            filter ? "col-span-2" : "hidden"
          } p-5 flex flex-col gap-6 max-h-[140vh] product-category overflow-hidden overflow-y-auto dark:text-white`}
        >
          {/* sidebar category */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setSidebarFilters((pre) => ({
                ...pre,
                showCategory: !sidebarFilters.showCategory,
              }))
            }
          >
            <p className="text-xl">Category's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                sidebarFilters.showCategory ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {sidebarFilters.showCategory && (
            <div className="colors-in-product flex h-[30%] overflow-hidden overflow-y-auto flex-wrap gap-3 ">
              {productfilteringData.subCategory[cat].map((ele, ind) => (
                <div
                  key={ind}
                  className={`cursor-pointer border rounded-full px-2 py-1 border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    sidebarFilters.subCategory === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("subCategory", ele)}
                >
                  <p>{ele}</p>
                </div>
              ))}
            </div>
          )}
          {/* end sidebar category */}
          {/* sidebar colors */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setSidebarFilters((pre) => ({
                ...pre,
                showColor: !sidebarFilters.showColor,
              }))
            }
          >
            <p className="text-xl">Color's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                sidebarFilters.showColor ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {sidebarFilters.showColor && (
            <div className="colors-in-product flex h-[30%] overflow-hidden overflow-y-auto flex-wrap gap-3 ">
              {productfilteringData.color.map((ele, ind) => (
                <div
                  key={ind}
                  className={`flex cursor-pointer gap-2 border rounded-full items-center px-2 py-1 border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    sidebarFilters.color === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("color", ele)}
                >
                  <div
                    className="w-5 h-5 border border-slate-500 rounded-full flex"
                    style={{
                      background: ["golden", "skin"].some(
                        (item) => item === ele
                      )
                        ? ele === "skin"
                          ? "#D4B996"
                          : ele === "golden" && "#cd9e62"
                        : ele,
                    }}
                  />
                  <p>{ele}</p>
                </div>
              ))}
            </div>
          )}
          {/* end sidebar colors */}
          {/* sidebar Sizes */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setSidebarFilters((pre) => ({
                ...pre,
                showSize: !sidebarFilters.showSize,
              }))
            }
          >
            <p className="text-xl">Sizes's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                sidebarFilters.showSize ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {sidebarFilters.showSize && (
            <div className="colors-in-product flex h-[30%] overflow-hidden overflow-y-auto flex-wrap gap-3 ">
              {productfilteringData.size.map((ele, ind) => (
                <div
                  key={ind}
                  className={`cursor-pointer flex items-center justify-center w-10 h-10 border rounded-full  border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    sidebarFilters.size === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("size", ele)}
                >
                  <span>{ele}</span>
                </div>
              ))}
            </div>
          )}
          <div>
            <div className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold text-xl my-5">
              Price
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <input
                  className="border p-3 bg-transparent w-full border-slate-700 rounded-sm"
                  type="Number"
                  placeholder="₹ min"
                />
                <label className="text-center" htmlFor="">
                  Min
                </label>
              </div>
              <div className="w-[45%] flex flex-col">
                <input
                  className="border p-3 bg-transparent w-full border-slate-700 rounded-sm"
                  type="Number"
                  placeholder="₹ max"
                />
                <label className="text-center" htmlFor="">
                  Max
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* end sidebar */}
        {/* main area */}
        <div
          className={`${
            filter ? "col-span-8" : "col-span-10"
          } max-h-[140vh] overflow-hidden overflow-y-auto product-category`}
        >
          <div className="flex flex-wrap p-6 gap-5">
            {product
              .filter((ele) => ele.category === cat)
              .map((ele) =>
                filter ? (
                  <Cart key={ele._id} product={ele} />
                ) : (
                  <BigCard key={ele._id} product={ele}></BigCard>
                )
              )}
          </div>
          {total.length > 1 && (
            <div className="flex mx-7 mb-40 my-4 relative items-center justify-center dark:text-white">
              {slot !== 0 && (
                <button
                  onClick={() => accessNextOrPreviousProduct("P")}
                  className="border absolute left-10 button-transition border-slate-800 rounded-md hover:bg-gradient-to-tl hover:from-purple-950 hover:via-blue-800 hover:border-white dark:hover:border-slate-900 hover:to-pink-900 hover:text-white px-4 py-1"
                >
                  {"<"} Previous
                </button>
              )}

              <div className="flex gap-2">
                {total.map(
                  (ele, ind) =>
                    ind < 8 && (
                      <button
                        key={ele}
                        onClick={() => accessMoreProduct(ele, ind)}
                        className={`border button-transition border-slate-800 rounded-md hover:bg-slate-300 dark:hover:bg-gray-900 px-4 py-1 ${
                          slot === ind ? "bg-slate-300 dark:bg-gray-900" : ""
                        }`}
                      >
                        {ind + 1}
                      </button>
                    )
                )}
              </div>
              {slot !== total.length - 1 && (
                <button
                  onClick={() => accessNextOrPreviousProduct("N")}
                  className="border absolute right-10 button-transition border-slate-800 rounded-md hover:bg-gradient-to-tl hover:from-purple-950 hover:via-blue-800 hover:border-white dark:hover:border-slate-900 hover:to-pink-900 hover:text-white px-4 py-1"
                >
                  Next {">"}
                </button>
              )}
            </div>
          )}
        </div>
        {/* end main area */}
      </div>
    </>
  );
}

export default memo(Product);
