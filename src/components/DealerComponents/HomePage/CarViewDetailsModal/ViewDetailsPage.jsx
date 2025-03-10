import { Modal } from "antd";
import React from "react";
import ImageSlider from "./ImageSlider";
import { IoMdLink } from "react-icons/io";
import BuyNowBtn from "./BuyNowBtn";
import MakeABidBtn from "./MakeABidBtn";
import CarAllDetails from "./CarAllDetails";
import Link from "next/link";

const ViewDetailsPage = ({
  setOpenResponsive,
  openResponsive,
  car,
  sendOffer,
}) => {
  return (
    <Modal
      // title="Modal responsive width"
      centered
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
          <section className="col-span-5">
            <ImageSlider />
          </section>
          {/* Right Side */}
          <section className="col-span-7">
            {/* Top portion  */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
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

              {sendOffer && (
                <div className="flex flex-col gap-3 ">
                  <h1>Incl. VAT / Incl. Reg.</h1>

                  {/* <button
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-semibold py-2  px-11 rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-start w-fit "
                >
                  <p className="text-[10px] ">Buy Now :</p>
                  <p>{car?.buyNowPrice}</p>
                </button> */}
                  <Link href={`/offer-car/007`}>
                    <BuyNowBtn price={car?.buyNowPrice} />
                  </Link>

                  <MakeABidBtn />
                  {/* <button
                  onClick={() => setBidOpen(!bidOpen)}
                  style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
                  className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap w-fit"
                >
                  Make An Bid Price
                </button>

                {bidOpen && (
                  <Input
                    type="number"
                    className="!bg-[#FFDFB8] !w-[160px] transition-all"
                    name="bid"
                    ref={bidRef}
                    placeholder="input bid price"
                    suffix={suffix}
                    size="large"
                  />
                )} */}
                </div>
              )}
            </div>
            {/* Middel part car All Details */}
            <CarAllDetails car={car} />
          </section>
        </main>
      </div>
    </Modal>
  );
};

export default ViewDetailsPage;
