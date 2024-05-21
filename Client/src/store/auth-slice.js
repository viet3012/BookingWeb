import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogin: false },
  reducers: {
    LOGIN(state, action) {
      state.isLogin = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    LOGOUT(state) {
      state.isLogin = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice;
