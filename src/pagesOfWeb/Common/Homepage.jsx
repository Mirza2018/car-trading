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
import { useProfileQuery } from "@/redux/api/features/myProfile";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Homepage = () => {
  const { data: userData, isLoading: userDataIsLooding } = useProfileQuery();
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
  const navigate = useRouter();
  const onFinish = (values) => {
    // console.log(values);

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
      modelsFrom: values.modelYearFrom,
      modelsTo: values.modelYearTo,
      drivenKmFrom: values.drivenKmFrom,
      drivenKmTo: values.drivenKmTo,
    };

    setFilters2(params);
  };

  const displayedData = data ?? currentData;
  const submitDisplayedData = submitData ?? submitCurrentData;

  // console.log(userData?.data?.isPrivacyAccepted);
  // console.log(userData?.data?.isTermAccepted);

  if (userData) {
    // console.log(userData?.data?.profile);
    if (
      !userData?.data?.profile?.first_name?.trim() ||
      !userData?.data?.profile?.last_name?.trim() ||
      !userData?.data?.profile?.phoneNumber?.trim() ||
      !userData?.data?.profile?.zip?.trim() ||
      !userData?.data?.profile?.city?.trim() ||
      !userData?.data?.profile?.street?.trim()
    ) {
      Swal.fire({
        title: "Please complete your profile",
        confirmButtonText: "Ok",
      }).then(async (result) => {
        if (result.isConfirmed) {
          return navigate.push("/dashboard/user-profile");
        }
      });
    } else if (userData?.data?.isTermAccepted == false) {
      Swal.fire({
        title: "Please accept the Terms & Conditions",
        // showDenyButton: true,
        confirmButtonText: "Ok",
        // denyButtonText: `Cancel`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          return navigate.push("/dashboard/terms");
        }
      });
    } else if (userData?.data?.isPrivacyAccepted == false) {
      Swal.fire({
        title: "Please accept the Privacy Policy",
        // showDenyButton: true,
        confirmButtonText: "Ok",
        // denyButtonText: `Cancel`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          return navigate.push("/dashboard/privacy");
        }
      });
    }
  }

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
                className={`" font-semibold  sm:px-[3vw] px-2 rounded-lg  cursor-pointer  hover:animate-pulse  flex justify-center items-center leading-none " ${
                  isSellCar
                    ? "bg-highlight-color text-white "
                    : "bg-base-color text-text-color"
                }`}
              >
                Cars for sale
                <br />({displayedData?.data?.pagination?.total})
              </h1>
              <h1
                onClick={() => setIsSellCar(false)}
                style={{ fontSize: "clamp(16px, 1vw + 1rem ,30px)" }}
                className={`" font-semibold  py-[1vw] sm:px-[3vw] px-2 rounded-lg  cursor-pointer  hover:animate-pulse flex justify-center items-center " ${
                  isSellCar
                    ? "bg-base-color text-text-color"
                    : "bg-highlight-color text-white "
                }`}
              >
                Private looking for car
                <br />({submitDisplayedData?.data?.pagination?.total})
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
                onPageChange2={onPageChange2}
              />
            )}
          </div>
        </>
      ) : (
        // Private User
        <>
          <div className="my-10 px-2">
            <SellBuyTrade />
          </div>
          <div className="flex lg:flex-row flex-col justify-around items-center md:gap-0 gap-6 ">
            <div>
              {displayedData?.data?.pagination?.total > 0 && (
                <TotalCarSell
                  displayedData={displayedData}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isSuccess={isSuccess}
                  onPageChange={onPageChange}
                />
              )}
            </div>
            <div>
              {submitDisplayedData?.data?.pagination?.total > 0 && (
                <TotalCarBuy
                  displayedData={submitDisplayedData}
                  isLoading={submitIsLoading}
                  isFetching={submitIsFetching}
                  isSuccess={submitIsSuccess}
                  onPageChange2={onPageChange2}
                />
              )}
            </div>
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
