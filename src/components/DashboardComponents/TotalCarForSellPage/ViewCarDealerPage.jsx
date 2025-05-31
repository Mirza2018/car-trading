import { Modal } from "antd";


import ImageSlider from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ImageSlider";
import DealerAllCarDetails from "./DealerAllCarDetails";

const ViewCarDealerPage = ({
  setOpenResponsive,
  openResponsive,
  car,

}) => {
  const date = new Date(car?.carModel?.updatedAt).toDateString();
  // console.log("sdasdasd", car);

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
            <ImageSlider carImages={car?.carModel?.images} />
          </section>
          {/* Right Side */}
          <section className="col-span-7">
            {/* Top portion  */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex  justify-start items-center  font-bold text-base">
                {/* <IoMdLink className="rotate-90" /> */}
                Listed:<p> {date}</p>
              </div>
              {/* <div className=" font-bold text-base">Feb.03 13:06:18</div> */}
              {/* {car?.maxBidAmount ? (
                <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
                  <h1 className="text-xl font-bold px-1">
                    {car?.maxBidAmount} DKK
                  </h1>
                  <p className=" text-center text-sm">
                    Maximum price <br /> achieved
                  </p>
                </div>
              ) : (
                <div className="bg-base-color border border-secondary-color rounded-full aspect-square flex flex-col justify-center items-center px-2">
                  <p className=" text-center text-sm p-4">
                    No bids
                    <br /> achieved
                  </p>
                </div>
              )} */}

 
            </div>
            {/* Middel part car All Details */}
            <DealerAllCarDetails car={car} />
          </section>
        </main>
        ;
      </div>
    </Modal>
  );
};

export default ViewCarDealerPage;
