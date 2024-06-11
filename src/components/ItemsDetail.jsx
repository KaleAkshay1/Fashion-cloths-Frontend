import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDataInBag } from "../shope/bag";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { addDataInWishlist } from "../shope/whishlist";
import ManageGap from "./ManageGap";
import { category } from "../../../backend/src/constant";
import ItemSlider from "./Card/ItemSlider";

function ItemsDetail({ product }) {
  const [data, setData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(null);
  const navigate = useNavigate();
  const whishlist = useSelector((state) => state.whishlist);
  const bag = useSelector((state) => state.bag);
  const dispatch = useDispatch();
  const [similarItem, setSimilarItem] = useState([]);
  const user = useSelector((state) => state.user);
  const [recentView, setRecentView] = useState([]);

  useEffect(() => {
    (async () => {
      if (product?._id) {
        const out = await axios(
          `/api/items/fetch-related-items/${product._id}`
        );
        setData(out?.data?.data);
        const data = await axios("/api/items/similar-item", {
          params: {
            gender: out.data.data[0].gender,
            category: out.data.data[0].category,
            brand: out.data.data[0].brand,
          },
        });
        setSimilarItem(data.data.data);
        if (Object.keys(user).length > 0) {
          const data = await axios("/api/items/access-recently-view");
          if (data.data.data) {
            setRecentView(data.data.data);
          }
          await axios(`/api/items/add-items-recetly-views/${product._id}`);
          console.log(data.data.data);
        }
      }
    })();
  }, [product, bag]);

  const addToWishlist = async () => {
    try {
      const data = await axios(
        `/api/whishlist/add-item-in-whishlist/${product._id}`
      );
      dispatch(addDataInWishlist(data.data.data));
      toast.success("Item added to wishlist");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(
          "🥷🏻 Plz login first before adding product in card or whishlist"
        );
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
      toast.success("succesfully remove item to wishlist");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(
          "🥷🏻 Plz login first before adding product in card or whishlist"
        );
        navigate("/login");
      } else if (error.response.status === 400) {
        toast.error("🥷🏻 product is not availabel in wishlist");
      }
    }
  };

  const addToCart = async () => {
    try {
      if (size) {
        const data = await axios(
          `/api/cart/add-data-from-cart/${product._id}/${size}`
        );
        if (data.data.data) {
          dispatch(addDataInBag(data.data.data));
          toast.success("Item added in cart succesfully");
        }
      } else {
        toast.error("Plz select size first");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("🥷🏻 Plz login first before adding product in cart");
        navigate("/login");
      } else if (error.response.status === 400) {
        toast.error("🥷🏻 product is not availabel in cart");
      }
    }
  };

  const removeFromCart = async () => {
    try {
      const data = await axios(
        `/api/cart/remove-data-from-cart/${product._id}`
      );
      if (data.data.data) {
        dispatch(addDataInBag(data.data.data));
        toast.success("item remove from a cart");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(
          "🥷🏻 Plz login first before removing product in cart or whishlist"
        );
        navigate("/login");
      } else if (error.response.status === 400) {
        toast.error("🥷🏻 product is not availabel in cart");
      }
    }
  };

  console.log("recently view", recentView);

  return (
    <>
      {product && (
        <div className=" h-[85vh] overflow-hidden m-5 grid grid-cols-12 gap-2">
          <div className="col-span-1 h-full overflow-hidden overflow-y-auto product-detail-images  flex flex-col gap-3">
            {product.images.all.map((ele, ind) => (
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
              src={product.images.all[imageIndex]}
              alt=""
            />
          </div>
          <div className="col-span-6 p-2 overflow-y-auto product-detail-images">
            <h1 className="dark:text-slate-200 text-slate-800 text-3xl font-semibold mb-1">
              {product?.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xl mb-3">
              {product?.descriptions}
            </p>
            <pre className="border inline-block border-slate-400 dark:border-slate-600 rounded-sm py-0.5 text-slate-700 dark:text-slate-200 text-[12px] px-3  items-center mb-3">
              <span className="font-semibold">4.5</span>{" "}
              <FaStar className="inline text-yellow-400 mb-1" /> | 100 Ratings
            </pre>
            <hr className="bg-slate-700" />
            <div className="p-1">
              <div className="flex gap-5 mt-2">
                <p className="dark:text-slate-200 text-slate-800 text-xl font-bold dark:font-semibold">
                  {product?.priceInfo?.formatedFinalPrice}
                </p>
                {product?.priceInfo?.isOnSale && (
                  <>
                    <p className="text-lg text-slate-700 dark:text-slate-400">
                      MRP{" "}
                      <del className="text-xl font-semibold">
                        {product?.priceInfo?.formattedInitialPrice}
                      </del>
                    </p>
                    <p className="text-xl font-semibold text-orange-500 dark:text-orange-400">
                      ( {product?.priceInfo?.discountLabel} OFF )
                    </p>
                  </>
                )}
              </div>
              <p className="text-sm my-3 font-bold dark:font-semibold text-green-600 dark:text-green-500 ">
                inclusive of all taxes
              </p>
              {data.length !== 1 && (
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  ALSO AVAILABEL IN
                </h3>
              )}
              <div className="flex flex-wrap gap-3 my-2">
                {data
                  .filter((ele) => ele._id !== product._id)
                  .map((ele, ind) => (
                    <NavLink key={ind} to={`/${ele.gender}/detail/${ele._id}`}>
                      <img
                        className="w-14 rounded-sm cursor-pointer"
                        src={ele.images.first}
                        alt=""
                      />
                    </NavLink>
                  ))}
              </div>
              <div className="my-3 gap-16 flex">
                <p className="dark:text-slate-300 font-semibold ">
                  SELECT SIZE
                </p>
                <p className="text-pink-600 cursor-pointer dark:text-pink-400 font-semibold">
                  SIZE CHART {">"}
                </p>
              </div>
              <div className="py-3 flex gap-5 flex-wrap">
                {Object.keys(product.sizes).map(
                  (ele, ind) =>
                    product.sizes[ele] > 0 && (
                      <input
                        key={ind}
                        onClick={(e) => setSize(e.target.value)}
                        className={`inline outline-none cursor-pointer p-2 rounded-[50%] w-10 h-10 text-center text-l  border dark:bg-slate-600  hover:border-pink-600 hover:text-pink-600
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
              <div className="my-5 flex gap-5">
                {bag.some((ele) => ele === product._id) ? (
                  <div
                    className="flex w-[40%] gap-3 items-center justify-center hover:text-white text-pink-600 py-3 bg-transparent border-2 border-pink-600 rounded-md hover:bg-pink-700 font-semibold text-center cursor-pointer"
                    onClick={removeFromCart}
                  >
                    <BsFillHandbagFill className="inline-block" />{" "}
                    <button>REMOVE FROM CART</button>
                  </div>
                ) : (
                  <div
                    className="flex w-[40%] gap-3 items-center justify-center hover:text-white text-green-600 py-3 bg-transparent border-2 border-green-600 rounded-md hover:bg-green-700 font-semibold text-center cursor-pointer"
                    onClick={addToCart}
                  >
                    <BsFillHandbagFill className="inline-block" />{" "}
                    <button>ADD TO CART</button>
                  </div>
                )}

                {whishlist.some((ele) => ele === product._id) ? (
                  <div
                    className="flex w-[60%] gap-3 items-center justify-center text-red-700 hover:text-white py-2 bg-transparent border-2 border-red-700 rounded-md hover:bg-red-700 font-semibold text-center cursor-pointer"
                    onClick={removeFromWishlist}
                  >
                    <RiDeleteBinFill />
                    <button>REMOVE FROM WHISHLIST</button>
                  </div>
                ) : (
                  <div
                    className="flex w-[40%] gap-3 items-center justify-center text-purple-600 hover:text-white py-3 bg-transparent border-2 border-purple-600 rounded-md hover:bg-purple-700 font-semibold text-center cursor-pointer"
                    onClick={addToWishlist}
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
                {Object.keys(product.details).map((ele, ind) => (
                  <div key={ind} className="w-[40%] my-2">
                    <p className="px-2 text-[12px] text-slate-600 dark:text-slate-400">
                      {ele}
                    </p>
                    <p className="px-2 text-[16px] text-slate-900 dark:text-slate-50">
                      {product.details[ele]}
                    </p>
                    <hr className="m-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      <ManageGap>
        <div className="text-2xl font-semibold font-serif text-slate-800 w-full px-5 dark:text-slate-200">
          More Similer Item
        </div>
        <ItemSlider items={similarItem} />
        {recentView.length > 0 && (
          <>
            <div className="text-2xl font-semibold font-serif text-slate-800 w-full px-5 dark:text-slate-200">
              Recently viewed Items
            </div>
            <ItemSlider items={recentView}></ItemSlider>
          </>
        )}
      </ManageGap>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default ItemsDetail;
