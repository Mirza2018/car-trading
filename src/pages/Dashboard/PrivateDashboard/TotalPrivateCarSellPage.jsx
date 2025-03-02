"use client";
import { AllImages } from "@/assets/AllImages";
import PrivateCarSeeDetails from "@/components/DashboardComponents/TotalPrivateCarSellPage/PrivateCarSeeDetails";
import PrivateCarSellTable from "@/components/DashboardComponents/TotalPrivateCarSellPage/PrivateCarSellTable";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TotalPrivateCarSellPage = () => {
  const [data, setData] = useState([]);
  const [openCarSee, setOpennCarSee] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/privateCarSellList.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data, "data");

  return (
    <div className="px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 pb-10">
        <div>
          <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div
              className="flex 
                 gap-2 xl:gap-4 items-center"
            >
              <div className=" rounded-full  w-fit">
                <Image
                  width={0}
                  height={0}
                  src={AllImages.totalCarSellIcon}
                  className=""
                  alt=""
                />
              </div>
              <div className="text-start">
                <p className="text-4xl font-bold mb-1">75</p>
                <p className="text-base font-normal ">Total Car Sell</p>
                <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.upArrow}
                    className="pt-2"
                    alt=""
                  />
                  4% (30 days)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div
              className="flex 
                 gap-2 xl:gap-4 items-center"
            >
              <div className="  w-fit">
                <Image width={0} height={0} src={AllImages.carIcon} alt="" />
              </div>
              <div className="text-start">
                <p className="text-4xl font-bold mb-1">45</p>
                <p className="text-base font-normal ">Unsold Total Car</p>
                <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.upArrow}
                    className="pt-2"
                    alt=""
                  />
                  2% (25 days)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div
              className="flex 
                 gap-2 xl:gap-4 items-center"
            >
              <div className="   w-fit">
                <Image width={0} height={0} src={AllImages.carIcon} alt="" />
              </div>
              <div className="text-start">
                <p className="text-4xl font-bold mb-1">45</p>
                <p className="text-base font-normal ">Total Car Buy</p>
                <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.upArrow}
                    className="pt-2"
                    alt=""
                  />
                  2% (25 days)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex bg-base-color border border-secondary-color gap-5 flex-wrap rounded-lg  py-2 px-1 lg:p-5 items-center justify-center flex-1">
            <div
              className="flex 
                 gap-2 xl:gap-4 items-center"
            >
              <div className="  ">
                <Image width={0} height={0} src={AllImages.revenue} alt="" />
              </div>
              <div className="text-start">
                <p className="text-4xl font-bold mb-1">$128</p>
                <p className="text-base font-normal ">Total Revenue</p>
                <div className="text-xs font-normal text-[#A3A3A3] flex justify-center items-center gap-1">
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.upArrow}
                    className="pt-2"
                    alt=""
                  />
                  12% (30 days)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <PrivateCarSellTable
          data={data}
          loading={loading}
          setOpennCarSee={setOpennCarSee}
          pageSize={12}
        />
        <PrivateCarSeeDetails
          openCarSee={openCarSee}
          setOpennCarSee={setOpennCarSee}
        />
      </div>
    </div>
  );
};

export default TotalPrivateCarSellPage;
