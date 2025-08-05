"use client";
import { AllImages } from "@/assets/AllImages";
import { getImageUrl } from "@/helpers/config/envConfig";
import { Button, Divider, Modal, Pagination, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const TotalCarSell = ({
  displayedData,
  isLoading,
  isFetching,
  isSuccess,
  onPageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const showModal = (data) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <h1 className="xl:text-[40px] text-3xl   font-semibold text-center">
        Samlet bilsalg ({displayedData?.data?.pagination?.total})
      </h1>

      <div className="flex flex-col gap-3 h-[450px]  mt-3 overflow-scroll overflow-x-hidden scrollbar-hide ">
        {displayedData?.data?.result?.map((car) => (
          <div
            key={car?._id}
            className="flex justify-between gap-3 border border-base-color py-5 md:w-[550px]   me-3 px-2 "
          >
            <React.Fragment>
              {car?.carModel?.images[0] ? (
                <Image
                  src={getImageUrl() + car?.carModel?.images[0]}
                  alt="car"
                  width={100}
                  height={100}
                  className="font-medium object-contain w-20 aspect-square"
                />
              ) : (
                <Image
                  src={AllImages.biludenbilleder}
                  alt="car"
                  width={100}
                  height={100}
                  className="font-medium object-contain w-20 aspect-square"
                />
              )}
            </React.Fragment>
            <div className="flex flex-1 justify-between  gap-3 md:flex-row flex-col">
              <div className="flex flex-col max-w-sm">
                <h3 className="text-[22px] font-medium">
                  {car?.carModel?.brand} {car?.carModel?.model}
                </h3>
                <p className="font-normal text-sm ">
                  {" "}
                  {car?.carModel?.fuelType != 0 && car?.carModel?.fuelType}{" "}
                  {car?.additionalEquipment.includes("Automatic transmission")
                    ? "Automatgear"
                    : ""}
                  {car?.carModel?.engineSize &&
                    `${car?.carModel?.engineSize}L ,`}{" "}
                  {car?.carModel?.enginePerformance &&
                    `${car?.carModel?.enginePerformance} HK`}
                  {car?.registrationNumber && (
                    <>
                      <Divider className=" bg-black" type="vertical" />{" "}
                      {car?.registrationNumber}
                    </>
                  )}
                </p>
                <p className="font-normal text-sm">
                  Pris: {car?.expectedPrice} kr.
                </p>
              </div>
              <div className="flex md:flex-col flex-row gap-2 text-end">
                <Tooltip title="Login as Dealer">
                  <button className="btn border border-base-color rounded px-1 md:px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                    Køb nu
                  </button>
                </Tooltip>
                <Tooltip title="Login as Dealer">
                  <button
                    // onClick={() => showModal(car)}
                    className="btn border border-base-color bg-[#E6F3F7] rounded px-1 md:px-2 py-1 w-fit whitespace-nowrap  cursor-not-allowed"
                  >
                    Se detaljer
                  </button>
                </Tooltip>
              </div>{" "}
            </div>
          </div>
        ))}

        <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
          width={800}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative">
            {/* Close Button */}
            <button
              // onClick={onClose}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
            >
              {/* <X size={24} /> */}
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Car Image */}
              <div className="relative rounded-lg overflow-hidden h-[300px]">
                <Image
                  src={AllImages.car}
                  alt="Ranger Black 2021"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Car Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Biloplysninger</h2>

                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Bil ejer navn</span>
                    <span className="font-medium">John Doe</span>
                  </div>

                  <div>
                    <span className="text-gray-600">Bilnavn: </span>
                    <span className="font-medium">Ranger Black – 2021</span>
                  </div>

                  <div>
                    <span className="text-gray-600">Bilpris: </span>
                    <span className="font-medium">$165,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-600">Budpris</label>
                  <input
                    type="text"
                    value="$150,000"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Pagination
        current={displayedData?.data?.pagination?.page}
        pageSize={displayedData?.data?.pagination?.limit}
        total={displayedData?.data?.pagination?.total}
        onChange={onPageChange}
        align="end"
      />
    </div>
  );
};

export default TotalCarSell;
