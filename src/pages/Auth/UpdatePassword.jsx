"use client";
import { AllImages } from "@/assets/AllImages";
import { useResetPasswordMutation } from "@/redux/api/features/authApi";
import { clearAuth } from "@/redux/slices/authSlice";
import { Button, Form, Input, Typography } from "antd";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ChangePassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const toastId = toast.loading("Password is Reseting...");

    try {
      const res = await resetPassword(values).unwrap();

      console.log(res);

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      dispatch(clearAuth());

      // const decodeToken = jwtDecode(res?.data?.accessToken);
      // dispatch(setAccessToken(res?.data?.accessToken));
      // dispatch(setUserInfo(decodeToken));
      // cookies.set("car_trading_accessToken", res?.data?.accessToken);

      navigate.push("/sign-in");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during reset password please try later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-around items-center min-h-screen bg-[#E6F3F7]  ">
      <div className=" hidden lg:block w-full md:w-[80%] lg:w-[30%]">
        <Image
          width={0}
          height={0}
          src={AllImages.updatePass}
          alt="logo"
          className="w-full object-cover rounded-xl aspect-square"
        />
      </div>
      {/* <div className="h-[80vh] w-[2px] bg-[#F5382C] hidden lg:block"></div> */}
      <div className="w-full md:w-[80%] lg:w-[30%] px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
        {/* -------- update Password Page Header ------------ */}
        <div className="flex flex-col justify-center items-center text-center">
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
            <h1 className="text-4xl font-semibold mb-4">Set new password</h1>
            <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
              Your new password must be different to previously used passwords.
            </p>
          </div>
        </div>
        {/* -------- Form Start ------------ */}
        <Form
          layout="vertical"
          className="bg-transparent w-full"
          onFinish={onFinish}
        >
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Password
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "New Password is Required",
              },
            ]}
            name="password"
            className="text-base-color"
          >
            <Input.Password
              placeholder="Enter new password"
              className="py-2 px-3 text-xl bg-site-color border  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !border-[#1E1E1E] !bg-white"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Confirm Password
          </Typography.Title>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            className="text-base-color"
          >
            <Input.Password
              placeholder="Enter your password"
              className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] !bg-white  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl text-white bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              Change password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ChangePassword;
