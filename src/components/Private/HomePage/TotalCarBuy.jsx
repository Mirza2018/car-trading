import { AllImages } from "@/assets/AllImages";
import { getImageUrl } from "@/helpers/config/envConfig";
import { Divider, Tooltip } from "antd";
import Image from "next/image";
import React from "react";

const TotalCarBuy = ({ displayedData }) => {
  // console.log(displayedData.data?.result[0]);
  
  const carSell = {
    name: "Kia Optima",
    address: "Hybrid (Benzin), Automatgear,2.0L, 164HK | PNO #4589020",
    price: "$150,000",
  };

  return (
    <div className="">
      <h1 className="xl:text-[40px] text-3xl font-semibold text-center">
        Total Car Buy ({displayedData?.data?.pagination?.total})
      </h1>
      <div className="flex flex-col gap-3 h-[450px] mt-3  overflow-scroll overflow-x-hidden scrollbar-hide">
        {displayedData?.data?.result?.slice(0, 3).map((car) => (
          <div
            key={car?._id}
            className="flex justify-between gap-3 border border-base-color py-5 max-w-2xl  me-3 px-2  "
          >
            <React.Fragment>
              <div className="text-3xl font-bold flex justify-center items-center max-w-32 uppercase bg-secondary-color py-2 md:py-[29px] px-5 rounded-xl">
                {/* <Image
                      src={AllImages.brand1}
                      alt="car"
                      width={0}
                      height={0}
                      className="w-44 aspect-square object-cover rounded-lg"
                    /> */}
                {car?.mark}
              </div>
            </React.Fragment>
            <div className="flex flex-1 justify-between  gap-3 md:flex-row flex-col">
              <div className="flex flex-col max-w-sm">
                <h3 className="text-[22px] font-medium">
                  {car?.mark} {car?.model}
                </h3>
                <p className="font-normal text-sm ">
                  {" "}
                  {car?.fuel != 0 && `${car?.fuel} ,`}{" "}
                  {car?.models && `${car?.models} ,`}{" "}
                </p>
                <p className="font-normal text-sm">
                  Price: {car?.cashPrice} kr.
                </p>
              </div>
              <div className="flex md:flex-col flex-row gap-2 text-end">
                <Tooltip title="Login as Dealer">
                  <button className="btn border border-base-color rounded px-1 md:px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                    Buy Now
                  </button>
                </Tooltip>
                <Tooltip title="Login as Dealer">
                  <button
                    // onClick={() => showModal(car)}
                    className="btn border border-base-color bg-[#E6F3F7] rounded px-1 md:px-2 py-1 w-fit whitespace-nowrap  cursor-not-allowed"
                  >
                    View Details
                  </button>
                </Tooltip>
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCarBuy;
