"use client";
import { AllImages } from "@/assets/AllImages";
import { Checkbox, DatePicker, Form, Input, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OfferCar = () => {
  const [form] = useForm();
  const { RangePicker } = DatePicker;

  const [isDistance, setIsDistance] = useState(false);
  const [isCompany, setIsCompany] = useState(true);

  console.log(isDistance);

  const [selectedPriceType, setSelectedPriceType] = useState(null);
  const [selectedFuleType, setSelectedFuleType] = useState(null);
  const [selectedGeartype, setSelectedGeartype] = useState(null);

  const handleCheckboxChange = (e) => {
    // If the clicked checkbox is already selected, unselect it
    setSelectedPriceType(e.target.checked ? e.target.value : null);
  };
  const handleFuleTypeCheckboxChange = (e) => {
    // If the clicked checkbox is already selected, unselect it
    setSelectedFuleType(e.target.checked ? e.target.value : null);
  };
  const handleGeartypeCheckboxChange = (e) => {
    // If the clicked checkbox is already selected, unselect it
    setSelectedGeartype(e.target.checked ? e.target.value : null);
  };

  const [selectedCar, setSelectedCar] = useState(null);
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
  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };
  const onFinsh = (values) => {
    values.car = selectedCar;
    console.log(values);
  };
  return (
    <div className="max-w-[1200px] md:mx-20 mx-4 ">
      <div className=" bg-base-color  mx-auto border border-secondary-color rounded mt-10 w-full my-5">
        <h1 className="text-2xl font-bold bg-highlight-color m-1 rounded text-center py-1 text-white ">
          Offer Car
        </h1>
      </div>
      <Form onFinish={onFinsh} form={form} layout="vertical">
        <Form.Item
          label={<span className="font-bold text-2xl">Car Category</span>}
          name="category"
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
          <Select
            placeholder={<span className="text-black text-xl">Model</span>}
            className="!h-12 !bg-base-color"
            options={carModels}
          />
        </Form.Item>
        {/* 
        <p className="text-2xl font-medium pb-2">Model*</p>
        <Form.Item name={`PhoneNumber`}>
          <Input placeholder="Phone Number" className="py-3" />
        </Form.Item> */}

        <h1 className="font-bold text-2xl mb-2">Cash price</h1>

        <Form.Item
          label={<span className="font-medium text-base">Max price</span>}
          name="cash"
          className="flex-1"
        >
          <Input placeholder="0" />
        </Form.Item>

        <div className="flex justify-between items-center">
          <Form.Item
            label={<span className="font-bold text-2xl">Price type</span>}
            name="priceType"
            className="flex-1"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Checkbox
                value="cashPrice"
                checked={selectedPriceType === "cashPrice"}
                onChange={handleCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Cash price
              </Checkbox>
              <Checkbox
                value="carsWithoutTax"
                checked={selectedPriceType === "carsWithoutTax"}
                onChange={handleCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Cars without tax
              </Checkbox>
              <Checkbox
                value="wholesaleCVR"
                checked={selectedPriceType === "wholesaleCVR"}
                onChange={handleCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Wholesale/CVR
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item
            className="flex-1"
            label={<span className="font-bold text-2xl">New/used</span>}
            name="newUsed"
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
          name="car"
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
              onClick={() => handleCarSelect("cashPrice")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "cashPrice" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct2} alt="car" />
              </div>
              <p className="text-center"> Station wagon</p>
            </div>
            <div
              onClick={() => handleCarSelect("stationwagon")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "stationwagon"
                  ? "border border-blue-500 "
                  : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct3} alt="car" />
              </div>
              <p className="text-center"> SUV</p>
            </div>
            <div
              onClick={() => handleCarSelect("suv")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "suv" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct4} alt="car" />
              </div>
              <p className="text-center">Crossover (CUV)</p>
            </div>
            <div
              onClick={() => handleCarSelect("crossover")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "crossover" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct6} alt="car" />
              </div>
              <p className="text-center">Minibus (MPV)</p>
            </div>
            <div
              onClick={() => handleCarSelect("minibus")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "minibus" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct7} alt="car" />
              </div>
              <p className="text-center"> Sedan</p>
            </div>
            <div
              onClick={() => handleCarSelect("sedan")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "sedan" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct8} alt="car" />
              </div>
              <p className="text-center">Hatchback</p>
            </div>
            <div
              onClick={() => handleCarSelect("hatchback")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "hatchback" ? "border border-blue-500 " : "  "
              }`}
            >
              <div className="border  border-secondary-color w-fit p-4 rounded-md">
                <Image src={AllImages.ct9} alt="car" />
              </div>
              <p className="text-center"> Cabriolet</p>
            </div>
            <div
              onClick={() => handleCarSelect("cabriolet")}
              className={`px-4 py-2 cursor-pointer rounded-md mb-2  w-fit ${
                selectedCar === "cabriolet" ? "border border-blue-500 " : "  "
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
            name="fuleType"
            className="flex-1"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Checkbox
                value="no"
                checked={selectedFuleType === "electricCar"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Electric Car
              </Checkbox>
              <Checkbox
                value="petrol"
                checked={selectedFuleType === "petrol"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Petrol
              </Checkbox>
              <Checkbox
                value="diesel"
                checked={selectedFuleType === "diesel"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Diesel
              </Checkbox>
              <Checkbox
                value="hybridGasoline"
                checked={selectedFuleType === "hybridGasoline"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Hybrid - Gasoline
              </Checkbox>
              <Checkbox
                value="hybridDiesel"
                checked={selectedFuleType === "hybridDiesel"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Hybrid - Diesel
              </Checkbox>
              <Checkbox
                value="pluginPetrol"
                checked={selectedFuleType === "pluginPetrol"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Plug-in - Petrol
              </Checkbox>
              <Checkbox
                value="pluginDiesel"
                checked={selectedFuleType === "pluginDiesel"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Plug-in - Diesel
              </Checkbox>
            </div>
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-2xl">Gear type</span>}
            name="geartype"
            className="flex-1"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Checkbox
                value="manualGear"
                checked={selectedGeartype === "manualGear"}
                onChange={handleGeartypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Manual gear
              </Checkbox>
              <Checkbox
                value="automaticGear"
                checked={selectedGeartype === "automaticGear"}
                onChange={handleGeartypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                Automatic gear
              </Checkbox>
            </div>
          </Form.Item>
        </div>

        <h1 className="font-bold text-2xl mb-2">Models</h1>
        <div className="flex  justify-between gap-5">
          <Form.Item
            label={<span className="font-medium text-base">Car Use</span>}
            name="carUse"
            className="flex-1"
          >
            <Input placeholder=" 1 years 3days" />
          </Form.Item>
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

        <h1 className="font-bold text-2xl mb-2">Driven km</h1>

        <Form.Item name="drivenKm" className="flex-1">
          <Input placeholder="0" />
        </Form.Item>

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
        <Link href={`/`}>
          <div className="text-center">
            <button
              className="bg-highlight-color text-white py-3 px-32 rounded-md text-center my-10 text-3xl font-medium "
              htmlType="submit"
            >
              Offer Send
            </button>{" "}
          </div>
        </Link>
      </Form>
    </div>
  );
};

export default OfferCar;

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
const carColors = [
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Gray", value: "gray" },
  { label: "Silver", value: "silver" },
  { label: "Blue", value: "blue" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
  { label: "Orange", value: "orange" },
  { label: "Brown", value: "brown" },
  { label: "Purple", value: "purple" },
  { label: "Beige", value: "beige" },
  { label: "Pink", value: "pink" },
  { label: "Gold", value: "gold" },
  { label: "Bronze", value: "bronze" },
  { label: "Turquoise", value: "turquoise" },
  { label: "Champagne", value: "champagne" },
  { label: "Ivory", value: "ivory" },
  { label: "Tan", value: "tan" },
  { label: "Copper", value: "copper" },
  { label: "Emerald Green", value: "emerald_green" },
  { label: "Navy Blue", value: "navy_blue" },
  { label: "Matte Black", value: "matte_black" },
  { label: "Matte White", value: "matte_white" },
  { label: "Metallic Gray", value: "metallic_gray" },
  { label: "Metallic Blue", value: "metallic_blue" },
  { label: "Pearl White", value: "pearl_white" },
  { label: "Lime Green", value: "lime_green" },
  { label: "Sky Blue", value: "sky_blue" },
  { label: "Rose Gold", value: "rose_gold" },
  { label: "Mint Green", value: "mint_green" },
  { label: "Bright Yellow", value: "bright_yellow" },
  { label: "Sunset Orange", value: "sunset_orange" },
  { label: "Fuchsia", value: "fuchsia" },
  { label: "Silver Metallic", value: "silver_metallic" },
  { label: "Burgundy", value: "burgundy" },
  { label: "Sea Green", value: "sea_green" },
  { label: "Cobalt Blue", value: "cobalt_blue" },
  { label: "Electric Blue", value: "electric_blue" },
  { label: "Candy Red", value: "candy_red" },
  { label: "Jet Black", value: "jet_black" },
  { label: "Sapphire Blue", value: "sapphire_blue" },
  { label: "Racing Green", value: "racing_green" },
  { label: "Sunflower Yellow", value: "sunflower_yellow" },
  { label: "Chocolate Brown", value: "chocolate_brown" },
  { label: "Graphite", value: "graphite" },
  { label: "Platinum Silver", value: "platinum_silver" },
  { label: "Onyx Black", value: "onyx_black" },
  { label: "Crystal White", value: "crystal_white" },
  { label: "Bright Blue", value: "bright_blue" },
  { label: "Red Metallic", value: "red_metallic" },
  { label: "Coral Red", value: "coral_red" },
  { label: "Midnight Blue", value: "midnight_blue" },
  { label: "Brite Red", value: "brite_red" },
  { label: "Frost White", value: "frost_white" },
  { label: "Deep Purple", value: "deep_purple" },
  { label: "Candy Apple Red", value: "candy_apple_red" },
  { label: "Vermilion Red", value: "vermilion_red" },
];
