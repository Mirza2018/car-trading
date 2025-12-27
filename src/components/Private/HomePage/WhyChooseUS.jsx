import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const WhyChooseUS = () => {
  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">
        Hvorfor vælge engrobasen?
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1 my-7 container mx-auto gap-5">
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f1} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">
            Gratis at sætte bilen til salg
          </h1>
          <p className="text-[15px] font-normal max-w-xs">
            Det er helt gratis for private at oprette og sætte deres bil til
            salg. Ingen annoncegebyrer og ingen salær.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f2} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">
            Flere forhandlere &ndash; bedre pris
          </h1>
          <p className="text-[15px] font-normal max-w-xs">
            Din bil vises for flere professionelle bilforhandlere på samme tid,
            så der skabes reel konkurrence.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f3} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">
            Forhandlere konkurrerer om bilen
          </h1>
          <p className="text-[15px] font-normal max-w-xs">
            Forhandlere konkurrerer om bilen
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1 my-7 container mx-auto gap-5">
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f1} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Flere bud – højeste vinder</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Du er ikke låst til én forhandler. Flere forhandlere kan byde – det
            højeste bud vinder.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f2} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Ingen private fremvisninger</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Du slipper for fremmede, prøveture og tidskrævende fremvisninger.
            Det er kun en professionel forhandler, der køber bilen.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Image src={AllImages.f3} alt="logo" width={0} height={0} />
          <h1 className="text-2xl font-medium">Trygt og overskueligt salg</h1>
          <p className="text-[15px] font-normal max-w-xs">
            Når bilen er solgt, sker handlen direkte med en forhandler. Det gør
            salget hurtigt, enkelt og trygt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUS;
