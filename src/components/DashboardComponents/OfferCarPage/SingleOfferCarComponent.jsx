"use client";

import { Button } from "antd";
import { toast } from "sonner";
import OfferCarDetails from "./OfferCarDetails";
import OfferCarImageSlider from "./OfferCarImageSlider";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";

const SingleOfferCarComponent = ({ offerCar, offercarAction }) => {
  console.log(offerCar);
  const date = new Date(offerCar?.createdAt).toDateString();

  const car = {
    buyNowPrice: "6,300 EUR",
    model: "Honda CR-V",
    edition: "PHEV - STYLE SMART",
    currentBids: 12,
    priceInDKK: "32,000 .kr",
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

  const acceptOfferCar = async () => {
    const toastId = toast.loading("Tilbud accepteres…");
    const data = {
      offerCarId: offerCar?._id,
      status: "accept",
    };

    try {
      const res = await offercarAction(data).unwrap();
      console.log(res);
      toast.success("Tilbud accepteret succesfuldt", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at acceptere tilbuddet", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const rejectOfferCar = async () => {
    const toastId = toast.loading("Tilbud afvises…");
    const data = {
      offerCarId: offerCar?._id,
      status: "reject",
    };

    try {
      const res = await offercarAction(data).unwrap();
      console.log(res);
      toast.success("Tilbud afvist succesfuldt", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at afvise tilbuddet på bilen", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="mt-2">
      <main className="md:grid grid-cols-12  gap-4 md:px-10 px-2 ">
        {/* Left Side */}
        <section className="col-span-5 max-w-[400px]">
          {offerCar?.carImages.length > 0 ? (
            <OfferCarImageSlider carImages={offerCar?.carImages} />
          ) : (
            <div className="flex justify-center items-center">
              <Image
                alt=""
                width={100}
                height={100}
                src={`http://31.97.39.237:8010/${offerCar?.brandImage}`}
                className="aspect-square object-contain w-48 flex justify-center items-center mt-10"
              />
            </div>
          )}
        </section>
        {/* 
        {car.brandImage ? (
          <React.Fragment>
            <Avatar
              shape="square"
              className="font-medium"
              size={100}
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
        )} */}

        {/* Right Side */}
        <section className="col-span-7">
          {/* Top portion  */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            {/* <div className="flex  justify-start items-center  font-bold text-base">
              <IoMdLink className="rotate-90" />
              Registration certificate
            </div> */}
            <div className=" font-bold text-base">{date}</div>
            <div className=" font-bold text-base">
              Maksimal pris: {offerCar?.cashPrice} .kr
            </div>
            {/* <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
              <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
              <p className=" text-center text-sm">
                Minimum price <br /> achieved
              </p>
            </div> */}

            <div className="flex flex-col gap-3 ">
              <h1>Inkl. moms / Inkl. registrering</h1>
              <Button
                onClick={acceptOfferCar}
                className={`text-xl  !bg-highlight-color py-2 md:w-full w-fit !hover:bg-red-600 `}
                type="primary"
              >
                Accepter
              </Button>
              <Button
                onClick={rejectOfferCar}
                className={`text-xl  !bg-[#DC3545] py-2 md:w-full px-8 w-fit  !hover:bg-red-600 `}
                type="primary"
              >
                Afvis
              </Button>
            </div>
          </div>
          {/* Middel part car All Details */}
          <OfferCarDetails car={car} offerCar={offerCar} />
        </section>
      </main>
      {/* 
      <pre>{JSON.stringify(date, null, 8)}</pre>
      <pre>{JSON.stringify(offerCar, null, 8)}</pre> */}
    </div>
  );
};

export default SingleOfferCarComponent;
