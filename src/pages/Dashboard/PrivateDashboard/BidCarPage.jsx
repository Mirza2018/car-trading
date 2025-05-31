"use client";
import BidCar from "@/components/DashboardComponents/BidCarPage/BidCar";
import {
  useBidCarActionMutation,
  useBidCarDetailsQuery,
} from "@/redux/api/features/privateDashboard";
import { Pagination, Spin } from "antd";
import React, { useState } from "react";

const BidCarPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 4,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useBidCarDetailsQuery(filters);
  const [bidCarAction] = useBidCarActionMutation();
  const displayedData = data ?? currentData;
  const meta = displayedData?.data?.meta;
  console.log(displayedData);

  console.log("meta", displayedData?.data?.meta);
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

        <Pagination
          current={meta?.page}
          pageSize={meta?.limit}
          total={meta?.total}
          onChange={onPageChange}
          align="end"
          showSizeChanger={true}
          // pageSizeOptions={["3", "6", "9"]}
        />
      </div>
    );

  return <p>No data available</p>;
};

export default BidCarPage;
