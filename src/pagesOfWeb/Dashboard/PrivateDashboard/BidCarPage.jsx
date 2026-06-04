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
  // console.log(displayedData);

  // console.log("meta", displayedData?.data?.meta);
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
              Buddetaljer
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>
        <div className="md:px-10 px-3 py-10">
          {displayedData?.data?.result != 0 ? (
            <>
              {" "}
              {displayedData?.data?.result.map((bids) => (
                <BidCar
                  bids={bids}
                  key={bids._id}
                  bidCarAction={bidCarAction}
                />
              ))}
              <Pagination
                current={meta?.page}
                pageSize={meta?.limit}
                total={meta?.total}
                onChange={onPageChange}
                align="end"
                // showSizeChanger={true}
                // pageSizeOptions={["3", "6", "9"]}
              />
            </>
          ) : (
            <div className="flex justify-center items-center text-2xl font-medium mt-10">
              Ingen bud tilgængelige lige nu
            </div>
          )}
        </div>
      </div>
    );

  return <p>Ingen data tilgængelig</p>;
};

export default BidCarPage;
