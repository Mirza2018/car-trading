import { AllImages } from "@/assets/AllImages";
import { Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { Button } from "antd/es/radio";
import Image from "next/image";
import React, { useState } from "react";

const OfferSend = () => {
  const [form] = useForm();
  const { RangePicker } = DatePicker;
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

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };
  const onFinsh = (values) => {
    values.car = selectedCar;
    console.log(values);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <Form onFinish={onFinsh} form={form} layout="vertical">
        <Form.Item
          label={<span className="font-bold text-2xl">Category</span>}
          name="category"
        >
          <Select
            placeholder={<span className="text-black text-xl">personal</span>}
          >
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item
          label={<span className="font-bold text-2xl">Model</span>}
          name="model"
        >
          <Select
            placeholder={<span className="text-black text-xl">Model</span>}
          >
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-2xl">Cash price</span>}
          name="cash"
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
                checked={selectedFuleType === "no"}
                onChange={handleFuleTypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                No
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
              <Checkbox
                value="newVision"
                checked={selectedGeartype === "newVision"}
                onChange={handleGeartypeCheckboxChange}
                style={{ lineHeight: "32px" }}
              >
                New vision
              </Checkbox>
            </div>
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-bold text-2xl">Car Use</span>}
          name="carUse"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label={<span className="font-bold text-2xl">Driven km</span>}
          name="drivenkm"
        >
          <Input placeholder="0" />
        </Form.Item>
        <div className="text-center">
          <button
            className="bg-highlight-color text-white py-3 px-32 rounded-md text-center my-10 text-3xl font-medium "
            htmlType="submit"
          >
            Offer Send
          </button>
        </div>
      </Form>
    </div>
  );
};

export default OfferSend;
