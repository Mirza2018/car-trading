"use client";
import React from "react";

import { IoMdLink } from "react-icons/io";

import Link from "next/link";
import ImageSlider from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ImageSlider";
import BuyNowBtn from "@/components/DealerComponents/HomePage/CarViewDetailsModal/BuyNowBtn";
import MakeABidBtn from "@/components/DealerComponents/HomePage/CarViewDetailsModal/MakeABidBtn";
import CarAllDetails from "@/components/DealerComponents/HomePage/CarViewDetailsModal/CarAllDetails";
import { Button } from "antd";

 
const SingleOfferCarComponent = ({ openCarSee, setOpennCarSee }) => {

  const car = {
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
  };

  return (
    <div>
      <main className="md:grid grid-cols-12  gap-4">
        {/* Left Side */}
        <section className="col-span-5">
          <ImageSlider />
        </section>
        {/* Right Side */}
        <section className="col-span-7">
          {/* Top portion  */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex  justify-start items-center  font-bold text-base">
              <IoMdLink className="rotate-90" />
              Registration certificate
            </div>
            <div className=" font-bold text-base">Feb.03 13:06:18</div>
            <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
              <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
              <p className=" text-center text-sm">
                Minimum price <br /> achieved
              </p>
            </div>

            <div className="flex flex-col gap-3 ">
              <h1>Incl. VAT / Incl. Reg.</h1>
              <Button
                className={`text-xl py-5 px-8 !bg-highlight-color !hover:bg-red-600 `}
                type="primary"
              >
                Accept
              </Button>
              <Button
                className={`text-xl py-5 px-8 !bg-[#DC3545] !hover:bg-red-600 `}
                type="primary"
              >
                Reject
              </Button>
            </div>
          </div>
          {/* Middel part car All Details */}
          <CarAllDetails car={car} />
        </section>
      </main>
    </div>
  );
};

export default SingleOfferCarComponent;
