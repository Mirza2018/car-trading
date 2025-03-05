"use client";
import { AllImages } from "@/assets/AllImages";
import { Col, Divider, Modal, Row } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SingleCarInfo from "./SingleCarInfo/SingleCarInfo";

const CarsForSale = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const images = [
    { src: AllImages.car, alt: "Car 1" },
    { src: AllImages.bids, alt: "Car 2" },
    { src: AllImages.car, alt: "Car 3" },
    { src: AllImages.car, alt: "Car 4" },
  ];

  // Track the current (main) image index
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRight = (index) => {
    console.log(index);

    if (currentIndex === index - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(() => currentIndex + 1);
    }
  };
  const handleleft = (index) => {
    console.log(index);

    if (currentIndex === 0) {
      setCurrentIndex(index - 1);
    } else {
      setCurrentIndex(() => currentIndex - 1);
    }
  };

  const carDetailsArray = [
    {
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
    },
    {
      buyNowPrice: "5,900 EUR",
      model: "Honda CR-V",
      edition: "PHEV - EXECUTIVE",
      currentBids: 8,
      priceInDKK: "29,500 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430468",
      status: "Minimum price not achieved",
      kilometers: "2,300 km",
      serviceDate: "09/2025",
      postalCode: "8200",
      vehicleType: "SUV",
      makeAnBidPrice: "28,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "7,000 EUR",
      model: "Honda CR-V",
      edition: "PHEV - LUXURY",
      currentBids: 15,
      priceInDKK: "33,000 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430479",
      status: "Minimum price achieved",
      kilometers: "1,500 km",
      serviceDate: "07/2025",
      postalCode: "8100",
      vehicleType: "SUV",
      makeAnBidPrice: "26,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "6,800 EUR",
      model: "Honda CR-V",
      edition: "PHEV - PREMIUM",
      currentBids: 10,
      priceInDKK: "31,800 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430485",
      status: "Minimum price achieved",
      kilometers: "2,100 km",
      serviceDate: "08/2025",
      postalCode: "8500",
      vehicleType: "SUV",
      makeAnBidPrice: "27,000 kr.",
      link: "View Details",
    },
    {
      buyNowPrice: "6,500 EUR",
      model: "Honda CR-V",
      edition: "PHEV - SPORT",
      currentBids: 9,
      priceInDKK: "30,000 DKK",
      type: "Hybrid (Benzin)",
      transmission: "Automatgear",
      engineCapacity: "2.0 L",
      horsepower: "151 HK",
      pno: "#4430492",
      status: "Minimum price not achieved",
      kilometers: "1,800 km",
      serviceDate: "07/2025",
      postalCode: "8300",
      vehicleType: "SUV",
      makeAnBidPrice: "26,500 kr.",
      link: "View Details",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4  mt-3 overflow-scroll overflow-x-hidden scrollbar-hide">
        {carDetailsArray.map((car, index) => (
          <div
            key={index}
            className="flex lg:flex-row flex-col   gap-10 shadow-xl rounded-md p-3"
          >
            <div className="flex gap-6 justify-start items-center">
              <div>
                <Image
                  src={AllImages.car}
                  alt="car"
                  width={0}
                  height={0}
                  className="w-44 aspect-square object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-2xl font-semibold">{car?.model}</p>
                <p className="text-sm font-normal">{car?.edition}</p>
                <div className="text-sm font-normal">
                  {car?.type},{car?.transmission},{car?.engineCapacity},
                  {car?.horsepower}{" "}
                  <Divider className=" bg-black" type="vertical" />
                  PNO {car?.pno}
                </div>
                <div className="flex gap-4 flex-wrap">
                  <div className=" flex gap-2 justify-start items-center flex-wrap">
                    <Image
                      alt="speed"
                      width={0}
                      height={0}
                      src={AllImages.speed}
                      className=""
                    />
                    <p className="text-sm font-normal">{car?.kilometers}</p>
                  </div>
                  <div className=" flex gap-2 justify-start items-center flex-wrap">
                    <Image
                      alt="speed"
                      width={0}
                      height={0}
                      src={AllImages.calender}
                      className=""
                    />
                    <p className="text-sm font-normal">{car?.serviceDate}</p>
                  </div>
                  <div className=" flex gap-2 justify-start items-center flex-wrap">
                    <Image
                      alt="speed"
                      width={0}
                      height={0}
                      src={AllImages.map}
                      className=""
                    />
                    <p className="text-sm font-normal">{car?.postalCode}</p>
                  </div>
                  <div className=" flex gap-2 justify-start items-center flex-wrap">
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
              </div>
            </div>
            <div className="flex xl:flex-row flex-row-reverse flex-wrap gap-10 items-center justify-between flex-1">
              <div className=" flex items-center gap-2 border-x border-secondary-color xl:h-full px-5">
                <Image
                  alt="speed"
                  width={0}
                  height={0}
                  src={AllImages.bids}
                  className=""
                />
                <p className="text-sm font-normal text-text-light-color">
                  Current Bids:{car?.currentBids}
                </p>
              </div>
              {/* <div className="bg-base-color border border-secondary-color rounded-full aspect-square px-2 flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
                <p className="whitespace-nowrap ">Minimum price achieved</p>
              </div> */}

              <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
                <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
                <p className=" text-center text-sm">
                  Minimum price <br /> achieved
                </p>
              </div>
              <div className="flex flex-col gap-5 ">
                <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-semibold py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-start"
                >
                  <p className="text-[10px] ">Buy Now :</p>
                  <p>{car?.buyNowPrice}</p>
                </button>
                <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  Make An Bid Price
                </button>
                <button
                  onClick={() => setOpenResponsive(true)}
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-base-color text-black border border-secondary-color  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  View Details
                </button>

                <Modal
                  // title="Modal responsive width"
                  centered
                  open={openResponsive}
                  onOk={() => setOpenResponsive(false)}
                  onCancel={() => setOpenResponsive(false)}
                  width={1500}
                  footer={[
                    <div className="flex justify-end gap-80">
                      {/* <button
                        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                        className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                      >
                        Send Offer
                      </button> */}
                      <button
                        onClick={() => setOpenResponsive(false)}
                        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                        className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                      >
                        Close
                      </button>
                    </div>,
                  ]}
                >
                  <div>
                    <main className="md:grid grid-cols-12  gap-4">
                      <section className="col-span-5">
                        <div className=" py-10">
                          <div className="mx-auto max-w-screen-lg px-4">
                            {/* Main Image Display */}
                            <div className="mb-6 relative">
                              <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-lg shadow-md">
                                <Image
                                  src={images[currentIndex].src}
                                  alt={images[currentIndex].alt}
                                  fill
                                  style={{ objectFit: "cover" }}
                                  sizes="(max-width: 768px) 100vw, 768px"
                                />
                              </div>
                              <div
                                onClick={() => handleleft(images.length)}
                                className="rounded-full flex justify-center items-center bg-[#F3F9FB]/50 size-8 absolute top-1/2 left-0 cursor-pointer select-none"
                              >
                                <Image
                                  src={AllImages.right}
                                  alt="right"
                                  width={0}
                                  height={0}
                                  className=""
                                />
                              </div>
                              <div
                                onClick={() => handleRight(images.length)}
                                className="rounded-full flex justify-center items-center bg-[#F3F9FB]/50 size-8 absolute top-1/2 right-0 cursor-pointer select-none"
                              >
                                <Image
                                  src={AllImages.left}
                                  alt="left"
                                  width={0}
                                  height={0}
                                />
                              </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="relative flex flex-wrap gap-2 justify-between">
                              {images.map((image, index) => (
                                <div
                                  key={index}
                                  className={` cursor-pointer overflow-hidden rounded-md border-2 ${
                                    index === currentIndex
                                      ? "border-blue-500"
                                      : "border-transparent"
                                  }`}
                                  onClick={() => setCurrentIndex(index)}
                                >
                                  <div className="relative h-20 lg:w-28 w-20">
                                    <Image
                                      src={image.src}
                                      alt={image.alt}
                                      fill
                                      style={{ objectFit: "cover" }}
                                      sizes="(max-width: 768px) 50vw, 150px"
                                    />
                                  </div>
                                </div>
                              ))}

                              <div
                                onClick={() => handleleft(images.length)}
                                className="rounded-full flex justify-center items-center  absolute top-8 -left-4 cursor-pointer select-none z-20"
                              >
                                {/* <Image
                                  src={AllImages.right}
                                  alt="right"
                                  width={0}
                                  height={0}
                                  className=""
                                /> */}
                                <FaChevronLeft />
                              </div>
                              <div
                                onClick={() => handleRight(images.length)}
                                className="rounded-full flex justify-center items-center absolute top-8 -right-4 cursor-pointer select-none z-20"
                              >
                                {/* <Image
                                  src={AllImages.left}
                                  alt="left"
                                  width={0}
                                  height={0}
                                /> */}
                                <FaChevronRight />
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="col-span-7">
                        <SingleCarInfo car={car} />
                      </section>
                    </main>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsForSale;
