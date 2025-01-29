"use client";
import Dragger from "antd/es/upload/Dragger";
import { useState, useCallback } from "react";
import { FaCar } from "react-icons/fa";
import { BsFillCloudUploadFill } from "react-icons/bs";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { Button, Form } from "antd";

export default function CarImageForm({ current, setCurrent }) {
  const [isDragging, setIsDragging] = useState(false);

  //   const handleDragOver = useCallback((e) => {
  //     e.preventDefault();
  //     setIsDragging(true);
  //   }, []);

  //   const handleDragLeave = useCallback((e) => {
  //     e.preventDefault();
  //     setIsDragging(false);
  //   }, []);

  //   const handleDrop = useCallback((e) => {
  //     e.preventDefault();
  //     setIsDragging(false);
  //     // Handle file drop here
  //   }, []);
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // if (!values.km) {
    //   return message.error("Please Enter Number of kilometers driven");
    // }
    // if (!values.bilens) {
    //   return message.error("Please Check Bilens Stands Field");
    // }
    // if (!values.service) {
    //   return message.error("Please Check Bilens Service Field");
    // }
    // if (!values.kstra) {
    //   return message.error("Please Check kstra udstyr Field");
    // }

    // if (!values.price) {
    //   return message.error("Please Enter Price Amount");
    // }

    localStorage.setItem("car-field2", JSON.stringify(values));
    setCurrent(current + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h2 className="text-2xl font-semibold mb-2 text-start text-black">
        Upload pictures of the car (optional)
      </h2>
      <p className="text-black text-start leading-none mb-6 mt-2">
        of your car to us. You can find a few examples of the angles we would
        like of your car.
      </p>
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Upload Area */}
        <Form.Item name="Image">
          <Dragger
          // onDragOver={handleDragOver}
          // onDragLeave={handleDragLeave}
          // onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <BsFillCloudUploadFill className="text-3xl text-gray-400" />
              <p className="text-gray-600">
                Drag and drop your files here or click to upload
              </p>
            </div>
          </Dragger>
        </Form.Item>

        {/* Examples Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-start mt-10">Examples</h3>
          <p className="leading-none text-start">
            Her ser du et par eksempler på vinkler af din bil, som vi gerne vil
            have billeder af.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Example Cards */}
            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx1} alt="car" width={0} height={0} />
              {/* <FaCar className="w-8 h-8" /> */}
              {/* <p className="text-sm">Pictures from the front</p> */}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx2} alt="car" width={0} height={0} />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx3} alt="car" width={0} height={0} />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx4} alt="car" width={0} height={0} />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx5} alt="car" width={0} height={0} />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center gap-3">
              <Image src={AllImages.carEx6} alt="car" width={0} height={0} />
            </div>
          </div>

          <Button
            // onClick={}
            type="primary"
            htmlType="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 border-none h-12 text-base font-medium"
          >
            Go to the next step
          </Button>
        </div>
      </Form>
    </div>
  );
}
