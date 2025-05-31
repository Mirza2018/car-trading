"use client";
import { AllImages } from "@/assets/AllImages";
import PrivateCarSoldTable from "@/components/DashboardComponents/TotalCarSold/PrivateCarSoldTable";
import ViewDetailsPage from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ViewDetailsPage";
import { useSellCarQuery } from "@/redux/api/features/privateDashboard";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
  
const TotalCarSold = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
      filter: "sold",
    }));
  };



  const { data: soldCarData,currentData, isLoading } = useSellCarQuery(filters);
    
  const displayedData = soldCarData ?? currentData;
  console.log(displayedData);
   const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState([]);
  const [openCarSee, setOpennCarSee] = useState(false);

  

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setOpennCarSee(true);
  };


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

  const car = {
    buyNowPrice: "6,300 EUR",
    model: "Honda CR-V",
    edition: "PHEV - STYLE SMART",
    currentBids: 12,
    priceInDKK: "32,000 DKK",
    type: "Hybrid (Benzin)",
    transmission: "Automatgear",
    engineCapacity: "2.0 L",
    horsepower: "151 HK",
    pno: "#4430457",
    status: "Minimum price achieved",
    kilometers: "1,749 km",
    serviceDate: "08/2025",
    postalCode: "8000",
    vehicleType: "SUV",
    makeAnBidPrice: "25,000 kr.",
    link: "View Details",
  };

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
                <p className="text-base font-normal ">Total Car Sold</p>
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
        <PrivateCarSoldTable
          data={displayedData?.data?.result}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          meta={displayedData?.data?.meta}
          onPageChange={onPageChange}
        />
        {/* <PrivateCarSeeDetails
          openCarSee={openCarSee}
          setOpennCarSee={setOpennCarSee}
        /> */}

        <ViewDetailsPage
          openResponsive={openCarSee}
          setOpenResponsive={setOpennCarSee}
          car={currentRecord}
          sendOffer={false}
          buyNow={false}
        />
      </div>
    </div>
  );
};

export default TotalCarSold;
