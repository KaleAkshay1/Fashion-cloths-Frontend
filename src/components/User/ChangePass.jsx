import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImUser } from "react-icons/im";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useSelector } from "react-redux";

function ChangePass({ setShowChangePass, sendPassword }) {
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(true);
  const email = useSelector((state) => state.email);

  const sendPasswordData = (e) => {
    e.preventDefault();
    sendPassword(password);
  };

  return (
    <div className=" h-full inset-0 z-50  flex items-center justify-center fixed">
      <div className="h-full w-full opacity-70 absolute bg-black "></div>
      <div className="min-w-[40%] min-h-10 rounded-2xl z-30  flex items-center justify-around flex-col gap-10 p-8 relative bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white">
        <div>
          <h1 className="text-3xl text-center font-semibold">
            Enter a New Password
          </h1>
          <p className="text-center">for account {email}</p>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => sendPasswordData(e)}
        >
          <div className="relative">
            <ImUser className="absolute top-1 text-slate-100" />
            <input
              className="bg-transparent outline-none border-slate-500 border-b pl-6 focus-visible:border-white"
              type={!pass ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="cursor-pointer absolute top-1 right-0">
              {!pass ? (
                <IoMdEye onClick={() => setPass(true)} />
              ) : (
                <IoMdEyeOff onClick={() => setPass(false)} />
              )}
            </p>
          </div>
          <button
            className="bg-black to-blue-800 rounded-full px-10 py-2 text-white hover:bg-slate-900"
            type="submit"
          >
            Change Password
          </button>
        </form>
        <div
          className="absolute  bg-black top-3 right-3 cursor-pointer p-2 rounded-md hover:bg-slate-900"
          onClick={() => setShowChangePass(false)}
        >
          <RxCross2 size={24} />
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
