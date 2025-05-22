"use client";
import BidCar from "@/components/DashboardComponents/BidCarPage/BidCar";
import {
  useBidCarActionMutation,
  useBidCarDetailsQuery,
} from "@/redux/api/features/privateDashboard";
import { Spin } from "antd";
import React from "react";

const BidCarPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useBidCarDetailsQuery();
  const [bidCarAction] = useBidCarActionMutation();
  const displayedData = data ?? currentData;
  console.log(displayedData);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div>
        {displayedData?.data?.result.map((bids) => (
          <BidCar bids={bids} key={bids._id} bidCarAction={bidCarAction} />
        ))}
      </div>
    );

  return <p>No data available</p>;
};

export default BidCarPage;
