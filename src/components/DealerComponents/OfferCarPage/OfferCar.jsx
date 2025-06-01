"use client";
import { AllImages } from "@/assets/AllImages";
import { Checkbox, Form, Input, InputNumber, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
 
const OfferCar = ({ offerCar }) => {
  const [form] = useForm();
  const param = useParams();
  const navigate = useRouter();
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
    const toastId = toast.loading("Deal is sending...");
    values.models = selectedCar;
    console.log(values);

    const data = { ...values, submitListingCarId: param.id };
    delete data.carImages;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const images = values.carImages || [];

    images.forEach((image, index) => {
      if (image.originFileObj) {
        formData.append("images", image.originFileObj);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // return;
    try {
      const res = await offerCar(formData).unwrap();
      console.log(res);
      toast.success(res?.data?.message || "Deal is sending Successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "There is an problem sending deal", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="">
      <Form
        onFinish={onFinsh}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="vertical"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Form.Item
            label={<span className="font-bold text-2xl">Category</span>}
            name="carCategory"
            rules={[
              {
                required: true,
                message: "Please Select Category",
              },
            ]}
          >
            <Select
              className="! "
              placeholder={
                <span className="text-black ">Private car or company car</span>
              }
            >
              <Select.Option value="Private Car">Private Car</Select.Option>
              <Select.Option value="Company Car">Company Car</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Mark",
              },
            ]}
            label={<span className="font-bold text-2xl">Mark</span>}
            name="mark"
          >
            <Select
              placeholder={<span className="text-black ">Brands</span>}
              className=" !bg-base-color"
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
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input Model",
              },
            ]}
            label={<span className="font-bold text-2xl">Model</span>}
            name="model"
          >
            <Input placeholder="input Model" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Car Condition",
              },
            ]}
            className="flex-1"
            label={<span className="font-bold text-2xl">Condition</span>}
            name="carCondition"
          >
            <Select placeholder={<span className="text-black ">New/used</span>}>
              <Select.Option value="new">New</Select.Option>
              <Select.Option value="used">Used</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input Models Year",
              },
            ]}
            label={<span className="font-bold text-2xl">Models Year</span>}
            name="modelsYear"
            className="flex-1"
          >
            <InputNumber className="w-full" placeholder="Input model year" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input price",
              },
            ]}
            label={<span className="font-bold text-2xl">Price</span>}
            name="cashPrice"
            className="flex-1"
          >
            <InputNumber className="w-full" placeholder="Input CashPrice " />
          </Form.Item>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Price type",
              },
            ]}
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
                <Checkbox value="Cash Price" style={{ lineHeight: "32px" }}>
                  Cash price
                </Checkbox>
                <Checkbox
                  value="Cars Without Tax"
                  style={{ lineHeight: "32px" }}
                >
                  Cars without tax
                </Checkbox>
                <Checkbox value="Wholesale CVR" style={{ lineHeight: "32px" }}>
                  Wholesale/CVR
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Gear type",
              },
            ]}
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
                  value="Manual Gear"
                  // checked={selectedGeartype === "manualGear"}
                  // onChange={handleGeartypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Manual gear
                </Checkbox>
                <Checkbox
                  value="Automatic Gear"
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
        <div className="grid sm:grid-cols-2 gap-5 pt-4">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input Driven km",
              },
            ]}
            label={<span className="font-bold text-2xl">Driven km</span>}
            name="DrivenKm"
            className="flex-1"
          >
            <InputNumber className="w-full" placeholder="Input Driven Km" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Choose Car Color",
              },
            ]}
            label={<span className="font-bold text-2xl">Color</span>}
            name="color"
            className="flex-1"
          >
            <Select
              placeholder={<span className="">Choose Color</span>}
              className=" !bg-base-color"
              showSearch
              mode=""
              optionFilterProp="label"
              filterOption={(input, option) =>
                option?.label?.props?.children?.[1]?.props?.children
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={carColors}
            />
          </Form.Item>
        </div>
        <Form.Item
          label={<span className="font-bold text-2xl">Models</span>}
          name="models"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 gap-4 p-4">
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
        <div className="grid grid-cols-2 gap-5 items-start">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Select Fuel Type",
              },
            ]}
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
                  value="Electric Car"
                  // checked={selectedFuleType === "electricCar"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Electric Car
                </Checkbox>
                <Checkbox
                  value="Petrol"
                  // checked={selectedFuleType === "petrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Petrol
                </Checkbox>
                <Checkbox
                  value="Diesel"
                  // checked={selectedFuleType === "diesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Diesel
                </Checkbox>
                <Checkbox
                  value="Hybrid Gasoline"
                  // checked={selectedFuleType === "hybridGasoline"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid - Gasoline
                </Checkbox>
                <Checkbox
                  value="Hybrid Diesel"
                  // checked={selectedFuleType === "hybridDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Hybrid - Diesel
                </Checkbox>
                <Checkbox
                  value="Plugin Petrol"
                  // checked={selectedFuleType === "pluginPetrol"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-in - Petrol
                </Checkbox>
                <Checkbox
                  value="Plugin Diesel"
                  // checked={selectedFuleType === "pluginDiesel"}
                  // onChange={handleFuleTypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Plug-in - Diesel
                </Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>

          <div>
            <h1 className="text-2xl font-bold mb-2">Upload Image</h1>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select  at least one image!",
                },
              ]}
              name="carImages"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                multiple="true"
                onChange={handleUploadChange}
                name="files"
                className=""
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

        <div className="text-center">
          <button
            style={{ fontSize: "clamp(14px, 1vw + 1rem ,30px)" }}
            className="bg-highlight-color text-white py-3 md:px-32 px-3 rounded-md text-center my-10  font-medium whitespace-nowrap"
            htmlType="submit"
          >
            Offer Send
          </button>
        </div>
      </Form>
    </div>
  );
};

export default OfferCar;

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
