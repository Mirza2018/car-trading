"use client";
import { Checkbox, Button, Input, Form, Typography, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const navigate = useRouter(); // useNavigate hook for navigation

  const onFinish = (values) => {
    console.log("car-trading:", values);
    localStorage.removeItem("car-trading_user");
    localStorage.setItem("car-trading_user", JSON.stringify(values));
    navigate.push("/"); // Correct use of navigate function
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
                <Select.Option value="admin">Admin</Select.Option>
                {/* <Select.Option value="mvr">MVR </Select.Option>
                <Select.Option value="user">User </Select.Option> */}
              </Select>
            </Form.Item>
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
        </div>
      </div>
    </div>
  );
};
export default SignIn;
