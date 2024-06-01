import { createSlice } from "@reduxjs/toolkit";

const optionDataSlice = createSlice({
  name: "optionData",
  initialState: {
    men: { brands: [], categories: [], gender: "", details: {}, sizes: [] },
    women: { brands: [], categories: [], gender: "", details: {}, sizes: [] },
    unisex: { brands: [], categories: [], gender: "", details: {}, sizes: [] },
  },
  reducers: {
    changeOptionData: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeOptionData } = optionDataSlice.actions;
export default optionDataSlice;
