import React, { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { foundUser } from "../../shope/user";
import { toast } from "react-toastify";
import EmailField from "./EmailField";
import { updateEmail } from "../../shope/email";
import OTPField from "./OTPField";
import ChangePass from "./ChangePass";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pass, setPass] = useState(true);
  const email = useRef("");
  const [showemail, setShowEmail] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const password = useRef("");
  const mail = useSelector((state) => state.email);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const out = await axios.post("/api/user/login", {
        email: email.current.value,
        password: password.current.value,
      });
      console.log("data is", out?.data?.data);
      dispatch(foundUser(out?.data?.data));
      navigate("/");
      toast.success(out?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const loginWithGoogle = () => {
    window.open("/api/user/google/login", "_self");
  };

  const sendEmail = async (data) => {
    try {
      console.log("yahu");
      const responce = await axios.post("/api/user/forgot-password", {
        email: data,
      });
      if (responce.data.data.data) {
        dispatch(updateEmail(data));
        setShowEmail(false);
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const findOtpCode = async (code) => {
    try {
      const response = await axios.post("/api/user/forgot-password-otp", {
        otp: code,
      });
      if (response.data.data.data) {
        toast.success("Otp verification successfull");
        setShowOtp(false);
        setShowChangePass(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendPassword = async (data) => {
    try {
      const response = await axios.post("/api/user/change-password", {
        email: mail,
        password: data,
      });
      if (response.data) {
        toast.success("password change successfully");
        setShowChangePass(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="min-h-[90vh] flex justify-center items-center bg-[url('./1slider3.jpg')] bg-cover bg-center">
        <div className="brightness-50 absolute top-16  inset-0">
          <img
            src="./1slider3.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white z-10 relative min-w-[30vw] min-h-[50vh] p-8 rounded-md shadow-lg dark:shadow-slate-600">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Login
          </h2>
          <form
            onSubmit={submitLogin}
            className="space-y-4 mt-10 flex flex-col gap-1"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                ref={email}
                placeholder="Enter a email"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={pass ? "password" : "text"}
                ref={password}
                placeholder="Enter a Password"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
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
              <p
                className="text-sm -my-1 text-red-700 cursor-pointer text-end"
                onClick={() => setShowEmail(true)}
              >
                forgot password
              </p>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className=" py-2 w-full px-16 border rounded-md shadow-sm text-white bg-gradient-to-br from-indigo-700 to-purple-900 hover:to-indigo-700 hover:from-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
            <p className="px-3">
              Don't have account?{" "}
              <NavLink to="/register" className="text-blue-800">
                Sign up
              </NavLink>
            </p>
            <button
              type="button"
              className="flex items-center gap-8 bg-gradient-to-br from-pink-950 to-purple-950 text-white rounded-md p-2 hover:to-pink-950 hover:from-purple-950"
              onClick={loginWithGoogle}
            >
              <img
                src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                className="w-10"
              />
              Log In With Google
            </button>
          </form>
        </div>
      </div>
      {showemail && (
        <EmailField setShowEmail={setShowEmail} sendEmail={sendEmail} />
      )}
      {showOtp && (
        <OTPField setShowOtp={setShowOtp} findOtpCode={findOtpCode} />
      )}
      {showChangePass && (
        <ChangePass
          setShowChangePass={setShowChangePass}
          sendPassword={sendPassword}
        />
      )}
    </>
  );
}

export default Login;
