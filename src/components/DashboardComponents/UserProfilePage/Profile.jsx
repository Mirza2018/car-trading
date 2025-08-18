import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
} from "antd";

import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import { AllImages } from "@/assets/AllImages";
import React from "react";
import Image from "next/image";
import ChangePassword from "./ChangePassword";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/features/myProfile";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "@/helpers/config/envConfig";

const Profile = () => {
  const { data, currentData, isLoading, isFetching, isSuccess, refetch } =
    useProfileQuery();
  const [profileUpdate] = useUpdateProfileMutation();
  const displayedData = data ?? currentData;

  // console.log("Update data", displayedData);
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(displayedData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [imageUrl, setImageUrl] = useState(AllImages.profile);
  const [companyImageUrl, setCompanyImageUrl] = useState(AllImages.companyLogo);

  useEffect(() => {
    setImageUrl(getImageUrl() + displayedData?.data?.profile?.profileImage);
    setCompanyImageUrl(
      getImageUrl() + displayedData?.data?.profile?.companyLogo
    );
  }, [displayedData?.data?.profile]);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(AllImages.profile); // Reset to null or fallback image
    } else {
      const file = info.fileList[0].originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };
  const handleCompanyImageUpload = (info) => {
    console.log(info);

    if (info.file.status === "removed") {
      setCompanyImageUrl(AllImages.companyLogo); // Reset to null or fallback image
    } else {
      const file = info.fileList[0].originFileObj || info.file; // Handle the file object safely
      if (file) {
        setCompanyImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Profil opdateres…");

    const data = { ...values };
    delete data.profileImage;
    delete data.companyLogo;
    // console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    console.log(values);

    if (values?.profileImage?.fileList?.[0].originFileObj) {
      const profileImage = values.profileImage?.fileList[0]?.originFileObj;

      console.log(profileImage);
      formData.append("profileImage", profileImage);
    }

    if (values?.companyLogo?.fileList?.[0].originFileObj) {
      const companyLogo = values.companyLogo?.fileList[0].originFileObj;

      console.log(companyLogo);
      formData.append("companyLogo", companyLogo);
    }

    try {
      const res = await profileUpdate({
        fromData: formData,
        userId: userInfo.profile,
      }).unwrap();

      console.log("API Response:", res);
      toast.success("Profil opdateret succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      // refetch();
    } catch (error) {
      console.log(error);

      toast.error("Prøv igen", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <Spin size="large" className="flex justify-center items-center"></Spin>
    );
  }
  return (
    <div className=" ">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={displayedData?.data?.profile}
        className=" "
      >
        <div className="">
          <div className="mt-5 flex md:flex-row flex-col justify-between md:pb-0 pb-5">
            <div className=" ">
              <Image
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                width={500}
                height={500}
                alt=""
              />

              <Form.Item name="profileImage">
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
              <p
                onClick={showModal}
                className="text-black border border-secondary-color hover:bg-green-600 hover:text-white hover:border-none transition-all rounded-md md:px-6 px-2 md:py-4 py-2 text-lg font-medium "
              >
                Skift adgangskode
              </p>
            </div>
          </div>
          <ChangePassword
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Fornavn
              </Typography.Title>
              <Form.Item name="first_name" className="text-white">
                <Input
                  required
                  placeholder="Indtast dit fornavn."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Efternavn
              </Typography.Title>
              <Form.Item name="last_name" className="text-white">
                <Input
                  required
                  placeholder="Indtast dit efternavn."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Telefonnummer
              </Typography.Title>
              <Form.Item name="phoneNumber" className="text-white">
                <Input
                  required
                  placeholder="Indtast dit telefonnummer."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Street
              </Typography.Title>
              <Form.Item name="street" className="text-white">
                <Input
                  required
                  placeholder="Indtast dit gadenavn."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>
            {/* <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Address
              </Typography.Title>
              <Form.Item name="address" className="text-white">
                <Input
                  required
                  placeholder="Enter your Address"
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div> */}
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Zip
              </Typography.Title>
              <Form.Item name="zip" className="text-white">
                <Input
                  required
                  placeholder="Indtast dit postnummer."
                  className="py-2 px-3 text-xl border !border-input-color"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                City{" "}
              </Typography.Title>
              <Form.Item name="city" className="text-white">
                <Input
                  required
                  placeholder="Indtast din bys navn."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Rge nr.
              </Typography.Title>
              <Form.Item name="regNo" className="text-white">
                <Input
                  placeholder="Indtast dit registreringsnummer."
                  className="py-2 px-3 text-xl border !border-input-color  "
                />
              </Form.Item>
            </div>

            <div>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Konto Nr.
              </Typography.Title>
              <Form.Item name="kontoNr" className="text-white">
                <Input
                  placeholder="Indtast dit kontonummer."
                  className="py-2 px-3 text-xl border !border-input-color"
                />
              </Form.Item>
            </div>
          </div>

          {userInfo?.role == "dealer" && (
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Firmanavn
                </Typography.Title>
                <Form.Item name="companyName" className="text-white">
                  <Input
                    required
                    placeholder="Indtast dit firmanavn."
                    className="py-2 px-3 text-xl border !border-input-color  "
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  CVR-nummer
                </Typography.Title>
                <Form.Item name="cvrNumber" className="text-white">
                  <Input
                    required
                    placeholder="Indtast dit CVR-nummer."
                    className="py-2 px-3 text-xl border !border-input-color  "
                  />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Link til hjemmeside
                </Typography.Title>
                <Form.Item name="websiteLink" className="text-white">
                  <Input
                    placeholder="Indtast linket til din hjemmeside."
                    className="py-2 px-3 text-xl border !border-input-color  "
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col  items-center justify-center gap-2">
                <div className=" flex justify-center items-center">
                  <Image
                    className="h-20 w-20 relative rounded-full border border-secondary-color object-contain "
                    src={companyImageUrl}
                    width={500}
                    height={500}
                    alt=""
                  />

                  <Form.Item name="companyLogo">
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
                <p>Skift firmalogo</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end items-end gap-3 mt-10">
          <button className="text-secondary-color border border-secondary-color hover:bg-highlight-color hover:text-white hover:border-none transition-all rounded-md px-6 py-4 text-lg font-medium ">
            Gem ændringer
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
