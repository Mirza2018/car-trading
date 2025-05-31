import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { tagTypesList } from "../tagTypes";


const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    const signUpToken = getState().auth.signUpToken;
    const resendSignUpToken = getState().auth.resendSignUpToken;
    const forgotPassToken = getState().auth.forgotPasswordToken;
    const resetPasswordToken = getState().auth.resetPasswordToken;

    

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (signUpToken) {
      headers.set("authorization", `signUpToken ${signUpToken}`);
    }

    if (forgotPassToken) {
      headers.set("authorization", `forgotPasswordToken ${forgotPassToken}`);
    }
    if (resendSignUpToken) {
      headers.set("authorization", `${resendSignUpToken}`);
    }

    if (resetPasswordToken) {
      headers.set("authorization", `resetPasswordToken ${resetPasswordToken}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
