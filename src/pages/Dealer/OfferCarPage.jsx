"use client";
import Licenseplate from "@/components/DealerComponents/OfferCarPage/Licenseplate";
import OfferCar from "@/components/DealerComponents/OfferCarPage/OfferCar";
import React, { useState } from "react";

const OfferCarPage = () => {
  const [isDeal, setIsDeal] = useState(true);
  return (
    <div className="container mx-auto min-h-screen border-2 border-secondary-color rounded-md my-20">
      <div className="max-w-[1200px] md:mx-20 mx-4">
        <div className=" bg-base-color  mx-auto border border-secondary-color rounded mt-10 w-full my-5 grid grid-cols-2">
          <p
            onClick={() => setIsDeal(true)}
            className={`text-2xl font-bold cursor-pointer m-1 rounded text-center py-1  ${
              isDeal ? "bg-highlight-color text-white " : ""
            }`}
          >
            Deal
          </p>
          <p
            onClick={() => setIsDeal(false)}
            className={`text-2xl font-bold cursor-pointer  m-1 rounded text-center py-1 ${
              isDeal ? "" : "bg-highlight-color text-white "
            }`}
          >
            License plate
          </p>
        </div>
        {isDeal ? <OfferCar /> : <Licenseplate />}
      </div>
    </div>
  );
};

export default OfferCarPage;
