import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import AboutUsHeader from "../ContactUs/AboutUsHeader";

export default function AboutUsIntro() {
  return (
    <main className="container mx-auto">
      {/* Header */}
      <AboutUsHeader />

      <div className="grid md:grid-cols-6 grid-cols-3 gap-4 my-14 max-w-xl mx-auto">
        {/* First Column for the text "45 Years in Business" */}
        <div className="grid grid-rows-2 md:col-span-2 sm:col-span-1 col-span-3  gap-4">
          <div className="bg-secondary-color flex justify-center items-center flex-col rounded-xl text-center">
            <p className="text-5xl font-medium text-white">24</p>
            <p className="text-2xl font-bold text-white">År i branchen</p>
          </div>
          <Image
            src={AllImages.about1}
            alt="Overrækkelse af bilnøgler"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Second Column for the main image of the man in the showroom */}
        {/* <div className="md:col-span-4 sm:col-span-2 col-span-3">
          <Image
            src={AllImages.about2}
            alt="Biludstilling"
            className="w-full h-full object-cover rounded-xl"
          />
        </div> */}

        {/* Third Column for smaller images */}
        <div className="grid grid-rows-3 md:col-span-4 col-span-3  gap-4">
          <div className="row-span-2">
            <Image
              src={AllImages.about3}
              alt="Showroom"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={AllImages.about4}
              alt="Overrækkelse af bilnøgler"
              className="w-full h-full object-cover rounded-xl"
            />
            <Image
              src={AllImages.about5}
              alt="Håndtryk"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
