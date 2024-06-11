import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

function OTPField({ setShowOtp, findOtpCode }) {
  const email = useSelector((state) => state.email);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpArray = useRef([]);

  useEffect(() => {
    if (otpArray.current[0]) {
      otpArray.current[0].focus();
    }
  }, []);

  const handelInputChange = (event, index) => {
    const value = event.target.value;
    if (isNaN(event.target.value)) return false;
    setOtp([
      ...otp.map((ele, ind) =>
        ind === index ? value.substring(value.length - 1) : ele
      ),
    ]);
    if (event.target.value && index !== otp.length - 1) {
      event.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index]) {
      event.target.previousSibling?.focus();
    }
    if (event.key === "ArrowRight" && index !== otp.length - 1) {
      event.target.nextSibling?.focus();
    }
    if (event.key === "ArrowLeft" && index !== 0) {
      event.target.previousSibling?.focus();
      event.target.setSelectionRange(1, 1);
    }
  };
  const handleFocus = (event) => {
    const length = event.target.value.length;
    event.target.setSelectionRange(length, length);
  };
  const handelClick = (index) => {
    otpArray.current[index].setSelectionRange(1, 1);
  };

  const sendOTP = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      findOtpCode(code);
    } else {
      toast.error("Enter Number in each field", {
        position: "top-center",
      });
    }
  };

  return (
    <div className=" h-full inset-0 z-50  flex items-center justify-center fixed">
      <div className="h-full w-full opacity-70 absolute bg-black "></div>
      <div className="min-w-[40%] min-h-10 rounded-2xl z-30  flex items-center justify-around flex-col gap-10 p-8 relative bg-gradient-to-br from-purple-900 via-purple-700 to-pink-800 text-white">
        <div>
          <h1 className="text-3xl text-center font-semibold">
            Verify Your Email
          </h1>
          <br />
          <p className="w-[450px] text-center text-sm">
            we send 6 digit OTP on your eamil {email} enter code to continue
          </p>
        </div>
        <form className="flex flex-col gap-5" action="">
          <div className="flex gap-5">
            {otp.map((ele, ind) => (
              <input
                key={ind}
                type="text"
                onChange={(e) => handelInputChange(e, ind)}
                value={ele}
                onFocus={(e) => handleFocus(e)}
                onClick={() => handelClick(ind)}
                onKeyDown={(e) => handleKeyDown(e, ind)}
                ref={(element) => (otpArray.current[ind] = element)}
                className="rounded-lg text-black shadow-lg border-2  w-12 p-3"
              />
            ))}
          </div>
          <button
            className="bg-black to-blue-800 rounded-full px-10 py-2 text-white hover:bg-slate-900"
            onClick={(e) => sendOTP(e)}
          >
            Verify OTP
          </button>
        </form>
        <div
          className="absolute  bg-black top-3 right-3 cursor-pointer p-2 rounded-md hover:bg-slate-900"
          onClick={() => setShowOtp(false)}
        >
          <RxCross2 size={24} />
        </div>
      </div>
    </div>
  );
}

export default OTPField;
