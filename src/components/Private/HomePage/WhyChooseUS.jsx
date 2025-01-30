import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const WhyChooseUS = () => {
  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">Why Choose Us?</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1 my-7 container mx-auto gap-5">
        <div className="flex  flex-col justify-center items-start">
          <Image src={AllImages.f1} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Special Financing Offers</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
        </div>
        <div className="flex  flex-col justify-center items-start">
          <Image src={AllImages.f2} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Trusted Car Dealership</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
        </div>
        <div className="flex  flex-col justify-center items-start">
          <Image src={AllImages.f3} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Transparent Pricing</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUS;
