import { AllImages } from "@/assets/AllImages";
import PrimaryData from "@/components/DealerComponents/HomePage/SingleCarInfo/PrimaryData";
import Image from "next/image";
import React from "react";
import { IoMdLink } from "react-icons/io";


const OfferCarSideInfo = ({ car }) => {
  return (
    <React.Fragment>
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
          <button
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
          >
            Accept
          </button>
          <button
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-[#DC3545] text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
          >
            Reject
          </button>
        </div>
      </div>

      <div className="my-5">
        <p className="text-2xl font-semibold">{car?.model}</p>
        <div className="flex gap-4 justify-between my-5">
          <div className=" flex gap-2">
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
        <div className="text-base font-medium flex flex-wrap gap-3  select-none mb-5">
          <p className="cursor-pointer">Primary Data</p>
          <p className="cursor-pointer">Information</p>
          <p className="cursor-pointer">Equipment</p>
          <p className="cursor-pointer">Classification</p>
          <p className="cursor-pointer">Services</p>
          <p className="cursor-pointer">Seller</p>
        </div>
        <PrimaryData car={car} />
      </div>
    </React.Fragment>
  );
};

export default OfferCarSideInfo;
