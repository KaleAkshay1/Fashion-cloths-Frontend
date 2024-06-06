import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";

function PersonalInfo() {
  const avatar = useRef(null);
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(user?.profile_image);

  const handelAvatarClick = () => {
    avatar.current.click();
  };

  const handelAvatarChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };
  return (
    <form action="">
      <div className="relative inline-block">
        <img
          className="h-28 w-28 rounded-full"
          src={image ? image : "./kids.png"}
          alt=""
        />
        <div
          className="w-10 h-10 absolute bottom-0 cursor-pointer right-0 rounded-full flex justify-center items-center bg-blue-600"
          onClick={handelAvatarClick}
        >
          <FaPen color="white" />
          <input
            type="file"
            onChange={(event) => handelAvatarChange(event)}
            ref={avatar}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="flex mt-5 items-center justify-between">
        <div className="flex flex-col gap-2 w-[45%]">
          <label htmlFor="" className="dark:text-white">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter a First Name"
            className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-2 w-[45%]">
          <label htmlFor="" className="dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter a Last Name"
            className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label className="dark:text-white">Email</label>
        <input
          type="email"
          placeholder="Enter a Email"
          className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          value={user.email}
        />
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label className="dark:text-white">Mobile Number</label>
        <input
          type="email"
          placeholder="Enter a Mobile Number"
          className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          value={user?.mobile}
        />
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="dark:text-white">
          Gender
        </label>
        <select className="p-2  rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white">
          <option value={user.gender ? user.gender : ""}>
            {user.gender ? user.gender : "Select"}
          </option>
          {["Women", "Men", "Unisex"].map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>

      <br />

      <button className="border mt-2 px-10 py-1 bg-slate-800 dark:bg-slate-100 dark:text-black text-white rounded-lg">
        UPDATE
      </button>
    </form>
  );
}

export default PersonalInfo;
