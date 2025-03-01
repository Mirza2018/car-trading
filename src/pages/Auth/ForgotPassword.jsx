"use client";
import { AllImages } from "@/assets/AllImages";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const navigate = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate.push("/verify-otp");
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
                  Forgot password?
                </h1>
                <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                  No worries, we’ll send you reset instructions.
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
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Enter your email"
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
                  Get OTP
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
