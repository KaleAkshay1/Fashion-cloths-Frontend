import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: { bag: [], _id: "", whishlist: [], user: "" },
  reducers: {
    addDataInUserOrders: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDataInUserOrders } = userOrderSlice.actions;

export default userOrderSlice;
