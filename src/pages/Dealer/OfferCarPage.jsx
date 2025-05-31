"use client";
import Licenseplate from "@/components/DealerComponents/OfferCarPage/Licenseplate";
import OfferCar from "@/components/DealerComponents/OfferCarPage/OfferCar";
import { useOfferCarDealMutation } from "@/redux/api/features/carDealer";
import { clearCarLicenseInfo } from "@/redux/slices/carInfoSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const OfferCarPage = () => {
  const [offerCar] = useOfferCarDealMutation();
  const dispatch = useDispatch();
  dispatch(clearCarLicenseInfo());

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
        {isDeal ? (
          <OfferCar offerCar={offerCar} />
        ) : (
          <Licenseplate offerCar={offerCar} />
        )}
      </div>
    </div>
  );
};

export default OfferCarPage;
