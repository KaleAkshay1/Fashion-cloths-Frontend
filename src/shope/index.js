import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./mode";
import userSlice from "./user";
import emailSlice from "./email";
import profileSlice from "./profile";
import productSlice from "./product";

const shope = configureStore({
  reducer: {
    darkMode: modeSlice.reducer,
    user: userSlice.reducer,
    email: emailSlice.reducer,
    profileDropdown: profileSlice.reducer,
    product: productSlice.reducer,
  },
});

export default shope;
