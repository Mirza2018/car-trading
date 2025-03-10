import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = () => {
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
  return (
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
            <Image src={AllImages.left} alt="left" width={0} height={0} />
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
  );
};

export default ImageSlider;
