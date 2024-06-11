import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../shope/email";
import { toast } from "react-toastify";
import OTPField from "./OTPField";

function Register() {
  const [pass, setPass] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const firstName = useRef("");
  const lastName = useRef("");
  const phone = useRef("");
  const password = useRef("");
  const email = useRef("");
  const navigate = useNavigate();
  const emails = useSelector((state) => state.email);
  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post("/api/user/register", {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (data?.data?.data?.data === true) {
        dispatch(updateEmail(data?.data?.data?.email));
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const findOtpCode = async (otp) => {
    console.log(otp);
    try {
      const out = await axios.post("/api/user/check-otp", {
        otp,
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
      <div className="min-h-[90vh] flex justify-center items-center bg-cover bg-center">
        <div className="brightness-50 absolute top-16 h-[110vh] inset-0">
          <img
            src="./1slider3.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white z-10 relative my-5 min-w-[30vw] min-h-[50vh] p-8 rounded-md shadow-lg dark:shadow-slate-600 ">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Sign Up
          </h2>
          <form onSubmit={formSubmit} className="space-y-4 mt-10 flex flex-col">
            <div className="flex gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  ref={firstName}
                  placeholder="Enter First Name"
                  className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  ref={lastName}
                  placeholder="Enter Last Name"
                  className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                ref={email}
                name="email"
                placeholder="Enter Eamil Id"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                ref={phone}
                placeholder="Enter Mobile Number"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={pass ? "password" : "text"}
                placeholder="Enter a Password"
                ref={password}
                className="my-2 px-4 py-2 pr-10 w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
              <p className="cursor-pointer absolute top-9 right-3">
                {!pass ? (
                  <IoMdEye onClick={() => setPass(true)} className="size-6" />
                ) : (
                  <IoMdEyeOff
                    onClick={() => setPass(false)}
                    className="size-6"
                  />
                )}
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-br from-indigo-900 to-purple-900 hover:to-indigo-900 hover:from-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
            <p className="px-3">
              Alredy have account?{" "}
              <NavLink to="/login" className="text-blue-800">
                Log In
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      {showOtp && (
        <OTPField setShowOtp={setShowOtp} findOtpCode={findOtpCode} />
      )}
    </>
  );
}

export default Register;
