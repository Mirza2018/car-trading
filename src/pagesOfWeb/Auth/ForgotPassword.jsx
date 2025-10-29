"use client";
import { AllImages } from "@/assets/AllImages";
import { useForgetPasswordMutation } from "@/redux/api/features/authApi";
import {
  clearAuth,
  setForgotPasswordToken,
  setResendSignUpToken,
} from "@/redux/slices/authSlice";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [forgotPassEmail] = useForgetPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const onFinish = async (values) => {
    const toastId = toast.loading("Adgangskode nulstilles…");
    console.log("Success:", values);

    try {
      const res = await forgotPassEmail(values).unwrap();
      dispatch(clearAuth());
      console.log("res: ", res?.data?.forgotPasswordToken);
      dispatch(setForgotPasswordToken(res?.data?.forgotPasswordToken));
      // dispatch(setResendSignUpToken(res?.data?.forgotPasswordToken));

      toast.success("Adgangskode nulstillet succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/forgot-otp");
    } catch (error) {
      console.error("Login Error:", error);

      toast.error("Der opstod en fejl under nulstilling af adgangskoden", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen bg-site-color py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] r hidden lg:block">
          <Image
            width={0}
            height={0}
            src={AllImages.ForgotPassword}
            alt="forgot_Password_Img"
            sizes="100vw"
            className="w-full object-cover rounded-xl aspect-square"
          />
        </div>
        {/* <div className="h-[80vh] w-[2px] bg-[#F5382C] hidden lg:block"></div> */}

        <div className="w-full md:w-[80%] lg:w-[50%] px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
          <div className=" text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <div className="my-4">
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.forgotLogo}
                    alt="logo"
                    className="h-[60px] w-[245px] mx-auto"
                  />
                </div>
                <h1 className="text-4xl font-semibold mb-4">
                  Glemt adgangskode?
                </h1>
                <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                  Ingen grund til bekymring, vi sender dig instruktioner til
                  nulstilling.
                </p>
              </div>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "E-mailadresse er påkrævet.",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Indtast din e-mailadresse."
                  type="email"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] !bg-white  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl text-white bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
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
export default ForgotPassword;
