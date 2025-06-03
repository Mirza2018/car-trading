import { AllImages } from "@/assets/AllImages";
import {
  useLazyGetCarInfoQuery,
  useSaleCarMutation,
} from "@/redux/api/features/carPrivate";
import {
  clearCarLicenseInfo,
  setCarLicenseInfo,
} from "@/redux/slices/carInfoSlice";

import { Checkbox, Form, Input, InputNumber, Radio, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const SellCarAllDetails = () => {
  const [saleData] = useSaleCarMutation();
  const [trigger, { data, isSuccess, isError }] = useLazyGetCarInfoQuery();
  const carData = useSelector((state) => state.carInfo.carLicenseInfo);
  console.log(carData);

  const [isCompany, setIsCompany] = useState(true);
  const [form] = useForm();
  const { TextArea } = Input;
  const inputRef = useRef(null);
  const toastId = "unique-toast-id";
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("License plate data fetch successfully...", {
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
      toast.error("Give a valid license plate number", {
        id: toastId,
        duration: 2000,
      });
    }
  }, [isSuccess, isError, data, dispatch]);

  const handleEditClick = () => {
    toast.loading("License plate is Checking....", {
      id: toastId,
    });
    const inputValue = inputRef.current?.input?.value;
    trigger({ license: inputValue });
  };

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

  const onFinishFailed = ({ errorFields }) => {
    toast.error(errorFields[0]?.errors[0], {
      toastId: "formError",
      autoClose: 2000,
    });
    console.log(errorFields);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Your Car is listing...");
    try {
      const data = {
        ...values,
        registrationNumber: carData?.registration,
        carCategory: carData?.type,
        milage: carData?.last_inspection_odometer || 0,
        firstRegistrationDate: carData?.first_registration_date || "",
        chassisNumber: carData?.vin,
        inspectionDate: carData?.last_inspection_date || "",
        brand: carData?.brand,
        model: carData?.model,
        modelYear: carData?.model_year || 0,
        variant: carData?.version,
        color: carData?.color?.name,
        fuelType: carData?.fuel_type || 0,
        engineSize: carData?.engine_displacement,
        enginePerformance: carData?.engine_power,
        fuelConsumption: carData?.fuel_efficiency,
        euroStandard: carData?.type_approval_code || "",
        numberPlates: carData?.numberPlates,
        gearBox: "Not Available",
      };

      delete data.images;
      delete data.city;
      delete data.street;
      data.city = `${values.city}, ${values.street}`;
      if (!isCompany) {
        delete data.cvrNumber;
        delete data.companyName;
      }
      console.log(data);

      const formData = new FormData();

      // Append non-image data as a JSON string under the 'data' key
      formData.append("data", JSON.stringify(data));

      const images = values.images || []; // Assuming images come from form values
      images.forEach((image, index) => {
        if (image.originFileObj) {
          formData.append("images", image.originFileObj);
        }
      });
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await saleData(formData).unwrap();
      console.log("API Response:", res);
      toast.success("Car listing is Successfully done", {
        id: toastId,
        duration: 2000,
      });

      // Reset form fields on success
      form.resetFields();
      navigate.push("/");
    } catch (error) {
      console.error("Error submitting to cardetails API:", error);
      if (error?.data?.message.includes("E11000")) {
        toast.error("This car is already Listed", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      toast.error(error?.data?.message || "Try Again", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto my-12 px-2">
      <h1
        style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
        className=" font-bold"
      >
        The car&apos;s information
      </h1>
      <div className="h1 w-full border-t border-text-light-color my-5"></div>
      <h1
        style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
        className=" font-bold mb-5"
      >
        Number plate*
      </h1>

      <div className="text-center mb-3 max-w-[600px] ">
        <Input
          ref={inputRef}
          placeholder="Enter license plate"
          className=""
          suffix={
            <div
              onClick={handleEditClick}
              className="bg-highlight-color font-semibold text-white rounded py-2 px-8 cursor-pointer"
            >
              Search
            </div>
          }
          prefix={
            <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-7">
              <Image
                width={0}
                height={0}
                alt="search"
                src={AllImages.star}
                className="w-7"
              />
              <Image
                width={0}
                height={0}
                alt="search"
                className="w-6"
                src={AllImages.dk}
              />
            </div>
          }
        />
      </div>

      <p
        style={{ fontSize: "clamp(12px, 3vw + 1rem ,18px)" }}
        className="mt-2 text-lg font-medium"
      >
        {carData?.brand} {carData?.model}, {carData?.version}{" "}
        {carData?.body_type?.name} {carData?.engine_power}
        {carData?.engine_power && " KW"}
      </p>
      <Form
        className="p-2"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2 "
            >
              Number of kilometers driven*
            </p>
            <Form.Item
              name={`noOfKmDriven`}
              rules={[
                {
                  required: true,
                  message: "Please Input Number of kilometers driven",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter Number of kilometers driven"
                className="py-3 w-full"
              />
            </Form.Item>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <p
              style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
              className=" font-medium pb-2 "
            >
              Number of varnish fields*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input the number of varnish fields!",
                },
                {
                  type: "number",
                  min: 0,
                  message: "Number of varnish fields must be at Number!",
                },
              ]}
              name={`noOfVarnishField`}
              className=""
            >
              <InputNumber
                placeholder="Enter  Number of varnish fields"
                className="py-3 w-full"
              />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex md:flex-row flex-col justify-between gap-5">
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Additional equipment*
            </p>

            <Form.Item name="additionalEquipment">
              <Checkbox.Group className=" flex flex-col gap-2">
                <Checkbox value="Automatic transmission">
                  Automatic transmission
                </Checkbox>
                <Checkbox value="Trailer hitch">Trailer hitch</Checkbox>
                <Checkbox value="Extra wheel set">Extra wheel set</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              The condition of the car*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select one condition!",
                },
              ]}
              name={`condition`}
            >
              <Radio.Group name="condition" className=" flex flex-col gap-2">
                <Radio value="Good">Good</Radio>
                <Radio value="Used">Used</Radio>
                <Radio value="very Used">Very used</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <p
            style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
            className=" font-medium pb-2"
          >
            Defects or other comments*
          </p>
          <Form.Item name={`comment`}>
            <TextArea
              placeholder="Defects or other comments"
              rows={4}
              className="py-3"
            />
          </Form.Item>
        </div>
        <div className="my-[10px] flex justify-between gap-5 md:items-center flex-col md:flex-row">
          <div className="flex-1 ">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Expected price (.kr)*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your expected price!",
                },
              ]}
              name={`expectedPrice`}
            >
              <InputNumber
                placeholder="Expected price (DKK)"
                className="py-3 w-full"
              />
            </Form.Item>
          </div>
          <div className="flex-1">
            {/* <p className=" font-medium pb-2">Number of varnish fields</p> */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Select at least one Image!",
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
                maxCount={10}
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
        <div name="type" className=" flex  gap-10 my-8">
          <div
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
            onClick={() => setIsCompany(true)}
            value="companyName"
            className=" flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            <div
              className={`w-5 aspect-square rounded-full border-4 border-white
                  ${isCompany ? "bg-violet-500 " : " "}
                   ring-2 ring-violet-500 `}
            ></div>
            Company
          </div>
          <div
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
            onClick={() => setIsCompany(false)}
            value="Private"
            className=" flex justify-center items-center gap-2 font-medium cursor-pointer"
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
          style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
          className="text-xl font-medium mb-5"
        >
          To provide you with the best offer for your car, we recommend
          uploading a few pictures of your car to us. You can find some examples
          of the angles we would like of your car.
        </h1>

        {isCompany ? (
          <div className="my-[10px] flex justify-between gap-5">
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
                className=" font-medium pb-2"
              >
                Company Name*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input company Name!",
                  },
                ]}
                name={`companyName`}
              >
                <Input placeholder="Company Name" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
                className=" font-medium pb-2"
              >
                CVR Number*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input CVR Number!",
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
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              First Name*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your first Name!",
                },
              ]}
              name={`first_name`}
            >
              <Input placeholder="First Name" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Last Name*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
              name={`last_name`}
            >
              <Input placeholder="Last Name" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] grid md:grid-cols-3 grid-cols-2 gap-5">
          <div className=" ">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Street Name*
            </p>
            <Form.Item
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
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Postal Code*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your postal code!",
                },
              ]}
              name={`postCode`}
            >
              <Input placeholder="Postal Code" className="py-3" />
            </Form.Item>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              City*
            </p>
            <Form.Item
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
            style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
            className=" font-medium pb-2"
          >
            Phone Number*
          </p>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
            name={`phoneNumber`}
          >
            <Input placeholder="Phone Number" className="py-3" />
          </Form.Item>
        </div>

        <div className="text-center">
          <button
            style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
            className="bg-highlight-color text-white  font-medium  py-5 px-5 md:px-20 rounded-lg "
            htmlType="submit"
          >
            Create Listing
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SellCarAllDetails;
