"use client";
import { Checkbox, Button, Input, Form, Typography, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/redux/api/features/authApi";
import { toast } from "sonner";
import { useState } from "react";
import {
  clearAccessToken,
  clearAuth,
  clearForgotPasswordToken,
  setResendSignUpToken,
  setSignUpToken,
} from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [userSignUp] = useSignUpMutation();
  const [role, setRole] = useState(null);
  const handleRoleChange = (value) => {
    setRole(value); // Update role state when the value changes
  };
  const [form] = Form.useForm();
  const navigate = useRouter(); // useNavigate hook for navigation
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    dispatch(clearAuth());
    const toastId = toast.loading(" Sign Up...");
    console.log("car-trading sign up values", values);

    // return;

    try {
      const res = await userSignUp(values).unwrap();

      dispatch(setSignUpToken(res?.data?.signUpToken));
      dispatch(setResendSignUpToken(res?.data?.signUpToken));
      console.log(res?.data?.signUpToken);

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });

      navigate.push("/verify-otp");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during registration please try later",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className=" bg-[#E6F3F7]">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
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
              <h1 className="text-4xl font-semibold mb-4 ">
                Create an account
              </h1>
              {/* <p className="text-base font-normal  mb-2 text-[#1E1E1E] ">
                Welcome back! Please enter your details.
              </p> */}
            </div>
          </div>
          {/* -------- Form Start ------------ */}

          <Form
            form={form}
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              First Name
            </Typography.Title>
            <Form.Item
              name="first_name"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "First name is Required",
                },
              ]}
            >
              <Input
                placeholder="Enter your first name"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Last Name
            </Typography.Title>
            <Form.Item
              name="last_name"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Last name is Required",
                },
              ]}
            >
              <Input
                placeholder="Enter your last name"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

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
                placeholder="Enter your email"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
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
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Confirm Password
            </Typography.Title>
            <Form.Item
              name="confirmPassword"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Confirm Your Password",
                },
                // Validator to check if confirm password matches password
                {
                  validator: (_, value) => {
                    const password = form.getFieldValue("password"); // Get password value dynamically
                    if (!value) {
                      return Promise.reject("Please confirm your password");
                    }
                    if (value !== password) {
                      return Promise.reject("Passwords do not match");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Your Password"
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Role
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="text-white"
            >
              <Select
                onChange={handleRoleChange}
                placeholder="Select Role"
                suffixIcon={
                  <DownOutlined className="text-[#222222] text-xl  mt-1" />
                }
                className="h-12 text-xl bg-site-color  text-base-color   "
              >
                <Select.Option value="dealer">Dealer</Select.Option>
                <Select.Option value="private_user">Private User</Select.Option>
              </Select>
            </Form.Item>

            {role === "dealer" && (
              <>
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Do you want to use transport?
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true }]}
                  name="isUseTransport"
                  className="text-white"
                >
                  <Select
                    placeholder="Do you want to use transport? "
                    suffixIcon={
                      <DownOutlined className="text-[#222222] text-xl  mt-1" />
                    }
                    className="h-12 text-xl bg-site-color  text-base-color   "
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Form.Item>

                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Company Name
                </Typography.Title>
                <Form.Item
                  name="companyName"
                  className="text-base-color"
                  rules={[
                    {
                      required: true,
                      message: "Company name is Required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your company name"
                    className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
                  />
                </Form.Item>
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  CVR Number
                </Typography.Title>
                <Form.Item
                  name="cvrNumber"
                  className="text-base-color"
                  rules={[
                    {
                      required: true,
                      message: " CVR Number is Required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your  CVR Number"
                    className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
                  />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl  bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8 "
                htmlType="submit"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className=" mb-5 flex justify-center items-center gap-2">
            <p>Do you have an account?</p>
            <Link className="text-[#FF991C] font-bold text-lg" href="sign-in">
              Sign In
            </Link>
          </div>
        </div>

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
      </div>
    </div>
  );
};
export default SignUp;
