"use client";
import { AllImages } from "@/assets/AllImages";
import { Divider, Pagination, Spin } from "antd";
import Image from "next/image";
import { useState } from "react";
import ViewDetailsPage from "./CarViewDetailsModal/ViewDetailsPage";
import BrandVIewDetailsPage from "./BrandViewDetailsModal/BrandVIewDetailsPage";
import { useSubmitListingQuery } from "@/redux/api/features/carDealer";

const PrivateLookingForCars = ({
  displayedData,
  isLoading,
  isFetching,
  isSuccess,
  onPageChange2,
}) => {
  // const { data, currentData, isLoading, isFetching, isSuccess } =
  //   useSubmitListingQuery();
  console.log(displayedData?.data?.pagination);
  const [openOfferCar, setopenOfferCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);


  

  const [openResponsive, setOpenResponsive] = useState(false);

  // Track the current (main) image index
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRight = (index) => {
    console.log(index);

    if (currentIndex === index - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(() => currentIndex + 1);
    }
  };
  const handleleft = (index) => {
    console.log(index);

    if (currentIndex === 0) {
      setCurrentIndex(index - 1);
    } else {
      setCurrentIndex(() => currentIndex - 1);
    }
  };

  console.log(displayedData);

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
                <div className="flex gap-6 justify-start items-center">
                  <div className="text-4xl font-bold flex justify-center items-center !w-52 uppercase bg-secondary-color py-10 px-5 rounded-xl">
                    {/* <Image
                      src={AllImages.brand1}
                      alt="car"
                      width={0}
                      height={0}
                      className="w-44 aspect-square object-cover rounded-lg"
                    /> */}
                    {car?.mark}
                  </div>

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
                <div className="flex flex-wrap gap-10 items-center justify-end flex-1">
                  <div className="flex flex-col gap-5 ">
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setopenOfferCar(true);
                      }}
                      style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                      className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                    >
                      Offer Car
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
                      className="bg-base-color text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                    >
                      View Details
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
          // showSizeChanger={true}
          // pageSizeOptions={["3", "6", "9"]}
        />
      </div>
    );
};

export default PrivateLookingForCars;
