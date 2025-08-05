import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const WhyChooseUS = () => {
  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">Hvorfor vælge os?</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1 my-7 container mx-auto gap-5">
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f1} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Særlige finansieringstilbud</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Vores stressfri finansieringsafdeling kan finde økonomiske
            løsninger, der sparer dig penge.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f2} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Pålideligt bilforhandler</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Vores stressfri finansieringsafdeling kan finde økonomiske
            løsninger, der sparer dig penge.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f3} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Gennemsigtige priser</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Vores stressfri finansieringsafdeling kan finde økonomiske
            løsninger, der sparer dig penge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUS;
