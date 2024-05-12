import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    foundUser: (state, action) => {
      return action.payload;
    },
    notFoundUser: (state, action) => {
      return {};
    },
  },
});

export const { foundUser, notFoundUser } = userSlice.actions;
export default userSlice;
