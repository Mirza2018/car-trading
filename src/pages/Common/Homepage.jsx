"use client";
import CarsForSale from "@/components/DealerComponents/HomePage/CarsForSale";
import PrivateLookingForCars from "@/components/DealerComponents/HomePage/PrivateLookingForCars";
import Reviews from "@/components/Private/AboutUsPage/Reviews";
import FairPriceCard from "@/components/Private/HomePage/FairPriceCard";
import FairPriceFooter from "@/components/Private/HomePage/FairPriceFooter";
import CustomerReviews from "@/components/Private/HomePage/Reviws";
import SellBuyTrade from "@/components/Private/HomePage/SellBuyTrade";
import TotalCarBuy from "@/components/Private/HomePage/TotalCarBuy";
import TotalCarSell from "@/components/Private/HomePage/TotalCarSell";
import WhyChooseUS from "@/components/Private/HomePage/WhyChooseUS";
import useCookie from "@/cookie/useCookie";
import React, { useState } from "react";

const Homepage = () => {
    const [carUser, loading] = useCookie("car-trading_user");
  const [isSellCar, setIsSellCar] = useState(true);

  return (
    <div className="text-text-color container mx-auto">
      {carUser?.role === "dealer" ? (
        <>
          <div>
            <div className="grid grid-cols-2 gap-5 my-10 select-none text-center">
              <h1
                onClick={() => setIsSellCar(true)}
                style={{ fontSize: "clamp(16px, 1vw + 1rem ,30px)" }}
                className={`" font-semibold  py-5 md:px-20 px-4 rounded-lg  cursor-pointer  hover:animate-pulse  " ${
                  isSellCar
                    ? "bg-highlight-color text-white "
                    : "bg-base-color text-text-color"
                }`}
              >
                Cars for sale (750)
              </h1>
              <h1
                onClick={() => setIsSellCar(false)}
                style={{ fontSize: "clamp(16px, 1vw + 1rem ,30px)" }}
                className={`" font-semibold  py-5 md:px-20 px-4 rounded-lg  cursor-pointer  hover:animate-pulse " ${
                  isSellCar
                    ? "bg-base-color text-text-color"
                    : "bg-highlight-color text-white "
                }`}
              >
                Private looking for car (387)
              </h1>
            </div>
            {isSellCar ? <CarsForSale /> : <PrivateLookingForCars />}
          </div>
        </>
      ) : (
        <>
          <div className="my-10">
            <SellBuyTrade />
          </div>
          <div className="flex lg:flex-row flex-col justify-around items-center ">
            <TotalCarSell />
            <TotalCarBuy />
          </div>
        </>
      )}

      <FairPriceCard />
      <FairPriceFooter />
      <div className="w-full h-1 border-t border-t-highlight-color mt-20"></div>
      <WhyChooseUS />
      <div className="bg-[#F3F9FB]">
        <Reviews />
      </div>
    </div>
  );
};

export default Homepage;
