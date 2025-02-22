"use client";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const OrderTransportPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
          <Form.Item
            className="block"
            label="Company Name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please input your Company Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className=""
            label="Address"
            name="address*"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className=""
            label="Contact Person"
            name="contactPerson"
            rules={[
              {
                required: true,
                message: "Please input your Contact Person!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className=""
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex justify-between flex-wrap gap-5">
          <Form.Item
            className="flex-1"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex-1" label="Additional" name="additional">
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label="CVR"
          name="cvr"
          rules={[
            {
              required: true,
              message: "Please input your CVR!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null} className="flex justify-end">
          <button className="bg-highlight-color text-white font-medium text-xl px-3 py-2 rounded-md" htmlType="submit">
            Register
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderTransportPage;
