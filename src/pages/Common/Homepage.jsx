"use client";
import CarsForSale from "@/components/DealerComponents/HomePage/CarsForSale";
import FilterSection from "@/components/DealerComponents/HomePage/FilterOption/FilterSection";
import SubmitListingFilterSection from "@/components/DealerComponents/HomePage/FilterOption/SubmitListingFilterSection";
import PrivateLookingForCars from "@/components/DealerComponents/HomePage/PrivateLookingForCars";
import Reviews from "@/components/Private/AboutUsPage/Reviews";
import FairPriceCard from "@/components/Private/HomePage/FairPriceCard";
import FairPriceFooter from "@/components/Private/HomePage/FairPriceFooter";
import SellBuyTrade from "@/components/Private/HomePage/SellBuyTrade";
import TotalCarBuy from "@/components/Private/HomePage/TotalCarBuy";
import TotalCarSell from "@/components/Private/HomePage/TotalCarSell";
import WhyChooseUS from "@/components/Private/HomePage/WhyChooseUS";
import {
  useSaleCarListQuery,
  useSubmitListingQuery,
} from "@/redux/api/features/carDealer";

import { useState } from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 3,
  });
  const [filters2, setFilters2] = useState({
    page: 1,
    limit: 4,
  });
  const onPageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };
  const onPageChange2 = (page) => {
    setFilters2((prev) => ({
      ...prev,
      page,
    }));
  };
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useSaleCarListQuery(filters);
  const {
    data: submitData,
    currentData: submitCurrentData,
    isLoading: submitIsLoading,
    isFetching: submitIsFetching,
    isSuccess: submitIsSuccess,
  } = useSubmitListingQuery(filters2);

  const onFinish = (values) => {
    console.log(values);

    // Filter out empty/null/undefined values from filters
    const filters = [values.fuelType, values.brand].filter(
      (f) => f && f.trim() !== ""
    );

    const params = {
      page: 1,
      limit: 3,
      filter: filters.length > 0 ? filters : undefined,
      modelYearFrom: 0,
      modelYearTo: values.modelYearTo,
      drivenKmFrom: values.drivenKmFrom,
      drivenKmTo: values.drivenKmTo,
    };

    setFilters(params);
  };







  const onFinishPrivate = (values) => {
       console.log(values);

       // Filter out empty/null/undefined values from filters
       const filters = [values.fuelType, values.brand].filter(
         (f) => f && f.trim() !== ""
       );

       const params = {
         page: 1,
         limit: 4,
         filter: filters.length > 0 ? filters : undefined,
         modelYearFrom: values.modelYearFrom,
         modelYearTo: values.modelYearTo,
         drivenKmFrom: values.drivenKmFrom,
         drivenKmTo: values.drivenKmTo,
       };

       setFilters2(params);
  };

  const displayedData = data ?? currentData;
  const submitDisplayedData = submitData ?? submitCurrentData;

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [isSellCar, setIsSellCar] = useState(true);

  return (
    <div className="text-text-color container mx-auto">
      {/* dealer */}
      {userInfo?.role === "dealer" && (
        <>
          {isSellCar ? (
            <FilterSection onFinish={onFinish} />
          ) : (
            <SubmitListingFilterSection onFinishPrivate={onFinishPrivate} />
          )}
        </>
      )}

      {userInfo?.role === "dealer" ? (
        // dealer
        <>
          <div>
            <div className="grid grid-cols-2 gap-5 my-10 select-none text-center px-2">
              <h1
                onClick={() => setIsSellCar(true)}
                style={{ fontSize: "clamp(16px, 1vw + 1rem ,30px)" }}
                className={`" font-semibold  sm:px-[3vw] px-2 rounded-lg  cursor-pointer  hover:animate-pulse  flex justify-center items-center leading-none" ${
                  isSellCar
                    ? "bg-highlight-color text-white "
                    : "bg-base-color text-text-color"
                }`}
              >
                Cars for sale
              </h1>
              <h1
                onClick={() => setIsSellCar(false)}
                style={{ fontSize: "clamp(16px, 1vw + 1rem ,30px)" }}
                className={`" font-semibold  py-[1vw] sm:px-[3vw] px-2 rounded-lg  cursor-pointer  hover:animate-pulse " ${
                  isSellCar
                    ? "bg-base-color text-text-color"
                    : "bg-highlight-color text-white "
                }`}
              >
                Private looking for car
              </h1>
            </div>
            {/* Dealer */}

            {/* {(displayedData, isLoading, isFetching, isSuccess)} */}
            {isSellCar ? (
              <CarsForSale
                displayedData={displayedData}
                isLoading={isLoading}
                isFetching={isFetching}
                isSuccess={isSuccess}
                onPageChange={onPageChange}
              />
            ) : (
              <PrivateLookingForCars
                displayedData={submitDisplayedData}
                isLoading={submitIsLoading}
                isFetching={submitIsFetching}
                isSuccess={submitIsSuccess}
                onPageChange={onPageChange2}
              />
            )}
          </div>
        </>
      ) : (
        // Private User
        <>
          <div className="my-10">
            <SellBuyTrade />
          </div>
          <div className="flex lg:flex-row flex-col justify-around items-center ">
            <TotalCarSell displayedData={displayedData} />
            <TotalCarBuy displayedData={submitDisplayedData} />
          </div>
        </>
      )}

      <FairPriceCard />
      <FairPriceFooter />
      <div className="w-full h-1 border-t border-t-highlight-color mt-20"></div>
      <WhyChooseUS />
      <div className="">
        <Reviews />
      </div>
    </div>
  );
};

export default Homepage;
