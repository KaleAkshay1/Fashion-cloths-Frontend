import { createSlice } from "@reduxjs/toolkit";

const ownerProductSlice = createSlice({
  name: "ownerProducts",
  initialState: [],
  reducers: {
    axisOwnerProduct: (state, action) => {
      return action.payload;
    },
  },
});

export const { axisOwnerProduct } = ownerProductSlice.actions;
export default ownerProductSlice;
