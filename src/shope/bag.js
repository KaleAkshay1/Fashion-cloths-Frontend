import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    addDataInBag: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDataInBag } = bagSlice.actions;
export default bagSlice;
