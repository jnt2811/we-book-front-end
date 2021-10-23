import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  message: undefined,
  user: {},
};

const signupSlice = createSlice({
  name: "signup",
  initialState: initState,
  reducers: {
    doSignup() {},

    signupSuccess(state, action) {
      return action.payload;
    },

    signupFail(state, action) {
      return action.payload;
    },

    resetSignup() {
      return initState;
    },
  },
});

export const { doSignup, signupSuccess, signupFail, resetSignup } =
  signupSlice.actions;

export default signupSlice.reducer;
