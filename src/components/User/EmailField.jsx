import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImUser } from "react-icons/im";

function EmailField({ setShowEmail, sendEmail }) {
  const [email, setEmail] = useState("");

  const sendEmailData = (e) => {
    e.preventDefault();
    console.log("run");
    sendEmail(email);
  };

  return (
    <div className=" h-full inset-0 z-50  flex items-center justify-center fixed">
      <div className="h-full w-full opacity-70 absolute bg-black "></div>
      <div className="min-w-[40%] min-h-10 rounded-2xl z-30  flex items-center justify-around flex-col gap-10 p-8 relative bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white">
        <h1 className="text-3xl text-center font-semibold">
          Verify Your Email
        </h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => sendEmailData(e)}
        >
          <div className="relative">
            <ImUser className="absolute top-1 text-slate-100" />
            <input
              className="bg-transparent outline-none border-slate-500 border-b pl-6 focus-visible:border-white"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-black to-blue-800 rounded-full px-10 py-2 text-white hover:bg-slate-900"
            type="submit"
          >
            Get OTP
          </button>
        </form>
        <div
          className="absolute  bg-black top-3 right-3 cursor-pointer p-2 rounded-md hover:bg-slate-900"
          onClick={() => setShowEmail(false)}
        >
          <RxCross2 size={24} />
        </div>
      </div>
    </div>
  );
}

export default EmailField;
