import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export default function AboutUsIntro() {
  return (
    <main className="container mx-auto">
      {/* Header */}
      <h1
        style={{ fontSize: "clamp(20px, 3vw + 1rem ,40px)" }}
        className="font-bold text-gray-900"
      >
        Om os
      </h1>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 mt-12 gap-5">
        <h2
          style={{ fontSize: "clamp(18px, 3vw + 1rem ,38px)" }}
          className="font-bold text-[#050B20] leading-tight max-w-xl"
        >
          Vi værdsætter vores kunder og ønsker, at de får en god oplevelse
        </h2>

        <p className="text-[#050B20] leading-relaxed text-[15px] mx-2">
          Hos Car Trading er vores kunder i centrum for alt, hvad vi gør. Vi er
          forpligtede til at sikre, at de får en problemfri og behagelig
          oplevelse gennem hele rejsen med os. Fra personlig opmærksomhed til
          enestående service stræber vi efter at overgå forventningerne og skabe
          varige indtryk. Din tilfredshed og komfort er vores højeste prioritet,
          og vi arbejder utrætteligt for at levere løsninger, der opfylder dine
          unikke behov. Hos Car Trading er du ikke bare en kunde; du er en del
          af vores fællesskab. Lad os gøre din oplevelse ekstraordinær.
        </p>
      </div>

      <div className="grid md:grid-cols-10 grid-cols-3 gap-4 my-14">
        {/* First Column for the text "45 Years in Business" */}
        <div className="md:col-span-2 sm:col-span-1 col-span-3 grid grid-rows-2 gap-4">
          <div className="bg-secondary-color flex justify-center items-center flex-col rounded-xl">
            <p className="text-5xl font-medium">45</p>
            <p className="text-3xl font-bold">År i branchen</p>
          </div>
          <Image
            src={AllImages.about1}
            alt="Overrækkelse af bilnøgler"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Second Column for the main image of the man in the showroom */}
        <div className="md:col-span-4 sm:col-span-2 col-span-3">
          <Image
            src={AllImages.about2}
            alt="Biludstilling"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Third Column for smaller images */}
        <div className="md:col-span-4 col-span-3 grid grid-rows-3 gap-4">
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
