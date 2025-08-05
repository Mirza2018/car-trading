import { AllImages } from "@/assets/AllImages";
import { LuMoveUpRight } from "react-icons/lu";


import Image from "next/image";
import React from "react";

const FairPriceCard = () => {
  return (
    <div className="container mx-auto flex my-14 gap-5 lg:flex-row flex-col">
      <div>
        <Image
          alt="car"
          src={AllImages.fairPriceCar}
          className="aspect-auto object-cover rounded-lg"
        />
      </div>
      <div className="bg-[#F3F9FB] text-gray-800 p-10 max-w-4xl mx-auto  rounded-lg">
        <h1 className="text-2xl font-bold">Få en fair pris for din bil</h1>
        <h2 className="text-xl font-bold text-gray-700 mt-2">
          Sælg til os i dag
        </h2>
        <p className="mt-4">
          Vi er forpligtede til at give vores kunder en enestående service,
          konkurrencedygtige priser og et bredt udvalg af muligheder.
        </p>
        <div className="pl-5 mt-4">
          <p className="flex justify-start items-center gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            Vi er Storbritanniens største leverandør med flere patruljer flere
            steder.
          </p>
          <p className="flex justify-start items-center  gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            Du får vejhjælp døgnet rundt (24/7).
          </p>
          <p className="flex justify-start items-center  gap-2">
            <Image src={AllImages.check} alt=" " width={0} height={0} />
            Vi reparerer 4 ud af 5 biler ved vejkanten.
          </p>
        </div>
        <button className="mt-6 bg-highlight-color text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f29524] transition-colors whitespace-nowrap w-fit flex justify-between items-center gap-2">
          Kom i gang
          <LuMoveUpRight />
        </button>
      </div>
    </div>
  );
};

export default FairPriceCard;
