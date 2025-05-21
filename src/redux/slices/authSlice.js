import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  signUpToken: null,
  forgotPasswordToken: null,
  resetPasswordToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setSignUpToken: (state, action) => {
      state.signUpToken = action.payload;
    },
    setResendSignUpToken: (state, action) => {
      state.resendSignUpToken = action.payload;
    },
    setForgotPasswordToken: (state, action) => {
      state.forgotPasswordToken = action.payload;
    },
    setResetPasswordToken: (state, action) => {
      state.resetPasswordToken = action.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    clearSignUpToken: (state) => {
      state.signUpToken = null;
    },
    clearResendSignUpToken: (state) => {
      state.resendSignUpToken = null;
    },
    clearResetPasswordToken: (state) => {
      state.resendSignUpToken = null;
    },
    clearForgotPasswordToken: (state) => {
      state.forgotPasswordToken = null;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.signUpToken = null;
      state.resendSignUpToken = null;
      state.forgotPasswordToken = null;
      state.resetPasswordToken = null;
      state.userInfo = null;
    },
  },
});

export const {
  setAccessToken,
  setSignUpToken,
  setForgotPasswordToken,
  setResendSignUpToken,
  setResetPasswordToken,
  clearResetPasswordToken,
  clearAccessToken,
  clearSignUpToken,
  clearResendSignUpToken,
  clearForgotPasswordToken,
  clearAuth,
  setUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
