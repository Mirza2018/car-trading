import { Avatar, Modal } from "antd";
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
        <div
          key="footerButton"
          className="flex justify-end gap-10  md:pe-32 pe-12 "
        >
          {sendOffer && (
            <div>
              <Link href={`/offer-car/${car?._id}`}>
                <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  Send tilbud
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setOpenResponsive(false)}
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
          >
            Luk
          </button>
        </div>,
      ]}
    >
      <div>
        <main className="md:grid grid-cols-12  gap-4">
          {/* Left Side */}
          <section className="col-span-5  flex justify-center items-center">
            {/* <ImageSlider /> */}
            {/* <div className="text-4xl font-bold flex justify-center items-center md:!w-52 w-32 uppercase bg-secondary-color py-10 px-5 rounded-xl md:mb-0 mb-4 ">
              {car?.mark}
            </div> */}
            {car?.brandImage ? (
              <React.Fragment>
                <Image
                  shape="square"
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="font-medium object-contain w-96 aspect-square"
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
                  size={200}
                >
                  {car?.mark}
                </Avatar>
              </React.Fragment>
            )}
          </section>
          {/* Right Side */}
          <section className="col-span-7 flex justify-center items-center w-full">
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
