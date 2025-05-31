"use client";
import { AllImages } from "@/assets/AllImages";
import { Col, Divider, Modal, Pagination, Row, Spin } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SingleCarInfo from "./SingleCarInfo/SingleCarInfo";
import ViewDetailsPage from "./CarViewDetailsModal/ViewDetailsPage";
import MakeABidBtn from "./CarViewDetailsModal/MakeABidBtn";
import BuyNowBtn from "./CarViewDetailsModal/BuyNowBtn";
import Link from "next/link";
import {
  useBuyCarMutation,
  useSaleCarListQuery,
} from "@/redux/api/features/carDealer";
import { getImageUrl } from "@/helpers/config/envConfig";
import { useCreateConversationMutation } from "@/redux/api/features/conversation";
import { clearSignUpToken } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { setCarOwnerInfo } from "@/redux/slices/carOwner";
import { useDispatch } from "react-redux";

const CarsForSale = ({
  displayedData,
  isLoading,
  isFetching,
  isSuccess,
  onPageChange,
}) => {
  // { displayedData, isLoading, isFetching, isSuccess }
  // const { data, currentData, isLoading, isFetching, isSuccess } =
  //   useSaleCarListQuery();
  const [createConversation] = useCreateConversationMutation();
  const [buyCar] = useBuyCarMutation();
  const navigate = useRouter()
  const dispatch = useDispatch();

  // const displayedData = data ?? currentData;

  console.log(displayedData?.data?.pagination);

  const [openResponsive, setOpenResponsive] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCreateConversation = async (receiverId) => {
    try {
      const res = await createConversation(receiverId);
      navigate.push("/inbox");
           dispatch(setCarOwnerInfo(receiverId));

      console.log(res);
    } catch (error) {}
  };

  // Track the current (main) image index

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div className="flex flex-col gap-4  mt-3 overflow-scroll overflow-x-hidden scrollbar-hide">
        {displayedData?.data?.result.map((car) => (
          <div
            key={car._id}
            className="flex lg:flex-row flex-col   gap-10 shadow-xl rounded-md p-3"
          >
            <div className="flex gap-6 justify-start items-center max-w-[600px]">
              {/* Icons */}
              <div>
                <Image
                  src={getImageUrl() + car?.carModel?.images[0]}
                  alt="car"
                  width={500}
                  height={500}
                  className="w-44 aspect-square object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-2xl font-semibold">
                  {car?.carModel?.brand} {car?.carModel?.model}
                </p>
                <p className="text-sm font-normal">{car?.carModel?.variant}</p>
                <div className="text-sm font-normal">
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
                </div>
                <div className="flex gap-4 flex-wrap">
                  {car?.noOfKmDriven && (
                    <div className=" flex gap-2 justify-start items-center flex-wrap">
                      <Image
                        alt="speed"
                        width={0}
                        height={0}
                        src={AllImages.speed}
                        className=""
                      />
                      <p className="text-sm font-normal">
                        {car?.noOfKmDriven} Km
                      </p>
                    </div>
                  )}

                  {car?.firstRegistrationDate && (
                    <div className=" flex gap-2 justify-start items-center flex-wrap">
                      <Image
                        alt="speed"
                        width={0}
                        height={0}
                        src={AllImages.calender}
                        className=""
                      />
                      <p className="text-sm font-normal">
                        {car?.firstRegistrationDate}
                      </p>
                    </div>
                  )}

                  {car?.company?.postCode && (
                    <div className=" flex gap-2 justify-start items-center flex-wrap">
                      <Image
                        alt="speed"
                        width={0}
                        height={0}
                        src={AllImages.map}
                        className=""
                      />
                      <p className="text-sm font-normal">
                        {car?.company?.city} ({car?.company?.postCode})
                      </p>
                    </div>
                  )}

                  {car?.carCategory && (
                    <div className=" flex gap-2 justify-start items-center flex-wrap">
                      <Image
                        alt="speed"
                        width={0}
                        height={0}
                        src={AllImages.suv}
                        className=""
                      />
                      <p className="text-sm font-normal">{car?.carCategory}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex xl:flex-row  flex-wrap gap-10 items-center justify-between flex-1">
              <div className=" flex items-center gap-2 border-x border-secondary-color xl:h-full px-5">
                <Image
                  alt="speed"
                  width={0}
                  height={0}
                  src={AllImages.bids}
                  className=""
                />
                <p className="text-sm font-normal text-text-light-color">
                  Current Bids:{car?.totalBidCount}
              {    console.log(car)}
                </p>
              </div>
              {/* <div className="bg-base-color border border-secondary-color rounded-full aspect-square px-2 flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
                <p className="whitespace-nowrap ">Minimum price achieved</p>
              </div> */}
              {car?.maxBidAmount ? (
                <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2 ">
                  <h1 className="text-xl font-bold px-1">
                    {car?.maxBidAmount} DKK
                  </h1>
                  <p className=" text-center text-sm">
                    Maximum price <br /> achieved
                  </p>
                </div>
              ) : (
                <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
                  <p className=" text-center text-sm p-4">
                    No bids
                    <br /> achieved
                  </p>
                </div>
              )}

              <div className="flex md:flex-col  gap-5 flex-wrap ">
                {/* <Link href={`/final-note`}> */}
                <BuyNowBtn
                  price={car?.expectedPrice}
                  buyCar={buyCar}
                  carId={car._id}
                />

                <MakeABidBtn carid={car?._id} />
                <button
                  onClick={() => {
                    setSelectedCar(car); // Set the selected car
                    setOpenResponsive(true); // Open the modal
                  }}
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-base-color text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  View Details
                </button>
                <ViewDetailsPage
                  openResponsive={openResponsive}
                  setOpenResponsive={setOpenResponsive}
                  car={selectedCar}
                  sendOffer={false}
                  buyNow={false}
                />
                <Link
                  // href={`/inbox`}
                  href={`/`}
                  className="!w-full"
                >
                  {" "}
                  <button
                    onClick={() => handleCreateConversation(car?.carOwner)}
                    style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                    className="bg-base-color !w-full text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                  >
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          current={displayedData?.data?.pagination?.page}
          pageSize={displayedData?.data?.pagination?.limit}
          total={displayedData?.data?.pagination?.total}
          onChange={onPageChange}
          align="end"
          // showSizeChanger={true}
          // pageSizeOptions={["3", "6", "9"]}
        />
      </div>
    );
};

export default CarsForSale;
