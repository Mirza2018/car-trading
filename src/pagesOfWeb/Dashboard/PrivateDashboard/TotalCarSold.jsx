"use client";
import { AllImages } from "@/assets/AllImages";
import PrivateCarSoldTable from "@/components/DashboardComponents/TotalCarSold/PrivateCarSoldTable";
import ViewDetailsPage from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ViewDetailsPage";
import { useSellCarQuery } from "@/redux/api/features/privateDashboard";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const TotalCarSold = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    filter: "sold",
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const {
    data: soldCarData,
    currentData,
    isLoading,
  } = useSellCarQuery(filters);

  const displayedData = soldCarData ?? currentData;
  console.log(displayedData);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState([]);
  const [openCarSee, setOpennCarSee] = useState(false);

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setOpennCarSee(true);
  };



  return (
    <div
      className=" min-h-[90vh]  rounded-xl mx-auto"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Total car Sold
          </p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>

      <div className="px-10 py-10">
        <PrivateCarSoldTable
          data={displayedData?.data?.result}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          meta={displayedData?.data?.meta}
          onPageChange={onPageChange}
        />
        {/* <PrivateCarSeeDetails
          openCarSee={openCarSee}
          setOpennCarSee={setOpennCarSee}
        /> */}

        <ViewDetailsPage
          openResponsive={openCarSee}
          setOpenResponsive={setOpennCarSee}
          car={currentRecord}
          sendOffer={false}
          buyNow={false}
        />
      </div>
    </div>
  );
};

export default TotalCarSold;
