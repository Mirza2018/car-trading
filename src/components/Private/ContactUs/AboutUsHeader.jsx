import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const AboutUsHeader = () => {
  return (
    <div>

    <div className="container mx-auto p-8 bg-gray-50 rounded-lg ">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
        OM OS
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Vi er to brødre med 24 års erfaring
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Vi er to brødre, der har været en del af bilbranchen siden 2001 og
          dermed har over 24 års erfaring. Gennem årene har vi arbejdet med køb,
          salg, import og eksport af biler og har opbygget en solid forståelse
          for bilmarkedet – både set fra den private sælgers og bilforhandlerens
          side.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          UDFORDRINGEN I MARKEDET
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Når en privat skal sælge sin bil, er processen ofte besværlig og
          uoverskuelig. Der er mange henvendelser, usikker prissætning,
          prøveture med fremmede og ofte flere mellemled, som presser prisen.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Samtidig ser vi i branchen, at biler ofte sælges til én forhandler,
          som efterfølgende sender bilen videre på auktion, hvor andre
          forhandlere igen skal tjene på bilen. Det skaber mange led, højere
          omkostninger og dårligere vilkår for både den private og den
          forhandler, der i sidste ende køber bilen.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          VORES LØSNING
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          På baggrund af denne indsigt har vi udviklet engrobasen – en platform
          skabt med det formål at gøre det nemt, professionelt og gennemsigtigt
          for private at sælge deres bil, samtidig med at bilforhandlere får
          direkte adgang til biler uden unødige mellemled.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Hos engrobasen sælger private direkte til professionelle
          bilforhandlere. Flere forhandlere kan byde på bilen, og salget sker
          til den højeste pris, uden at bilen først skal videre gennem flere
          led.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Det betyder, at den private opnår en skarp og fair pris, mens
          forhandleren kan købe bilen til en fornuftig markedspris.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          EN FAIR FORRETNINGSMODEL
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          For private er brugen af engrobasen helt gratis. Vi opkræver
          udelukkende et salær fra bilforhandlerne, og kun når en handel
          gennemføres. Der er ingen skjulte gebyrer og ingen omkostninger for
          private sælgere.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Vi samarbejder udelukkende med professionelle bilforhandlere, hvilket
          sikrer en seriøs og tryg handel for alle parter.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          VORES DRIVKRAFT
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Vores mål er at skabe en mere enkel, gennemsigtig og fair måde at
          handle biler på – til gavn for både private og bilforhandlere.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Vi er to brødre med benzin i blodet, som brænder for bilbranchen og
          for at gøre op med ineffektive processer og unødige mellemled.
          Engrobasen er skabt ud fra praksis og mange års erfaring – ikke teori.
        </p>
      </div>

     
      </div>
    
    
    </div>
  );
};

export default AboutUsHeader;
