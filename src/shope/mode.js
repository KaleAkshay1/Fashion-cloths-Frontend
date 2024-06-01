import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "darkMode",
  initialState: false,
  reducers: {
    modeChange: (state, action) => {
      return !state;
    },
  },
});

export const { modeChange } = modeSlice.actions;
export default modeSlice;
