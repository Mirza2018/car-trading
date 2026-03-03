
import { Collapse } from "antd";
import React from "react";
import "./faq.css"; // Opret denne fil (se længere nede)

const FaqLists = () => {
  const items = [
    {
      key: "15",
      label: "Hvad med restgæld og hæftelse i bilen?",
      children: (
        <div className="faq-content">
          <p>
            Er der restgæld i bilen, og står den som sikkerhed for billånet, kan
            forhandleren slå det op, når han får oplyst bilens nummerplade.
          </p>
          <p>
            Skal forhandleren indfri billånet med en del af købssummen, skal du
            indhente en indfrielsesopgørelse fra finansieringsselskabet eller
            din bank. Så fremsender de en mail med oplysninger om restgælden,
            som du kan sende videre til forhandleren.
          </p>
          <p>
            Accepterer forhandleren bilen, indløses denne restgælden hos
            långiveren senest ved overdragelsen. Om ønsket kan du følge med i
            processen fra forhandlerens mobiltelefon.
          </p>
          <p>
            Ved overdragelsen af bilen udbetaler forhandleren så det eventuelt
            overskydende beløb for handlen som en straksoverførsel til din
            bankkonto.
          </p>
          <p>
            Senest 5 hverdage efter lånets indfrielse modtager du en skriftlig
            aflysning af tinglysningen på pantet i bilen fra Bilbogen. Sker
            dette ikke, skal du kontakte dem, du har taget billånet hos.
          </p>
          <p>
            Du kan også vælge at indfri billånet selv forud for overdragelsen af
            bilen. Og fremvise en kvittering for dette til forhandleren, når du
            overdrager bilen til denne
          </p>
        </div>
      ),
    },
    {
      key: "11",
      label: "Får jeg virkelig bud fra forhandlere over hele landet?",
      children: (
        <div className="faq-content">
          <p>
            Med mere end 17 års erfaring fra bilhandlerbranchen og tilsvarende
            bilauktionstjenester ved vi, hvordan du får mest for din bil. Og
            undgår branchens brodne kar og kedelige karakterer.
          </p>
          <p>
            Med mere end 17 års erfaring fra bilhandlerbranchen og tilsvarende
            bilauktionstjenester ved vi, hvordan du får mest for din bil. Og
            undgår branchens brodne kar og kedelige karakterer.
          </p>
          <p>
            For værdien af din bil afhænger af efterspørgslen – og den kan der
            være stor forskel på, alt efter hvor i landet forhandleren bor.
          </p>
        </div>
      ),
    },
    {
      key: "5",
      label: "Hvad hvis forhandleren ikke vil købe bilen alligevel?",
      children: (
        <div className="faq-content">
          <p>
            Vil forhandleren ikke købe din bil efter at have set den, har vi
            oftest fået flere andre gode bud på bilen. Eller vi kan arbejde
            videre med bilen i en ny budrunde.
          </p>
        </div>
      ),
    },

    {
      key: "3",
      label: "Hvordan foregår salget?",
      children: (
        <div className="faq-content">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Du sætter din bil til salg på Engrosbasen.dk ved at indtaste
              oplysningerne på bilen i
              <a
                href="https://engrosbasen.dk/"
                className="text-blue-600 hover:underline"
              >
                {" "}
                nummerpladeformularen her{""}
              </a>
              . Undervejs bliver du bedt om at beskrive bilen, lægge billeder op
              af den og tilmelde bilen til en budrunde.
            </li>
            <li>
              Nu er din bil sat til salg, og alle landets bilforhandlerne har
              mulighed for at give deres højeste bud på bilen. Ligesom vi aktivt
              afsøger markedet for det højeste bud blandt de forhandlere, der
              erfaringsmæssigt har størst interesse i en bil som din.
            </li>
            <li>
              Når budrunden er forbi, modtager du en mail med det højeste bud,
              der er kommet ind på bilen.
            </li>
            <li>
              Accepterer du buddet, får du og forhandleren hinandens
              kontaktoplysninger. Herefter kan I indgå en købsaftale og aftale
              nærmere omkring afhentning eller aflevering.
            </li>
          </ol>
        </div>
      ),
    },

    {
      key: "6",
      label:
        "Hvordan kan det være gratis for mig at sælge bilen på Engrosbasen.dk?",
      children: (
        <div className="faq-content">
          <p>
            Det er altid fuldstændigt gratis og uforpligtende at sætte din bil
            til salg på Engrosbasen.dk. Den forhandler som køber bilen, betaler
            os et fast kommissionssalær for at formidle handlen.
          </p>
        </div>
      ),
    },
    {
      key: "7",
      label: "Kan jeg også sælge min varebil på Engrosbasen.dk?",
      children: (
        <div className="faq-content">
          <p>
            Hos Engrosbasen.dk kan privatpersoner og virksomheder sælge både
            personbiler og varevogne. Så har din virksomhed en eller flere
            køretøjer, de vil af med, så kontakt gerne
            <a
              href="mailto:info@engrosbasen.dk"
              className="text-blue-600 hover:underline"
            >
              info@engrosbasen.dk
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Hvad kan jeg få for min bil?",
      children: (
        <div className="faq-content">
          <p>
            Prisen på din bil afhænger af bilens stand, årgang, udstyr, og hvor
            i landet du sælger den.
          </p>
          <p>
            Husk at beskrive alt ekstraudstyr på bilen. Både medfødt og
            eftermonteret – f.eks. trækkrog og vinterhjul. Det giver ofte højere
            bud.
          </p>
          <p>
            Husk at beskrive alt ekstraudstyr på bilen. Både medfødt og
            eftermonteret – f.eks. trækkrog og vinterhjul. Det giver ofte højere
            bud.
          </p>
        </div>
      ),
    },
    {
      key: "8",
      label: "Hvordan får jeg den højeste pris for min brugte bil?",
      children: (
        <div className="faq-content">
          <p>
            Den højeste pris for en brugt bil opnås typisk, når flere købere er
            interesserede og konkurrerer om den - i stedet for kun at gå til én
            enkelt.
          </p>
          <p>
            Traditionelt set vil du kunne vælge mellem at sælge privat, bytte
            hos en forhandler, eller bruge en formidlingsplatform. Ved privat
            salg, kan man potentielt få en bedre pris, men det kræver ofte tid,
            forhandling og en vis risiko ift. både betaling og ansvar.
          </p>
          <p>
            Hos Engrosbasen.dk skaber vi konkurrencen om din bil, ved at
            indhente bud fra vores store netværk af forhandlere. Det øger
            sandsynligheden for, at du får den bedst mulige pris for din bil.
          </p>
        </div>
      ),
    },
    {
      key: "9",
      label: "Er det gratis at sælge min bil?",
      children: (
        <div className="faq-content">
          <p>
            Hos Engrosbasen.dk er det 100% gratis at sælge din bil og bruge
            vores platform. Den eneste der betaler for salget, er forhandleren
            der giver et fast salær. Det gør os til en af de få løsninger på
            markedet, hvor du kan sælge din bil helt gratis, og samtidig bevare
            kontrollen.
          </p>
          <p>
            Du forpligter dig ikke til at sælge, og du oplever ingen skjulte
            gebyrer. Vælger du at acceptere et bud, hjælper vi dig med
            overdragelsen, sådan at du får mindst muligt arbejde i processen.
          </p>
        </div>
      ),
    },
    {
      key: "1",
      label: "Hvorfor sælge din bil på Engrosbasen.dk?",
      children: (
        <div className="faq-content">
          <p>
            Engrosbasen.dk er for dig, der ikke gider at være begrænset til ét
            bud, når du skal sælge din bil. Og gerne vil undgå alt det besvær og
            papirarbejde, der er ved et bilsalg.
          </p>
          <p>
            er for dig, der ikke gider at være begrænset til ét bud, når du skal
            sælge din bil. Og gerne vil undgå alt det besvær og papirarbejde,
            der er ved et bilsalg
          </p>
        </div>
      ),
    },
    {
      key: "10",
      label: "Hvordan kan jeg se, hvad min bil er værd?",
      children: (
        <div className="faq-content">
          <p>
            Værdien af din bil afhænger af en række faktorer, herunder mærke,
            model, årgang, kilometerstand, udstyrsniveau, stand og
            markedsforhold. Du kan altid få en idé om bilens værdi ved at
            sammenligne lignende biler på diverse bilbaser.
          </p>
          <p>
            Værdien af din bil afhænger af en række faktorer, herunder mærke,
            model, årgang, kilometerstand, udstyrsniveau, stand og
            markedsforhold. Du kan altid få en idé om bilens værdi ved at
            sammenligne lignende biler på diverse bilbaser.
          </p>
        </div>
      ),
    },

    {
      key: "12",
      label: "Afhenter forhandleren altid bilen hos mig?",
      children: (
        <div className="faq-content">
          <p>
            Når du opretter bilen, vælger du selv, om forhandleren skal afhente
            bilen hos dig. Eller om du afleverer den. Forhandleren kan ikke
            kræve betaling eller nedslag i prisen for at afhente bilen hos dig.
          </p>
        </div>
      ),
    },
    {
      key: "13",
      label: "Hvad skal forhandleren have med, når jeg overdrager bilen?",
      children: (
        <div className="faq-content">
          <p>
            år du overdrager bilen til forhandleren, skal der medfølge
            registreringsattest, nøgler og også gerne instruktionsbog og
            servicebog. Samt eventuelle vinterhjul, tagboks, krog og andet løst
            tilbehør, som er omtalt i salgsbeskrivelsen.
          </p>
        </div>
      ),
    },
    {
      key: "22",
      label: "Hvad sker der efter salget?",
      children: (
        <div className="faq-content">
          <p>
            Efter overdragelsen af bilen til forhandleren har denne 4 hverdage
            til at afmelde eller ejerskifte bilen hos motorregisteret. Indtil
            forhandleren har afmeldt eller ejerskiftet bilen, er den dækket af
            din bilforsikring.
          </p>
          <p>
            Alternativ kan du selv pille pladerne af bilen og aflevere dem til
            nærmeste nummerpladeoperatør. Er du mere tryg ved den løsning, skal
            du huske at orientere forhandleren herom på forhånd, så denne kan
            tage prøveplader med til hjemkørslen.
          </p>
        </div>
      ),
    },
    {
      key: "14",
      label: "Hvad nu, hvis forhandleren får en bøde på vej hjem i bilen?",
      children: (
        <div className="faq-content">
          <p>
            Fra det øjeblik betalingen for bilen er overført som en
            straksoverførsel til din konto, og bilen afhentes, sker al kørsel i
            bilen på forhandlerens ansvar. Skæringstidspunktet er dato og
            klokkeslæt for overførslen af købssummen til din bankkonto. Det
            fremgår af posteringen i din netbank.
          </p>
          <p>
            Altså er det bilforhandleren, der hæfter for bøder og andre
            trafikforseelser, som forhandleren måtte begå på vejen hjem.
            Herunder vanvidskørsel og fartbøder.
          </p>
        </div>
      ),
    },
    {
      key: "4",
      label: "Hvad betyder forbehold for besigtigelse?",
      children: (
        <div className="faq-content">
          <p>
            Når du accepterer buddet, udarbejdes en købsaftale med forbehold for
            besigtigelse. Det betyder, at forhandleren kan ophæve aftalen, hvis
            bilen ikke lever op til beskrivelsen. Eller kræve et nedslag i
            prisen.
          </p>
          <p>
            Samtidig betyder forbeholdet, at du kan nægte at acceptere
            forhandlerens prisnedslag, hvis du ikke ønsker at sælge bilen til en
            lavere pris. Uden at forhandleren kan kræve kompensation for brud på
            aftalen.
          </p>
        </div>
      ),
    },

    {
      key: "16",
      label:
        "Hæfter jeg, hvis forhandleren opdager skjulte fejl og mangler ved bilen, når handlen er gennemført?",
      children: (
        <div className="faq-content">
          <p>
            Nej. Når handlen er gennemført, hæfter du ikke for noget. Så længe
            du har handlet i god tro og ikke bevidst har undladt vigtige
            oplysninger for forhandlerens vurdering af bilen.
          </p>
          <p>
            Nej. Når handlen er gennemført, hæfter du ikke for noget. Så længe
            du har handlet i god tro og ikke bevidst har undladt vigtige
            oplysninger for forhandlerens vurdering af bilen.
          </p>
        </div>
      ),
    },
    {
      key: "17",
      label: "Hvordan behandler I mine personlige oplysninger?",
      children: (
        <div className="faq-content">
          <p>
            Når du sætter din bil til salg på Engrosbasen.dk, får vi oplyst
            informationer om din bil, samt hvor du bor, hvilket telefonnummer du
            har, og hvilken e-mailadresse du kan kontaktes på.
          </p>
          <p>
            Vi bruger udelukkende dine personlige oplysninger til at oplyse den
            bydende forhandler om, hvor i landet bilen står. Og oplyser kun din
            fulde adresse og øvrige kontaktoplysninger til den forhandler, som
            du accepterer et bud fra. Indtil da kender de kun postnummeret på
            din adresse.
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Oplysningerne om din bi </strong>
              bruger vi til at give forhandleren mulighed for at komme med det
              mest kvalificerede bud på bilen.
            </li>
            <li>
              <strong>Din e-mailadresse </strong>
              bruger vi til at sende dig det højeste bud.
            </li>
            <li>
              <strong>Dit telefonnummer </strong>
              bruger vi til at give forhandleren mulighed for at ringe til dig.
            </li>
            <li>
              <strong>Din adresse </strong>
              bruger vi til, at forhandleren kan afhente bilen hos dig.
            </li>{" "}
          </ol>
        </div>
      ),
    },
    {
      key: "18",
      label: "Hvor henvender jeg mig med klager og reklamationer?",
      children: (
        <div className="faq-content">
          <p>
            Du er altid velkommen til at rette henvendelse til os, hvis du er
            utilfreds med forløbet af dit bilsalg eller den eller de
            bilforhandlere, du har været i kontakt med gennem os. Reklamation og
            klager bedes sendt skriftligt pr. mail eller brev til:
          </p>
          <p className="font-semibold">
            engrosbasen ApS
            <br />
            CVR-nr.: 44013142
            <br />
            Ellehammersvej 2A
            <br />
            7100 Vejle
            <br />
            Danmark
            <br />
            E-mail:{" "}
            <a
              href="mailto:info@engrosbasen.dk"
              className="text-blue-600 hover:underline"
            >
              info@engrosbasen.dk
            </a>
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

        <Collapse
          items={items}
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
