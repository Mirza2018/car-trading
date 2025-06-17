import { Modal } from "antd";

import AllOfferCarDetails from "@/components/DashboardComponents/OfferCarAggrement/AllOfferCarDetails";
import ImageSlider from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ImageSlider";
import BrandnViewTableDetails from "@/components/DealerComponents/HomePage/BrandViewDetailsModal/BrandnViewTableDetails";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";

const ViewOfferDealerCarAcceptDetails = ({
  setOpenResponsive,
  openResponsive,
  car,
}) => {
  const date = new Date(car?.createdAt).toDateString();
  console.log("sdasdasd", car);

  return (
    <Modal
      // title="Modal responsive width"
      open={openResponsive}
      onOk={() => setOpenResponsive(false)}
      onCancel={() => setOpenResponsive(false)}
      width={1500}
      footer={[
        <div key="footerButton" className="flex justify-end gap-80">
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
            {car?.carImages.length > 0 ? (
              <ImageSlider carImages={car?.carImages} />
            ) : (
              <div className="flex justify-center items-center py-10">
                <Image
                  src={AllImages.biludenbilleder}
                  className="aspect-square rounded-2xl  "
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
                Listed:<p> {date}</p>
              </div>
            </div>
            {/* Middel part car All Details */}
            <h1 className="text-3xl  font-medium text-center">
              Offer Car Info
            </h1>
            <AllOfferCarDetails car={car} />
            {console.log(car)}
            <h1 className="text-3xl  font-medium text-center py-2">
              Listing Car Info
            </h1>
            <BrandnViewTableDetails car={car?.submitListing} />
          </section>
        </main>
      </div>
    </Modal>
  );
};

export default ViewOfferDealerCarAcceptDetails;
