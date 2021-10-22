import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: false,
  message: undefined,
  user: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    doLogin() {},

    loginSuccess(state, action) {
      return action.payload;
    },

    loginFail(state, action) {
      return action.payload;
    },

    resetLogin() {
      return initState;
    },
  },
});

export const { doLogin, loginSuccess, loginFail, resetLogin } =
  loginSlice.actions;

export default loginSlice.reducer;
