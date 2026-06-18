"use client";
import AcceptPolicyModal from "@/components/AcceptPolicyModal";
import CarsForSale from "@/components/DealerComponents/HomePage/CarsForSale";
import FilterSection from "@/components/DealerComponents/HomePage/FilterOption/FilterSection";
import SubmitListingFilterSection from "@/components/DealerComponents/HomePage/FilterOption/SubmitListingFilterSection";
import PrivateLookingForCars from "@/components/DealerComponents/HomePage/PrivateLookingForCars";
import Reviews from "@/components/Private/AboutUsPage/Reviews";
import DelarPrice from "@/components/Private/HomePage/DelarPrice";
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
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const Homepage = () => {
  const {
    data: userData,
    isLoading: userDataIsLoading,
    refetch: refetchProfile,
  } = useProfileQuery();

  const [queryParams2, setQueryParams2] = useState({
    page: 1,
    limit: 3,
    sort: "-updatedAt",
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 4,
    sort: "-updatedAt", // Fixed, not changeable
  });
  const cookies = new Cookies();
  const onPageChange = (page) => {
    setQueryParams2((prev) => ({
      ...prev,
      page,
    }));
  };

  const onPageChange2 = (page) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useSaleCarListQuery(queryParams2);

  const {
    data: submitData,
    currentData: submitCurrentData,
    isLoading: submitIsLoading,
    isFetching: submitIsFetching,
    isSuccess: submitIsSuccess,
    refetch,
  } = useSubmitListingQuery(queryParams);

  // Handle filter changes
  const handleFiltersChange = (filters) => {
    setQueryParams({
      page: 1, // Reset page on filter change
      limit: 4,
      sort: "-updatedAt",
      ...filters, // Only active filters
    });
  };
  const handleFiltersChange2 = (filters) => {
    setQueryParams2({
      page: 1, // Reset page on filter change
      limit: 3,
      sort: "-updatedAt",
      ...filters, // Only active filters
    });
  };

  const navigate = useRouter();

  const displayedData = data ?? currentData;
  const submitDisplayedData = submitData ?? submitCurrentData;

  // Profile completeness check stays exactly as before: redirects to the
  // profile edit page, untouched by the terms/privacy logic below.
  if (
    userData &&
    (!userData?.data?.profile?.first_name?.trim() ||
      !userData?.data?.profile?.last_name?.trim() ||
      !userData?.data?.profile?.phoneNumber?.trim() ||
      !userData?.data?.profile?.zip?.trim() ||
      !userData?.data?.profile?.city?.trim() ||
      !userData?.data?.profile?.street?.trim())
  ) {
    Swal.fire({
      title: "Fuldfør din profil for at komme i gang.",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (result.isConfirmed) {
        return navigate.push("/dashboard/user-profile");
      }
    });
  }

  // Combined terms + privacy modal: shown in-place (no navigation away from
  // the homepage), fully blocking until both are accepted. Profile must be
  // complete first (handled above) before this is relevant.
  const profileIsComplete =
    userData &&
    userData?.data?.profile?.first_name?.trim() &&
    userData?.data?.profile?.last_name?.trim() &&
    userData?.data?.profile?.phoneNumber?.trim() &&
    userData?.data?.profile?.zip?.trim() &&
    userData?.data?.profile?.city?.trim() &&
    userData?.data?.profile?.street?.trim();

  const needsPolicyAcceptance =
    profileIsComplete &&
    (userData?.data?.isTermAccepted === false ||
      userData?.data?.isPrivacyAccepted === false);

  // let userInfo;
  const userCookie = cookies.get("car_trading_accessToken");
  let userInfo;
  if (!userCookie) {
    userInfo = { role: false };
  } else {
    userInfo = jwtDecode(userCookie);
  }

  const [isSellCar, setIsSellCar] = useState(true);

  return (
    <div className="text-text-color container mx-auto">
      <AcceptPolicyModal
        open={Boolean(needsPolicyAcceptance)}
        onAccepted={() => {
          // Re-fetch profile so isTermAccepted/isPrivacyAccepted flip to
          // true and the modal closes automatically; rest of the page
          // (including profile editing) is unaffected.
          refetchProfile();
        }}
      />

      {/* dealer */}
      {userInfo?.role === "dealer" && (
        <>
          {isSellCar ? (
            <FilterSection onFinish={handleFiltersChange2} />
          ) : (
            <SubmitListingFilterSection onFinishPrivate={handleFiltersChange} />
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
                Antal biler til salg <br />(
                {displayedData?.data?.pagination?.total || 0})
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
                Antal kunder søger bil
                <br />({submitDisplayedData?.data?.pagination?.total || 0})
              </h1>
            </div>

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
      <div className="w-full h-1 border-t border-t-highlight-color mt-20"></div>
      <WhyChooseUS />
      <div className="w-full h-1 border-t border-t-highlight-color mt-20"></div>
    </div>
  );
};

export default Homepage;
