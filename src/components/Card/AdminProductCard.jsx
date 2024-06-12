import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function AdminProductCard({ item }) {
  const [showEditItms, setShowEditItems] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <>
      {showEditItms && (
        <div className="flex items-center justify-center">
          <div className="z-50 h-full fixed top-0 left-0 w-full bg-black opacity-50 flex items-center justify-center"></div>
          <div className="fixed z-50 bg-white left-40 top-24  max-w-[70%] h-[70%] overflow-hidden rounded-lg">
            <div className="relative w-full h-full  grid grid-cols-10 gap-2">
              <div className="col-span-2 overflow-hidden flex flex-col justify-around">
                <img src={item.images.first} className="h-[48%]" />
                <img src={item.images.last} className="h-[48%]" />
              </div>

              <div className="col-span-4 my-10">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Name: </span>
                  {edit ? (
                    <input type="text" />
                  ) : (
                    <input
                      type="text"
                      className="outline-none text-xl"
                      readOnly
                      value={item.name}
                    />
                  )}
                </div>
                <div className="my-2">
                  <p className="font-semibold text-xl">Description:</p>
                  {edit ? (
                    <textarea type="text" value={item.descriptions} />
                  ) : (
                    <p className="outline-none text-lg ml-10 w-[80%]">
                      {item.descriptions}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-xl">Category:</p>
                  {edit ? (
                    <input type="text" />
                  ) : (
                    <input
                      type="text"
                      className="outline-none text-xl w-24"
                      readOnly
                      value={item.category}
                    />
                  )}
                </div>
                <div className="my-3 flex justify-between">
                  <p className="text-xl font-semibold">Price:</p>
                  {edit ? (
                    <input type="text" />
                  ) : (
                    <input
                      type="text"
                      className="outline-none text-xl w-20"
                      readOnly
                      value={item.priceInfo.initialPrice}
                    />
                  )}
                </div>

                <div className="my-3 flex justify-between">
                  <p className="text-xl font-semibold">Discount:</p>
                  {edit ? (
                    <input type="text" />
                  ) : (
                    <input
                      type="text"
                      className="outline-none text-xl w-20"
                      readOnly
                      value={item.priceInfo.discountLabel}
                    />
                  )}
                </div>

                <div className="my-3 flex justify-between">
                  <p className="text-xl font-semibold">Descounted Price</p>
                  {edit ? (
                    <input type="text" />
                  ) : (
                    <input
                      type="text"
                      className="outline-none text-xl w-20"
                      readOnly
                      value={item.priceInfo.finalPrice}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-4 my-10">
                {Object.keys(item.sizes).map((ele, ind) => {
                  return (
                    <>
                      <div className="flex justify-around mb-3">
                        <p className="font-semibold text-lg">{ele}</p>
                        {!edit ? (
                          <p>{item.sizes[ele]}</p>
                        ) : (
                          <input
                            type="text"
                            className="w-20"
                            value={item.sizes[ele]}
                          />
                        )}
                      </div>
                    </>
                  );
                })}
                <div className="flex mt-5 flex-col gap-5">
                  <button
                    className="px-5 mx-10 p-2 rounded-lg border-2 text-purple-700 font-semibold border-purple-700 hover:bg-purple-700 hover:text-white"
                    onClick={() => setEdit((pre) => !pre)}
                  >
                    Edit Details
                  </button>
                  <button className="px-5 mx-10 p-2 rounded-lg border-2 text-red-700 font-semibold border-red-700 hover:bg-red-700 hover:text-white">
                    Delete Item
                  </button>
                </div>
              </div>

              <div className="absolute top-2 right-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg">
                <ImCross color="red" onClick={() => setShowEditItems(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center text-center text-black px-5 dark:text-white">
        <div className="w-[7%] truncate">{item._id}</div>
        <NavLink to={`/${item.gender}/detail/${item._id}`} className="w-[35%]">
          <div className="flex gap-5 w-full items-center">
            <img
              className="h-24 rounded-md border shadow-md"
              src={item.images.first}
              alt=""
            />
            <div className="w-[70%]">
              <h1 className="dark:text-slate-50 text-xl text-slate-800 font-bold">
                {item.name}
              </h1>
              <p className="dark:text-slate-400 text-slate-700">
                {item.descriptions}
              </p>
            </div>
          </div>
        </NavLink>
        <div>
          <div
            className="dark:text-white text-center"
            style={{ marginBottom: "-10px" }}
          >
            {item.priceInfo.finalPrice}₹{item.priceInfo.dPrice}
          </div>
          <del
            className="text-slate-500 text-center dark:text-slate-500 text-[12px]"
            style={{ marginTop: "-10px" }}
          >
            ₹{item.priceInfo.initialPrice}
          </del>
        </div>
        <div className="w-[7%]">{item.category}</div>
        <div className="w-[7%] flex gap-2 items-center">
          <FaPen
            color="green"
            className="cursor-pointer"
            onClick={() => setShowEditItems(true)}
          />
          <MdDelete color="red" className="cursor-pointer" size={20} />
        </div>
      </div>
      <hr className="my-3 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
    </>
  );
}

export default AdminProductCard;
