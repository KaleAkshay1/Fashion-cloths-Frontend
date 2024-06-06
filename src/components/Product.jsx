import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUnCheck } from "../shope/profile";
import { newProducts } from "../shope/product";
import ManageGap from "./ManageGap";
import axios from "axios";
import Carosel from "./Card/Carosel.jsx";
import { BsFilterLeft, BsFilterRight } from "react-icons/bs";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import Card from "./Card/Card.jsx";
import BigCards from "./Card/BigCards.jsx";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

function Product({ cat }) {
  const dispatch = useDispatch();
  const productfilteringData = useSelector((state) => state.optionData);
  const [detalKeys, setDetailKeys] = useState(
    Object.keys(productfilteringData[cat].details)
  );
  const product = useSelector((state) => state.product);
  const [filterProduct, setFilterProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const [slot, setSlot] = useState(0);
  const [filter, setFilter] = useState(true);
  const minPrice = useRef(0);
  const maxPrice = useRef(100000);
  const [showFilters, setShowFilters] = useState({
    showCategory: true,
    showBrands: true,
    showSize: true,
  });
  const [sidebarFilters, setSidebarFilters] = useState({
    brand: null,
    sizes: null,
    category: null,
    minPrice: 0,
    maxPrice: 100000,
  });

  useLayoutEffect(() => {
    setShowFilters({ showCategory: true, showBrands: true, showSize: true });
    setSidebarFilters({
      brand: null,
      sizes: null,
      category: null,
      minPrice: 0,
      maxPrice: 100000,
    });
    setSlot(0);
  }, [cat]);

  useEffect(() => {
    (async () => {
      const query = { gender: cat };
      for (let i in sidebarFilters) {
        if (sidebarFilters[i]) {
          query[i] = sidebarFilters[i];
        }
      }
      const data = await axios.get("/api/items/fetch-items-filtered-data", {
        params: query,
      });
      dispatch(newProducts(data?.data?.data?.data));
      const arraylength = Math.ceil(data?.data?.data?.count / 24);
      const array = new Array(arraylength)
        .fill(0)
        .map((_, index) => index * 24);
      setTotal(array);
    })();

    dispatch(profileUnCheck());
  }, [cat, sidebarFilters]);

  useLayoutEffect(() => {
    (async () => {
      setDetailKeys(Object.keys(productfilteringData[cat].details));
      const result = product.filter((ele, ind) => ele.gender === cat);
      setFilterProduct(result);
    })();
  }, [product, productfilteringData]);

  const closeShowFilters = () => {
    x``;
    let data = {};
    for (let i in showFilters) {
      if (["showCategory", "showBrands", "showSize"].some((ele) => ele === i)) {
        data[i] = showFilters[i];
      } else {
        data[i] = false;
      }
    }
    setShowFilters(data);
  };

  const accessMoreProduct = async (val, ind) => {
    try {
      const query = { gender: cat };
      for (let i in sidebarFilters) {
        if (sidebarFilters[i]) {
          query[i] = sidebarFilters[i];
        }
      }
      const data = await axios(`/api/items/fetch-items-data/${val}`, {
        params: query,
      });
      setSlot(ind);
      dispatch(newProducts(data?.data?.data));
    } catch (error) {
      alert(error.message);
    }
  };

  const accessLastOrFirdtProduct = async (val) => {
    try {
      let data;
      const query = { gender: cat };
      for (let i in sidebarFilters) {
        if (sidebarFilters[i]) {
          query[i] = sidebarFilters[i];
        }
      }
      if (val === "L") {
        data = await axios(
          `/api/items/fetch-items-data/${total[total.length - 1]}`,
          {
            params: query,
          }
        );
        setSlot(total.length - 1);
      } else {
        data = await axios(`/api/items/fetch-items-data/${total[0]}`, {
          params: query,
        });
        setSlot(0);
      }
      dispatch(newProducts(data?.data?.data));
    } catch (error) {
      alert(error.message);
    }
  };

  const changeData = (type, ele) => {
    const keys = Object.keys(showFilters);
    keys.forEach((item, index) => {
      showFilters[item] = false;
    });
    if (sidebarFilters[type] === ele) {
      setSidebarFilters((pre) => ({ ...pre, [type]: null }));
    } else {
      setSidebarFilters((pre) => ({ ...pre, [type]: ele }));
    }
  };

  const changePrice = (type) => {
    if (type === "min") {
      setSidebarFilters((pre) => ({
        ...pre,
        minPrice: minPrice.current.value,
      }));
    } else if (type === "max") {
      setSidebarFilters((pre) => ({
        ...pre,
        maxPrice: maxPrice.current.value,
      }));
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
        <div className="mx-5 col-span-10 mb-3 flex flex-wrap gap-5">
          <div
            className=" px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
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
          {sidebarFilters.brand && (
            <div
              className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
              onClick={() =>
                setSidebarFilters((pre) => ({ ...pre, brand: null }))
              }
            >
              <p className="font-semibold">{sidebarFilters.brand}</p>

              <RxCross2 className="text-red-600" />
            </div>
          )}
          {sidebarFilters.category && (
            <div
              className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
              onClick={() =>
                setSidebarFilters((pre) => ({ ...pre, category: null }))
              }
            >
              <p className="font-semibold">{sidebarFilters.category}</p>

              <RxCross2 className="text-red-600" />
            </div>
          )}
          {sidebarFilters.sizes && (
            <div
              className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
              onClick={() =>
                setSidebarFilters((pre) => ({ ...pre, sizes: null }))
              }
            >
              <p className="font-semibold">{sidebarFilters.sizes}</p>

              <RxCross2 className="text-red-600" />
            </div>
          )}
          {sidebarFilters.minPrice !== 0 && (
            <div
              className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
              onClick={() => {
                minPrice.current.value = 0;
                setSidebarFilters((pre) => ({ ...pre, minPrice: 0 }));
              }}
            >
              <p className="font-semibold">
                Min Price {sidebarFilters.minPrice}
              </p>

              <RxCross2 className="text-red-600" />
            </div>
          )}
          {sidebarFilters.maxPrice !== 0 &&
            sidebarFilters.maxPrice !== 100000 && (
              <div
                className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
                onClick={() => {
                  maxPrice.current.value = 100000;
                  setSidebarFilters((pre) => ({ ...pre, maxPrice: 100000 }));
                }}
              >
                <p className="font-semibold">
                  Max Price {sidebarFilters.maxPrice}
                </p>

                <RxCross2 className="text-red-600" />
              </div>
            )}
          {detalKeys.map(
            (ele, ind) =>
              sidebarFilters[ele] && (
                <div
                  key={ind}
                  className="px-2 py-1 rounded-md dark:text-white text-2xl items-center flex gap-2 cursor-pointer border"
                  onClick={() =>
                    setSidebarFilters((pre) => ({ ...pre, [ele]: null }))
                  }
                >
                  <p className="font-semibold">{sidebarFilters[ele]}</p>

                  <RxCross2 className="text-red-600" />
                </div>
              )
          )}
        </div>
        {/* end show and hide sidebar */}
        {/* sidebar */}
        <div
          className={`${
            filter ? "col-span-2" : "hidden"
          } p-5 flex flex-col gap-6 product-category overflow-hidden overflow-y-auto dark:text-white`}
          onMouseLeave={closeShowFilters}
        >
          {/* sidebar category */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setShowFilters((pre) => ({
                ...pre,
                showCategory: !showFilters.showCategory,
              }))
            }
          >
            <p className="text-xl">Category's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                showFilters.showCategory ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {showFilters.showCategory && (
            <div className="colors-in-product flex flex-col max-h-[40vh] overflow-hidden overflow-y-auto gap-3 ">
              {productfilteringData[cat].categories.map((ele, ind) => (
                <div
                  key={ind}
                  className={`relative mx-2 cursor-pointer gap-2 border rounded-full items-center px-2 py-1 border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    sidebarFilters.category === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("category", ele)}
                >
                  {sidebarFilters.category === ele && (
                    <TiTickOutline className="text-green-600 text-2xl absolute" />
                  )}
                  <p className="text-center">{ele}</p>
                </div>
              ))}
            </div>
          )}
          {/* end sidebar category */}
          {/* sidebar brands */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setShowFilters((pre) => ({
                ...pre,
                showBrands: !showFilters.showBrands,
              }))
            }
          >
            <p className="text-xl">Brand's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                showFilters.showBrands ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {showFilters.showBrands && (
            <div className="colors-in-product flex flex-col max-h-[40vh] overflow-hidden overflow-y-auto gap-3 ">
              {productfilteringData[cat].brands.map((ele, ind) => (
                <div
                  key={ind}
                  className={`relative mx-2 cursor-pointer gap-2 border rounded-full items-center px-2 py-1 border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    sidebarFilters.brand === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("brand", ele)}
                >
                  {sidebarFilters.brand === ele && (
                    <TiTickOutline className="text-green-600 text-2xl absolute" />
                  )}
                  <p className="text-center ">{ele}</p>
                </div>
              ))}
            </div>
          )}
          {/* end sidebar brands */}
          {/* sidebar Sizes */}
          <div
            className="dark:text-slate-200 cursor-pointer text-slate-900 font-semibold flex justify-between items-center"
            onClick={() =>
              setShowFilters((pre) => ({
                ...pre,
                showSize: !showFilters.showSize,
              }))
            }
          >
            <p className="text-xl">Sizes's</p>{" "}
            <MdNavigateNext
              className={`text-3xl ${
                showFilters.showSize ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {showFilters.showSize && (
            <div className="colors-in-product min-h-[15vh] flex overflow-hidden overflow-y-auto flex-wrap gap-3 ">
              {productfilteringData[cat].sizes.map((ele, ind) => (
                <div
                  key={ind}
                  className={`cursor-pointer flex items-center justify-center w-10 max-h-10 border rounded-full  border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                    showFilters.sizes === ele &&
                    "bg-slate-300 dark:bg-slate-800"
                  }`}
                  onClick={() => changeData("sizes", ele)}
                >
                  <span>{ele}</span>
                </div>
              ))}
            </div>
          )}
          {/* details */}

          {detalKeys.map((ele, ind) => (
            <div key={ind}>
              <div
                key={ind}
                className="flex cursor-pointer justify-between"
                onClick={() =>
                  setShowFilters((pre) => ({
                    ...pre,
                    [`show${ele}`]: !showFilters[`show${ele}`],
                  }))
                }
              >
                <p className="text-xl font-semibold">{ele}</p>
                <MdNavigateNext
                  className={`text-3xl ${
                    showFilters[`show${ele}`] ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </div>
              {showFilters[`show${ele}`] && (
                <div className="colors-in-product mt-5 flex flex-col min-h-[10vh] overflow-hidden overflow-y-auto gap-3 ">
                  {productfilteringData[cat].details[ele].map(
                    (element, index) => (
                      <div
                        key={index}
                        className={`relative mx-2 cursor-pointer gap-2 border rounded-full items-center px-2 py-1 border-slate-500 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                          sidebarFilters[ele] === element &&
                          "bg-slate-300 dark:bg-slate-800"
                        }`}
                        onClick={() => changeData(String(ele), element)}
                      >
                        {sidebarFilters[ele] === element && (
                          <TiTickOutline className="text-green-600 text-2xl absolute" />
                        )}
                        <p className="text-center ">{element}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          {/* end details */}
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
                  ref={minPrice}
                  onChange={(e) => changePrice("min")}
                />
                <label className="text-center" htmlFor="">
                  Min
                </label>
              </div>
              <div className="w-[45%] flex flex-col">
                <input
                  className="border p-3 bg-transparent w-full border-slate-700 rounded-sm"
                  type="Number"
                  ref={maxPrice}
                  placeholder="₹ max"
                  onChange={() => changePrice("max")}
                />
                <label className="text-center" htmlFor="">
                  Max
                </label>
              </div>
            </div>
          </div>
          {/* end price */}
        </div>
        {/* end sidebar */}
        {/* main area */}
        <div
          className={`${
            filter ? "col-span-8" : "col-span-10"
          } overflow-hidden  overflow-y-auto product-category colors-in-product`}
        >
          <div className="flex flex-wrap p-6 gap-5">
            {filterProduct.map((ele) =>
              filter ? (
                <Card key={ele._id} product={ele} />
              ) : (
                <BigCards key={ele._id} product={ele}></BigCards>
              )
            )}
          </div>
          {total.length > 1 && (
            <>
              <div className="flex mx-7 my-4 relative items-center justify-center dark:text-white">
                {slot !== 0 && (
                  <button
                    onClick={() => accessLastOrFirdtProduct("F")}
                    className="border absolute left-10 button-transition border-slate-800 rounded-md hover:bg-gradient-to-tl hover:from-purple-950 hover:via-blue-800 hover:border-white dark:hover:border-slate-900 hover:to-pink-900 hover:text-white px-4 py-1"
                  >
                    First Page
                  </button>
                )}

                <div className="flex gap-2">
                  {slot > 3 && (
                    <div className="mr-5 text-center pb-4">....</div>
                  )}
                  {total.map(
                    (ele, ind) =>
                      ind < slot + 4 &&
                      ind > slot - 4 && (
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
                    onClick={() => accessLastOrFirdtProduct("L")}
                    className="border absolute right-10 button-transition border-slate-800 rounded-md hover:bg-gradient-to-tl hover:from-purple-950 hover:via-blue-800 hover:border-white dark:hover:border-slate-900 hover:to-pink-900 hover:text-white px-4 py-1"
                  >
                    Last Page
                  </button>
                )}
                {total.length >= 8 && slot < total.length - 4 && (
                  <div className="ml-5 text-center pb-4">....</div>
                )}
              </div>

              <div className="dark:text-white mb-20 text-center">
                {slot + 1} out of {total.length}
              </div>
            </>
          )}
        </div>
        {/* end main area */}
      </div>
    </>
  );
}

export default memo(Product);
