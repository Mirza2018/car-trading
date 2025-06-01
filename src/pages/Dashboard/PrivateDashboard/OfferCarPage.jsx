"use client";
import SingleOfferCarComponent from "@/components/DashboardComponents/OfferCarPage/SingleOfferCarComponent";
import {
  useOfferCarActionMutation,
  useOfferCarQuery,
} from "@/redux/api/features/privateDashboard";
import { Spin } from "antd";
import React from "react";

const OfferCarPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useOfferCarQuery();
  const [offercarAction] = useOfferCarActionMutation();

  const displayedData = data ?? currentData;
  // console.log("Offer Car", displayedData?.data?.result);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div
        className=" min-h-[90vh]  rounded-xl mx-auto"
        style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      >
        {/* Header  */}
        <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" w-[95%] mx-auto  flex items-center justify-between">
            <p className="text-3xl text-primary-color font-semibold">
              Offer Cars
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>
        {displayedData?.data?.result != 0 ? (
         <> {displayedData?.data?.result.map((offerCar) => (
          <SingleOfferCarComponent
            key={offerCar._id}
            offerCar={offerCar}
            offercarAction={offercarAction}
          />
        ))}</>
        ) : (
          <div className="flex justify-center items-center text-2xl font-medium mt-10">No offer available right now</div>
        )}

       
      </div>
    );

};

export default OfferCarPage;
