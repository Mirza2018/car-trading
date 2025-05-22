"use client";
import { AllImages } from "@/assets/AllImages";
import { Divider, Spin } from "antd";
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
}) => {
  // const { data, currentData, isLoading, isFetching, isSuccess } =
  //   useSubmitListingQuery();
  // const displayedData = data ?? currentData;
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

  const carDetailsArray = [
    {
      buyNowPrice: "6,300 EUR",
      model: "Honda CR-V",
      edition: "PHEV - STYLE SMART",
      currentBids: 12,
      priceInDKK: "32,000 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430457",
      status: "Minimum price achieved",
      kilometers: "1,749 km",
      serviceDate: "08/2025",
      postalCode: "8000",
      vehicleType: "SUV",
      makeAnBidPrice: "25,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "5,900 EUR",
      model: "Honda CR-V",
      edition: "PHEV - EXECUTIVE",
      currentBids: 8,
      priceInDKK: "29,500 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430468",
      status: "Minimum price not achieved",
      kilometers: "2,300 km",
      serviceDate: "09/2025",
      postalCode: "8200",
      vehicleType: "SUV",
      makeAnBidPrice: "28,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "7,000 EUR",
      model: "Honda CR-V",
      edition: "PHEV - LUXURY",
      currentBids: 15,
      priceInDKK: "33,000 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430479",
      status: "Minimum price achieved",
      kilometers: "1,500 km",
      serviceDate: "07/2025",
      postalCode: "8100",
      vehicleType: "SUV",
      makeAnBidPrice: "26,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "6,800 EUR",
      model: "Honda CR-V",
      edition: "PHEV - PREMIUM",
      currentBids: 10,
      priceInDKK: "31,800 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430485",
      status: "Minimum price achieved",
      kilometers: "2,100 km",
      serviceDate: "08/2025",
      postalCode: "8500",
      vehicleType: "SUV",
      makeAnBidPrice: "27,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "6,500 EUR",
      model: "Honda CR-V",
      edition: "PHEV - SPORT",
      currentBids: 9,
      priceInDKK: "30,000 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430492",
      status: "Minimum price not achieved",
      kilometers: "1,800 km",
      serviceDate: "07/2025",
      postalCode: "8300",
      vehicleType: "SUV",
      makeAnBidPrice: "26,500 kr.",
      link: "View Details",
    },
  ];
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
                      {car.fuel && (
                        <>
                          {car.fuel.map((f) => (
                            <span>{f}, </span>
                          ))}
                        </>
                      )}
                      {car.gearType && (
                        <>
                          {car.gearType.map((f) => (
                            <span>{f}, </span>
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
                      onClick={() => setopenOfferCar(true)}
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
      </div>
    );
};

export default PrivateLookingForCars;
