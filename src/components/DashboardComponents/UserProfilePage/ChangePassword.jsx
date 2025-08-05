import { useChangePasswordMutation } from "@/redux/api/features/authApi";
import { Modal, Form, Input, Typography } from "antd";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ChangePassword = ({ isModalOpen, handleOk, handleCancel }) => {
  const [changePass] = useChangePasswordMutation();
  const [form] = Form.useForm();
 
  const onFinish = async (values) => {
    console.log("Success:", values);

    const toastId = toast.loading("Password is changing...");

    try {
      const res = await changePass(values).unwrap();
      console.log(res);
      toast.success(res?.message || "Password is change successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem changeing problem",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <Modal
      //   title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={1000}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="m-5">
        <div className="col-span-3">
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Nuværende adgangskode
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
            name="oldPassword"
            className="text-white "
          >
            <Input.Password
              placeholder="Enter your Current password"
              className="py-2 px-3 text-xl border !border-input-color "
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Ny adgangskode
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
            ]}
            name="newPassword"
            className="text-white"
          >
            <Input.Password
              placeholder="Enter your new password"
              className="py-2 px-3 text-xl border !border-input-color "
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Indtast ny adgangskode igen
          </Typography.Title>
          <Form.Item
            name="confirmPassword"
            className="text-white"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
          >
            <Input.Password
              placeholder="Again Enter your new password"
              className="py-2 px-3 text-xl border !border-input-color "
            />
          </Form.Item>

          <div className="-mt-4 flex justify-end ">
            {" "}
            <Link
              href={`/settings/forgot-password`}
              className="  w-fit hover:text-secondary-color"
            >
              Forgot Password?
            </Link>
            Glemt adgangskode?
          </div>
        </div>

        <div className="col-span-2 flex justify-end items-end gap-3 mt-10 mg:mt-0 ">
          <p
            onClick={() => {
              handleCancel();
              form.resetFields();
            }}
            className="border cursor-pointer border-[#EF4A00] text-[#EF4A00] hover:border-[#bc4812] transition delay-150 duration-100 py-3 px-8 rounded-xl"
          >
            Annuller
          </p>
          <button
            htmlType="submit"
            className="bg-highlight-color transition delay-150 duration-100 py-3 px-9 rounded-xl text-white"
          >
            Gem
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
