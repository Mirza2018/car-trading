import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";
import CarTableDetails from "./CarTableDetails";


const CarAllDetails = ({car}) => {
  return (
    <div className="my-5">
      <p className="text-2xl font-semibold">{car?.model}</p>
      <div className="flex gap-4 justify-between my-5 flex-wrap">
        <div className=" flex gap-2 ">
          <Image
            alt="speed"
            width={0}
            height={0}
            src={AllImages.speed}
            className=""
          />
          <p className="text-sm font-normal">{car?.kilometers}</p>
        </div>
        <div className=" flex gap-2">
          <Image
            alt="speed"
            width={0}
            height={0}
            src={AllImages.calender}
            className=""
          />
          <p className="text-sm font-normal">{car?.serviceDate}</p>
        </div>
        <div className=" flex gap-2">
          <Image
            alt="speed"
            width={0}
            height={0}
            src={AllImages.map}
            className=""
          />
          <p className="text-sm font-normal">{car?.postalCode}</p>
        </div>
        <div className=" flex gap-2">
          <Image
            alt="speed"
            width={0}
            height={0}
            src={AllImages.suv}
            className=""
          />
          <p className="text-sm font-normal">{car?.vehicleType}</p>
        </div>
      </div>
      {/* <div className="text-base font-medium flex flex-wrap gap-3  select-none mb-5">
          <p className="cursor-pointer">Primary Data</p>
          <p className="cursor-pointer">Information</p>
          <p className="cursor-pointer">Equipment</p>
          <p className="cursor-pointer">Classification</p>
          <p className="cursor-pointer">Services</p>
          <p className="cursor-pointer">Seller</p>
        </div> */}
      <CarTableDetails car={car} />
    </div>
  );
};

export default CarAllDetails;
