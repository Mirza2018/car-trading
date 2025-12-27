"use client";
import { Avatar, Pagination, Spin } from "antd";
import { useState } from "react";
import BrandVIewDetailsPage from "./BrandViewDetailsModal/BrandVIewDetailsPage";
import React from "react";
import Image from "next/image";

const PrivateLookingForCars = ({
  displayedData,
  isLoading,
  isFetching,
  isSuccess,
  onPageChange2,
}) => {
  const [openOfferCar, setopenOfferCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [openResponsive, setOpenResponsive] = useState(false);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div>
        <div className="flex flex-col gap-4  mt-3 overflow-scroll overflow-x-hidden scrollbar-hide">
          {displayedData?.data?.result.map((car) => (
            <>
              {/* <pre>{JSON.stringify(car, null, 2)}</pre> */}
              <div
                key={car?._id}
                className="flex lg:flex-row flex-col gap-10 shadow-xl rounded-md p-3"
              >
                <div
                  onClick={() => {
                    setSelectedCar(car);
                    setopenOfferCar(true);
                  }}
                  className="flex gap-6 justify-start items-center cursor-pointer"
                >
                  {/* <div className="text-4xl font-bold flex justify-center items-center !w-52 uppercase bg-secondary-color py-10 px-5 rounded-xl">
                    {car?.mark}
                  </div> */}
                  {car?.brandImage ? (
                    <React.Fragment>
                      <Image
                        alt=""
                        shape="square"
                        className="font-medium object-contain w-40 aspect-square"
                        width={100}
                        height={100}
                        src={`http://31.97.39.237:8010/${car?.brandImage}`}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Avatar
                        shape="square"
                        className="!bg-secondary-color font-medium"
                        size={100}
                      >
                        {car?.mark}
                      </Avatar>
                    </React.Fragment>
                  )}
                  <div className="flex flex-col gap-2 ">
                    <p className="text-2xl font-semibold">{car?.mark}</p>
                    {/* <p className="text-sm font-normal">{car?.edition}</p> */}
                    <div className="text-sm font-normal">
                      {car?.fuel && (
                        <>
                          {car?.fuel?.map((f, index) => (
                            <span key={index}>{f}, </span>
                          ))}
                        </>
                      )}
                      {car?.gearType && (
                        <>
                          {car?.gearType?.map((f, index) => (
                            <span key={index}>{f}, </span>
                          ))}
                        </>
                      )}
                      {car?.models}
                      {/* {car?.type},{car?.transmission},{car?.engineCapacity},
                      {car?.horsepower}{" "} */}
                      {/* <Divider className=" bg-black" type="vertical" />
                      PNO {car?.pno} */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-10 items-center md:justify-end flex-1">
                  <div className="flex md:flex-col justify-between gap-5 ">
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setopenOfferCar(true);
                      }}
                      style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                      className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap w-32"
                    >
                      Tilbud på bil
                    </button>

                    <BrandVIewDetailsPage
                      openResponsive={openOfferCar}
                      setOpenResponsive={setopenOfferCar}
                      car={selectedCar}
                      sendOffer={true}
                      buyNow={false}
                    />

                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setOpenResponsive(true);
                      }}
                      style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                      className="bg-base-color text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap w-32"
                    >
                      Se detaljer
                    </button>

                    <BrandVIewDetailsPage
                      openResponsive={openResponsive}
                      setOpenResponsive={setOpenResponsive}
                      car={selectedCar}
                      sendOffer={false}
                      buyNow={false}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <Pagination
          current={displayedData?.data?.pagination?.page}
          pageSize={displayedData?.data?.pagination?.limit}
          total={displayedData?.data?.pagination?.total}
          onChange={onPageChange2}
          align="end"
        />
      </div>
    );
};

export default PrivateLookingForCars;
