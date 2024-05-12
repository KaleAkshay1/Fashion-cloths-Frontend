import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileDropdown",
  initialState: false,
  reducers: {
    profileCheck: (state, action) => {
      return true;
    },
    profileUnCheck: (state, action) => {
      return false;
    },
    changeDropdownStateOfProfile: (state, action) => {
      return !state;
    },
  },
});

export const { profileCheck, profileUnCheck, changeDropdownStateOfProfile } =
  profileSlice.actions;
export default profileSlice;
