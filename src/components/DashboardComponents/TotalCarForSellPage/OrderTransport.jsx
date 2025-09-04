"use client";
import { useContactPaperQuery } from "@/redux/api/features/contract";
import { useProfileQuery } from "@/redux/api/features/myProfile";
import {
  useGetOrderTransportQuery,
  useSendMailOrderTransportMutation,
} from "@/redux/api/features/orderTransport";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams, useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const OrderTransport = () => {
  const params = useParams();
  const { data: userData, isLoading: isLoadingUser } = useProfileQuery();
  const { data, currentData, isLoading, isFetching, isSuccess, refetch } =
    useContactPaperQuery(params.id);
  const {
    data: oderData,
    currentData: OrderCurrentData,
    isLoading: orderIsLoading,
    isError,
  } = useGetOrderTransportQuery();
  const [orderTransportDetails] = useSendMailOrderTransportMutation();
  const navigate = useRouter();

  const displayedData = data ?? currentData;
  const orderTransPortData = oderData ?? OrderCurrentData;
  console.log(displayedData);
  if (displayedData?.data?.status != "sold") {
    return <p>Contract paper not Sign</p>;
  }

  const onFinish = async (values) => {
    const toastId = toast.loading("Transportoplysninger indsendes…");
    const data = {
      carModel: displayedData?.data?.carModel?._id,
      userId: displayedData?.data?.privateUser?._id,
      comments: values.comment,
    };
    console.log(values.comment);

    try {
      const res = await orderTransportDetails(data).unwrap();
      console.log(res);
      toast.success("Transportoplysninger indsendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/dashboard/total-dealer-car-sell");
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at indsende transportoplysningerne", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  // console.log(userData?.data?.profile?.phoneNumber);

  return (
    <div className=" mx-auto container gap-9">
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">Biloplysninger</h1>

        <section className="flex flex-col">
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Mærke & model</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.carModel?.brand +
                " " +
                displayedData?.data?.carModel?.model}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Biltype</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.car?.carCategory}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Kilometer</p>
            <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
              {displayedData?.data?.car?.noOfKmDriven} KM
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Brændstof</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.carModel?.fuelType}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Chassisnummer</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.car?.chassisNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
            <p className="ps-2">Registreringsnummer</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.car?.registrationNumber}
            </p>
          </div>
        </section>
      </div>

      <section className="grid md:grid-cols-2 grid-cols-1">
        <div className="p-5">
          <h1 className="text-2xl font-medium mb-2">Afsender</h1>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Fornavn</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.first_name &&
                displayedData?.data?.company?.first_name}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Efternavn</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.last_name &&
                displayedData?.data?.company?.last_name}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Address</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.street}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Postnr.</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.postCode &&
                displayedData?.data?.company?.postCode}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">By</p>
            <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
              {displayedData?.data?.company?.city}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Telefon</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.phoneNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Privatperson / Virksomhed CVR </p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.company?.cvrNumber
                ? displayedData?.data?.company?.cvrNumber
                : "Private "}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
            <p className="ps-2">Email</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.privateUser?.email}
            </p>
          </div>
        </div>

        <div className="p-5">
          <h1 className="text-2xl font-medium mb-2">Modtager</h1>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Fornavn</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.first_name &&
                displayedData?.data?.dealer?.first_name}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Efternavn</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.last_name &&
                displayedData?.data?.dealer?.last_name}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Address</p>
            <p className="border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.street}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Postnr.</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.zip}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">By</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.city}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Telefon</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.phoneNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
            <p className="ps-2">Privatperson / Virksomhed CVR </p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.cvrNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
            <p className="ps-2">E-mail</p>
            <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
              {displayedData?.data?.dealer?.email}
            </p>
          </div>
        </div>
      </section>
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">Transportfirma</h1>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Firmanavn</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.companyName}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Address</p>
          <p className="border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.address}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Postnr.</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.zip}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">By</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.city}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Telefon</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.phone}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">E-mail</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.email}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
          <p className="ps-2">Kontaktperson</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.contactPerson}
          </p>
        </div>
      </div>
      <Form name="basic" onFinish={onFinish}>
        <div className="p-10">
          <h1 className="text-2xl font-medium mb-2">Kommentarfelt</h1>

          {/* <Form.Item
              initialValue={userData?.data?.profile?.address}
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
              initialValue={userData?.data?.profile?.phoneNumber}
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
            </Form.Item> */}
          <Form.Item
            layout="vertical"
            label={<div className="text-xl font-medium"></div>}
            name="comment"
          >
            <TextArea rows={3} />
          </Form.Item>
        </div>

        <div className=" flex justify-center gap-5 items-center my-12 flex-wrap">
          <p
            onClick={() => navigate.push("/dashboard/total-dealer-car-sell")}
            className="bg-highlight-color font-medium cursor-pointer text-white rounded-2xl px-12 py-5 text-2xl "
          >
            Annuller transport
          </p>
          <button
            type="submit"
            className="bg-highlight-color whitespace-nowrap  font-medium text-white rounded-2xl px-14 py-5 text-2xl "
          >
            Bekræft og arranger transport
          </button>
        </div>
      </Form>
    </div>
  );
};

export default OrderTransport;
