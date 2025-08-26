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
    <div className=" mx-5 my-12 px-5 rounded-lg max-w-[900px]  border  border-secondary-color">
      <div className=" bg-base-color  mx-auto border border-secondary-color rounded mt-10 w-full my-5 grid grid-cols-2">
        <p
          style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
          onClick={() => setIsDeal(true)}
          className={`text-2xl font-bold cursor-pointer m-1 rounded text-center py-1  ${
            isDeal ? "bg-highlight-color text-white " : ""
          }`}
        >
          Aftale
        </p>
        <p
          style={{ fontSize: "clamp(14px, 1vw + 1rem ,24px)" }}
          onClick={() => setIsDeal(false)}
          className={` font-bold cursor-pointer  m-1 rounded text-center py-1 ${
            isDeal ? "" : "bg-highlight-color text-white "
          }`}
        >
          Nummerplade
        </p>
      </div>
      {isDeal ? (
        <OfferCar offerCar={offerCar} />
      ) : (
        <Licenseplate offerCar={offerCar} />
      )}
    </div>
  );
};

export default OfferCarPage;
