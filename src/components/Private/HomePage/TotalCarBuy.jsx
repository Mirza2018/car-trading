import { AllImages } from "@/assets/AllImages";
import { getImageUrl } from "@/helpers/config/envConfig";
import { Avatar, Divider, Pagination, Tooltip } from "antd";
import Image from "next/image";
import React from "react";

const TotalCarBuy = ({
  displayedData,
  isLoading,
  isFetching,
  isSuccess,
  onPageChange2,
}) => {
  // console.log(displayedData.data?.result[0]);

  const carSell = {
    name: "Kia Optima",
    address: "Hybrid (Benzin), Automatgear,2.0L, 164HK | PNO #4589020",
    price: "$150,000",
  };

  return (
    <div className="">
      <h1 className="xl:text-[40px] text-3xl font-semibold text-center">
        Samlet bilkøb ({displayedData?.data?.pagination?.total})
      </h1>
      <div className="flex flex-col gap-3 h-[450px] mt-3  overflow-scroll overflow-x-hidden scrollbar-hide">
        {displayedData?.data?.result?.slice(0, 3).map((car) => (
          <div
            key={car?._id}
            className="flex justify-between gap-3 border border-base-color py-5  md:w-[550px]   me-3 px-2  "
          >
            {car?.brandImage ? (
              <React.Fragment>
                <Image
                  alt=""
                  shape="square"
                  className="font-medium object-contain w-20 aspect-square"
                  width={100}
                  height={100}
                  src={`http://31.97.39.237:8010/${car?.brandImage}`}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Avatar
                  shape="square"
                  className="!bg-secondary-color font-medium"
                  size={100}
                >
                  {car?.mark}
                </Avatar>
              </React.Fragment>
            )}

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
                  Pris: {car?.cashPrice} kr.
                </p>
              </div>
              <div className="flex md:flex-col flex-row gap-2 text-end">
                <Tooltip title="Log ind som forhandler">
                  <button className="btn border border-base-color rounded px-1 md:px-5 py-1 w-fit whitespace-nowrap cursor-not-allowed">
                    Køb nu
                  </button>
                </Tooltip>
                <Tooltip title="Log ind som forhandler">
                  <button
                    // onClick={() => showModal(car)}
                    className="btn border border-base-color bg-[#E6F3F7] rounded px-1 md:px-2 py-1 w-fit whitespace-nowrap  cursor-not-allowed"
                  >
                    Se detaljer
                  </button>
                </Tooltip>
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={displayedData?.data?.pagination?.page}
        pageSize={displayedData?.data?.pagination?.limit}
        total={displayedData?.data?.pagination?.total}
        onChange={onPageChange2}
        align="end"
      />
    </div>
  );
};

export default TotalCarBuy;
