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
      <div className="flex flex-col gap-10">
        {displayedData?.data?.result.map((offerCar) => (
          <SingleOfferCarComponent
            key={offerCar._id}
            offerCar={offerCar}
            offercarAction={offercarAction}
          />
        ))}
      </div>
    );
  return <p>No data available</p>;
};

export default OfferCarPage;
