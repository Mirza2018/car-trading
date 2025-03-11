import { AllImages } from "@/assets/AllImages";
import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

const TotalCarBuy = () => {
  const carSell = {
    name: "Kia Optima",
    address: "Hybrid (Benzin), Automatgear,2.0L, 164HK | PNO #4589020",
    price: "$150,000",
  };

  return (
    <div className="">
      <h1 className="text-[40px] font-semibold text-center">
        Total Car Buy (387)
      </h1>
      <div className="flex flex-col gap-3 h-[450px] mt-3 overflow-scroll overflow-x-hidden scrollbar-hide">
        <div className="flex  gap-3 border border-base-color py-5 max-w-2xl w-fit px-2  ">
          <React.Fragment>
            <Image
              src={AllImages.car}
              alt="car"
              width={0}
              height={0}
              className="size-24 aspect-square object-cover"
            />
          </React.Fragment>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-col max-w-sm">
              <h3 className="text-[22px] font-medium">{carSell.name}</h3>
              <p className="font-normal text-sm ">{carSell.address}</p>
              <p className="font-normal text-sm">Price: {carSell.price}</p>
            </div>
            <div className="flex md:flex-col flex-row gap-2">
              <Tooltip title="Login as Dealer">
                <button className="btn border bg-[#D9D9D9] text-[#BDBCBC] rounded px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  Buy Now
                </button>
              </Tooltip>
              <Tooltip title="Login as Dealer">
                <button className="btn border border-base-color bg-[#E6F3F7] rounded px-2 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  View Details
                </button>
              </Tooltip>
            </div>{" "}
          </div>
        </div>
        <div className="flex  gap-3 border border-base-color py-5 max-w-2xl w-fit px-2  ">
          <React.Fragment>
            <Image
              src={AllImages.car}
              alt="car"
              width={0}
              height={0}
              className="size-24 aspect-square object-cover"
            />
          </React.Fragment>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-col max-w-sm">
              <h3 className="text-[22px] font-medium">{carSell.name}</h3>
              <p className="font-normal text-sm ">{carSell.address}</p>
              <p className="font-normal text-sm">Price: {carSell.price}</p>
            </div>
            <div className="flex md:flex-col flex-row gap-2">
              <Tooltip title="Login as Dealer">
                <button className="btn border bg-[#D9D9D9] text-[#BDBCBC] rounded px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  Buy Now
                </button>
              </Tooltip>
              <Tooltip title="Login as Dealer">
                <button className="btn border border-base-color bg-[#E6F3F7] rounded px-2 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  View Details
                </button>
              </Tooltip>
            </div>{" "}
          </div>
        </div>
        <div className="flex  gap-3 border border-base-color py-5 max-w-2xl w-fit px-2  ">
          <React.Fragment>
            <Image
              src={AllImages.car}
              alt="car"
              width={0}
              height={0}
              className="size-24 aspect-square object-cover"
            />
          </React.Fragment>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-col max-w-sm">
              <h3 className="text-[22px] font-medium">{carSell.name}</h3>
              <p className="font-normal text-sm ">{carSell.address}</p>
              <p className="font-normal text-sm">Price: {carSell.price}</p>
            </div>
            <div className="flex md:flex-col flex-row gap-2">
              <Tooltip title="Login as Dealer">
                <button className="btn border bg-[#D9D9D9] text-[#BDBCBC] rounded px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  Buy Now
                </button>
              </Tooltip>
              <Tooltip title="Login as Dealer">
                <button className="btn border border-base-color bg-[#E6F3F7] rounded px-2 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  View Details
                </button>
              </Tooltip>
            </div>{" "}
          </div>
        </div>
        <div className="flex  gap-3 border border-base-color py-5 max-w-2xl w-fit px-2  ">
          <React.Fragment>
            <Image
              src={AllImages.car}
              alt="car"
              width={0}
              height={0}
              className="size-24 aspect-square object-cover"
            />
          </React.Fragment>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-col max-w-sm">
              <h3 className="text-[22px] font-medium">{carSell.name}</h3>
              <p className="font-normal text-sm ">{carSell.address}</p>
              <p className="font-normal text-sm">Price: {carSell.price}</p>
            </div>
            <div className="flex md:flex-col flex-row gap-2">
              <Tooltip title="Login as Dealer">
                <button className="btn border bg-[#D9D9D9] text-[#BDBCBC] rounded px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  Buy Now
                </button>
              </Tooltip>
              <Tooltip title="Login as Dealer">
                <button className="btn border border-base-color bg-[#E6F3F7] rounded px-2 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                  View Details
                </button>
              </Tooltip>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCarBuy;
