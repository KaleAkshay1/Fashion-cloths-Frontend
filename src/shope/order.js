import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addDataInOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDataInOrder } = orderSlice.actions;
export default orderSlice;
