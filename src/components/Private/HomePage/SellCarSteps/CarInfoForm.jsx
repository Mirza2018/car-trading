"use client";

import { Form, Input, Radio, Button, Steps, message } from "antd";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function CarInfoForm({ current, setCurrent }) {
  const [licensePlate, setLicensePlate] = useState("");
  const [error, setError] = useState("");
  console.log(current);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    if (!values.km) {
      return message.error("Please Enter Number of kilometers driven");
    }
    if (!values.bilens) {
      return message.error("Please Check Bilens Stands Field");
    }
    if (!values.service) {
      return message.error("Please Check Bilens Service Field");
    }
    if (!values.kstra) {
      return message.error("Please Check kstra udstyr Field");
    }

    if (!values.price) {
      return message.error("Please Enter Price Amount");
    }

      localStorage.setItem("car-field1", JSON.stringify(values));
    setCurrent(current + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-[40px] font-bold  text-start text-black">
        Car information
      </h1>

      <Form layout="vertical" onFinish={handleSubmit}>
        {/* License Plate */}
        <Form.Item
          label={<span className="font-medium">License plate *</span>}
          required={false}
          validateStatus={error ? "error" : ""}
          help={error}
          name="license"
        >
          <div className="relative">
            <Input
              required
              placeholder="License plate Number"
              defaultValue={licensePlate}
              //   onChange={handleLicensePlateChange}
              className="pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        </Form.Item>
        {/* Number of kilometers driven */}
        <div className="text-start">
          <Form.Item
            required
            name="km"
            label={
              <span className="font-medium">Number of kilometers driven</span>
            }
          >
            <Input.OTP className="" length={6} />
          </Form.Item>{" "}
        </div>
        {/* Condition Ratings */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 text-start">
          <Form.Item
            name="bilens"
            label={
              <span className="font-medium mb-2 text-green-600">
                Bilens Stands
              </span>
            }
          >
            <Radio.Group className=" flex flex-col gap-2">
              <Radio value="sommy">Sommy</Radio>
              <Radio value="god">God</Radio>
              <Radio value="brugt">Brugt</Radio>
              <Radio value="meget_brugt">Meget brugt</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="service"
            label={
              <span className="font-medium mb-2 text-green-600">Service</span>
            }
          >
            <Radio.Group className=" flex flex-col gap-2">
              <Radio value="sommy">Sommy</Radio>
              <Radio value="god">God</Radio>
              <Radio value="brugt">Brugt</Radio>
              <Radio value="meget_brugt">Meget brugt</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="kstra"
            label={
              <span className="font-medium mb-2 text-green-600">
                kstra udstyr
              </span>
            }
          >
            <Radio.Group className=" flex flex-col gap-2">
              <Radio value="sommy">Sommy</Radio>
              <Radio value="god">God</Radio>
              <Radio value="brugt">Brugt</Radio>
              <Radio value="meget_brugt">Meget brugt</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {/* Expected Price */}

        <div className="text-start">
          <Form.Item
            name="price"
            label={<span className="font-medium">Expected price (DKK)</span>}
          >
            <Input.OTP required className="!w-12 !h-12" length={6} />
          </Form.Item>{" "}
        </div>
        {/* Additional Comments */}
        <Form.Item
          name="comments"
          label={<span className="font-medium">Additional comments</span>}
        >
          <Input.TextArea rows={4} placeholder="20000" className="bg-gray-50" />
        </Form.Item>
        {/* Submit Button */}
        <Form.Item>
          {/* {current < Steps.length - 1 && ( */}
          <Button
            // onClick={}
            type="primary"
            htmlType="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 border-none h-12 text-base font-medium"
          >
            Go to the next step
          </Button>
          {/* )} */}
        </Form.Item>
      </Form>
    </div>
  );
}
