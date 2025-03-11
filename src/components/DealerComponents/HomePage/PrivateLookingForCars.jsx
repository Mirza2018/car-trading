"use client";
import { AllImages } from "@/assets/AllImages";
import { Col, Divider, Modal, Row } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SingleCarInfo from "./SingleCarInfo/SingleCarInfo";
import ViewDetailsPage from "./CarViewDetailsModal/ViewDetailsPage";

const PrivateLookingForCars = () => {
  const [openOfferCar, setopenOfferCar] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);
  const images = [
    { src: AllImages.car, alt: "Car 1" },
    { src: AllImages.bids, alt: "Car 2" },
    { src: AllImages.car, alt: "Car 3" },
    { src: AllImages.car, alt: "Car 4" },
  ];

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

  return (
    <div>
      <div className="flex flex-col gap-4  mt-3 overflow-scroll overflow-x-hidden scrollbar-hide">
        {carDetailsArray.map((car, index) => (
          <div
            key={index}
            className="flex lg:flex-row flex-col gap-10 shadow-xl rounded-md p-3"
          >
            <div className="flex gap-6 justify-start items-center">
              <div>
                <Image
                  src={AllImages.car}
                  alt="car"
                  width={0}
                  height={0}
                  className="w-44 aspect-square object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-2xl font-semibold">{car?.model}</p>
                {/* <p className="text-sm font-normal">{car?.edition}</p> */}
                <div className="text-sm font-normal">
                  {car?.type},{car?.transmission},{car?.engineCapacity},
                  {car?.horsepower}{" "}
                  <Divider className=" bg-black" type="vertical" />
                  PNO {car?.pno}
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

                <ViewDetailsPage
                  openResponsive={openOfferCar}
                  setOpenResponsive={setopenOfferCar}
                  car={car}
                  sendOffer={true}
                  buyNow={false}
                />
                <button
                  onClick={() => setOpenResponsive(true)}
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-base-color text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  View Details
                </button>

                <ViewDetailsPage
                  openResponsive={openResponsive}
                  setOpenResponsive={setOpenResponsive}
                  car={car}
                  sendOffer={false}
                  buyNow={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateLookingForCars;
