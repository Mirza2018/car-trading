import { Button, ConfigProvider, Form, Input, Typography, Upload } from "antd";

import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import { AllImages } from "@/assets/AllImages";
import React from "react";
import Image from "next/image";

const Profile = () => {
  const profileData = {
    firstName: "James",
    lastName: "Mitchell",
    phoneNumber: "+99-01846875456",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    websiteLink: "www.emily.com",
    crvNumber: "CRV-123456",
    rgeNr: "RGE-123456",
    kontoNr: "Konto-123456",
  };
  const [imageUrl, setImageUrl] = useState(AllImages.profile);
  const [companyImageUrl, setCompanyImageUrl] = useState(AllImages.car);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(AllImages.profile); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };
  const handleCompanyImageUpload = (info) => {
    if (info.file.status === "removed") {
      setCompanyImageUrl(AllImages.profile); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setCompanyImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(imageUrl);
  };
  return (
    <div className=" ">
      <Form onFinish={onFinish} layout="vertical" className=" ">
        <div className="">
          <div className="mt-5 flex flex-row justify-between ">
            <div className=" ">
              <Image
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                width={0}
                height={0}
                alt=""
              />

              <Form.Item name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="  text-end"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-white p-2 w-fit h-fit  shadow !border-none  absolute -top-12 left-32   rounded-full"
                  >
                    <IoCameraOutline className="w-6 h-6 " />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div>
              <button className="text-black border border-secondary-color hover:bg-green-600 hover:text-white hover:border-none transition-all rounded-md px-6 py-4 text-lg font-medium ">
                Change Password
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                First Name
              </Typography.Title>
              <Form.Item
                initialValue={profileData.firstName}
                name="firstName"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your First Name"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Last Name
              </Typography.Title>
              <Form.Item
                initialValue={profileData.lastName}
                name="lastName"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Last Name"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Phone Number
              </Typography.Title>
              <Form.Item
                initialValue={profileData.phoneNumber}
                name="phoneNumber"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your phoneNumber"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Website Link
              </Typography.Title>
              <Form.Item
                initialValue={profileData.websiteLink}
                name="websiteLink"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Website Link"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Address
              </Typography.Title>
              <Form.Item
                initialValue={profileData.address}
                name="address"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Address"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profileData.email}
                name="email"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Email"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profileData.email}
                name="phoneNumber"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Email"
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div className=" flex justify-center items-center">
              <Image
                className="h-20 w-20 relative rounded-full border border-secondary-color object-contain "
                src={companyImageUrl}
                width={0}
                height={0}
                alt=""
              />

              <Form.Item name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  onChange={handleCompanyImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="  text-end noText "
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-white p-1 w-fit h-fit  shadow !border-none  absolute right-0.5 -bottom-8   rounded-full"
                  >
                    <IoCameraOutline className="w-4 h-4 " />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="w-fit flex  gap-5">
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Rge Nr.
              </Typography.Title>
              <Form.Item
                initialValue={profileData.rgeNr}
                name="rgeNr"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your Rge Nr."
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Konto Nr.
              </Typography.Title>
              <Form.Item
                initialValue={profileData.kontoNr}
                name="kontoNr"
                className="text-white"
              >
                <Input
                  required
                  placeholder="Enter your  Konto Nr."
                  className="py-2 px-3 text-xl border !border-input-color  !bg-transparent"
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-end gap-3">
          <button className="text-secondary-color border border-secondary-color hover:bg-highlight-color hover:text-white hover:border-none transition-all rounded-md px-6 py-4 text-lg font-medium ">
            Save Changes
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
