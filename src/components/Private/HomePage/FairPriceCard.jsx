import { AllImages } from "@/assets/AllImages";
import { LuMoveUpRight } from "react-icons/lu";


import Image from "next/image";
import React from "react";

const FairPriceCard = () => {
  return (
    <div className="container mx-auto flex my-14 gap-5 lg:flex-row flex-col">
      <div>
        <Image
          alt="car"
          src={AllImages.fairPriceCar}
          className="aspect-auto object-cover rounded-lg"
        />
      </div>
      <div className="bg-[#F3F9FB] text-gray-800 p-10 max-w-4xl mx-auto  rounded-lg">
        <h1 className="text-2xl font-bold">Get A Fair Price For Your Car</h1>
        <h2 className="text-xl font-bold text-gray-700 mt-2">
          Sell To Us Today
        </h2>
        <p className="mt-4">
          We are committed to providing our customers with exceptional service,
          competitive pricing, and a wide range of.
        </p>
        <div className="pl-5 mt-4">
          <p className="flex justify-start items-center gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            We are the UK’s largest provider, with more patrols in more places
          </p>
          <p className="flex justify-start items-center  gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            You get 24/7 roadside assistance
          </p>
          <p className="flex justify-start items-center  gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            We fix 4 out of 5 cars at the roadside
          </p>
        </div>
        <button className="mt-6 bg-highlight-color text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f29524] transition-colors whitespace-nowrap w-fit flex justify-between items-center gap-2">
          Get Started
          <LuMoveUpRight />
        </button>
      </div>
    </div>
  );
};

export default FairPriceCard;
