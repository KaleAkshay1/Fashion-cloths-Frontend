import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./mode";
import userSlice from "./user";
import emailSlice from "./email";
import profileSlice from "./profile";
import productSlice from "./product";
import ownerProductSlice from "./ownersProduct";
import optionDataSlice from "./optionData";
import whishlistSlice from "./whishlist";
import bagSlice from "./bag";
import orderSlice from "./order";

const shope = configureStore({
  reducer: {
    darkMode: modeSlice.reducer,
    user: userSlice.reducer,
    email: emailSlice.reducer,
    profileDropdown: profileSlice.reducer,
    product: productSlice.reducer,
    ownerProducts: ownerProductSlice.reducer,
    optionData: optionDataSlice.reducer,
    whishlist: whishlistSlice.reducer,
    bag: bagSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default shope;
