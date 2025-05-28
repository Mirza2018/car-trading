import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // User Login
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    signUp: build.mutation({
      query: (signupData) => ({
        url: `/auth/register`,
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    verifiedEmail: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/verify_email`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    resendOTP: build.mutation({
      query: (resendOtp) => {
        return {
          url: `/auth/resend_otp`,
          method: "POST",
          body: resendOtp,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgetPassword: build.mutation({
      query: (userEmail) => {
        return {
          url: `/auth/forgot_password`,
          method: "POST",
          body: userEmail,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgetOtpVerify: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/verify_otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    // resendForgetOTP: build.mutation({
    //   query: () => {
    //     const token = localStorage.getItem(
    //       "car_trading_forgetPasswordVerifyToken"
    //     );
    //     const decoded = decodedToken(token);
    //     const email = decoded?.email;
    //     return {
    //       url: `/otp/resend-otp`,
    //       method: "PATCH",
    //       body: { email: email },
    //     };
    //   },
    //   invalidatesTags: [tagTypes.user],
    // }),
    resetPassword: build.mutation({
      query: (resetData) => {
        return {
          url: `/auth/reset_password`,
          method: "POST",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    changePassword: build.mutation({
      query: (changepass) => {
        return {
          url: `/auth/change_password`,
          method: "POST",
          body: changepass,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    // myProfile: build.query({
    //   query: () => {
    //     return {
    //       url: `${AUTH_URL}/my-profile`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: [tagTypes.user], // Ensures that the profile data can be invalidated if needed
    // }),
    // getAllUsers: build.query({
    //   query: () => {
    //     return {
    //       url: `${AUTH_URL}/all-users`,
    //       method: "GET",
    //       query: {},
    //     };
    //   },
    //   providesTags: [tagTypes.user], // Ensures that the profile data can be invalidated if needed
    // }),
    // donationUser: build.query({
    //   query: () => {
    //     return {
    //       url: `/donation`,
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});

export const {
  useUserLoginMutation,
  useSignUpMutation,
  useVerifiedEmailMutation,
  useResendOTPMutation,
  useForgetPasswordMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;
