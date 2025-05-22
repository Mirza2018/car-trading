import { Modal } from "antd";
import React from "react";
// import BuyNowBtn from "./BuyNowBtn";
import Link from "next/link";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import BrandnViewTableDetails from "./BrandnViewTableDetails";
import MakeABidBtn from "../CarViewDetailsModal/MakeABidBtn";
import BuyNowBtn from "../CarViewDetailsModal/BuyNowBtn";

const BrandVIewDetailsPage = ({
  setOpenResponsive,
  openResponsive,
  car,
  sendOffer,
  buyNow,
}) => {
  return (
    <Modal
      // title="Modal responsive width"
      open={openResponsive}
      onOk={() => setOpenResponsive(false)}
      onCancel={() => setOpenResponsive(false)}
      width={1500}
      footer={[
        <div key="footerButton" className="flex justify-end gap-80">
          {sendOffer && (
            <>
              <Link href={`/offer-car/${car?._id}`}>
                <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  Send Offer
                </button>
              </Link>
            </>
          )}

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
          {/* Left Side */}
          <section className="col-span-5  flex justify-center items-center">
            {/* <ImageSlider /> */}
            <div className="text-4xl font-bold flex justify-center items-center !w-52 uppercase bg-secondary-color py-10 px-5 rounded-xl">
                    {/* <Image
                      src={AllImages.brand1}
                      alt="car"
                      width={0}
                      height={0}
                      className="w-44 aspect-square object-cover rounded-lg"
                    /> */}
                    {car?.mark}
                  </div>
          </section>
          {/* Right Side */}
          <section className="col-span-7 flex justify-center items-center">
            {/* Top portion  */}
            {/* <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex  justify-start items-center  font-bold text-base">
                <IoMdLink className="rotate-90" />
                Registration certificate
              </div>
              <div className=" font-bold text-base">Feb.03 13:06:18</div>
              <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
                <h1 className="text-xl font-bold">{car?.priceInDKK}</h1>
                <p className=" text-center text-sm">
                  Minimum price <br /> achieved
                </p>
              </div>
            </div> */}
            {/* Middel part car All Details */}
            {/* <CarAllDetails car={car} /> */}
            <BrandnViewTableDetails car={car} />
            {buyNow && (
              <div className="flex flex-col gap-3 ">
                <h1>Incl. VAT / Incl. Reg.</h1>
                {/* <Link href={`/offer-car/007`}> */}
                <BuyNowBtn price={car?.buyNowPrice} />
                {/* </Link> */}

                <MakeABidBtn />
              </div>
            )}
          </section>
        </main>
      </div>
    </Modal>
  );
};

export default BrandVIewDetailsPage;
