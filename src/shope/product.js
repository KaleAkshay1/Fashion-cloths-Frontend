import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    newProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { newProducts } = productSlice.actions;
export default productSlice;
