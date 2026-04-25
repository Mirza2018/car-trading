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
  const [isClick, setIsClick] = useState(null);
  const handleRoleChange = (value) => {
    setRole(value); // Update role state when the value changes
  };
  const [form] = Form.useForm();
  const navigate = useRouter(); // useNavigate hook for navigation
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    dispatch(clearAuth());
    const toastId = toast.loading("Tilmeld dig…");
    console.log("car-trading sign up values", values);

    if (isClick) {
      try {
        const res = await userSignUp(values).unwrap();

        dispatch(setSignUpToken(res?.data?.signUpToken));
        dispatch(setResendSignUpToken(res?.data?.signUpToken));
        console.log(res?.data?.signUpToken);

        toast.success("Tilmelding lykkedes", {
          id: toastId,
          duration: 2000,
        });

        navigate.push("/verify-otp");
      } catch (error) {
        console.error("Login Error:", error); // Log the error for debugging

        toast.error(
          "Der opstod en fejl under registreringen, prøv venligst senere",
          {
            id: toastId,
            duration: 2000,
          },
        );
      }
    } else {
      return toast.error("Accepter venligst vilkår og politik ", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  console.log(isClick);

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
                  src={AllImages.logo2}
                  alt="logo"
                  className="h-[60px] w-[245px] mx-auto"
                />
              </div>
              <h1 className="text-4xl font-semibold mb-4 ">Opret en konto</h1>
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
              Fornavn
            </Typography.Title>
            <Form.Item
              name="first_name"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Fornavn er påkrævet.",
                },
              ]}
            >
              <Input
                placeholder="Indtast dit fornavn."
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Efternavn
            </Typography.Title>
            <Form.Item
              name="last_name"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Efternavn er påkrævet.",
                },
              ]}
            >
              <Input
                placeholder="Indtast dit efternavn."
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              E-mail
            </Typography.Title>
            <Form.Item
              name="email"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "E-mail er påkrævet.",
                },
              ]}
            >
              <Input
                placeholder="Indtast din e-mailadresse."
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Adgangskode
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Adgangskode er påkrævet.",
                },
              ]}
              name="password"
              className="text-base-color"
            >
              <Input.Password
                placeholder="Indtast din adgangskode."
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Bekræft adgangskode
            </Typography.Title>
            <Form.Item
              name="confirmPassword"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Bekræft din adgangskode",
                },
                // Validator to check if confirm password matches password
                {
                  validator: (_, value) => {
                    const password = form.getFieldValue("password"); // Get password value dynamically
                    if (!value) {
                      return Promise.reject("Bekræft din adgangskode");
                    }
                    if (value !== password) {
                      return Promise.reject(
                        "Adgangskoderne stemmer ikke overens.",
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="Bekræft dit kodeord."
                className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Rolle
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="text-white"
            >
              <Select
                onChange={handleRoleChange}
                placeholder="Vælg rolle"
                suffixIcon={
                  <DownOutlined className="text-[#222222] text-xl  mt-1" />
                }
                className="h-12 text-xl bg-site-color  text-base-color   "
              >
                <Select.Option value="dealer">Forhandler</Select.Option>
                <Select.Option value="private_user">
                  Privat bruger
                </Select.Option>
              </Select>
            </Form.Item>

            {role === "dealer" && (
              <>
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  Vil du bruge transport?
                </Typography.Title>
                <Form.Item
                  rules={[{ required: true }]}
                  name="isUseTransport"
                  className="text-white"
                >
                  <Select
                    placeholder="Vil du benytte transport? "
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
                  Firmanavn
                </Typography.Title>
                <Form.Item
                  name="companyName"
                  className="text-base-color"
                  rules={[
                    {
                      required: true,
                      message: "Firmanavn er påkrævet.",
                    },
                  ]}
                >
                  <Input
                    placeholder="Indtast dit firmanavn."
                    className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
                  />
                </Form.Item>
                <Typography.Title level={4} style={{ color: "#222222" }}>
                  CVR-nummer
                </Typography.Title>
                <Form.Item
                  name="cvrNumber"
                  className="text-base-color"
                  rules={[
                    {
                      required: true,
                      message: "CVR-nummer er påkrævet.",
                    },
                  ]}
                >
                  <Input
                    placeholder="Indtast dit CVR-nummer."
                    className="py-2 px-3 text-xl bg-site-color border !border-[#1E1E1E] r hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color !bg-white"
                  />
                </Form.Item>
              </>
            )}
            <div className="flex items-center gap-2">
              <Checkbox onChange={(e) => setIsClick(e.target.checked)} />
              <p className="text-sm">
                Jeg accepterer{" "}
                <Link
                  href="/cookie"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  vilkår
                </Link>{" "}
                og{" "}
                <Link
                  href="/private"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  privatlivspolitik
                </Link>
              </p>
            </div>
            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border border-[#FF991C] hover:border-input-colortext-xl  bg-[#FF991C] hover:!bg-[#FF991C] font-semibold rounded-2xl mt-8 "
                htmlType="submit"
              >
                Tilmeld dig
              </Button>
            </Form.Item>
          </Form>
          <div className=" mb-5 flex justify-center items-center gap-2">
            <p>Har du en konto?</p>
            <Link className="text-[#FF991C] font-bold text-lg" href="sign-in">
              Log ind
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
