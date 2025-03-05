import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoMdLink, IoMdSend } from "react-icons/io";
import PrimaryData from "./PrimaryData";
import { Input } from "antd";
import { AiOutlineSend } from "react-icons/ai";

const { Search } = Input;
const SingleCarInfo = ({ car }) => {
  const [bidOpen, setBidOpen] = useState(false);
  const bidRef = useRef(null);

  const bidValue = () => {
    console.log(bidRef.current.input.value);
    setBidOpen(false)
  };
  const suffix = (
    <p
      onClick={bidValue}
      className="cursor-pointer"
      // style={{
      //   fontSize: 22,
      //   color: "#1677ff",
      // }}
    >
      <AiOutlineSend className="text-2xl text-highlight-color" />
    </p>
  );
  console.log(bidRef);

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
          {/* <button
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
          >
            Buy Now: {car?.buyNowPrice}
          </button> */}
          <button
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-semibold py-2  px-11 rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-start w-fit "
          >
            <p className="text-[10px] ">Buy Now :</p>
            <p>{car?.buyNowPrice}</p>
          </button>
          <button
            onClick={() => setBidOpen(!bidOpen)}
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap w-fit"
          >
            Make An Bid Price
          </button>

          {bidOpen && (
            <Input
              type="number"
              className="!bg-[#FFDFB8] !w-[160px] transition-all"
              name="bid"
              ref={bidRef}
              placeholder="input bid price"
              suffix={suffix}
              size="large"
            />
          )}
        </div>
      </div>

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
        <PrimaryData car={car} />
      </div>
    </React.Fragment>
  );
};

export default SingleCarInfo;
