import { createSlice } from "@reduxjs/toolkit";

const optionDataSlice = createSlice({
  name: "optionData",
  initialState: {
    subCategory: { men: [], women: [], kids: [] },
    color: [],
    category: [],
    size: [],
    minMaxPrice: {},
  },
  reducers: {
    changeOptionData: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeOptionData } = optionDataSlice.actions;
export default optionDataSlice;
