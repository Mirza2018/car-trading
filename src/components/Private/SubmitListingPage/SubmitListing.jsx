"use client";
import { AllImages } from "@/assets/AllImages";
import {
  useGetBrandQuery,
  useSubmitListingCreateMutation,
} from "@/redux/api/features/carPrivate";
import { useProfileQuery } from "@/redux/api/features/myProfile";
import { Avatar, Checkbox, Form, Input, InputNumber, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "sonner";
import Cookies from "universal-cookie";
const { Option } = Select;
const SubmitListing = () => {
  const {
    data: profileData,
    currentData,
    isLoading,
    isFetching,
  } = useProfileQuery();

  const { data: allBrand, isLoading: isLoadingBrand } = useGetBrandQuery();

  console.log(allBrand?.data);

  const [submitListingData] = useSubmitListingCreateMutation();
  const [form] = useForm();
  const cookies = new Cookies();
  const userCookie = cookies.get("car_trading_accessToken");
  let userInfo;
  if (!userCookie) {
    userInfo = false;
  } else {
    userInfo = jwtDecode(userCookie);
  }
  // console.log(userInfo);

  const navigate = useRouter();
  const myInfo = profileData ?? currentData;
  // console.log(myInfo);

  const [isDistance, setIsDistance] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };
  const carColors = rawColors.map((color) => ({
    label: (
      <div className="flex items-center gap-2">
        <span
          className="w-5 h-5 rounded-full border border-gray-300"
          style={{ backgroundColor: color.colorCode }}
        />
        <span className=" !text-black">{color.label}</span>
      </div>
    ),
    value: color.value,
  }));

  const onFinishFailed = ({ errorFields }) => {
    toast.error(errorFields[0]?.errors[0], {
      toastId: "formError",
      autoClose: 2000,
    });
    console.log(errorFields);
  };

  const onFinsh = async (values) => {
    if (!selectedCar) {
      return toast.error("please Selete Models", {
        toastId: "formError",
        autoClose: 2000,
      });
    }
    const toastId = toast.loading("Car details is submitting..");
    values.models = selectedCar;
    let data;
    if (userInfo) {
      data = { ...values, userId: userInfo?.userId };
    } else {
      data = { ...values };
    }

    // delete data.city;
    // delete data.street;
    delete data.mark;
    // data.city = `${values.city}, ${values.street}`;
    const selectedBrand = JSON.parse(values.mark);
    data.mark = selectedBrand.name;
    data.brandImage = selectedBrand.image;
    console.log(data);


    try {
      const res = await submitListingData(data).unwrap();
      console.log(res);
      toast.success(res?.data?.message || "Listing created successfully", {
        id: toastId,
        duration: 2000,
      });
      if (!userInfo) {
        toast.success("Please check your provided mail", {
          duration: 2000,
        });
      }
      navigate.push("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.errorSources[0]?.message ||
          error?.data?.message ||
          "Something wrong please try latter.. ",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  if (isLoading) {
    return <Spin className="flex justify-center items-center h-screen"></Spin>;
  }
  return (
    <div className=" mx-5 my-12 px-5 rounded-lg max-w-[900px]  border  border-secondary-color">
      <div className="flex justify-center items-center text-2xl font-bold  gap-3 bg-base-color border border-secondary-color rounded max-w-[1200px] md:mx-20 mx-4 my-10">
        <button
          className={` rounded w-full  text-white bg-highlight-color m-1`}
        >
          Deal
        </button>
      </div>
      <Form
        onFinish={onFinsh}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="vertical"
      >
        <div className="flex  flex-col md:flex-row justify-between  gap-5 ">
          <Form.Item
            className="flex-1"
            rules={[
              {
                required: true,
                message: "Please select Mark",
              },
            ]}
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Mark
              </span>
            }
            name="mark"
          >
            <Select
              placeholder="Select a Brand"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                const data = JSON.parse(option.value);
                return data.name.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {allBrand?.data?.map((brand) => (
                <Option
                  key={brand._id}
                  value={JSON.stringify({
                    image: brand.image,
                    name: brand.name,
                  })}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{brand.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="flex-1"
            rules={[
              {
                required: true,

                message: "Please Input Model Name",
              },
            ]}
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Model
              </span>
            }
            name="model"
          >
            <Input placeholder="Give model name" />
          </Form.Item>
        </div>

        <div className="flex flex-col  md:flex-row justify-between  gap-5 ">
          <Form.Item
            className="flex-1"
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Car Category
              </span>
            }
            name="carCategory"
            rules={[
              {
                required: true,
                message: "Please select car category",
              },
            ]}
          >
            <Select
              className=""
              placeholder={
                <span
                  style={{ fontSize: "clamp(12px, 1vw + 1rem ,14px)" }}
                  className="text-black   "
                >
                  Private car or company car
                </span>
              }
            >
              <Select.Option value="privateCar">Private car</Select.Option>
              <Select.Option value="companyCar">company car</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Car Condition",
              },
            ]}
            className="flex-1"
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                New/used
              </span>
            }
            name="carCondition"
          >
            <Select
              placeholder={
                <span
                  style={{ fontSize: "clamp(12px, 1vw + 1rem ,14x)" }}
                  className="text-black  "
                >
                  All
                </span>
              }
            >
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Used">Used</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <h1
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          className="font-bold   mb-2"
        >
          Cash price (Max price)
        </h1>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please Input Max Price",
            },
          ]}
          // label={<span className="font-medium text-base">Max price</span>}
          name="cashPrice"
          className="flex-1"
        >
          <InputNumber placeholder="0" className=" w-full" />
        </Form.Item>

        <div className="flex justify-between items-start">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select Fuel Type",
              },
            ]}
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Fuel
              </span>
            }
            name="fuel"
            className="flex-1"
          >
            <Checkbox.Group>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Checkbox
                  value="EL"
                  // checked={selectedFuleType === "electricCar"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  EL
                </Checkbox>
                <Checkbox
                  value="Benzin"
                  // checked={selectedFuleType === "petrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Benzin
                </Checkbox>
                <Checkbox
                  value="Hybrid Benzin"
                  // checked={selectedFuleType === "diesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid Benzin
                </Checkbox>
                <Checkbox
                  value="Plug-In Benzin"
                  // checked={selectedFuleType === "hybridGasoline"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-In Benzin
                </Checkbox>
                <Checkbox
                  value="Diesel"
                  // checked={selectedFuleType === "hybridDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Diesel
                </Checkbox>
                <Checkbox
                  value="Hybrid Diesel"
                  // checked={selectedFuleType === "pluginPetrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid Diesel
                </Checkbox>
                <Checkbox
                  value="Plug-In Diesel"
                  // checked={selectedFuleType === "pluginDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-In Diesel
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>

          <div className="md:flex-1">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select Gear type",
                },
              ]}
              label={
                <span
                  style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                  className="font-bold  "
                >
                  Gear type
                </span>
              }
              name="gearType"
            >
              <Checkbox.Group>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Checkbox value="Manual gear" style={{ lineHeight: "32px" }}>
                    Manual gear
                  </Checkbox>
                  <Checkbox
                    value="Automatic gear"
                    style={{ lineHeight: "32px" }}
                  >
                    Automatic gear
                  </Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select Price type",
                },
              ]}
              label={
                <span
                  style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                  className="font-bold  "
                >
                  Price type
                </span>
              }
              name="priceType"
              className="flex-1"
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Checkbox
                    value=" Cash price"
                    // checked={selectedPriceType === "cashPrice"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    Cash price
                  </Checkbox>
                  <Checkbox
                    value="Cars without tax"
                    // checked={selectedPriceType === "carsWithoutTax"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    Cars without tax
                  </Checkbox>
                  <Checkbox
                    value=" Wholesale/CVR"
                    // checked={selectedPriceType === "wholesaleCVR"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    Wholesale/CVR
                  </Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>

        {/* <div className="flex justify-between items-center"></div> */}

        <Form.Item
          label={
            <span
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="font-bold  "
            >
              Models
            </span>
          }
          name="models"
        >
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() => handleCarSelect("micro")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "micro" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct1} alt="car" />
              </div>
              <p className="text-center"> Micro</p>
            </div>

            <div
              onClick={() => handleCarSelect("stationWagon")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "stationWagon"
                  ? "border border-blue-500 "
                  : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct2} alt="car" />
              </div>
              <p className="text-center"> Station wagon</p>
            </div>

            <div
              onClick={() => handleCarSelect("suv")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "suv" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct3} alt="car" />
              </div>
              <p className="text-center"> SUV</p>
            </div>

            <div
              onClick={() => handleCarSelect("crossover")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "crossover" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct4} alt="car" />
              </div>
              <p className="text-center">Crossover (CUV)</p>
            </div>
            <div
              onClick={() => handleCarSelect("minibus")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "minibus" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct6} alt="car" />
              </div>
              <p className="text-center">Minibus (MPV)</p>
            </div>
            <div
              onClick={() => handleCarSelect("sedan")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "sedan" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct7} alt="car" />
              </div>
              <p className="text-center"> Sedan</p>
            </div>
            <div
              onClick={() => handleCarSelect("hatchback")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "hatchback" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct8} alt="car" />
              </div>
              <p className="text-center">Hatchback</p>
            </div>
            <div
              onClick={() => handleCarSelect("cabriolet")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "cabriolet" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct9} alt="car" />
              </div>
              <p className="text-center"> Cabriolet</p>
            </div>
            <div
              onClick={() => handleCarSelect("coupe")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "coupe" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct10} alt="car" />
              </div>
              <p className="text-center"> Coupe</p>
            </div>
          </div>
        </Form.Item>

        <h1
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          className="font-bold   mb-2"
        >
          Models
        </h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please inptut models From",
              },
            ]}
            label={<span className="font-medium text-base">From</span>}
            name="modelsFrom"
            className="flex-1"
          >
            <InputNumber placeholder="Before 1975" className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please inptut models To",
              },
            ]}
            label={<span className="font-medium text-base">To</span>}
            name="modelsTo"
            className="flex-1"
          >
            {/* <Input placeholder="After 1990" /> */}
            <InputNumber placeholder="After 1990" className="w-full" />
          </Form.Item>
        </div>

        <h1
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          className="font-bold   mb-2"
        >
          Driven km
        </h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please inptut Driven km From",
              },
            ]}
            label={<span className="font-medium text-base">From</span>}
            name="drivenKmFrom"
            className="flex-1"
          >
            <InputNumber placeholder="0" className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please inptut Driven km To",
              },
            ]}
            label={<span className="font-medium text-base">To</span>}
            name="drivenKmTo"
            className="flex-1"
          >
            <InputNumber placeholder="50000+" className="w-full" />
          </Form.Item>
        </div>

        <div
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          onClick={() => setIsDistance(!isDistance)}
          className="font-bold   bg-base-color border border-secondary-color rounded-md py-1 px-2 flex justify-between items-center"
        >
          <h1>Additional equipment</h1>
          <p>
            <IoIosArrowForward
              className={` transition-all ease-in duration-300 ${
                isDistance ? "-rotate-90 " : "rotate-90 "
              }`}
            />
          </p>
        </div>
        {isDistance && (
          <React.Fragment>
            <Form.Item
              className="mt-4"
              label={
                <span
                  style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                  className="font-bold  "
                >
                  Color
                </span>
              }
              name="color"
            >
              <Select
                placeholder={
                  <span
                    style={{ fontSize: "clamp(12px, 1vw + 1rem ,18px)" }}
                    className="text-black   flex"
                  >
                    Choose Color
                  </span>
                }
                className=" !bg-base-color"
                showSearch
                mode="multiple"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  option?.label?.props?.children?.[1]?.props?.children
                    ?.toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={carColors}
              />
            </Form.Item>
            <h1
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="font-bold   "
            >
              Trailer
            </h1>
            <div className="flex  justify-between items-center gap-5 mt-3">
              <Form.Item name="trailerHitch" className="flex-1">
                <Select
                  className=" !h-10"
                  placeholder={
                    <span
                      style={{ fontSize: "clamp(12px, 1vw + 1rem ,18px)" }}
                      className="text-black  "
                    >
                      Trailer hitch
                    </span>
                  }
                >
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                className="flex-1 "
                label={<span className="font-bold text-sm">Trailer hitch</span>}
                name="mark"
              >
                <Select
                  className="!h-14"
                  placeholder={
                    <span className="text-black  ">Trailer hitch</span>
                  }
                >
                  <Select.Option value="demo1">Demo1</Select.Option>
                  <Select.Option value="demo2">Demo2</Select.Option>
                  <Select.Option value="demo3">Demo3</Select.Option>
                </Select>
              </Form.Item> */}
            </div>
            <div className="flex justify-between items-start">
              <Form.Item
                label={
                  <span
                    style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                    className="font-bold  "
                  >
                    Exterior
                  </span>
                }
                name="exterior"
                className="flex-1"
              >
                <Checkbox.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Checkbox value="Alloy Rims" style={{ lineHeight: "32px" }}>
                    Alloy Rims
                  </Checkbox>
                  <Checkbox
                    value="LED headlights"
                    style={{ lineHeight: "32px" }}
                  >
                    LED headlights
                  </Checkbox>
                  <Checkbox
                    value="Panoramic roof"
                    style={{ lineHeight: "32px" }}
                  >
                    Panoramic roof
                  </Checkbox>
                  <Checkbox
                    value="Sunroof, electric"
                    style={{ lineHeight: "32px" }}
                  >
                    Sunroof, electric
                  </Checkbox>
                  <Checkbox value="Xenon lights" style={{ lineHeight: "32px" }}>
                    Xenon lights
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label={
                  <span
                    style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                    className="font-bold  "
                  >
                    Interior
                  </span>
                }
                name="interior"
                className="flex-1"
              >
                <Checkbox.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Checkbox value="Android auto" style={{ lineHeight: "32px" }}>
                    Android auto
                  </Checkbox>
                  <Checkbox
                    value="Apple car play"
                    style={{ lineHeight: "32px" }}
                  >
                    Apple car play
                  </Checkbox>
                  <Checkbox
                    value="Air conditioning"
                    style={{ lineHeight: "32px" }}
                  >
                    Air conditioning
                  </Checkbox>
                  <Checkbox
                    value="Power windows"
                    style={{ lineHeight: "32px" }}
                  >
                    Power windows
                  </Checkbox>
                  <Checkbox
                    value="Head-up display"
                    style={{ lineHeight: "32px" }}
                  >
                    Head-up display
                  </Checkbox>
                  <Checkbox value="navigation" style={{ lineHeight: "32px" }}>
                    Navigation
                  </Checkbox>
                  <Checkbox
                    value="Keyless operation"
                    style={{ lineHeight: "32px" }}
                  >
                    Keyless operation
                  </Checkbox>
                  <Checkbox value="Seat heating" style={{ lineHeight: "32px" }}>
                    Seat heating
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </React.Fragment>
        )}

        <div name="type" className=" flex  gap-10 my-8">
          <div
            style={{ fontSize: "clamp(16px, 2vw + 1rem ,30px)" }}
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
            style={{ fontSize: "clamp(16px, 2vw + 1rem ,30px)" }}
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

        <h1
          style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
          className=" font-bold"
        >
          Contact information
        </h1>
        <div className="h1 w-full border-t border-text-light-color my-5"></div>
        <h1
          style={{ fontSize: "clamp(12px, 1vw + 1rem ,18px)" }}
          className=" font-medium mb-5"
        >
          To provide you with the best offer for your car, we recommend
          uploading a few pictures of your car to us. You can find some examples
          of the angles we would like of your car.
        </h1>

        {isCompany ? (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="  font-medium pb-2"
              >
                Company Name*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please inptut Company Name",
                  },
                ]}
                name={`companyName`}
              >
                <Input placeholder="Company Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="  font-medium pb-2"
              >
                CVR Number*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please inptut CVR Number",
                  },
                ]}
                name={`cvrNumber`}
              >
                <Input placeholder="CVR Number" className="py-3" />
              </Form.Item>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="  font-medium pb-2"
            >
              First Name*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.first_name}
              rules={[
                {
                  required: true,
                  message: "Please inptut First Name",
                },
              ]}
              name={`firstName`}
            >
              <Input placeholder="First Name" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="  font-medium pb-2"
            >
              Last Name*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.last_name}
              rules={[
                {
                  required: true,
                  message: "Please inptut Last Name",
                },
              ]}
              name={`lastName`}
            >
              <Input placeholder="Last Name" className="py-3" />
            </Form.Item>
          </div>
        </div>

        {!userInfo && (
          <div className="">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="  font-medium pb-2 "
            >
              Email*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your Email",
                },
              ]}
              name={`email`}
            >
              <Input placeholder="Email" className="py-3" />
            </Form.Item>
          </div>
        )}

        <div className="my-[10px] grid md:grid-cols-3 grid-cols-2 gap-5">
          <div className=" ">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Street Name*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.street}
              rules={[
                {
                  required: true,
                  message: "Please input your Street Name!",
                },
              ]}
              name={`street`}
            >
              <Input placeholder="Street Name" className="py-3" />
            </Form.Item>
          </div>
          <div className=" ">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Postal Code*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.zip}
              rules={[
                {
                  required: true,
                  message: "Please input your postal code!",
                },
              ]}
              name={`postalCode`}
            >
              <Input placeholder="Postal Code" className="py-3" />
            </Form.Item>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              City*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.city}
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
              name={`city`}
            >
              <Input placeholder="City" className="py-3" />
            </Form.Item>
          </div>
        </div>

        <div className="">
          <p
            style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
            className="  font-medium pb-2 "
          >
            Phone Number*
          </p>
          <Form.Item
            initialValue={myInfo?.data?.profile?.phoneNumber}
            rules={[
              {
                required: true,
                message: "Please inptut Phone Number",
              },
            ]}
            name={`phoneNumber`}
          >
            <Input placeholder="Phone Number" className="py-3" />
          </Form.Item>
        </div>

        <div className="text-center">
          <button
            style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
            className="bg-highlight-color text-white py-3 md:px-32 px-3 rounded-md text-center my-10  font-medium "
            htmlType="submit"
          >
            Create Listing
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SubmitListing;

