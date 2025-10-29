"use client";
import { AllImages } from "@/assets/AllImages";
import {
  useForgetOtpVerifyMutation,
  useResendOTPMutation,
} from "@/redux/api/features/authApi";
import {
  clearAuth,
  clearForgotPasswordToken,
  clearResendSignUpToken,
  setForgotPasswordToken,
  setResetPasswordToken,
} from "@/redux/slices/authSlice";
import { Button, Form } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const ForgotOtp = () => {
  const [varifyOtp] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendOTPMutation();
  const [otp, setOtp] = useState("");
  const navigate = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const resendToken = useSelector((state) => state.auth.resendSignUpToken);

  // const userInfo = useSelector((state) => state.auth.resendSignUpToken);
  console.log("yes yes", resendToken);

  const handleResendOtp = async () => {
    // dispatch(clearForgotPasswordToken());
    dispatch(setResetPasswordToken(resendToken));
    const data = {
      purpose: "forget-password",
    };
    const toastId = toast.loading("OTP sendes igen…");
    try {
      const res = await resendOtp(data).unwrap();
      dispatch(clearForgotPasswordToken());
      dispatch(setForgotPasswordToken(resendToken));
      console.log(res);
      toast.success("OTP sendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.error("RedendOTP Error:", error); // Log the error for debugging

      toast.error(
        "Der opstod en fejl under genafsendelse af OTP, prøv venligst senere",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const handleOTPSubmit = async () => {
    dispatch(clearResendSignUpToken());
    const toastId = toast.loading("OTP indsendes…");
    console.log("OTP:", otp);
    const data = { otp: Number(otp) };

    try {
      const res = await varifyOtp(data).unwrap();

      // dispatch(setSignUpToken(res?.data?.signUpToken));
      console.log(res);

      toast.success("OTP indsendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      dispatch(clearAuth());
      dispatch(setResetPasswordToken(res?.data?.resetPasswordToken));

      navigate.push("/update-password");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        "Der opstod en fejl under registreringen, prøv venligst senere",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] hidden lg:block">
          <Image
            width={0}
            height={0}
            src={AllImages.otpImage}
            alt="forgot_Password_Img"
            className="w-full object-cover rounded-xl aspect-square"
          />
        </div>
        {/* <div className="h-[80vh] w-[2px] bg-[#F5382C] hidden lg:block"></div> */}
        <div className="w-full md:w-[80%] lg:w-[50%]   px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
          <div className=" text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="my-4">
                <Image
                  width={0}
                  height={0}
                  src={AllImages.mailLogo}
                  alt="logo"
                  className="w-full object-cover rounded-xl aspect-square"
                />
              </div>
              <h1 className="text-4xl font-semibold mb-4">Indtast din kode</h1>
              <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                Vi har sendt en kode til din e-mailadresse.
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item name="otp" className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[100px] !h-[100px]  text-4xl sm:text-[30px] bg-transparent border border-input-color
                      hover:border-input-color focus:bg-transparent focus:border-input-color rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color !text-black !border-[#1E1E1E] !bg-white"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    // renderInput={(props) => <input {...props} required />}
                    renderInput={(props) => (
                      <input
                        {...props}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                      />
                    )}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                {/* <p>Modtog du ikke koden?</p>
                <p
                  onClick={handleResendOtp}
                  className="!text-[#F5382C] !underline font-semibold cursor-pointer"
                >
                  Send igen
                </p> */}
                <p>Tilbage til login-siden?</p>
                <p
                  onClick={() => navigate.push("/sign-in")}
                  className="!text-[#F5382C] !underline font-semibold cursor-pointer"
                >
                  Log ind
                </p>
              </div>

              <Form.Item>
                <Button
                  onClick={handleOTPSubmit}
                  type="primary"
                  className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl text-white bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8"
                >
                  Få engangskode (OTP)
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotOtp;
