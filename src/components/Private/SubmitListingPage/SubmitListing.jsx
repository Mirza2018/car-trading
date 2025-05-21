import { AllImages } from "@/assets/AllImages";
import { useSubmitListingCreateMutation } from "@/redux/api/features/carPrivate";
import {
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Button } from "antd/es/radio";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";
import { toast } from "sonner";
 
const SubmitListing = () => {
  const [submitListingData] = useSubmitListingCreateMutation();
  const [form] = useForm();

  const [isDistance, setIsDistance] = useState(false);
  const [isCompany, setIsCompany] = useState(true);
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

  const onFinsh = async (values) => {
    values.models = selectedCar;
    console.log("main value", values);
    const toastId = toast.loading("Car details is submitting..");
    // return;
    try {
      const res = await submitListingData(values).unwrap();
      console.log(res);
      toast.success(res?.data?.message || "Listing created successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);

      toast.error("Something wrong please try latter.. ", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className="max-w-[1200px] md:mx-20 mx-4 select-none">
      <Form onFinish={onFinsh} form={form} layout="vertical">
        <Form.Item
          label={<span className="font-bold text-2xl">Car Category</span>}
          name="carCategory"
        >
          <Select
            className="!h-12 "
            placeholder={
              <span className="text-black text-xl ">
                Private car or company car
              </span>
            }
          >
            <Select.Option value="privateCar">Private car</Select.Option>
            <Select.Option value="companyCar">company car</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          label={<span className="font-bold text-2xl">Mark</span>}
          name="mark"
        >
          <Select
            placeholder={<span className="text-black text-xl">Brands</span>}
          >
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          label={<span className="font-bold text-2xl">Mark</span>}
          name="mark"
        >
          <Select
            placeholder={<span className="text-black text-xl">Brands</span>}
            className="!h-12 !bg-base-color"
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={carBrands}
          />
        </Form.Item>
        <Form.Item
          text-2xl
          label={<span className="font-bold text-2xl">Model</span>}
          name="model"
        >
          {/* <Select
            placeholder={<span className="text-black text-xl">Model</span>}
            className="!h-12 !bg-base-color"
            options={carModels}
          /> */}
          <Input placeholder="Give model name" />
        </Form.Item>
        {/* 
        <p className="text-2xl font-medium pb-2">Model*</p>
        <Form.Item name={`PhoneNumber`}>
          <Input placeholder="Phone Number" className="py-3" />
        </Form.Item> */}

        <h1 className="font-bold text-2xl mb-2">Cash price</h1>

        <Form.Item
          label={<span className="font-medium text-base">Max price</span>}
          name="cashPrice"
          className="flex-1"
        >
          <InputNumber placeholder="0" className=" w-full" />
        </Form.Item>

        <div className="flex justify-between items-center">
          <Form.Item
            label={<span className="font-bold text-2xl">Price type</span>}
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
                  value="cashPrice"
                  // checked={selectedPriceType === "cashPrice"}
                  // onChange={handleCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Cash price
                </Checkbox>
                <Checkbox
                  value="carsWithoutTax"
                  // checked={selectedPriceType === "carsWithoutTax"}
                  // onChange={handleCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Cars without tax
                </Checkbox>
                <Checkbox
                  value="wholesaleCVR"
                  // checked={selectedPriceType === "wholesaleCVR"}
                  // onChange={handleCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Wholesale/CVR
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            className="flex-1"
            label={<span className="font-bold text-2xl">New/used</span>}
            name="carCondition"
          >
            <Select
              placeholder={<span className="text-black text-xl">All</span>}
            >
              <Select.Option value="new">New</Select.Option>
              <Select.Option value="used">Used</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-bold text-2xl">Models</span>}
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
        <div className="flex justify-between items-start">
          <Form.Item
            label={<span className="font-bold text-2xl">Fuel</span>}
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
                  value="electricCar"
                  // checked={selectedFuleType === "electricCar"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Electric Car
                </Checkbox>
                <Checkbox
                  value="petrol"
                  // checked={selectedFuleType === "petrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Petrol
                </Checkbox>
                <Checkbox
                  value="diesel"
                  // checked={selectedFuleType === "diesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Diesel
                </Checkbox>
                <Checkbox
                  value="hybridGasoline"
                  // checked={selectedFuleType === "hybridGasoline"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid - Gasoline
                </Checkbox>
                <Checkbox
                  value="hybridDiesel"
                  // checked={selectedFuleType === "hybridDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid - Diesel
                </Checkbox>
                <Checkbox
                  value="pluginPetrol"
                  // checked={selectedFuleType === "pluginPetrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-in - Petrol
                </Checkbox>
                <Checkbox
                  value="pluginDiesel"
                  // checked={selectedFuleType === "pluginDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-in - Diesel
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-2xl">Gear type</span>}
            name="gearType"
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
                  value="manualGear"
                  // checked={selectedGeartype === "manualGear"}
                  // onChange={handleGeartypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Manual gear
                </Checkbox>
                <Checkbox
                  value="automaticGear"
                  // checked={selectedGeartype === "automaticGear"}
                  // onChange={handleGeartypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Automatic gear
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
        </div>

        <h1 className="font-bold text-2xl mb-2">Models</h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            label={<span className="font-medium text-base">From</span>}
            name="modelsFrom"
            className="flex-1"
          >
            <InputNumber placeholder="Before 1975" className="w-full" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium text-base">To</span>}
            name="modelsTo"
            className="flex-1"
          >
            {/* <Input placeholder="After 1990" /> */}
            <InputNumber placeholder="After 1990" className="w-full" />
          </Form.Item>
        </div>

        <h1 className="font-bold text-2xl mb-2">Driven km</h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            label={<span className="font-medium text-base">From</span>}
            name="drivenKmFrom"
            className="flex-1"
          >
            <InputNumber placeholder="0" className="w-full" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium text-base">To</span>}
            name="drivenKmTo"
            className="flex-1"
          >
            <InputNumber placeholder="50000+" className="w-full" />
          </Form.Item>
        </div>
        {/* 
        <Form.Item
          label={<span className="font-bold text-2xl">Car Use</span>}
          name="carUse"
        >
          <RangePicker />
        </Form.Item> */}
        {/* <Form.Item
          label={<span className="font-bold text-2xl">Driven km</span>}
          name="drivenkm"
        >
          <Input placeholder="0" />
        </Form.Item> */}

        <div
          onClick={() => setIsDistance(!isDistance)}
          className="font-bold text-2xl bg-base-color border border-secondary-color rounded-md py-1 px-2 flex justify-between items-center"
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
              label={<span className="font-bold text-2xl">Color</span>}
              name="color"
            >
              <Select
                placeholder={
                  <span className="text-black text-xl flex">Choose Color</span>
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
            <h1 className="font-bold text-2xl ">Trailer</h1>
            <div className="flex  justify-between items-center gap-5 mt-3">
              <Form.Item name="trailerHitch" className="flex-1">
                <Select
                  className=" !h-10"
                  placeholder={
                    <span className="text-black text-xl">Trailer hitch</span>
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
                    <span className="text-black text-xl">Trailer hitch</span>
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
                label={<span className="font-bold text-2xl">Exterior</span>}
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
                  <Checkbox value="alloyRims" style={{ lineHeight: "32px" }}>
                    Alloy rims
                  </Checkbox>
                  <Checkbox
                    value=" ledHeadlights"
                    style={{ lineHeight: "32px" }}
                  >
                    LED headlights
                  </Checkbox>
                  <Checkbox
                    value="panoramicRoof"
                    style={{ lineHeight: "32px" }}
                  >
                    Panoramic roof
                  </Checkbox>
                  <Checkbox
                    value="sunroofElectric"
                    style={{ lineHeight: "32px" }}
                  >
                    Sunroof, electric
                  </Checkbox>
                  <Checkbox value="xenonLights" style={{ lineHeight: "32px" }}>
                    Xenon lights
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label={<span className="font-bold text-2xl">Interior</span>}
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
                  <Checkbox value="android_auto" style={{ lineHeight: "32px" }}>
                    Android auto
                  </Checkbox>
                  <Checkbox
                    value="apple_car_play"
                    style={{ lineHeight: "32px" }}
                  >
                    Apple car play
                  </Checkbox>
                  <Checkbox
                    value="air_conditioning"
                    style={{ lineHeight: "32px" }}
                  >
                    Air conditioning
                  </Checkbox>
                  <Checkbox
                    value="power_windows"
                    style={{ lineHeight: "32px" }}
                  >
                    Power windows
                  </Checkbox>
                  <Checkbox
                    value="head_up_display"
                    style={{ lineHeight: "32px" }}
                  >
                    Head-up display
                  </Checkbox>
                  <Checkbox value="navigation" style={{ lineHeight: "32px" }}>
                    Navigation
                  </Checkbox>
                  <Checkbox
                    value="keyless_operation"
                    style={{ lineHeight: "32px" }}
                  >
                    Keyless operation
                  </Checkbox>
                  <Checkbox value="seat_heating" style={{ lineHeight: "32px" }}>
                    Seat heating
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </React.Fragment>
        )}

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
              <p className="text-2xl font-medium pb-2">Company Name</p>
              <Form.Item name={`companyName`}>
                <Input placeholder="Company Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">CVR Number</p>
              <Form.Item name={`cvrNumber`}>
                <Input placeholder="CVR Number" className="py-3" />
              </Form.Item>
            </div>
          </div>
        ) : (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">First Name*</p>
              <Form.Item name={`firstName`}>
                <Input placeholder="First Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-medium pb-2">Last Name*</p>
              <Form.Item name={`lastName`}>
                <Input placeholder="Last Name" className="py-3" />
              </Form.Item>
            </div>
          </div>
        )}

        <div className="my-[10px] flex justify-between gap-5">
          <div className="">
            <p className="text-2xl font-medium pb-2">Postal Code*</p>
            <Form.Item name={`postalCode`}>
              <Input placeholder="Postal Code" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">City*</p>
            <Form.Item name={`city`}>
              <Input placeholder="City" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="">
          <p className="text-2xl font-medium pb-2">Phone Number*</p>
          <Form.Item name={`phoneNumber`}>
            <Input placeholder="Phone Number" className="py-3" />
          </Form.Item>
        </div>

        <div className="text-center">
          <button
            className="bg-highlight-color text-white py-3 px-32 rounded-md text-center my-10 text-3xl font-medium "
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
  { label: "Acura", value: "acura" },
  { label: "Alfa Romeo", value: "alfa romeo" },
  { label: "Audi", value: "audi" },
  { label: "BMW", value: "bmw" },
  { label: "Buick", value: "buick" },
  { label: "Cadillac", value: "cadillac" },
  { label: "Chevrolet", value: "chevrolet" },
  { label: "Chrysler", value: "chrysler" },
  { label: "Citroën", value: "citroën" },
  { label: "Dacia", value: "dacia" },
  { label: "Dodge", value: "dodge" },
  { label: "Ferrari", value: "ferrari" },
  { label: "Fiat", value: "fiat" },
  { label: "Ford", value: "ford" },
  { label: "GMC", value: "gmc" },
  { label: "Honda", value: "honda" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Infiniti", value: "infiniti" },
  { label: "Jaguar", value: "jaguar" },
  { label: "Jeep", value: "jeep" },
  { label: "Kia", value: "kia" },
  { label: "Lamborghini", value: "lamborghini" },
  { label: "Land Rover", value: "land rover" },
  { label: "Lexus", value: "lexus" },
  { label: "Lincoln", value: "lincoln" },
  { label: "Maserati", value: "maserati" },
  { label: "Mazda", value: "mazda" },
  { label: "McLaren", value: "mclaren" },
  { label: "Mercedes-Benz", value: "mercedes-benz" },
  { label: "Mini", value: "mini" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Nissan", value: "nissan" },
  { label: "Pagani", value: "pagani" },
  { label: "Peugeot", value: "peugeot" },
  { label: "Porsche", value: "porsche" },
  { label: "Ram", value: "ram" },
  { label: "Renault", value: "renault" },
  { label: "Rolls-Royce", value: "rolls-royce" },
  { label: "Saab", value: "saab" },
  { label: "Subaru", value: "subaru" },
  { label: "Suzuki", value: "suzuki" },
  { label: "Tesla", value: "tesla" },
  { label: "Toyota", value: "toyota" },
  { label: "Volkswagen (VW)", value: "volkswagen (vw)" },
  { label: "Volvo", value: "volvo" },
];
const carModels = [
  {
    label: <span>Acura</span>,
    title: "Acura",
    options: [
      { label: <span>ILX</span>, value: "ILX" },
      { label: <span>MDX</span>, value: "MDX" },
      { label: <span>NSX</span>, value: "NSX" },
      { label: <span>RDX</span>, value: "RDX" },
      { label: <span>RLX</span>, value: "RLX" },
      { label: <span>TLX</span>, value: "TLX" },
    ],
  },
  {
    label: <span>Alfa Romeo</span>,
    title: "Alfa Romeo",
    options: [
      { label: <span>Giulia</span>, value: "Giulia" },
      { label: <span>Stelvio</span>, value: "Stelvio" },
      { label: <span>4C</span>, value: "4C" },
      { label: <span>Tonale</span>, value: "Tonale" },
    ],
  },
  {
    label: <span>Audi</span>,
    title: "Audi",
    options: [
      { label: <span>A1</span>, value: "A1" },
      { label: <span>A3</span>, value: "A3" },
      { label: <span>A4</span>, value: "A4" },
      { label: <span>A5</span>, value: "A5" },
      { label: <span>A6</span>, value: "A6" },
      { label: <span>A7</span>, value: "A7" },
      { label: <span>A8</span>, value: "A8" },
      { label: <span>Q2</span>, value: "Q2" },
      { label: <span>Q3</span>, value: "Q3" },
      { label: <span>Q5</span>, value: "Q5" },
      { label: <span>Q7</span>, value: "Q7" },
      { label: <span>Q8</span>, value: "Q8" },
      { label: <span>RS3</span>, value: "RS3" },
      { label: <span>RS5</span>, value: "RS5" },
      { label: <span>S4</span>, value: "S4" },
      { label: <span>S5</span>, value: "S5" },
      { label: <span>S6</span>, value: "S6" },
      { label: <span>S7</span>, value: "S7" },
      { label: <span>R8</span>, value: "R8" },
      { label: <span>TT</span>, value: "TT" },
    ],
  },
  {
    label: <span>BMW</span>,
    title: "BMW",
    options: [
      { label: <span>1 Series</span>, value: "1 Series" },
      { label: <span>2 Series</span>, value: "2 Series" },
      { label: <span>3 Series</span>, value: "3 Series" },
      { label: <span>4 Series</span>, value: "4 Series" },
      { label: <span>5 Series</span>, value: "5 Series" },
      { label: <span>6 Series</span>, value: "6 Series" },
      { label: <span>7 Series</span>, value: "7 Series" },
      { label: <span>8 Series</span>, value: "8 Series" },
      { label: <span>X1</span>, value: "X1" },
      { label: <span>X2</span>, value: "X2" },
      { label: <span>X3</span>, value: "X3" },
      { label: <span>X4</span>, value: "X4" },
      { label: <span>X5</span>, value: "X5" },
      { label: <span>X6</span>, value: "X6" },
      { label: <span>X7</span>, value: "X7" },
      { label: <span>Z4</span>, value: "Z4" },
      { label: <span>M2</span>, value: "M2" },
      { label: <span>M3</span>, value: "M3" },
      { label: <span>M4</span>, value: "M4" },
      { label: <span>M5</span>, value: "M5" },
      { label: <span>M6</span>, value: "M6" },
      { label: <span>M8</span>, value: "M8" },
    ],
  },
  {
    label: <span>Buick</span>,
    title: "Buick",
    options: [
      { label: <span>Enclave</span>, value: "Enclave" },
      { label: <span>Encore</span>, value: "Encore" },
      { label: <span>Envision</span>, value: "Envision" },
      { label: <span>Regal</span>, value: "Regal" },
      { label: <span>LaCrosse</span>, value: "LaCrosse" },
    ],
  },
  {
    label: <span>Cadillac</span>,
    title: "Cadillac",
    options: [
      { label: <span>CT4</span>, value: "CT4" },
      { label: <span>CT5</span>, value: "CT5" },
      { label: <span>CT6</span>, value: "CT6" },
      { label: <span>Escalade</span>, value: "Escalade" },
      { label: <span>XT4</span>, value: "XT4" },
      { label: <span>XT5</span>, value: "XT5" },
      { label: <span>XT6</span>, value: "XT6" },
    ],
  },
  {
    label: <span>Chevrolet</span>,
    title: "Chevrolet",
    options: [
      { label: <span>Spark</span>, value: "Spark" },
      { label: <span>Sonic</span>, value: "Sonic" },
      { label: <span>Malibu</span>, value: "Malibu" },
      { label: <span>Impala</span>, value: "Impala" },
      { label: <span>Camaro</span>, value: "Camaro" },
      { label: <span>Corvette</span>, value: "Corvette" },
      { label: <span>Traverse</span>, value: "Traverse" },
      { label: <span>Equinox</span>, value: "Equinox" },
      { label: <span>Tahoe</span>, value: "Tahoe" },
      { label: <span>Suburban</span>, value: "Suburban" },
      { label: <span>Colorado</span>, value: "Colorado" },
      { label: <span>Silverado</span>, value: "Silverado" },
      { label: <span>Blazer</span>, value: "Blazer" },
      { label: <span>Trax</span>, value: "Trax" },
    ],
  },
  {
    label: <span>Chrysler</span>,
    title: "Chrysler",
    options: [
      { label: <span>300</span>, value: "300" },
      { label: <span>Pacifica</span>, value: "Pacifica" },
      { label: <span>Voyager</span>, value: "Voyager" },
    ],
  },
  {
    label: <span>Citroën</span>,
    title: "Citroën",
    options: [
      { label: <span>C3</span>, value: "C3" },
      { label: <span>C4</span>, value: "C4" },
      { label: <span>C5</span>, value: "C5" },
      { label: <span>C6</span>, value: "C6" },
      { label: <span>Berlingo</span>, value: "Berlingo" },
      { label: <span>C3 Aircross</span>, value: "C3 Aircross" },
    ],
  },
  {
    label: <span>Dacia</span>,
    title: "Dacia",
    options: [
      { label: <span>Sandero</span>, value: "Sandero" },
      { label: <span>Logan</span>, value: "Logan" },
      { label: <span>Duster</span>, value: "Duster" },
      { label: <span>Spring</span>, value: "Spring" },
    ],
  },
  {
    label: <span>Dodge</span>,
    title: "Dodge",
    options: [
      { label: <span>Charger</span>, value: "Charger" },
      { label: <span>Challenger</span>, value: "Challenger" },
      { label: <span>Durango</span>, value: "Durango" },
      { label: <span>Grand Caravan</span>, value: "Grand Caravan" },
    ],
  },
  {
    label: <span>Ferrari</span>,
    title: "Ferrari",
    options: [
      { label: <span>Portofino</span>, value: "Portofino" },
      { label: <span>488 GTB</span>, value: "488 GTB" },
      { label: <span>812 Superfast</span>, value: "812 Superfast" },
      { label: <span>F8 Tributo</span>, value: "F8 Tributo" },
      { label: <span>Roma</span>, value: "Roma" },
    ],
  },
  {
    label: <span>Fiat</span>,
    title: "Fiat",
    options: [
      { label: <span>500</span>, value: "500" },
      { label: <span>Panda</span>, value: "Panda" },
      { label: <span>Tipo</span>, value: "Tipo" },
      { label: <span>500X</span>, value: "500X" },
      { label: <span>500L</span>, value: "500L" },
    ],
  },
  {
    label: <span>Ford</span>,
    title: "Ford",
    options: [
      { label: <span>Fiesta</span>, value: "Fiesta" },
      { label: <span>Focus</span>, value: "Focus" },
      { label: <span>Fusion</span>, value: "Fusion" },
      { label: <span>Mustang</span>, value: "Mustang" },
      { label: <span>Explorer</span>, value: "Explorer" },
      { label: <span>Expedition</span>, value: "Expedition" },
      { label: <span>Escape</span>, value: "Escape" },
      { label: <span>F-150</span>, value: "F-150" },
      {
        label: <span>Super Duty (F-250, F-350, etc.)</span>,
        value: "Super Duty",
      },
      { label: <span>Ranger</span>, value: "Ranger" },
      { label: <span>Bronco</span>, value: "Bronco" },
      { label: <span>Mach-E</span>, value: "Mach-E" },
    ],
  },
  {
    label: <span>GMC</span>,
    title: "GMC",
    options: [
      { label: <span>Sierra</span>, value: "Sierra" },
      { label: <span>Canyon</span>, value: "Canyon" },
      { label: <span>Terrain</span>, value: "Terrain" },
      { label: <span>Acadia</span>, value: "Acadia" },
      { label: <span>Yukon</span>, value: "Yukon" },
    ],
  },
  {
    label: <span>Honda</span>,
    title: "Honda",
    options: [
      { label: <span>Civic</span>, value: "Civic" },
      { label: <span>Accord</span>, value: "Accord" },
      { label: <span>CR-V</span>, value: "CR-V" },
      { label: <span>HR-V</span>, value: "HR-V" },
      { label: <span>Fit</span>, value: "Fit" },
      { label: <span>Odyssey</span>, value: "Odyssey" },
      { label: <span>Ridgeline</span>, value: "Ridgeline" },
      { label: <span>Passport</span>, value: "Passport" },
      { label: <span>Pilot</span>, value: "Pilot" },
    ],
  },
  {
    label: <span>Hyundai</span>,
    title: "Hyundai",
    options: [
      { label: <span>Accent</span>, value: "Accent" },
      { label: <span>Elantra</span>, value: "Elantra" },
      { label: <span>Sonata</span>, value: "Sonata" },
      { label: <span>Ioniq</span>, value: "Ioniq" },
      { label: <span>Tucson</span>, value: "Tucson" },
      { label: <span>Santa Fe</span>, value: "Santa Fe" },
      { label: <span>Kona</span>, value: "Kona" },
      { label: <span>Palisade</span>, value: "Palisade" },
      { label: <span>Nexo</span>, value: "Nexo" },
    ],
  },
  {
    label: <span>Infiniti</span>,
    title: "Infiniti",
    options: [
      { label: <span>Q50</span>, value: "Q50" },
      { label: <span>Q60</span>, value: "Q60" },
      { label: <span>Q70</span>, value: "Q70" },
      { label: <span>QX50</span>, value: "QX50" },
      { label: <span>QX60</span>, value: "QX60" },
      { label: <span>QX80</span>, value: "QX80" },
    ],
  },
  {
    label: <span>Jaguar</span>,
    title: "Jaguar",
    options: [
      { label: <span>XE</span>, value: "XE" },
      { label: <span>XF</span>, value: "XF" },
      { label: <span>XJ</span>, value: "XJ" },
      { label: <span>F-Type</span>, value: "F-Type" },
      { label: <span>F-Pace</span>, value: "F-Pace" },
      { label: <span>E-Pace</span>, value: "E-Pace" },
    ],
  },
  {
    label: <span>Jeep</span>,
    title: "Jeep",
    options: [
      { label: <span>Cherokee</span>, value: "Cherokee" },
      { label: <span>Grand Cherokee</span>, value: "Grand Cherokee" },
      { label: <span>Wrangler</span>, value: "Wrangler" },
      { label: <span>Compass</span>, value: "Compass" },
      { label: <span>Renegade</span>, value: "Renegade" },
      { label: <span>Gladiator</span>, value: "Gladiator" },
    ],
  },
  {
    label: <span>Kia</span>,
    title: "Kia",
    options: [
      { label: <span>Rio</span>, value: "Rio" },
      { label: <span>Forte</span>, value: "Forte" },
      { label: <span>Optima</span>, value: "Optima" },
      { label: <span>Stinger</span>, value: "Stinger" },
      { label: <span>Soul</span>, value: "Soul" },
      { label: <span>Sportage</span>, value: "Sportage" },
      { label: <span>Sorento</span>, value: "Sorento" },
      { label: <span>Telluride</span>, value: "Telluride" },
    ],
  },
  {
    label: <span>Lamborghini</span>,
    title: "Lamborghini",
    options: [
      { label: <span>Huracan</span>, value: "Huracan" },
      { label: <span>Aventador</span>, value: "Aventador" },
      { label: <span>Urus</span>, value: "Urus" },
      { label: <span>Sian</span>, value: "Sian" },
    ],
  },
  {
    label: <span>Land Rover</span>,
    title: "Land Rover",
    options: [
      { label: <span>Range Rover</span>, value: "Range Rover" },
      { label: <span>Discovery</span>, value: "Discovery" },
      { label: <span>Defender</span>, value: "Defender" },
      { label: <span>Evoque</span>, value: "Evoque" },
      { label: <span>Velar</span>, value: "Velar" },
    ],
  },
  {
    label: <span>Lexus</span>,
    title: "Lexus",
    options: [
      { label: <span>IS</span>, value: "IS" },
      { label: <span>ES</span>, value: "ES" },
      { label: <span>GS</span>, value: "GS" },
      { label: <span>LS</span>, value: "LS" },
      { label: <span>RX</span>, value: "RX" },
      { label: <span>NX</span>, value: "NX" },
      { label: <span>LX</span>, value: "LX" },
      { label: <span>GX</span>, value: "GX" },
      { label: <span>UX</span>, value: "UX" },
      { label: <span>RC</span>, value: "RC" },
      { label: <span>LC</span>, value: "LC" },
    ],
  },
  {
    label: <span>Lincoln</span>,
    title: "Lincoln",
    options: [
      { label: <span>Continental</span>, value: "Continental" },
      { label: <span>MKZ</span>, value: "MKZ" },
      { label: <span>Aviator</span>, value: "Aviator" },
      { label: <span>Navigator</span>, value: "Navigator" },
      { label: <span>Corsair</span>, value: "Corsair" },
    ],
  },
  {
    label: <span>Maserati</span>,
    title: "Maserati",
    options: [
      { label: <span>Ghibli</span>, value: "Ghibli" },
      { label: <span>Levante</span>, value: "Levante" },
      { label: <span>Quattroporte</span>, value: "Quattroporte" },
      { label: <span>Alfieri</span>, value: "Alfieri" },
    ],
  },
  {
    label: <span>Mazda</span>,
    title: "Mazda",
    options: [
      { label: <span>Mazda2</span>, value: "Mazda2" },
      { label: <span>Mazda3</span>, value: "Mazda3" },
      { label: <span>Mazda6</span>, value: "Mazda6" },
      { label: <span>CX-3</span>, value: "CX-3" },
      { label: <span>CX-5</span>, value: "CX-5" },
      { label: <span>CX-9</span>, value: "CX-9" },
      { label: <span>MX-5 Miata</span>, value: "MX-5 Miata" },
    ],
  },
  {
    label: <span>McLaren</span>,
    title: "McLaren",
    options: [
      { label: <span>570S</span>, value: "570S" },
      { label: <span>720S</span>, value: "720S" },
      { label: <span>765LT</span>, value: "765LT" },
      { label: <span>GT</span>, value: "GT" },
      { label: <span>Artura</span>, value: "Artura" },
    ],
  },
  {
    label: <span>Mercedes-Benz</span>,
    title: "Mercedes-Benz",
    options: [
      { label: <span>A-Class</span>, value: "A-Class" },
      { label: <span>C-Class</span>, value: "C-Class" },
      { label: <span>E-Class</span>, value: "E-Class" },
      { label: <span>S-Class</span>, value: "S-Class" },
      { label: <span>GLA</span>, value: "GLA" },
      { label: <span>GLB</span>, value: "GLB" },
      { label: <span>GLC</span>, value: "GLC" },
      { label: <span>GLE</span>, value: "GLE" },
      { label: <span>GLS</span>, value: "GLS" },
      { label: <span>G-Class</span>, value: "G-Class" },
      { label: <span>CLA</span>, value: "CLA" },
      { label: <span>CLS</span>, value: "CLS" },
      { label: <span>EQS</span>, value: "EQS" },
      { label: <span>SLS AMG</span>, value: "SLS AMG" },
      { label: <span>AMG GT</span>, value: "AMG GT" },
    ],
  },
  {
    label: <span>Mini</span>,
    title: "Mini",
    options: [
      { label: <span>Hardtop 2 Door</span>, value: "Hardtop 2 Door" },
      { label: <span>Hardtop 4 Door</span>, value: "Hardtop 4 Door" },
      { label: <span>Countryman</span>, value: "Countryman" },
      { label: <span>Clubman</span>, value: "Clubman" },
      { label: <span>Convertible</span>, value: "Convertible" },
    ],
  },
  {
    label: <span>Mitsubishi</span>,
    title: "Mitsubishi",
    options: [
      { label: <span>Mirage</span>, value: "Mirage" },
      { label: <span>Outlander</span>, value: "Outlander" },
      { label: <span>Eclipse Cross</span>, value: "Eclipse Cross" },
      { label: <span>Outlander PHEV</span>, value: "Outlander PHEV" },
    ],
  },
  {
    label: <span>Nissan</span>,
    title: "Nissan",
    options: [
      { label: <span>Versa</span>, value: "Versa" },
      { label: <span>Sentra</span>, value: "Sentra" },
      { label: <span>Altima</span>, value: "Altima" },
      { label: <span>Maxima</span>, value: "Maxima" },
      { label: <span>Leaf</span>, value: "Leaf" },
      { label: <span>Rogue</span>, value: "Rogue" },
      { label: <span>Murano</span>, value: "Murano" },
      { label: <span>Pathfinder</span>, value: "Pathfinder" },
      { label: <span>Frontier</span>, value: "Frontier" },
      { label: <span>Titan</span>, value: "Titan" },
      { label: <span>Armada</span>, value: "Armada" },
      { label: <span>Juke</span>, value: "Juke" },
      { label: <span>Z (370Z, upcoming 400Z)</span>, value: "Z" },
    ],
  },
  {
    label: <span>Pagani</span>,
    title: "Pagani",
    options: [
      { label: <span>Huayra</span>, value: "Huayra" },
      { label: <span>Zonda</span>, value: "Zonda" },
    ],
  },
  {
    label: <span>Peugeot</span>,
    title: "Peugeot",
    options: [
      { label: <span>208</span>, value: "208" },
      { label: <span>3008</span>, value: "3008" },
      { label: <span>508</span>, value: "508" },
      { label: <span>5008</span>, value: "5008" },
      { label: <span>2008</span>, value: "2008" },
    ],
  },
  {
    label: <span>Porsche</span>,
    title: "Porsche",
    options: [
      { label: <span>718 Cayman</span>, value: "718 Cayman" },
      { label: <span>718 Boxster</span>, value: "718 Boxster" },
      { label: <span>911</span>, value: "911" },
      { label: <span>Panamera</span>, value: "Panamera" },
      { label: <span>Macan</span>, value: "Macan" },
      { label: <span>Cayenne</span>, value: "Cayenne" },
      { label: <span>Taycan</span>, value: "Taycan" },
    ],
  },
  {
    label: <span>Ram</span>,
    title: "Ram",
    options: [
      { label: <span>1500</span>, value: "1500" },
      { label: <span>2500</span>, value: "2500" },
      { label: <span>3500</span>, value: "3500" },
      { label: <span>ProMaster City</span>, value: "ProMaster City" },
      { label: <span>ProMaster Van</span>, value: "ProMaster Van" },
    ],
  },
  {
    label: <span>Renault</span>,
    title: "Renault",
    options: [
      { label: <span>Clio</span>, value: "Clio" },
      { label: <span>Captur</span>, value: "Captur" },
      { label: <span>Megane</span>, value: "Megane" },
      { label: <span>Koleos</span>, value: "Koleos" },
      { label: <span>Talisman</span>, value: "Talisman" },
    ],
  },
  {
    label: <span>Rolls-Royce</span>,
    title: "Rolls-Royce",
    options: [
      { label: <span>Phantom</span>, value: "Phantom" },
      { label: <span>Ghost</span>, value: "Ghost" },
      { label: <span>Wraith</span>, value: "Wraith" },
      { label: <span>Dawn</span>, value: "Dawn" },
      { label: <span>Cullinan</span>, value: "Cullinan" },
    ],
  },
  {
    label: <span>Saab</span>,
    title: "Saab",
    options: [
      { label: <span>9-3</span>, value: "9-3" },
      { label: <span>9-5</span>, value: "9-5" },
      { label: <span>9-4X</span>, value: "9-4X" },
    ],
  },
  {
    label: <span>Subaru</span>,
    title: "Subaru",
    options: [
      { label: <span>Impreza</span>, value: "Impreza" },
      { label: <span>Legacy</span>, value: "Legacy" },
      { label: <span>Forester</span>, value: "Forester" },
      { label: <span>Outback</span>, value: "Outback" },
      { label: <span>Crosstrek</span>, value: "Crosstrek" },
      { label: <span>Ascent</span>, value: "Ascent" },
      { label: <span>BRZ</span>, value: "BRZ" },
    ],
  },
  {
    label: <span>Suzuki</span>,
    title: "Suzuki",
    options: [
      { label: <span>Swift</span>, value: "Swift" },
      { label: <span>Vitara</span>, value: "Vitara" },
      { label: <span>SX4</span>, value: "SX4" },
      { label: <span>Baleno</span>, value: "Baleno" },
      { label: <span>Ignis</span>, value: "Ignis" },
    ],
  },
  {
    label: <span>Tesla</span>,
    title: "Tesla",
    options: [
      { label: <span>Model S</span>, value: "Model S" },
      { label: <span>Model 3</span>, value: "Model 3" },
      { label: <span>Model X</span>, value: "Model X" },
      { label: <span>Model Y</span>, value: "Model Y" },
    ],
  },
  {
    label: <span>Toyota</span>,
    title: "Toyota",
    options: [
      { label: <span>Yaris</span>, value: "Yaris" },
      { label: <span>Corolla</span>, value: "Corolla" },
      { label: <span>Camry</span>, value: "Camry" },
      { label: <span>Avalon</span>, value: "Avalon" },
      { label: <span>Prius</span>, value: "Prius" },
      { label: <span>RAV4</span>, value: "RAV4" },
      { label: <span>Highlander</span>, value: "Highlander" },
      { label: <span>4Runner</span>, value: "4Runner" },
      { label: <span>Sequoia</span>, value: "Sequoia" },
      { label: <span>Land Cruiser</span>, value: "Land Cruiser" },
      { label: <span>Tacoma</span>, value: "Tacoma" },
      { label: <span>Tundra</span>, value: "Tundra" },
      { label: <span>Sienna</span>, value: "Sienna" },
      { label: <span>Venza</span>, value: "Venza" },
      { label: <span>Supra</span>, value: "Supra" },
    ],
  },
  {
    label: <span>Volkswagen</span>,
    title: "Volkswagen",
    options: [
      { label: <span>Polo</span>, value: "Polo" },
      { label: <span>Golf</span>, value: "Golf" },
      { label: <span>Jetta</span>, value: "Jetta" },
      { label: <span>Passat</span>, value: "Passat" },
      { label: <span>Arteon</span>, value: "Arteon" },
      { label: <span>Tiguan</span>, value: "Tiguan" },
      { label: <span>Atlas</span>, value: "Atlas" },
      { label: <span>ID.4 (Electric)</span>, value: "ID.4" },
    ],
  },
  {
    label: <span>Volvo</span>,
    title: "Volvo",
    options: [
      { label: <span>XC40</span>, value: "XC40" },
      { label: <span>XC60</span>, value: "XC60" },
      { label: <span>XC90</span>, value: "XC90" },
      { label: <span>S60</span>, value: "S60" },
      { label: <span>S90</span>, value: "S90" },
      { label: <span>V60</span>, value: "V60" },
      { label: <span>V90</span>, value: "V90" },
    ],
  },
];
const rawColors = [
  { label: "Any", value: "any", colorCode: "#" },
  { label: "Black", value: "black", colorCode: "#000000" },
  { label: "White", value: "white", colorCode: "#FFFFFF" },
  { label: "Gray", value: "gray", colorCode: "#808080" },
  { label: "Silver", value: "silver", colorCode: "#C0C0C0" },
  { label: "Blue", value: "blue", colorCode: "#0000FF" },
  { label: "Red", value: "red", colorCode: "#FF0000" },
  { label: "Green", value: "green", colorCode: "#008000" },
  { label: "Yellow", value: "yellow", colorCode: "#FFFF00" },
  { label: "Orange", value: "orange", colorCode: "#FFA500" },
  { label: "Brown", value: "brown", colorCode: "#A52A2A" },
  { label: "Purple", value: "purple", colorCode: "#800080" },
  { label: "Beige", value: "beige", colorCode: "#F5F5DC" },
  { label: "Pink", value: "pink", colorCode: "#FFC0CB" },
  { label: "Gold", value: "gold", colorCode: "#FFD700" },
  { label: "Bronze", value: "bronze", colorCode: "#CD7F32" },
  { label: "Turquoise", value: "turquoise", colorCode: "#40E0D0" },
  { label: "Champagne", value: "champagne", colorCode: "#F7E7CE" },
  { label: "Ivory", value: "ivory", colorCode: "#FFFFF0" },
  { label: "Tan", value: "tan", colorCode: "#D2B48C" },
  { label: "Copper", value: "copper", colorCode: "#B87333" },
  { label: "Emerald Green", value: "emerald_green", colorCode: "#50C878" },
  { label: "Navy Blue", value: "navy_blue", colorCode: "#000080" },
  { label: "Matte Black", value: "matte_black", colorCode: "#1C1C1C" },
  { label: "Matte White", value: "matte_white", colorCode: "#F4F4F4" },
  { label: "Metallic Gray", value: "metallic_gray", colorCode: "#A9A9A9" },
  { label: "Metallic Blue", value: "metallic_blue", colorCode: "#3B9C9C" },
  { label: "Pearl White", value: "pearl_white", colorCode: "#F8F6F0" },
  { label: "Lime Green", value: "lime_green", colorCode: "#32CD32" },
  { label: "Sky Blue", value: "sky_blue", colorCode: "#87CEEB" },
  { label: "Rose Gold", value: "rose_gold", colorCode: "#B76E79" },
  { label: "Mint Green", value: "mint_green", colorCode: "#98FF98" },
  { label: "Bright Yellow", value: "bright_yellow", colorCode: "#FFEA00" },
  { label: "Sunset Orange", value: "sunset_orange", colorCode: "#FF4500" },
  { label: "Fuchsia", value: "fuchsia", colorCode: "#FF00FF" },
  { label: "Silver Metallic", value: "silver_metallic", colorCode: "#B0C4DE" },
  { label: "Burgundy", value: "burgundy", colorCode: "#800020" },
  { label: "Sea Green", value: "sea_green", colorCode: "#2E8B57" },
  { label: "Cobalt Blue", value: "cobalt_blue", colorCode: "#0047AB" },
  { label: "Electric Blue", value: "electric_blue", colorCode: "#7DF9FF" },
  { label: "Candy Red", value: "candy_red", colorCode: "#D2042D" },
  { label: "Jet Black", value: "jet_black", colorCode: "#343434" },
  { label: "Sapphire Blue", value: "sapphire_blue", colorCode: "#0F52BA" },
  { label: "Racing Green", value: "racing_green", colorCode: "#004225" },
  {
    label: "Sunflower Yellow",
    value: "sunflower_yellow",
    colorCode: "#FFC512",
  },
  { label: "Chocolate Brown", value: "chocolate_brown", colorCode: "#381819" },
  { label: "Graphite", value: "graphite", colorCode: "#4B4B4B" },
  { label: "Platinum Silver", value: "platinum_silver", colorCode: "#E5E4E2" },
  { label: "Onyx Black", value: "onyx_black", colorCode: "#353839" },
  { label: "Crystal White", value: "crystal_white", colorCode: "#FBFBF9" },
  { label: "Bright Blue", value: "bright_blue", colorCode: "#0096FF" },
  { label: "Red Metallic", value: "red_metallic", colorCode: "#C21807" },
  { label: "Coral Red", value: "coral_red", colorCode: "#FF4040" },
  { label: "Midnight Blue", value: "midnight_blue", colorCode: "#191970" },
  { label: "Brite Red", value: "brite_red", colorCode: "#FF2400" },
  { label: "Frost White", value: "frost_white", colorCode: "#FDFEFE" },
  { label: "Deep Purple", value: "deep_purple", colorCode: "#301934" },
  { label: "Candy Apple Red", value: "candy_apple_red", colorCode: "#A40000" },
  { label: "Vermilion Red", value: "vermilion_red", colorCode: "#E34234" },
  { label: "Anthracite", value: "anthracite", colorCode: "#293133" },
  { label: "Steel Blue", value: "steel_blue", colorCode: "#4682B4" },
  { label: "Mocha Brown", value: "mocha_brown", colorCode: "#837060" },
  { label: "Gunmetal Gray", value: "gunmetal_gray", colorCode: "#2a3439" },
  { label: "Storm Gray", value: "storm_gray", colorCode: "#71797E" },
  { label: "Magnetic Gray", value: "magnetic_gray", colorCode: "#6E6E6E" },
  { label: "Titanium Silver", value: "titanium_silver", colorCode: "#D6D6D6" },
  { label: "Alpine White", value: "alpine_white", colorCode: "#EDEDED" },
  { label: "Carbon Black", value: "carbon_black", colorCode: "#1C1C1C" },
  { label: "Shadow Black", value: "shadow_black", colorCode: "#2B2B2B" },
  { label: "Blizzard Pearl", value: "blizzard_pearl", colorCode: "#F6F8F9" },
  { label: "Inferno Red", value: "inferno_red", colorCode: "#B22222" },
  { label: "Desert Sand", value: "desert_sand", colorCode: "#EDC9Af" },
  { label: "Forest Green", value: "forest_green", colorCode: "#228B22" },
  { label: "Magenta", value: "magenta", colorCode: "#FF00FF" },
  { label: "Amethyst", value: "amethyst", colorCode: "#9966CC" },
];
