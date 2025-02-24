import { Modal, Form, Input, Typography } from "antd";
import Link from "next/link";
import React from "react";

const ChangePassword = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
    handleCancel();
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
      <Form form={form} onFinish={onFinish} layout="vertical" className="">
        <div className="col-span-3">
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Current password
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
            name="currentPassword"
            className="text-white "
          >
            <Input.Password
              placeholder="Enter your Current password"
              className="py-2 px-3 text-xl border !border-input-color "
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            New password
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
            Re-enter new Password
          </Typography.Title>
          <Form.Item
            name="reEnterPassword"
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
            Cancel
          </p>
          <button
            htmlType="submit"
            className="bg-highlight-color transition delay-150 duration-100 py-3 px-9 rounded-xl text-white"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
