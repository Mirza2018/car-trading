"use client";
import { AllImages } from "@/assets/AllImages";
import { useLazyGetCarInfoQuery } from "@/redux/api/features/carPrivate";
import {
  clearCarLicenseInfo,
  setCarLicenseInfo,
} from "@/redux/slices/carInfoSlice";
import { Checkbox, Form, Input, InputNumber, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Licenseplate = ({ offerCar }) => {
  const [trigger, { data, isSuccess, isError }] = useLazyGetCarInfoQuery();
  const carData = useSelector((state) => state.carInfo.carLicenseInfo);
  console.log(carData);
  const [form] = useForm();
  const param = useParams();
  const navigate = useRouter();
  const [selectedCar, setSelectedCar] = useState(null);
  const inputRef = useRef(null);
  const toastId = "unique-toast-id";
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Nummerplade fundet", {
        id: toastId,
        duration: 2000,
      });
      const numberPlates = inputRef?.current?.input?.value;

      const carAllDetails = {
        ...data?.data?.data,
        numberPlates: numberPlates,
      };
      dispatch(clearCarLicenseInfo());
      dispatch(setCarLicenseInfo(carAllDetails));
    }

    if (isError) {
      console.log(isError);

      toast.error("Angiv et gyldigt registreringspladenummer", {
        id: toastId,
        duration: 2000,
      });
    }
  }, [isSuccess, isError, data, dispatch]);
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

  const handleEditClick = async () => {
    toast.loading("Søger efter nummerplade", {
      id: toastId,
      duration: 1000,
    });
    const inputValue = inputRef.current?.input?.value;

    try {
      const res = await trigger({ license: inputValue }).unwrap(); // unwrap returns a promise that rejects on error
      console.log("res", res);
      toast.success("Nummerplade fundet", {
        id: toastId,
        duration: 1000,
      });
    } catch (error) {}
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
    const toastId = toast.loading("Handel sendes…");
    values.models = selectedCar;
    console.log(values);

    if (!carData) {
      return toast.error("Søg venligst efter et registreringspladenummer", {
        id: toastId,
        duration: 2000,
      });
    }

    const data = {
      ...values,
      submitListingCarId: param.id,
      carLicensePlateNumber: carData?.numberPlates,
      chassisNumber: carData?.vin,
      mark: carData?.brand,
      model: carData?.model,
    };

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
      toast.success("Handel sendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at sende handlen", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="">
      <div className="mb-3 ">
        <p className="font-bold text-2xl pb-2">Nummerpladenummer</p>
        <Input
          ref={inputRef}
          placeholder="Indtast nummerplade"
          className="!w-80 !h-11 "
          suffix={
            <div
              onClick={handleEditClick}
              className="bg-highlight-color font-semibold text-white rounded py-2 px-4 cursor-pointer"
            >
              Søg
            </div>
          }
          prefix={
            <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded px-4 py-1">
              <Image
                width={0}
                height={0}
                alt="search"
                src={AllImages.star}
                className="w-4"
              />
              <Image
                width={0}
                height={0}
                alt="search"
                className="w-3"
                src={AllImages.dk}
              />
            </div>
          }
        />

        {carData && (
          <p className="mt-2 text-lg font-medium text-start">
            {carData?.brand} {carData?.model}, {carData?.version}{" "}
            {carData?.body_type?.name} {carData?.engine_power}
            {carData?.engine_power && " KW"}
          </p>
        )}
      </div>
      <Form
        onFinish={onFinsh}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="vertical"
      >
        {/* <Form.Item
          label={
            <span className="font-bold text-2xl">Lisense plate Number</span>
          }
          name="carLicensePlateNumber"
          rules={[
            {
              required: true,
              message: "Please inputr Car License PlateNumber",
            },
          ]}
        >
          <Input placeholder="Car lisense plate Number" />
        </Form.Item> */}

        <div className="grid sm:grid-cols-2 gap-5">
          <Form.Item
            label={<span className="font-bold text-2xl">Kategori</span>}
            name="carCategory"
            rules={[
              {
                required: true,
                message: "Vælg venligst kategori",
              },
            ]}
          >
            <Select
              className="! "
              placeholder={
                <span className="text-black ">Privat bil eller firmabil</span>
              }
            >
              <Select.Option value="Private Car">Privat bil</Select.Option>
              <Select.Option value="Company Car">Firmabil</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst bilens tilstand",
              },
            ]}
            className="flex-1"
            label={<span className="font-bold text-2xl">Tilstand</span>}
            name="carCondition"
          >
            <Select placeholder={<span className="text-black ">Ny/brugt</span>}>
              <Select.Option value="Ny">Ny</Select.Option>
              <Select.Option value="Brugt">Brugt</Select.Option>
            </Select>
          </Form.Item>
        </div>
        {/* <div className="grid sm:grid-cols-2 gap-5">
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
        </div> */}

        <div className="grid sm:grid-cols-2 gap-5">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Indtast venligst modelår",
              },
            ]}
            label={<span className="font-bold text-2xl">Indtast årgang</span>}
            name="modelsYear"
            className="flex-1"
          >
            <InputNumber
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full"
              placeholder="Indtast årgang"
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Indtast venligst pris",
              },
            ]}
            label={<span className="font-bold text-2xl">Pris</span>}
            name="cashPrice"
            className="flex-1"
          >
            <InputNumber
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full"
              placeholder="Indtast pris"
            />
          </Form.Item>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst pris type",
              },
            ]}
            label={<span className="font-bold text-2xl">Pristype</span>}
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
                <Checkbox value="Kontant pris" style={{ lineHeight: "32px" }}>
                  Kontant pris
                </Checkbox>
                <Checkbox
                  value="Biler under afgift"
                  style={{ lineHeight: "32px" }}
                >
                  Biler under afgift
                </Checkbox>
                {/* <Checkbox value="Wholesale CVR" style={{ lineHeight: "32px" }}>
                  Engros/CVR
                </Checkbox> */}
              </div>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst geartype",
              },
            ]}
            label={<span className="font-bold text-2xl">Geartype</span>}
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
                  value="Manual"
                  // checked={selectedGeartype === "manualGear"}
                  // onChange={handleGeartypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Manual
                </Checkbox>
                <Checkbox
                  value="Automatic"
                  // checked={selectedGeartype === "automaticGear"}
                  // onChange={handleGeartypeCheckboxChange}
                  style={{ lineHeight: "32px" }}
                >
                  Automatic
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
                message: "Indtast venligst kørte km",
              },
            ]}
            label={<span className="font-bold text-2xl">Kørte km</span>}
            name="DrivenKm"
            className="flex-1"
          >
            <InputNumber
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full"
              placeholder="Indtast antal kørte kilometer."
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst bilens farve",
              },
            ]}
            label={<span className="font-bold text-2xl">Farve</span>}
            name="color"
            className="flex-1"
          >
            <Select
              placeholder={<span className="">Vælg farve</span>}
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
          label={
            <span className="font-bold text-2xl select-none">Modeller</span>
          }
          name="models"
        >
          <div className="flex justify-center ">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3 select-none max-w-xl ">
              <div
                onClick={() => handleCarSelect("mikrobil")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform
         ${
           selectedCar === "mikrobil"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }
       `}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct1} alt="Mikrobil car" />
                </div>
              </div>

              <div
                onClick={() => handleCarSelect("stationcar")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "stationcar"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct2} alt="car" />
                </div>
                {/* <p className="text-center">Stationcar</p> */}
              </div>

              <div
                // type="button"
                onClick={() => handleCarSelect("suv")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "suv"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct3} alt="car" />
                </div>
                {/* <p className="text-center"> SUV</p> */}
              </div>

              <div
                // type="button"
                onClick={() => handleCarSelect("crossover")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "crossover"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct4} alt="car" />
                </div>
                {/* <p className="text-center">Crossover (CUV)</p> */}
              </div>

              <div
                onClick={() => handleCarSelect("minibus")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "minibus"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct5} alt="car" />
                </div>
                {/* <p className="text-center">Minibus (MPV)</p> */}
              </div>

              <div
                onClick={() => handleCarSelect("sedan")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "sedan"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct6} alt="car" />
                </div>
                {/* <p className="text-center"> Sedan</p> */}
              </div>

              <div
                onClick={() => handleCarSelect("hatchback")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "hatchback"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct7} alt="car" />
                </div>
                {/* <p className="text-center">Hatchback</p> */}
              </div>

              <div
                onClick={() => handleCarSelect("cabriolet")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "cabriolet"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct8} alt="car" />
                </div>
                {/* <p className="text-center"> Cabriolet</p> */}
              </div>

              <div
                onClick={() => handleCarSelect("coupe")}
                className={`cursor-pointer rounded-md p-2 w-fit border transition-all duration-300 
         transform ${
           selectedCar === "coupe"
             ? "border-secondary-color bg-gray-100 scale-105 shadow-md"
             : "border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md"
         }`}
              >
                <div className="w-fit rounded p-2 ">
                  <Image src={AllImages.ct9} alt="car" />
                </div>
                {/* <p className="text-center"> Coupe</p> */}
              </div>
            </div>
          </div>
        </Form.Item>
        <div className="grid grid-cols-2 gap-5 items-start">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vælg venligst brændstoftype",
              },
            ]}
            label={<span className="font-bold text-2xl">Brændstof</span>}
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

          <div>
            <h1 className="text-2xl font-bold mb-2">Upload billede</h1>
            <Form.Item
              // rules={[
              //   {
              //     required: true,
              //     message: "Please Select  at least one image!",
              //   },
              // ]}
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
                  Træk og slip op til 10 billeder her
                </p>
                <p className="ant-upload-text">eller klik for at uploade.</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>

        <div className="text-center">
          <button
            style={{ fontSize: "clamp(14px, 1vw + 1rem ,30px)" }}
            className="bg-highlight-color text-white py-3 md:px-32 px-3 rounded-md text-center my-10 font-medium whitespace-nowrap"
            htmlType="submit"
          >
            Tilbud sendt
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Licenseplate;

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
