"use client";
import { useContactPaperQuery } from "@/redux/api/features/contract";
import { useProfileQuery } from "@/redux/api/features/myProfile";
import { useGetOrderTransportQuery, useSendMailOrderTransportMutation } from "@/redux/api/features/orderTransport";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams, useRouter } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
   
const OrderTransportOffer = () => {
  const { data: userData, isLoading: isLoadingUser } = useProfileQuery();
  const [orderTransportDetails] = useSendMailOrderTransportMutation();
    const {
      data: oderData,
      currentData: OrderCurrentData,
      isLoading: orderIsLoading,
      isError,
    } = useGetOrderTransportQuery();
  const params = useParams();
  console.log(params);

  const navigate = useRouter();

  const displayedData = useSelector((state) => state.offerInfo.offerCarInfo);
  const orderTransPortData = oderData ?? OrderCurrentData;
  console.log("see this", displayedData);

  const onFinish = async (values) => {
    const toastId = toast.loading("Transport details is submiting...");
    const data = {
      offerCarId: displayedData?._id,
      comments: values.comment,
    };
    console.log(values);

    try {
      const res = await orderTransportDetails(data).unwrap();
      console.log(res);
      toast.success("Transport details submit Successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/dashboard/dealer-offer-car-aggrement");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          "There is an problem accepting submit transport",
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
        <h1 className="text-2xl font-medium mb-2">Biloplysninger</h1>
        <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 ">
          <section className="flex flex-col">
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Mærke & model</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.mark + " " + displayedData?.model}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Biltype</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.carCategory}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
              <p className="ps-2">Kilometer</p>
              <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                {displayedData?.DrivenKm} KM
              </p>
            </div>
          </section>

          {/* Buyer */}
          <section className="flex flex-col">
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Brændstof</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.fuel}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Chassisnummer</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.chassisNumber ? (
                  <>{displayedData?.chassisNumber}</>
                ) : (
                  <>Intet stelnummer fundet</>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
              <p className="ps-2">RegistrationNumber</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.carLicensePlateNumber ? (
                  <>{displayedData?.carLicensePlateNumber}</>
                ) : (
                  <>Tilbud på bil uden licens</>
                )}
              </p>
            </div>
          </section>
        </main>
      </div>
      <div className="p-5">
        <section className="grid md:grid-cols-2 grid-cols-1">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium mb-2">Fra adresse</h1>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p></p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium  border-secondary-color leading-10">
              <p className="ps-2">Fornavn</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.first_name &&
                  displayedData?.dealerUserProfile?.first_name}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Efternavn</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.last_name &&
                  displayedData?.dealerUserProfile?.last_name}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Address</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.street}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Postnr.</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.zip}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">By</p>
              <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                {displayedData?.dealerUserProfile?.city}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Telefon</p>
              <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.phoneNumber &&
                  displayedData?.dealerUserProfile?.phoneNumber}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Privatperson / Virksomhed CVR</p>
              <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                {displayedData?.dealerUserProfile?.cvrNumber
                  ? displayedData?.dealerUserProfile?.cvrNumber
                  : "Private "}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
              <p className="ps-2">E-mail</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.dealerUser?.email &&
                  displayedData?.dealerUser?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium mb-2">To Address</h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Fornavn</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.firstName}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Efternavn</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.lastName}
              </p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Address</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.street}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Postnr.</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.postalCode}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">By</p>
              <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                {displayedData?.submitListing?.city}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Telefon</p>
              <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.phoneNumber}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
              <p className="ps-2">Privatperson / Virksomhed CVR</p>
              <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                {displayedData?.submitListing?.cvrNumber
                  ? displayedData?.submitListing?.cvrNumber
                  : "Private "}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
              <p className="ps-2">E-mail</p>
              <p className="border-s border-secondary-color ps-2">
                {displayedData?.privateUser?.email}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">Transportfirma</h1>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Firmanavn</p>
          <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.companyName}
          </p>
        </div>
        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Adresse</p>
          <p className="border-s border-secondary-color ps-2">
            {orderTransPortData?.data?.address}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
          <p className="ps-2">Postnummer</p>
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
          <h1 className="text-2xl font-medium mb-2">Kommentarboks</h1>

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
            Bekræft og arrangér transport
          </button>
        </div>
      </Form>
      {/* <pre>{JSON.stringify(displayedData, null, 2)}</pre> */}
    </div>
  );
};

export default OrderTransportOffer;
