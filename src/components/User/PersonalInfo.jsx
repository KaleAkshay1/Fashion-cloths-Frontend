import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { foundUser } from "../../shope/user";

function PersonalInfo() {
  const avatar = useRef(null);
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(user?.profile_image);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);
  const [gender, setGender] = useState(user?.gender);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setPhone(user?.phone);
    setGender(user?.gender);
  }, [user]);

  const handleAvatarClick = () => {
    avatar.current.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("email", user.email);
      formData.append("gender", gender);
      if (avatar.current.files[0]) {
        formData.append("profile_image", avatar.current.files[0]);
      }

      const response = await axios.post("/api/user/update-account", formData);

      console.log(response.data.data);
      dispatch(foundUser(response.data.data));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <div className="relative inline-block">
        <img
          className="h-28 w-28 rounded-full"
          src={image ? image : "./defaultProfile.jpeg"}
          alt="Profile"
        />
        <div
          className="w-10 h-10 absolute bottom-0 cursor-pointer right-0 rounded-full flex justify-center items-center bg-blue-600"
          onClick={handleAvatarClick}
        >
          <FaPen color="white" />
          <input
            type="file"
            onChange={handleAvatarChange}
            ref={avatar}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="flex mt-5 items-center justify-between">
        <div className="flex flex-col gap-2 w-[45%]">
          <label htmlFor="firstName" className="dark:text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter a First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-2 w-[45%]">
          <label htmlFor="lastName" className="dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter a Last Name"
            className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter an Email"
          className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          value={user.email}
          readOnly
        />
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="dark:text-white">
          Mobile Number
        </label>
        <input
          type="number"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter a Mobile Number"
          required
          className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
          value={phone}
        />
      </div>

      <br />

      <div className="flex flex-col gap-2">
        <label htmlFor="gender" className="dark:text-white">
          Gender
        </label>
        <select
          id="gender"
          className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value={gender ? gender : ""}>
            {gender ? gender : "Select"}
          </option>
          {["Female", "Male"].map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>

      <br />

      <button
        type="submit"
        className="border mt-2 px-10 py-1 bg-slate-800 dark:bg-slate-100 dark:text-black text-white rounded-lg"
      >
        UPDATE
      </button>
    </form>
  );
}

export default PersonalInfo;
