import { createSlice } from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState: [],
  reducers: {
    addDataInWishlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDataInWishlist } = whishlistSlice.actions;

export default whishlistSlice;
