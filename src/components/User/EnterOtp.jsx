import React, { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function EnterOtp() {
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();
  const otp = useRef();
  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      const out = await axios.post("/api/user/check-otp", {
        otp: otp.current.value,
      });
      if (out?.data?.data) {
        navigate("/login");
      }
    } catch (error) {
      alert(error?.response?.data.message);
    }
  };
  return (
    <>
      <div className=" flex m-5 justify-center items-center">
        <div className="bg-white min-w-[30vw]  p-8 rounded-md shadow-lg dark:shadow-slate-600">
          <h4 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            otp send in {email} email id
          </h4>
          <form onSubmit={submitOtp} className="space-y-4 mt-10 flex flex-col">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter a Opt
              </label>
              <input
                type="text"
                id="otp"
                ref={otp}
                name="otp"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-br from-indigo-900 to-purple-900 hover:to-indigo-900 hover:from-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EnterOtp;
