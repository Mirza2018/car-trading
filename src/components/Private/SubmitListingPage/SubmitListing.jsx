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
      return toast.error("Vælg venligst modeller", {
        toastId: "formError",
        autoClose: 2000,
      });
    }
    const toastId = toast.loading("Bildetaljer indsendes…");
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
      toast.success("Liste oprettet succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      if (!userInfo) {
        toast.success("Tjek venligst din angivne e-mail", {
          duration: 2000,
        });
      }
      navigate.push("/");
    } catch (error) {
      console.log(error);

      toast.error("Noget gik galt, prøv venligst senere.", {
        id: toastId,
        duration: 2000,
      });
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
          Aftale
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
                message: "Vælg venligst et mærke",
              },
            ]}
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Markér
              </span>
            }
            name="mark"
          >
            <Select
              placeholder="vælg mærke"
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

                message: "Venligst indtast modelnavn",
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
            <Input placeholder="Indtast model" />
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
                Kategori
              </span>
            }
            name="carCategory"
            rules={[
              {
                required: true,
                message: "Personbil Varebil",
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
                  Privat bil eller firmabil
                </span>
              }
            >
              <Select.Option value="privateCar">Privat bil</Select.Option>
              <Select.Option value="companyCar">Firmabil</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst bilens stand",
              },
            ]}
            className="flex-1"
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Ny/Brugt
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
                  Ny Brugt
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
          Kontantpris (Max pris)
        </h1>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Venligst indtast makspris",
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
                message: "Vælg venligst brændstoftype",
              },
            ]}
            label={
              <span
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="font-bold  "
              >
                Brændstof
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
                  message: "Vælg venligst gearkasse",
                },
              ]}
              label={
                <span
                  style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                  className="font-bold  "
                >
                  Geartype
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
                  <Checkbox value="Manual" style={{ lineHeight: "32px" }}>
                    Manual
                  </Checkbox>
                  <Checkbox value="Automatik" style={{ lineHeight: "32px" }}>
                    Automatik
                  </Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vælg venligst pristype",
                },
              ]}
              label={
                <span
                  style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                  className="font-bold  "
                >
                  Pristype
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
                    value="Kontant pris"
                    // checked={selectedPriceType === "cashPrice"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    Kontant pris
                  </Checkbox>
                  <Checkbox
                    value="Biler under afgift"
                    // checked={selectedPriceType === "carsWithoutTax"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    Biler under afgift
                  </Checkbox>
                  {/* <Checkbox
                    value=" Wholesale/CVR"
                    // checked={selectedPriceType === "wholesaleCVR"}
                    // onChange={handleCheckboxChange}
                    style={{ lineHeight: "32px" }}
                  >
                    
                  </Checkbox> */}
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
              Modeller
            </span>
          }
          name="models"
        >
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() => handleCarSelect("mikrobil")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "mikrobil" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct1} alt="car" />
              </div>
              <p className="text-center">Mikrobil</p>
            </div>

            <div
              onClick={() => handleCarSelect("stationcar")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "stationcar" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct2} alt="car" />
              </div>
              <p className="text-center">Stationcar</p>
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
          Årgang
        </h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Venligst indtast modeller fra",
              },
            ]}
            label={<span className="font-medium text-base">Fra.</span>}
            name="modelsFrom"
            className="flex-1"
          >
            <InputNumber placeholder="Årgang fra." className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Venligst indtast modeller til",
              },
            ]}
            label={<span className="font-medium text-base">Til</span>}
            name="modelsTo"
            className="flex-1"
          >
            {/* <Input placeholder="After 1990" /> */}
            <InputNumber placeholder="Årgang til." className="w-full" />
          </Form.Item>
        </div>

        <h1
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          className="font-bold   mb-2"
        >
          kilometer
        </h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Venligst indtast kørte kilometer fra",
              },
            ]}
            label={<span className="font-medium text-base">Fra</span>}
            name="drivenKmFrom"
            className="flex-1"
            initialValue={0}
          >
            <InputNumber placeholder="0" className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Venligst indtast kørte kilometer til",
              },
            ]}
            label={<span className="font-medium text-base">Til</span>}
            name="drivenKmTo"
            className="flex-1"
          >
            <InputNumber placeholder="500000+" className="w-full" />
          </Form.Item>
        </div>

        <div
          style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
          onClick={() => setIsDistance(!isDistance)}
          className="font-bold   bg-base-color border border-secondary-color rounded-md py-1 px-2 flex justify-between items-center"
        >
          <h1>Ekstraudstyr</h1>
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
                  Farve
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
                    Vælg farve
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
              Anhænger
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
                      Anhængertræk
                    </span>
                  }
                >
                  <Select.Option value="yes">Ja</Select.Option>
                  <Select.Option value="no">Nej</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex justify-between items-start">
              <Form.Item
                label={
                  <span
                    style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                    className="font-bold  "
                  >
                    Eksteriør
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
                  <Checkbox value="Alufælge" style={{ lineHeight: "32px" }}>
                    Alufælge
                  </Checkbox>
                  <Checkbox
                    value="LED forlygter"
                    style={{ lineHeight: "32px" }}
                  >
                    LED forlygter
                  </Checkbox>
                  <Checkbox value="Panoramatag" style={{ lineHeight: "32px" }}>
                    Panoramatag
                  </Checkbox>
                  <Checkbox value="El soltag" style={{ lineHeight: "32px" }}>
                    El soltag
                  </Checkbox>
                  <Checkbox
                    value="Xenon forlygter"
                    style={{ lineHeight: "32px" }}
                  >
                    Xenon forlygter
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label={
                  <span
                    style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                    className="font-bold  "
                  >
                    Interiør
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
                  <Checkbox value="Android Auto" style={{ lineHeight: "32px" }}>
                    Android Auto
                  </Checkbox>
                  <Checkbox
                    value="Apple carplay"
                    style={{ lineHeight: "32px" }}
                  >
                    Apple carplay
                  </Checkbox>
                  <Checkbox
                    value="Aircondition/klimaanlæg"
                    style={{ lineHeight: "32px" }}
                  >
                    Aircondition/klimaanlæg
                  </Checkbox>
                  <Checkbox value="Elruder" style={{ lineHeight: "32px" }}>
                    Elruder
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
                    value="Nøglefri betjening"
                    style={{ lineHeight: "32px" }}
                  >
                    Nøglefri betjening
                  </Checkbox>
                  <Checkbox value="Sædevarme" style={{ lineHeight: "32px" }}>
                    Sædevarme
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
            Firma
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
            Privat
          </div>
        </div>

        <h1
          style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
          className=" font-bold"
        >
          Kontaktoplysninger
        </h1>
        <div className="h1 w-full border-t border-text-light-color my-5"></div>
        <h1
          style={{ fontSize: "clamp(12px, 1vw + 1rem ,18px)" }}
          className=" font-medium mb-5"
        >
          For at give dig det bedste tilbud på din bil, anbefaler vi, at du
          uploader nogle billeder af din bil til os. Du kan finde nogle
          eksempler på de vinkler, vi gerne vil have af din bil.
        </h1>

        {isCompany ? (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="  font-medium pb-2"
              >
                Firmanavn*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Venligst indtast firmanavn",
                  },
                ]}
                name={`companyName`}
              >
                <Input placeholder="Firmanavn" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
                className="  font-medium pb-2"
              >
                CVR-nummer*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Venligst indtast CVR-nummer",
                  },
                ]}
                name={`cvrNumber`}
              >
                <Input placeholder="CVR-nummer" className="py-3" />
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
              Fornavn*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.first_name}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast fornavn",
                },
              ]}
              name={`firstName`}
            >
              <Input placeholder="Fornavn" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="  font-medium pb-2"
            >
              Efternavn*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.last_name}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast efternavn",
                },
              ]}
              name={`lastName`}
            >
              <Input placeholder="Efternavn" className="py-3" />
            </Form.Item>
          </div>
        </div>

        {!userInfo && (
          <div className="">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className="  font-medium pb-2 "
            >
              E-mail*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Venligst indtast din e-mail",
                },
              ]}
              name={`email`}
            >
              <Input placeholder="E-mail" className="py-3" />
            </Form.Item>
          </div>
        )}

        <div className="my-[10px] grid md:grid-cols-3 grid-cols-2 gap-5">
          <div className=" ">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Gadenavn*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.street}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast dit gadenavn!",
                },
              ]}
              name={`street`}
            >
              <Input placeholder="Gadenavn" className="py-3" />
            </Form.Item>
          </div>
          <div className=" ">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Postnummer*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.zip}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast dit postnummer!",
                },
              ]}
              name={`postalCode`}
            >
              <Input placeholder="Postnummer" className="py-3" />
            </Form.Item>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p
              style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              By*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.city}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast by!",
                },
              ]}
              name={`city`}
            >
              <Input placeholder="By" className="py-3" />
            </Form.Item>
          </div>
        </div>

        <div className="">
          <p
            style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
            className="  font-medium pb-2 "
          >
            Telefonnummer*
          </p>
          <Form.Item
            initialValue={myInfo?.data?.profile?.phoneNumber}
            rules={[
              {
                required: true,
                message: "Venligst indtast telefonnummer",
              },
            ]}
            name={`phoneNumber`}
          >
            <Input placeholder="Telefonnummer" className="py-3" />
          </Form.Item>
        </div>

        <div className="text-center">
          <button
            style={{ fontSize: "clamp (14px, 1vw + 1rem ,24px)" }}
            className="bg-highlight-color text-white py-3 md:px-32 px-3 rounded-md text-center my-10  font-medium "
            htmlType="submit"
          >
            Opret annonce
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
