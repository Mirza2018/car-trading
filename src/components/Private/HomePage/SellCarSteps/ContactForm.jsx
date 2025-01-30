"use client";

import { Form, Input, Button } from "antd";

export default function ContactForm({ current, setCurrent }) {
  const onFinish = (values) => {
    // console.log("Success:", values);
    const field1 = JSON.parse(localStorage.getItem("car-field1"));
    const field2 = JSON.parse(localStorage.getItem("car-field2"));
    let data = {...field1, ...field2, ...values};
    console.log(data);

    
    // localStorage.setItem("car-field3", JSON.stringify(values));
    // setCurrent(current + 1);
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-start text-black">
      <h1 className="text-2xl font-bold mb-2">Contact information</h1>
      <p className=" leading-7 my-6">
        To provide you with the best offer for your car, we recommend uploading
        a few pictures of your car to us. You can find some examples of the
        angles we would like of your car.
      </p>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="font-medium">First Name*</span>}
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="License plate Number" className="bg-gray-50" />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">Last Name*</span>}
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="License plate Number" className="bg-gray-50" />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-medium">Email Address*</span>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="License plate Number" className="bg-gray-50" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label={<span className="font-medium">Postal Code*</span>}
            name="postalCode"
            rules={[
              { required: true, message: "Please input your postal code!" },
            ]}
          >
            <Input placeholder="Postal Code" className="bg-gray-50" />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">City*</span>}
            name="city"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input placeholder="City" className="bg-gray-50" />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-medium">Phone Number*</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" className="bg-gray-50" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 border-none h-12 text-base font-medium"
          >
            Create Listing
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
