import FairPriceCard from "@/components/Private/HomePage/FairPriceCard";
import FairPriceFooter from "@/components/Private/HomePage/FairPriceFooter";
import CustomerReviews from "@/components/Private/HomePage/Reviws";
import SellBuyTrade from "@/components/Private/HomePage/SellBuyTrade";
import TotalCarBuy from "@/components/Private/HomePage/TotalCarBuy";
import TotalCarSell from "@/components/Private/HomePage/TotalCarSell";
import WhyChooseUS from "@/components/Private/HomePage/WhyChooseUS";
import React from "react";

const Homepage = () => {
  return (
    <div className="text-text-color ">
      <div className="flex lg:flex-row flex-col justify-around items-center ">
        <TotalCarSell />
        <TotalCarBuy />
      </div>
      <div className="my-10">
        <SellBuyTrade />
      </div>
      <FairPriceCard />
      <FairPriceFooter />
      <div className="w-full h-1 border-t border-t-highlight-color mt-20"></div>
      <WhyChooseUS />
      <div className="bg-[#F3F9FB]">
        <CustomerReviews />
      </div>
    </div>
  );
};

export default Homepage;
