import React, { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { foundUser } from "../../shope/user";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pass, setPass] = useState(true);
  const username = useRef("");
  const password = useRef("");

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const out = await axios.post("/api/user/login", {
        email: username.current.value,
        password: password.current.value,
      });
      dispatch(foundUser(out?.data?.data));
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };
  const loginWithGoogle = () => {
    window.open("/api/user/google/login", "_self");
  };
  return (
    <>
      <div className="min-h-[75vh] m-5 flex justify-center items-center">
        <div className="bg-white min-w-[30vw] min-h-[50vh] p-8 rounded-md shadow-lg dark:shadow-slate-600">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Login
          </h2>
          <form
            onSubmit={submitLogin}
            className="space-y-4 mt-10 flex flex-col gap-1"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={username}
                name="username"
                className="my-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-200"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={pass ? "password" : "text"}
                id="password"
                name="password"
                ref={password}
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
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-br from-indigo-700 to-purple-900 hover:to-indigo-700 hover:from-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    </>
  );
}

export default Login;
