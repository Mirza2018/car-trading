import { AllImages } from "@/assets/AllImages";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import { Button, Form, Input, Radio, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import React, { useRef, useState } from "react";

const SellCarAllDetails = () => {
  const [isCompany, setIsCompany] = useState(true);
  const [form] = useForm();
  const { TextArea } = Input;
  const inputRef = useRef(null);

  const handleEditClick = () => {
    // For Ant Design's Input, the ref points to the component instance.
    // Access the underlying DOM input element via `inputRef.current.input`
    const inputValue = inputRef.current?.input?.value;
    console.log("Input value:", inputValue);
    // Do something with inputValue...
  };
  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };
  const onFinish = (values) => {
    console.log(values);
    form.resetFields();
  };
  return (
    <div className="container mx-auto my-12">
      <h1 className="text-4xl font-bold">The car&apos;s information</h1>
      <div className="h1 w-full border-t border-text-light-color my-5"></div>
      <h1 className="text-2xl font-bold mb-5">Number plate*</h1>
      <div className="text-center mb-3 w-[600px]">
        <Input
          //  ref={inputRef}
          placeholder="Enter license plate"
          className=""
          suffix={
            <div
              //  onClick={handleEditClick}
              className="bg-highlight-color  rounded py-2 px-8 cursor-pointer"
            >
              Edit
            </div>
          }
          prefix={
            <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-7">
              <Image
                width={0}
                height={0}
                alt="search"
                src={AllImages.star}
                className="w-7"
              />
              <Image
                width={0}
                height={0}
                alt="search"
                className="w-6"
                src={AllImages.dk}
              />
            </div>
          }
        />
      </div>
      <p className="mt-2 text-lg font-medium">
        TESLA Model Y, Hatchback, 393 KW
      </p>
      <Form form={form} onFinish={onFinish}>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2 ">
              Number of kilometers driven*
            </p>
            <Form.Item
              name={`km`}
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input
                placeholder="Enter Number of kilometers driven"
                className="py-3"
              />
            </Form.Item>
          </div>
          <div className="flex-1 ">
            <p className="text-2xl font-medium pb-2 ">
              Number of varnish fields*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
              name={`varnish`}
              className=""
            >
              <Input
                placeholder="Enter  Number of varnish fields"
                className="py-3"
              />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Additional equipment*</p>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select one!",
                },
              ]}
              name="equipment"
            >
              <Radio.Group className=" flex flex-col gap-2">
                <Radio value="Automatic transmission">
                  Automatic transmission*
                </Radio>
                <Radio value="Trailer hitch">Trailer hitch</Radio>
                <Radio value="Extra wheel set">Extra wheel set</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">
              The condition of the car*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select one!",
                },
              ]}
              name={`carCondition`}
            >
              <Radio.Group name="bilens" className=" flex  gap-2">
                <Radio value="good">Good</Radio>
                <Radio value="used">Used</Radio>
                <Radio value="veryUsed">Very used</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-medium pb-2">
            Defects or other comments*
          </p>
          <Form.Item name={`comments`}>
            <TextArea
              placeholder="Defects or other comments"
              rows={4}
              className="py-3"
            />
          </Form.Item>
        </div>
        <div className="my-[10px] flex justify-between gap-5 items-center">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Expected price (DKK)*</p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
              name={`expectedPrice`}
            >
              <Input placeholder="Expected price (DKK)" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            {/* <p className="text-2xl font-medium pb-2">Number of varnish fields</p> */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select one Image!",
                },
              ]}
              name="images"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                multiple="true"
                onChange={handleUploadChange}
                name="files"
                // action="/upload.do"
              >
                <p className="flex justify-center items-center">
                  <Image
                    src={AllImages.dragger}
                    width={48}
                    height={48}
                    alt="Drag and Drop Icon"
                  />
                </p>
                <p className="ant-upload-text">
                  Drag and drop up to 10 images here
                </p>
                <p className="ant-upload-text">or click to upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>
        <div name="type" className=" flex  gap-10 my-8">
          <div
            onClick={() => setIsCompany(true)}
            value="company"
            className="text-3xl flex justify-center items-center gap-2  cursor-pointer"
          >
            <div
              className={`w-5 aspect-square rounded-full border-4 border-white
                  ${isCompany ? "bg-violet-500 " : " "}
                   ring-2 ring-violet-500 `}
            ></div>
            Company
          </div>
          <div
            onClick={() => setIsCompany(false)}
            value="Private"
            className="text-3xl flex justify-center items-center gap-2  cursor-pointer"
          >
            <div
              className={`w-5 aspect-square rounded-full border-4 border-white
                  ${isCompany ? " " : " bg-violet-500"}
                   ring-2 ring-violet-500 `}
            ></div>
            Private
          </div>
        </div>

        <h1 className="text-4xl font-bold">Contact information</h1>
        <div className="h1 w-full border-t border-text-light-color my-5"></div>
        <h1 className="text-xl font-medium mb-5">
          To provide you with the best offer for your car, we recommend
          uploading a few pictures of your car to us. You can find some examples
          of the angles we would like of your car.
        </h1>

        {isCompany ? (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">Company Name*</p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name={`company`}
              >
                <Input placeholder="Company Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">CVR Number*</p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name={`cvr`}
              >
                <Input placeholder="CVR Number" className="py-3" />
              </Form.Item>
            </div>
          </div>
        ) : (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">First Name*</p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name={`firstName`}
              >
                <Input placeholder="First Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">Last Name*</p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name={`lastName`}
              >
                <Input placeholder="Last Name" className="py-3" />
              </Form.Item>
            </div>
          </div>
        )}

        <div className="my-[10px] flex justify-between gap-5">
          <div className="">
            <p className="text-2xl font-medium pb-2">Postal Code*</p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
              name={`postalCode`}
            >
              <Input placeholder="Postal Code" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">City*</p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
              name={`city`}
            >
              <Input placeholder="City" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="">
          <p className="text-2xl font-medium pb-2">Phone Number*</p>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
            name={`phoneNumber`}
          >
            <Input placeholder="Phone Number" className="py-3" />
          </Form.Item>
        </div>

        <div className="text-center">
          <button
            className="bg-highlight-color text-white text-2xl font-medium  py-5 px-20 rounded-lg "
            htmlType="submit"
          >
            Create Listing
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SellCarAllDetails;
