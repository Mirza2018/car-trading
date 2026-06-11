import { AllImages } from "@/assets/AllImages";
import {
  useLazyGetCarInfoQuery,
  useSaleCarMutation,
} from "@/redux/api/features/carPrivate";
import { useProfileQuery } from "@/redux/api/features/myProfile";
import {
  clearCarLicenseInfo,
  setCarLicenseInfo,
} from "@/redux/slices/carInfoSlice";

import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import Cookies from "universal-cookie";
import { LuInfo } from "react-icons/lu";
import dayjs from "dayjs";

const SellCarAllDetails = () => {
  const {
    data: profileData,
    currentData,
    isLoading,
    isFetching,
  } = useProfileQuery();
  const [saleData] = useSaleCarMutation();
  const [trigger, { data, isSuccess, isError }] = useLazyGetCarInfoQuery();
  const carData = useSelector((state) => state.carInfo.carLicenseInfo);
  // console.log(carData);
  const myInfo = profileData ?? currentData;

  const [isCompany, setIsCompany] = useState(false);
  const [form] = useForm();
  const { TextArea } = Input;
  const inputRef = useRef(null);
  const toastId = "unique-toast-id";
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userCookie = cookies.get("car_trading_accessToken");
  let userInfo;
  if (!userCookie) {
    userInfo = false;
  } else {
    userInfo = jwtDecode(userCookie);
  }

  const navigate = useRouter();

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
      toast.error("Angiv et gyldigt registreringspladenummer", {
        id: toastId,
        duration: 2000,
      });
    }
  }, [isSuccess, isError, data, dispatch]);

  const handleEditClick = () => {
    toast.loading("Søger efter nummerplade", {
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
    const toastId = toast.loading("Opretter annoncen...", {
      duration: 2000,
    });
    try {
      let data = {
        ...values,
        registrationNumber: carData?.registration,
        carCategory: carData?.type,
        milage: carData?.last_inspection_odometer || 0,
        firstRegistrationDate: carData?.first_registration_date || "",
        chassisNumber: carData?.vin,
        inspectionDate: carData?.last_inspection_date || "",
        brand: carData?.brand,
        model: carData?.model,
        modelYear: carData?.model_year || values?.modelYear || 0,
        variant: carData?.version,
        color: carData?.color?.name,
        fuelType: values?.fuelType || carData?.fuel_type || 0,
        engineSize: carData?.engine_displacement,
        enginePerformance: carData?.engine_power,
        fuelConsumption: carData?.fuel_efficiency,
        euroStandard: carData?.type_approval_code || "",
        numberPlates: carData?.numberPlates,
        gearBox: "Not Available",
      };

      delete data.images;
      // delete data.city;
      // delete data.street;
      // data.city = `${values.city}, ${values.street}`;
      if (!isCompany) {
        delete data.cvrNumber;
        delete data.companyName;
      }
     


      if (userInfo) {
        data = { ...data, userId: userInfo?.userId };
      }
      

      const formData = new FormData();



      // Append non-image data as a JSON string under the 'data' key
      formData.append("data", JSON.stringify(data));

      const images = values.images || []; // Assuming images come from form values
      images.forEach((image, index) => {
        if (image.originFileObj) {
          formData.append("images", image.originFileObj);
        }
      });
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const res = await saleData(formData).unwrap();
      console.log("API Response:", res);
      toast.success("Din bil er nu oprettet", {
        id: toastId,
        duration: 2000,
      });
      if (!userInfo) {
        toast.success("Tjek venligst din angivne e-mail", {
          duration: 2000,
        });
      }

      // Reset form fields on success
      form.resetFields();
      navigate.push("/");
    } catch (error) {
      console.error("Error submitting to cardetails API:", error);
      if (error?.data?.message.includes("numberPlates_1")) {
        toast.error("Denne bil er allerede listet", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      if (error?.data?.message.includes("registrationNumber_1")) {
        toast.error("Denne bil er allerede listet", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      if (error?.data?.message.includes("email_1")) {
        toast.error("Denne e-mail er allerede registreret, log venligst ind.", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      if (error?.data?.message.includes("Car already listed")) {
        toast.error("Bilen er allerede opført", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      toast.error("Noget gik galt, prøv venligst senere..", {
        id: toastId,
        duration: 2000,
      });
    }
  };

const fuelOptions = [
  { label: "EL", value: "EL" },
  { label: "Benzin", value: "Benzin" },
  { label: "Hybrid Benzin", value: "Hybrid Benzin" },
  { label: "Plug-In Benzin", value: "Plug-In Benzin" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hybrid Diesel", value: "Hybrid Diesel" },
  { label: "Plug-In Diesel", value: "Plug-In Diesel" },
];

  const foundFuel = fuelOptions.find(
    (option) => option.value === carData?.fuel_type
  );
  if (isLoading) {
    return <Spin className="flex justify-center items-center h-screen"></Spin>;
  }

  return (
    <div className=" mx-5 my-12 px-5 rounded-lg max-w-[900px]  border  border-secondary-color min-w-20">
      <h1
        style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
        className=" font-bold"
      >
        Bilens oplysninger
      </h1>
      <div className="h1 w-full border-t border-text-light-color my-5"></div>
      <h1
        style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
        className=" font-bold mb-5"
      >
        Nummerplade*
      </h1>

      <div className="text-center mb-3 max-w-[600px] ">
        <Input
          defaultValue={carData?.numberPlates}
          ref={inputRef}
          placeholder="Indtast nummerplade"
          className=""
          suffix={
            <div
              onClick={handleEditClick}
              className="bg-highlight-color font-semibold text-white rounded py-2 px-8 cursor-pointer"
            >
              Søg
            </div>
          }
          prefix={
            <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-3">
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
        // initialValues={myInfo?.data?.profile}
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
              Antal kørte kilometer*
            </p>
            <Form.Item
              name={`noOfKmDriven`}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast kilometertal",
                },
              ]}
            >
              <InputNumber
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Indtast antal kørte kilometer."
                className="py-3 w-full"
              />
            </Form.Item>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="pb-1 flex justify-between items-center ">
              <p
                style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
                className=" font-medium pb-2 "
              >
                Antal lak skader*
              </p>
              <Tooltip
                placement="right"
                overlayStyle={{ maxWidth: "none" }} // 👈 important
                title={<Image alt="" src={AllImages.carDetails} width={400} />}
              >
                <LuInfo />
              </Tooltip>
            </div>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Venligst indtast antallet af lakskader!",
                },
                {
                  type: "number",
                  min: 0,
                  message: "Antallet af lakskader skal være et tal!",
                },
              ]}
              name={`noOfVarnishField`}
              className=""
            >
              <InputNumber
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Indtast antal lakfelter"
                className="py-3 w-full"
              />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex md:flex-row flex-col justify-between gap-5">
          {!carData?.model_year && (
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
                className=" font-medium pb-2"
              >
                Årgang*{" "}
                <span className="text-yellow-600 text-sm">
                  (Ikke fundet i nummerpladeregistrene)
                </span>
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Venligst indtast årgang fra",
                  },
                ]}
                // label={<span className="font-medium text-base">Årgang</span>}
                name="modelYear"
                className="flex-1"
                getValueFromEvent={(date) => (date ? date.year() : null)}
                getValueProps={(value) => ({
                  value: value ? dayjs(String(value), "YYYY") : null,
                })}
              >
                <DatePicker
                  picker="year"
                  format="YYYY"
                  placeholder="Årgang fra"
                  className="w-full"
                  style={{ height: 40 }}
                />
              </Form.Item>
            </div>
          )}
        </div>

        <div className="my-[10px] flex md:flex-row flex-col justify-between gap-5">
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Ekstraudstyr*
            </p>

            <Form.Item name="additionalEquipment">
              <Checkbox.Group className=" flex flex-col gap-2">
                <Checkbox value="Automatgear">Automatgear</Checkbox>
                <Checkbox value="Anhængertræk">Anhængertræk</Checkbox>
                <Checkbox value="Ekstra hjulsæt">Ekstra hjulsæt</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
            >
              Bilens tilstand*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vælg venligst en tilstand!",
                },
              ]}
              name={`condition`}
            >
              <Radio.Group name="condition" className=" flex flex-col gap-2">
                <Radio value="God">God</Radio>
                <Radio value="Brugt">Brugt</Radio>
                <Radio value="Meget brugt">Meget brugt</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {!foundFuel && (
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
                className=" font-medium pb-2"
              >
                Brændstof*
              </p>
              <span className="text-yellow-600 text-sm">
                (Ikke fundet i nummerpladeregistrene)
              </span>
              <Form.Item
                // initialValue={carData?.fuel_type}
                rules={[
                  {
                    required: true,
                    message: "Vælg venligst brændstoftype",
                  },
                ]}
                name="fuelType"
                className="flex-1"
              >
                <Radio.Group>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Radio value="EL" style={{ lineHeight: "32px" }}>
                      EL
                    </Radio>
                    <Radio value="Benzin" style={{ lineHeight: "32px" }}>
                      Benzin
                    </Radio>
                    <Radio value="Hybrid Benzin" style={{ lineHeight: "32px" }}>
                      Hybrid Benzin
                    </Radio>
                    <Radio
                      value="Plug-In Benzin"
                      style={{ lineHeight: "32px" }}
                    >
                      Plug-In Benzin
                    </Radio>
                    <Radio value="Diesel" style={{ lineHeight: "32px" }}>
                      Diesel
                    </Radio>
                    <Radio value="Hybrid Diesel" style={{ lineHeight: "32px" }}>
                      Hybrid Diesel
                    </Radio>
                    <Radio
                      value="Plug-In Diesel"
                      style={{ lineHeight: "32px" }}
                    >
                      Plug-In Diesel
                    </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p
            style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
            className=" font-medium pb-2"
          >
            Fejl eller andre kommentarer
          </p>
          <Form.Item name={`comment`}>
            <TextArea
              placeholder="Fejl eller andre kommentarer"
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
              Forventet pris (DKK)*
            </p>
            <Form.Item
              name="expectedPrice"
              rules={[
                {
                  required: true,
                  message: "Venligst indtast din forventede pris!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Kun tal er tilladt!",
                },
              ]}
            >
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Forventet pris (DKK)"
                className="py-3 w-full"
                onChange={(e) => {
                  // Remove anything that's not a number
                  const value = e.target.value.replace(/\D/g, "");
                  e.target.value = value;
                }}
              />
            </Form.Item>
          </div>
          <div className="flex-1">
            {/* <p className=" font-medium pb-2">Number of varnish fields</p> */}
            <div className="pb-1 flex justify-end cursor-pointer">
              <Tooltip
                className=""
                placement="right"
                title={`Få mest for din bil - upload billeder Et godt billede skaber tillid og giver et stærkt førstehåndsindtryk. Som man siger: "Et billede siger mere end tusind ord" - og kan være nøglen til at få den bedste pris for din bil.`}
              >
                <LuInfo className="" />
              </Tooltip>{" "}
            </div>
            <Form.Item
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
                  Træk og slip op til 10 billeder her
                </p>
                <p className="ant-upload-text">eller klik for at uploade.</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>
        <div name="type" className=" flex  gap-10 my-8">
          <div
            style={{ fontSize: "clamp(20px, 3vw + 1rem ,18px)" }}
            onClick={() => setIsCompany(true)}
            value="companyName"
            className=" flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            <div
              className={`w-5 aspect-square rounded-full border-4 border-white
                  ${isCompany ? "bg-violet-500 " : " "}
                   ring-2 ring-violet-500 `}
            ></div>
            Firma
          </div>
          <div
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,18px)" }}
            onClick={() => setIsCompany(false)}
            value="Private"
            className=" flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            <div
              className={`w-5 aspect-square rounded-full border-4 border-white
                  ${isCompany ? " " : " bg-violet-500"}
                   ring-2 ring-violet-500 `}
            ></div>
            Privatperson
          </div>
        </div>

        <h1
          style={{ fontSize: "clamp(18px, 3vw + 1rem ,36px)" }}
          className=" font-bold"
        >
          Kontaktinformation
        </h1>
        <div className="h1 w-full border-t border-text-light-color my-5"></div>
        <h1
          style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
          className="text-xl font-medium mb-5"
        >
          For at give dig det bedste tilbud på din bil, anbefaler vi, at du
          uploader nogle billeder af din bil til os. Du kan finde nogle
          eksempler på de vinkler, vi gerne vil have af din bil.
        </h1>

        {isCompany ? (
          <div className="my-[10px] flex justify-between items-end gap-5">
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                className=" font-medium pb-2"
              >
                Firmanavn*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Venligst indtast firmanavn!",
                  },
                ]}
                name={`companyName`}
              >
                <Input placeholder="Firmanavn" className="py-3" />
              </Form.Item>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                className=" font-medium pb-2"
              >
                CVR-nummer*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Venligst indtast CVR-nummer!",
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
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
              className=" font-medium pb-2"
            >
              Fornavn*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.first_name}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast dit fornavn!",
                },
              ]}
              name={`first_name`}
            >
              <Input placeholder="Fornavn" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
              className=" font-medium pb-2"
            >
              Efternavn*
            </p>
            <Form.Item
              initialValue={myInfo?.data?.profile?.last_name}
              rules={[
                {
                  required: true,
                  message: "Venligst indtast dit efternavn!",
                },
              ]}
              name={`last_name`}
            >
              <Input placeholder="Efternavn" className="py-3" />
            </Form.Item>
          </div>
        </div>

        <div className="my-[10px] grid md:grid-cols-3 grid-cols-2 gap-5">
          <div className=" ">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
              className=" font-medium pb-2"
            >
              Vejnavn*
            </p>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Venligst indtast dit gadenavn!",
                },
              ]}
              initialValue={myInfo?.data?.profile?.street}
              name={`street`}
            >
              <Input placeholder="Vejnavn" className="py-3" />
            </Form.Item>
          </div>
          <div className=" ">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
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
              name={`postCode`}
            >
              <Input placeholder="Postnummer" className="py-3" />
            </Form.Item>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
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
            style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
            className=" font-medium pb-2"
          >
            Telefonnummer*
          </p>
          <Form.Item
            initialValue={myInfo?.data?.profile?.phoneNumber}
            rules={[
              {
                required: true,
                message: "Venligst indtast dit telefonnummer!",
              },
            ]}
            name={`phoneNumber`}
          >
            <Input placeholder="Telefonnummer" className="py-3" />
          </Form.Item>
        </div>
        {!userInfo && (
          <div className="">
            <p
              style={{ fontSize: "clamp(14px, 3vw + 1rem ,24px)" }}
              className=" font-medium pb-2"
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

        <div className="text-center">
          <button
            style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
            className="bg-highlight-color text-white  font-medium  py-5 px-5 md:px-20 rounded-lg "
            htmlType="submit"
          >
            Opret annonce
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SellCarAllDetails;
