"use client";
import { Checkbox, Button, Input, Form, Typography, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

import { toast } from "sonner";
import { useUserLoginMutation } from "@/redux/api/features/authApi";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "@/redux/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [userLogin] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const cookies = new Cookies();

  const onFinish = async (values) => {
    const toastId = toast.loading(" Logging in...");
    console.log("car-trading:", values);

    try {
      const res = await userLogin(values).unwrap();
      const decodeToken = jwtDecode(res?.data?.accessToken);

      dispatch(setAccessToken(res?.data?.accessToken));
      dispatch(setUserInfo(decodeToken));
      console.log("res: ", res, decodeToken);
      cookies.set("car_trading_accessToken", res?.data?.accessToken);
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }

    return;

    document.cookie = `car-trading_user=${encodeURIComponent(
      JSON.stringify(values)
    )}; path=/; secure`;

    navigate.push("/");
  };
  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="hidden lg:block">
          <Image
            priority
            width={0}
            height={0}
            src={AllImages.signinPageImage}
            alt="logo"
            className=" mx-auto"
          />
        </div>
        <div className="w-full md:w-[80%] lg:w-[80%] mx-auto px-10 bg-[#F3F9FB] shadow-lg rounded-xl">
          {/* -------- Sign In Page Header ------------ */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-center mt-5 mb-8">
              <div className="my-4">
                <Image
                  width={0}
                  height={0}
                  src={AllImages.logo}
                  alt="logo"
                  className="h-[60px] w-[245px] mx-auto"
                />
              </div>
              <h1 className="text-4xl font-semibold mb-4 ">Log in</h1>
              <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                Welcome back! Please enter your details.
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
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
            >
              <Input
                autoComplete="email"
                placeholder="Enter your email"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E]  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
              ]}
              name="password"
              className="text-base-color"
            >
              <Input.Password
                autoComplete="current-password"
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>
            {/* <Typography.Title level={4} style={{ color: "#222222" }}>
              Role
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="text-white"
            >
              <Select
                placeholder="Select Role"
                suffixIcon={
                  <DownOutlined className="text-[#222222] text-xl  mt-1" />
                }
                className="h-12 text-xl bg-site-color  text-base-color   "
              >
                <Select.Option value="dealer">Dealer</Select.Option>
                <Select.Option value="user">Private User</Select.Option>
              </Select>
            </Form.Item> */}
            <div className="flex justify-between items-center mt-10">
              <Checkbox className="">Remember me</Checkbox>
              <Link href="/forgot-password" className="!text-[#1E1E1E] ">
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl  bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8 "
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className=" mb-5 flex justify-center items-center gap-2">
            <p>Don’t have an account?</p>
            <Link className="text-[#FF991C] font-bold text-lg" href="sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
