import { Collapse } from "antd";
import React from "react";
import "./faq.css"; // Opret denne fil (se længere nede)

const FaqLists = () => {
  const items = [
    {
      key: "15",
      label: "Hvorfor vælge Engrosbasen?",
      children: (
        <div className="faq-content">
          <p>
            Hos Engrosbasen handler du udelukkende med professionelle
            bilforhandlere.
          </p>
          <p>
            Vi er stiftet af to brødre med over 24 års erfaring i bilbranchen og
            har arbejdet med køb, salg, import og eksport af biler.
          </p>
          <p>
            Vi har skabt Engrosbasen for at gøre bilsalg nemmere, mere
            gennemsigtigt og uden unødige mellemled.
          </p>
          <p>
            Du undgår useriøse henvendelser, fremvisninger og spildtid og
            modtager i stedet bud direkte fra forhandlere i hele landet.
          </p>
          <p>Det er gratis for dig – forhandleren betaler.</p>
        </div>
      ),
    },
    {
      key: "11",
      label: "Er det gratis at bruge Engrosbasen?",
      children: (
        <div className="faq-content">
          <p>
            Ja. Det er 100% gratis og uforpligtende at sælge din bil og oprette
            en købsannonce.
          </p>
        </div>
      ),
    },
    {
      key: "5",
      label: "Er der skjulte gebyrer?",
      children: (
        <div className="faq-content">
          <p>Nej. Du betaler ingen gebyrer.</p>
          <p>Forhandleren betaler et fast salær ved gennemført handel.</p>
        </div>
      ),
    },

    {
      key: "3",
      label: "Hvordan foregår salget?",
      children: (
        <div className="faq-content">
          <li>
            Du opretter din bil, beskriver den og uploader billeder.
            {/* <a
                href="https://engrosbasen.dk/"
                className="text-blue-600 hover:underline"
              >
                {" "}
                nummerpladeformularen her{""}
              </a> */}
          </li>
          <li>Herefter kan forhandlere byde eller købe bilen direkte.</li>
          <li>
            Når du accepterer et bud eller sælger via “køb nu”, aftaler du
            afhentning direkte med forhandleren.
          </li>
          <li>Du har mulighed for at oprette en slutseddel via Engrosbasen.</li>
        </div>
      ),
    },

    {
      key: "6",
      label: "Hvordan fungerer bud og køb nu?",
      children: (
        <div className="faq-content">
          <p>
            Forhandlere kan byde eller købe bilen direkte til din mindstepris.
          </p>
          <p>Ved “køb nu” er handlen bindende med det samme.</p>
          <p>
            Din mindstepris bør derfor være et niveau, du er klar til at sælge
            bilen for.
          </p>
        </div>
      ),
    },
    {
      key: "7",
      label: "Hvem bestemmer prisen på min bil?",
      children: (
        <div className="faq-content">
          <p>Du sætter selv din mindstepris.</p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Hvad kan jeg få for min bil?",
      children: (
        <div className="faq-content">
          <p>
            Prisen afhænger af bilens stand, årgang, udstyr og efterspørgsel.
          </p>
          <p>Det er vigtigt, at du beskriver bilen så nøjagtigt som muligt.</p>
          <p>
            Husk at inkludere alt ekstraudstyr – både fabriksmonteret og
            eftermonteret.
          </p>
          <p>
            Upload gerne billeder og angiv korrekt udstyrsvariant, da
            nummerpladen ikke altid viser alle oplysninger.
          </p>
        </div>
      ),
    },
    {
      key: "8",
      label: "Hvornår får jeg pengene?",
      children: (
        <div className="faq-content">
          <p>
            Du modtager betalingen som straksoverførsel direkte til din konto.
          </p>
          <p>
            Du må først udlevere bilen, når pengene er registreret på din konto.
          </p>
        </div>
      ),
    },
    {
      key: "9",
      label: "Hvad med betaling og sikkerhed?",
      children: (
        <div className="faq-content">
          <p>Du må aldrig udlevere bilen uden betaling.</p>
          <p>
            En kvittering er ikke nok – pengene skal være synlige på din konto.
          </p>
        </div>
      ),
    },
    {
      key: "1",
      label: "Kan jeg fortryde en handel?",
      children: (
        <div className="faq-content">
          <p>
            Ja, du har mulighed for at fortryde en handel, indtil forhandleren
            har påbegyndt afhentning af bilen.
          </p>
          <p>Ved annullering opkræves et gebyr på 149 kr. inkl. moms.</p>
          <p>
            Handlen kan ikke annulleres, hvis forhandleren er på vej eller står
            ved bilen.
          </p>
        </div>
      ),
    },
    {
      key: "10",
      label: "Kan jeg ændre eller fjerne min annonce?",
      children: (
        <div className="faq-content">
          <p>Ja, så længe der ikke er afgivet bud eller gennemført et køb.</p>
        </div>
      ),
    },

    {
      key: "12",
      label: "Kan jeg have min bil til salg andre steder samtidig?",
      children: (
        <div className="faq-content">
          <p>Ja, men det anbefales at holde din annonce opdateret.</p>
          <p>Hvis bilen bliver solgt via Engrosbasen, er handlen bindende.</p>
          <p>
            Hvis bilen sælges andetsteds, skal du kontakte os hurtigst muligt på
            info@engrosbasen.dk.
          </p>
        </div>
      ),
    },
    {
      key: "13",
      label: "Hvor hurtigt skal handlen gennemføres?",
      children: (
        <div className="faq-content">
          <p>Handlen skal gennemføres inden for 2–5 hverdage.</p>
        </div>
      ),
    },
    {
      key: "22",
      label: "Skal jeg selv aflevere bilen, eller bliver den afhentet?",
      children: (
        <div className="faq-content">
          <p>Det aftales mellem dig og forhandleren.</p>
        </div>
      ),
    },
    {
      key: "14",
      label: "Hvad hvis forhandleren ikke køber bilen efter besigtigelse?",
      children: (
        <div className="faq-content">
          <p>
            Hvis bilen ikke svarer til beskrivelsen, kan forhandleren foreslå
            prisnedslag eller afstå fra handlen.
          </p>
        </div>
      ),
    },
    {
      key: "4",
      label: "Hvem har ansvaret efter salg?",
      children: (
        <div className="faq-content">
          <p>
            Når betalingen er modtaget, og bilen er afhentet, overgår ansvaret
            til forhandleren.
          </p>
        </div>
      ),
    },

    {
      key: "16",
      label: "Hvem står for afmelding af bilen?",
      children: (
        <div className="faq-content">
          <p>
            Forhandleren har op til 4 hverdage til at afmelde eller ejerskifte
            bilen.
          </p>
          <p>Indtil da er bilen dækket af din forsikring.</p>
          <p>
            Når bilen bliver afmeldt, stopper både forsikring og vægtafgift
            automatisk.
          </p>
          <p>
            Hvis afmelding ikke sker, skal du kontakte forhandleren og bede om
            kvittering.
          </p>
        </div>
      ),
    },
    {
      key: "17",
      label: "Hvem må oprette en annonce?",
      children: (
        <div className="faq-content">
          <p>
            Det er vigtigt, at det er ejeren af bilen, der opretter annoncen.
          </p>
          <p>
            Du skal have råderet over bilen og være berettiget til at sælge den.
          </p>

          <p>Betalingen skal ske direkte til ejeren af bilen.</p>
        </div>
      ),
    },
  ];
  const items2 = [
    {
      key: "1",
      label: "Hvordan fungerer det at oprette en købsannonce?",
      children: (
        <div className="faq-content">
          <p>
            Du kan gratis oprette en købsannonce, hvor du beskriver den bil, du
            søger.
          </p>
          <p>Forhandlere kan herefter kontakte dig med relevante tilbud.</p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Forhandlere kan herefter kontakte dig med relevante tilbud.",
      children: (
        <div className="faq-content">
          <p>Ja.</p>
          <p>
            Mange forhandlere har biler på lager, som endnu ikke er annonceret,
            eller som er på vej ind eller under klargøring.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Koster det noget at oprette en købsannonce?",
      children: (
        <div className="faq-content">
          <p>Nej. Det er gratis og uforpligtende.</p>
        </div>
      ),
    },
  ];
  const items3 = [
    {
      key: "1",
      label: "Hvordan behandler I mine oplysninger?",
      children: (
        <div className="faq-content">
          <p>
            Dine oplysninger bruges kun til at formidle kontakt mellem dig og
            forhandlere.
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Hæfter jeg efter salget?",
      children: (
        <div className="faq-content">
          <p>
            Nej, så længe du har handlet i god tro og ikke har undladt
            væsentlige oplysninger.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Koster det noget at oprette en købsannonce?",
      children: (
        <div className="faq-content">
          <p>Vi sætter stor pris på din feedback.</p>
          <p>
            Du er altid velkommen til at kontakte os på info@engrosbasen.dk.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="faq-section">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-4">
          Ofte stillede spørgsmål – Engrosbasen.dk
        </h1>
        <h2 className="text-xl md:text-2xl text-center text-gray-600 mb-10">
          Klik på spørgsmålet for at læse svaret
        </h2>

        <h3 className="text-2xl md:text-3xl font-bold  mb-8 text-blue-700 ">
          🔵 FAQ – ENGROSBASEN
        </h3>
        <Collapse
          items={items}
          bordered={false}
          accordion
          className="faq-collapse"
          expandIconPosition="end"
        />
        <h3 className="text-2xl md:text-3xl font-bold  my-8 text-blue-700 ">
          🔵 KØB AF BIL
        </h3>
        <Collapse
          items={items2}
          bordered={false}
          accordion
          className="faq-collapse"
          expandIconPosition="end"
        />
        <h3 className="text-2xl md:text-3xl font-bold  my-8 text-blue-700 ">
          🔵 ØVRIGT
        </h3>
        <Collapse
          items={items3}
          bordered={false}
          accordion
          className="faq-collapse"
          expandIconPosition="end"
        />
      </div>
    </div>
  );
};

export default FaqLists;