const carBrands = [
  { label: "Acura", value: "Acura" },
  { label: "Alfa Romeo", value: "Alfa Romeo" },
  { label: "Aston Martin", value: "Aston Martin" },
  { label: "Audi", value: "Audi" },
  { label: "Bentley", value: "Bentley" },
  { label: "BMW", value: "BMW" },
  { label: "Buick", value: "Buick" },
  { label: "Cadillac", value: "Cadillac" },
  { label: "Chevrolet", value: "Chevrolet" },
  { label: "Chrysler", value: "Chrysler" },
  { label: "Citroën", value: "Citroën" },
  { label: "Dacia", value: "Dacia" },
  { label: "Daewoo", value: "Daewoo" },
  { label: "Datsun", value: "Datsun" },
  { label: "Dodge", value: "Dodge" },
  { label: "Ferrari", value: "Ferrari" },
  { label: "Fiat", value: "Fiat" },
  { label: "Ford", value: "Ford" },
  { label: "GMC", value: "GMC" },
  { label: "Genesis", value: "Genesis" },
  { label: "Honda", value: "Honda" },
  { label: "Hummer", value: "Hummer" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Infiniti", value: "Infiniti" },
  { label: "Isuzu", value: "Isuzu" },
  { label: "Jaguar", value: "Jaguar" },
  { label: "Jeep", value: "Jeep" },
  { label: "Kia", value: "Kia" },
  { label: "Lamborghini", value: "Lamborghini" },
  { label: "Land Rover", value: "Land Rover" },
  { label: "Lexus", value: "Lexus" },
  { label: "Lincoln", value: "Lincoln" },
  { label: "Lotus", value: "Lotus" },
  { label: "Maserati", value: "Maserati" },
  { label: "Mazda", value: "Mazda" },
  { label: "McLaren", value: "McLaren" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Mini", value: "Mini" },
  { label: "Mitsubishi", value: "Mitsubishi" },
  { label: "Nissan", value: "Nissan" },
  { label: "Pagani", value: "Pagani" },
  { label: "Peugeot", value: "Peugeot" },
  { label: "Porsche", value: "Porsche" },
  { label: "Ram", value: "Ram" },
  { label: "Renault", value: "Renault" },
  { label: "Rolls-Royce", value: "Rolls-Royce" },
  { label: "Saab", value: "Saab" },
  { label: "Scion", value: "Scion" },
  { label: "Smart", value: "Smart" },
  { label: "Subaru", value: "Subaru" },
  { label: "Suzuki", value: "Suzuki" },
  { label: "Tesla", value: "Tesla" },
  { label: "Toyota", value: "Toyota" },
  { label: "Volkswagen (VW)", value: "Volkswagen (VW)" },
  { label: "Volvo", value: "Volvo" },
  { label: "Zenvo (dansk hyperbil)", value: "Zenvo" },
  { label: "Hydrema (dansk arbejdskøretøj)", value: "Hydrema" },
  { label: "Bugatti", value: "Bugatti" },
  { label: "BYD", value: "BYD" },
  { label: "Chery", value: "Chery" },
  { label: "Koenigsegg", value: "Koenigsegg" },
  { label: "Lada", value: "Lada" },
  { label: "Lucid", value: "Lucid" },
  { label: "MG", value: "MG" },
  { label: "Pininfarina", value: "Pininfarina" },
  { label: "Polestar", value: "Polestar" },
  { label: "Rivian", value: "Rivian" },
  { label: "SsangYong", value: "SsangYong" },
  { label: "Proton (malaysisk mærke)", value: "Proton" },
  { label: "Hindustan Motors (indisk mærke)", value: "Hindustan Motors" },
  { label: "Tata Motors (indisk mærke)", value: "Tata Motors" },
  { label: "Mahindra (indisk mærke)", value: "Mahindra" },
  { label: "Geely (kinesisk mærke)", value: "Geely" },
  { label: "NIO (kinesisk elbil)", value: "NIO" },
  { label: "XPeng (kinesisk elbil)", value: "XPeng" },
  { label: "Li Auto (kinesisk elbil)", value: "Li Auto" },
  { label: "Spyker (hollandsk nichemærke)", value: "Spyker" },
  { label: "Rimac (kroatisk el-hyperbil)", value: "Rimac" },
  { label: "VinFast (vietnamesisk mærke)", value: "VinFast" },
];

const rawColors = [
  { label: "Alle", value: "Alle", colorCode: "#" },
  { label: "Sort", value: "Sort", colorCode: "#000000" },
  { label: "Hvid", value: "Hvid", colorCode: "#FFFFFF" },
  { label: "Grå", value: "Grå", colorCode: "#808080" },
  { label: "Sølv", value: "Sølv", colorCode: "#C0C0C0" },
  { label: "Blå", value: "Blå", colorCode: "#0000FF" },
  { label: "Rød", value: "Rød", colorCode: "#FF0000" },
  { label: "Grøn", value: "Grøn", colorCode: "#008000" },
  { label: "Gul", value: "Gul", colorCode: "#FFFF00" },
  { label: "Orange", value: "Orange", colorCode: "#FFA500" },
  { label: "Brun", value: "Brun", colorCode: "#A52A2A" },
  { label: "Lilla", value: "Lilla", colorCode: "#800080" },
  { label: "Beige", value: "Beige", colorCode: "#F5F5DC" },
  { label: "Lyserød", value: "Lyserød", colorCode: "#FFC0CB" },
  { label: "Guld", value: "Guld", colorCode: "#FFD700" },
  { label: "Bronze", value: "Bronze", colorCode: "#CD7F32" },
  { label: "Turkis", value: "Turkis", colorCode: "#40E0D0" },
  { label: "Champagne", value: "Champagne", colorCode: "#F7E7CE" },
  { label: "Elfenben", value: "Elfenben", colorCode: "#FFFFF0" },
  { label: "Sandfarvet", value: "Sandfarvet", colorCode: "#D2B48C" },
  { label: "Kobber", value: "Kobber", colorCode: "#B87333" },
  { label: "Smaragdgrøn", value: "Smaragdgrøn", colorCode: "#50C878" },
  { label: "Marineblå", value: "Marineblå", colorCode: "#000080" },
  { label: "Mat sort", value: "Mat sort", colorCode: "#1C1C1C" },
  { label: "Mat hvid", value: "Mat hvid", colorCode: "#F4F4F4" },
  { label: "Metallisk grå", value: "Metallisk grå", colorCode: "#A9A9A9" },
  { label: "Metallisk blå", value: "Metallisk blå", colorCode: "#3B9C9C" },
  { label: "Perlehvid", value: "Perlehvid", colorCode: "#F8F6F0" },
  { label: "Limegrøn", value: "Limegrøn", colorCode: "#32CD32" },
  { label: "Himmelblå", value: "Himmelblå", colorCode: "#87CEEB" },
  { label: "Rosa guld", value: "Rosa guld", colorCode: "#B76E79" },
  { label: "Mintgrøn", value: "Mintgrøn", colorCode: "#98FF98" },
  { label: "Klar gul", value: "Klar gul", colorCode: "#FFEA00" },
  {
    label: "Solnedgangsorange",
    value: "Solnedgangsorange",
    colorCode: "#FF4500",
  },
  { label: "Fuchsia", value: "Fuchsia", colorCode: "#FF00FF" },
  { label: "Sølvmetallic", value: "Sølvmetallic", colorCode: "#B0C4DE" },
  { label: "Bourgogne", value: "Bourgogne", colorCode: "#800020" },
  { label: "Søgrøn", value: "Søgrøn", colorCode: "#2E8B57" },
  { label: "Koboltblå", value: "Koboltblå", colorCode: "#0047AB" },
  { label: "Elektrisk blå", value: "Elektrisk blå", colorCode: "#7DF9FF" },
  { label: "Candy rød", value: "Candy rød", colorCode: "#D2042D" },
  { label: "Jet sort", value: "Jet sort", colorCode: "#343434" },
  { label: "Safirblå", value: "Safirblå", colorCode: "#0F52BA" },
  { label: "Racinggrøn", value: "Racinggrøn", colorCode: "#004225" },
  { label: "Solsikkegul", value: "Solsikkegul", colorCode: "#FFC512" },
  { label: "Chokoladebrun", value: "Chokoladebrun", colorCode: "#381819" },
  { label: "Grafit", value: "Grafit", colorCode: "#4B4B4B" },
  { label: "Platinsølv", value: "Platinsølv", colorCode: "#E5E4E2" },
  { label: "Onyx sort", value: "Onyx sort", colorCode: "#353839" },
  { label: "Krystalhvid", value: "Krystalhvid", colorCode: "#FBFBF9" },
  { label: "Klar blå", value: "Klar blå", colorCode: "#0096FF" },
  { label: "Rød metallic", value: "Rød metallic", colorCode: "#C21807" },
  { label: "Koralrød", value: "Koralrød", colorCode: "#FF4040" },
  { label: "Midnatsblå", value: "Midnatsblå", colorCode: "#191970" },
  { label: "Brite rød", value: "Brite rød", colorCode: "#FF2400" },
  { label: "Frosthvid", value: "Frosthvid", colorCode: "#FDFEFE" },
  { label: "Dyblilla", value: "Dyblilla", colorCode: "#301934" },
  { label: "Candy æblerød", value: "Candy æblerød", colorCode: "#A40000" },
  { label: "Vermilion rød", value: "Vermilion rød", colorCode: "#E34234" },
  { label: "Antracit", value: "Antracit", colorCode: "#293133" },
  { label: "Stålblå", value: "Stålblå", colorCode: "#4682B4" },
  { label: "Moccabrun", value: "Moccabrun", colorCode: "#837060" },
  { label: "Pistolgrå", value: "Pistolgrå", colorCode: "#2a3439" },
  { label: "Stormgrå", value: "Stormgrå", colorCode: "#71797E" },
  { label: "Magnetgrå", value: "Magnetgrå", colorCode: "#6E6E6E" },
  { label: "Titanium sølv", value: "Titanium sølv", colorCode: "#D6D6D6" },
  { label: "Alpin hvid", value: "Alpin hvid", colorCode: "#EDEDED" },
  { label: "Kulsort", value: "Kulsort", colorCode: "#1C1C1C" },
  { label: "Skyggesort", value: "Skyggesort", colorCode: "#2B2B2B" },
  { label: "Perleblizzard", value: "Perleblizzard", colorCode: "#F6F8F9" },
  { label: "Infernorød", value: "Infernorød", colorCode: "#B22222" },
  { label: "Økensand", value: "Økensand", colorCode: "#EDC9Af" },
  { label: "Skovgrøn", value: "Skovgrøn", colorCode: "#228B22" },
  { label: "Magenta", value: "Magenta", colorCode: "#FF00FF" },
  { label: "Ametyst", value: "Ametyst", colorCode: "#9966CC" },
];
