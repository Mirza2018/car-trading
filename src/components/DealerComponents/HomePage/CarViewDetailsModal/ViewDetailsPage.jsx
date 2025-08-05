import { Avatar, Modal } from "antd";
import React from "react";
import ImageSlider from "./ImageSlider";
import { IoMdLink } from "react-icons/io";
import BuyNowBtn from "./BuyNowBtn";
import MakeABidBtn from "./MakeABidBtn";
import CarAllDetails from "./CarAllDetails";
import Link from "next/link";
import DealerAllCarDetails from "@/components/DashboardComponents/TotalCarForSellPage/DealerAllCarDetails";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";

const ViewDetailsPage = ({
  setOpenResponsive,
  openResponsive,
  car,
  sendOffer,
  buyNow,
}) => {
  const date = new Date(car?.createdAt).toDateString();
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
              <Link href={`/offer-car/007`}>
                <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
                >
                  Send tilbud
                </button>
              </Link>
            </>
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
          <section className="col-span-5">
            {car?.carModel?.images[0] ? (
              <ImageSlider carImages={car?.carModel?.images} />
            ) : (
              <div className="flex justify-center items-center  h-full">
                <Image
                  alt=""
                  src={AllImages.biludenbilleder}
                  width={400}
                  height={400}
                  className="aspect-square rounded-md"
                />
              </div>
            )}
          </section>
          {/* Right Side */}
          <section className="col-span-7">
            {/* Top portion  */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex  justify-start items-center  font-bold text-base">
                {/* <IoMdLink className="rotate-90" /> */}
                Opført:<p> {date}</p>
              </div>
            </div>
            {/* Middel part car All Details */}
            <DealerAllCarDetails car={car} />
          </section>
        </main>
      </div>
    </Modal>
  );
};

export default ViewDetailsPage;
