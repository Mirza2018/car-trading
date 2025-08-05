"use client";
import { useGetBidDetailsQuery } from "@/redux/api/features/dealerDashboard";
import { Pagination, Spin } from "antd";
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
        <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" w-[95%] mx-auto  flex items-center justify-between">
            <p className="text-3xl text-primary-color font-semibold">
              Mine buddetaljer
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>

        {displayedData?.data?.result != 0 ? (
          <>
            {displayedData?.data?.result.map((bids) => (
              <div
                key={bids?._id}
                className="rounded-lg border border-highlight-color p-7 flex justify-between my-5"
              >
                <div className="flex gap-7 flex-col">
                  <h1 className="text-lg font-semibold">
                    Bil: {bids?.carName}
                  </h1>
                  <div className="text-lg font-semibold">
                    Status:
                    <button className="!bg-green-600 px-10 py-2 ">
                      {bids.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center text-2xl font-medium mt-10">
            Ingen bud tilgængelige lige nu
          </div>
        )}

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
};

export default MyBidsDetails;
