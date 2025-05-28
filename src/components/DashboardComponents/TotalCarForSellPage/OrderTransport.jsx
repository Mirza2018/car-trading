"use client";
import { useContactPaperQuery } from "@/redux/api/features/contract";
import { useSendMailOrderTransportMutation } from "@/redux/api/features/orderTransport";
import { Form, Input } from "antd";
import { useParams, useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const OrderTransport = () => {
  const [orderTransportDetails] = useSendMailOrderTransportMutation()
  const params = useParams();
  const navigate=useRouter()
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useContactPaperQuery(params.id);
  const displayedData = data ?? currentData;
  console.log(displayedData);
  if (displayedData?.data?.status != "sold") {
    return <p>Contract paper not Sign</p>;
  }

  const onFinish =async (values) => {
    const toastId = toast.loading("Transport details is submiting...");
    const data = {
      carModel: displayedData?.data?.carModel?._id,
      userId: displayedData?.data?.privateUser?._id,
      deliveryAddress: values.address,
      receiverPhone: values.phone,
    };
    console.log(values);



    try {
      const res = await orderTransportDetails(data).unwrap();
      console.log(res);
      toast.success("Transport details submit Successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/dashboard/total-dealer-car-sell");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem accepting submit transport",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div className=" mx-auto container gap-9">
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">Car Details</h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-xl ">
            Make & Model:{" "}
            <span className="text-[#606060]">
              {displayedData?.data?.carModel?.brand}{" "}
              {displayedData?.data?.carModel?.model}
            </span>
          </p>

          {displayedData?.data?.carModel?.modelYear > 0 && (
            <p className="text-[#1E1E1E] text-xl ">
              {" "}
              Year:{" "}
              <span className="text-[#606060]">
                {" "}
                {displayedData?.data?.carModel?.modelYear}
              </span>
            </p>
          )}
          {displayedData?.data?.carModel?.milage > 0 && (
            <p className="text-[#1E1E1E] text-xl ">
              {" "}
              Milage:{" "}
              <span className="text-[#606060]">
                {" "}
                {displayedData?.data?.carModel?.milage}
              </span>
            </p>
          )}

          {/* <p className="text-[#1E1E1E] text-xl ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p> */}
          <p className="text-[#1E1E1E] text-xl ">
            License plate:{" "}
            <span className="text-[#606060]">
              {" "}
              {displayedData?.data?.carModel?.numberPlates}
            </span>
          </p>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">
          Customer Contact information
        </h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          {displayedData?.data?.company?.companyName && (
            <p className="text-[#1E1E1E] text-xl ">
              Company Name:{" "}
              <span className="text-[#606060]">
                {displayedData?.data?.company?.companyName}
              </span>
            </p>
          )}
          {displayedData?.data?.company?.cvrNumber && (
            <p className="text-[#1E1E1E] text-xl ">
              CVR Number:{" "}
              <span className="text-[#606060]">
                {displayedData?.data?.company?.cvrNumber}
              </span>
            </p>
          )}

          <p className="text-[#1E1E1E] text-xl ">
            Name:{" "}
            <span className="text-[#606060]">
              {displayedData?.data?.company?.first_name}
              {displayedData?.data?.company?.last_name}
            </span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            {" "}
            Address:{" "}
            <span className="text-[#606060]">
              {" "}
              {displayedData?.data?.company?.city} (
              {displayedData?.data?.company?.postCode})
            </span>
          </p>
          {/* <p className="text-[#1E1E1E] text-xl ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p> */}
          <p className="text-[#1E1E1E] text-xl ">
            Phone:{" "}
            <span className="text-[#606060]">
              {" "}
              {displayedData?.data?.company?.phoneNumber}
            </span>
          </p>
        </div>
      </div>
      <Form name="basic" onFinish={onFinish}>
        <div className="p-5">
          <h1 className="text-2xl font-medium mb-2">Delivery information</h1>
          <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full ">
            <Form.Item
              className="max-w-[800px]"
              layout="vertical"
              label={
                <div className="text-xl font-medium">Delivery Address</div>
              }
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="max-w-[800px]"
              layout="vertical"
              label={
                <div className="text-xl font-medium">Receiver Phone number</div>
              }
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className=" flex justify-center gap-5 items-center my-12 flex-wrap">
          {/* <button className="bg-highlight-color font-medium text-white rounded-2xl px-16 py-5 text-2xl ">
          Cancel
        </button> */}
          <p className="bg-highlight-color font-medium cursor-pointer text-white rounded-2xl px-12 py-5 text-2xl ">
            Cancel Transport{" "}
          </p>
          {/* <button className="bg-highlight-color font-medium text-white rounded-2xl px-20 py-5 text-2xl ">
          Edit
        </button> */}
          <button type="submit" className="bg-highlight-color whitespace-nowrap  font-medium text-white rounded-2xl px-14 py-5 text-2xl ">
            Confim & Arrange Transport
          </button>
        </div>
      </Form>
      <pre>{JSON.stringify(displayedData?.data, null, 2)}</pre>
    </div>
  );
};

export default OrderTransport;
