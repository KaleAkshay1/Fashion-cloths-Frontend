import React, { useLayoutEffect, useState } from "react";

import BagCard from "../Card/BagCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addDataInBag } from "../../shope/bag";
import { addDataInOrder } from "../../shope/order";

function BagItems() {
  const bag = useSelector((state) => state.bag);
  const [items, setItems] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(
    items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0)
  );
  const [tax, setTax] = useState(
    Math.ceil(
      (5 / 100) *
        items.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.price;
        }, 0)
    )
  );

  const [discount, setDiscount] = useState(
    price -
      items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.dPrice;
      }, 0)
  );

  const [total, setTotal] = useState(price + tax);

  useLayoutEffect(() => {
    (async () => {
      try {
        const data = await axios("/api/cart/acces-data-from-cart");
        if (data?.data?.data) {
          setItems(data.data.data);
          setPrice(
            data.data.data.reduce((accumulator, currentItem) => {
              return accumulator + currentItem.price;
            }, 0)
          );
          setTax(
            Math.ceil(
              (5 / 100) *
                data.data.data.reduce((accumulator, currentItem) => {
                  return accumulator + currentItem.price;
                }, 0)
            )
          );
          setDiscount(
            data.data.data.reduce((accumulator, currentItem) => {
              return accumulator + currentItem.price;
            }, 0) -
              data.data.data.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.dPrice;
              }, 0)
          );
          setTotal(
            Number(
              data.data.data.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.price;
              }, 0)
            ) -
              (data.data.data.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.price;
              }, 0) -
                data.data.data.reduce((accumulator, currentItem) => {
                  return accumulator + currentItem.dPrice;
                }, 0)) +
              Number(
                Math.ceil(
                  (5 / 100) *
                    data.data.data.reduce((accumulator, currentItem) => {
                      return accumulator + currentItem.price;
                    }, 0)
                )
              )
          );
        }
      } catch (error) {}
    })();
  }, [bag]);

  const handelPayment = async (req, res) => {
    const options = {
      amount: total * 100,
      currency: "INR",
      // receipt: String(Date.now()),
    };
    const data = await axios.post("/api/order/payment", options);
    const order = data.data.data;

    let option = {
      key: "rzp_test_DiQxHejUmZjKkT",
      amount: order.amount,
      currency: order.currency,
      name: "Fashion X",
      order_id: order.id,
      image:
        "https://tse2.mm.bing.net/th?id=OIP.NALWlKaZwG2yY88eC0LHtgHaH1&pid=Api&P=0&h=180",
      handler: async function (response) {
        const body = { ...response };
        console.log("responce is ", response);

        const validationResponse = await axios.post(
          "/api/order/validation",
          body
        );
        const jsonResponse = validationResponse.data.data;
        console.log("validation responce", jsonResponse);
        dispatch(addDataInBag(jsonResponse.cartData));
        dispatch(addDataInOrder(jsonResponse.cartData));
      },
      prefill: {
        name: user.username,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#990099",
      },
    };
    let rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function (response) {
      // toast.error(response.error.code);
      toast.error(response.error.description);
      // toast.error(response.error.source);
      // toast.error(response.error.step);
      toast.error(response.error.reason);
      // toast.error(response.error.metadata.order_id);
      // toast.error(response.error.metadata.payment_id);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <div className="w-full grid grid-cols-7 gap-2 ">
      <div className="col-span-5  dark:border-slate-500 dark:shadow-slate-600 dark:shadow-sm shadow-md dark:border rounded p-5 bg-white dark:bg-black">
        <div className="flex justify-between items-center">
          <div className="text-slate-700 font-semibold text-2xl dark:text-slate-200">
            Shoping Bag
          </div>
          <div className="text-slate-500 dark:text-slate-300">
            {items.reduce((accumulator, currentItem) => {
              return accumulator + currentItem.quantity;
            }, 0)}{" "}
            Items
          </div>
        </div>
        <hr className="my-5 h-[1px] border dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
        {items.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-xl text-slate-800 dark:text-slate-200">
              Your cart is currently empty.
            </span>
          </div>
        ) : (
          items.map((ele, ind) => <BagCard key={ind} product={ele} />)
        )}
      </div>
      <div className="col-span-2">
        <div className="shadow-md rounded dark:border dark:border-slate-500 dark:shadow-slate-600 dark:shadow-sm bg-white dark:bg-black">
          <h2 className="text-center p-3 mt-5 text-xl font-bold text-slate-800 dark:text-white">
            ORDER SUMMARY
          </h2>
          <hr className="mx-5 h-[1px] border  dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />
          <div className="p-5 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-200">PRICE</span>
              <span className="text-slate-800 dark:text-slate-50">
                ₹{price}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-200">
                Discount
              </span>
              <span className="text-red-600 dark:text-red-500">
                -₹{discount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-200">TAX</span>
              <span className="text-slate-800 dark:text-slate-50">₹{tax}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-200">
                SHIPPING
              </span>
              <span className="text-slate-800 dark:text-slate-50">
                {" "}
                <span className="text-green-500">FREE</span>
              </span>
            </div>

            <hr className="h-[1px] border  dark:h-[0.5px] dark:bg-slate-200 dark:border-none" />

            <div className="flex justify-between text-orange-500 font-semibold">
              <span>TOTAL</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="mx-5 text-center p-2 w-full px-5 mb-3 bg-slate-950 dark:bg-white hover:dark:bg-slate-200 font-semibold hover:bg-slate-900 rounded-full text-white dark:text-black"
              onClick={handelPayment}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagItems;
