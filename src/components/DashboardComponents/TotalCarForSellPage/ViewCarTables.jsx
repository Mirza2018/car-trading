/* eslint-disable react/prop-types */
import { AllImages } from "@/assets/AllImages";
import SingleCarInfo from "@/components/DealerComponents/HomePage/SingleCarInfo/SingleCarInfo";
import { Button, ConfigProvider,  Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ViewCarTables = ({
  isServiceUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  //   (open = { isServiceUserViewModalVisible });
  // onCancel = { handleCancel };

  const images = [
    { src: AllImages.car, alt: "Car 1" },
    { src: AllImages.bids, alt: "Car 2" },
    { src: AllImages.car, alt: "Car 3" },
    { src: AllImages.car, alt: "Car 4" },
  ];
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

  

  const car = {
    buyNowPrice: "7,000 EUR",
    model: "Honda CR-V",
    edition: "PHEV - LUXURY",
    currentBids: 15,
    priceInDKK: "33,000 .kr",
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
  };
  return (
    <Modal
      title="Modal responsive width"
      centered
      open={isServiceUserViewModalVisible}
      // onOk={() => setOpenResponsive(false)}
      onCancel={handleCancel}
      width={1500}
      footer={[
        <div key="footerButton" className="flex justify-end ">
          <button
            onClick={handleCancel}
            style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
            className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap"
          >
            Close
          </button>
        </div>,
      ]}
    >
      <div>
        <main className="grid grid-cols-12 gap-4">
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
                      <div className="relative h-20 w-28">
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
  );
};

export default ViewCarTables;
