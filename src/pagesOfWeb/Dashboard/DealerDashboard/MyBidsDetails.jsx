"use client";
import { useGetBidDetailsQuery } from "@/redux/api/features/dealerDashboard";
import { Button, Pagination, Spin } from "antd";
import React, { useState } from "react";

const MyBidsDetails = () => {
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
    useGetBidDetailsQuery(filters);
  const displayedData = data ?? currentData;
  const meta = displayedData?.data?.pagination;
  console.log(displayedData?.data?.result);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div
        className="min-h-[90vh] rounded-xl mx-auto"
        style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className="w-[95%] mx-auto flex items-center justify-between">
            <p className="text-3xl text-primary-color font-semibold">
              Mine buddetaljer
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>

        {displayedData?.data?.result &&
        displayedData?.data?.result.length > 0 ? (
          <>
            {displayedData?.data?.result.map((bids) => (
              <div
                key={bids?._id}
                className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-center"
              >
                <div className="flex gap-6 flex-col w-full">
                  <h1 className="text-xl font-semibold text-gray-800">
                    {bids?.carName}
                  </h1>
                  <p className="text-lg font-medium text-gray-600">
                    Budbeløb:{" "}
                    <span className="text-green-600 font-semibold">
                      {bids?.bidAmount}
                    </span>
                  </p>
                  <div className="flex items-center gap-3 text-lg font-medium text-gray-700">
                    <span>Status:</span>

                    {bids?.status == "pending" ? (
                      <span className=" text-highlight-color font-semibold ">
                        Indtil
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Godkende
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center text-2xl font-medium mt-10 text-gray-500">
            Ingen bud tilgængelige lige nu
          </div>
        )}

        <Pagination
          current={meta?.page}
          pageSize={meta?.limit}
          total={meta?.total}
          onChange={onPageChange}
          align="end"
          className="mt-6"
          showSizeChanger={true}
          pageSizeOptions={["4", "6", "9"]}
        />
      </div>
    );
};

export default MyBidsDetails;
