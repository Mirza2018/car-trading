import React from 'react';

const PrivatePolicy = () => {
    return (
      <div className="container mx-auto p-8 bg-gray-50 rounded-lg">
        <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
          PRIVATLIVSPOLITIK & COOKIEPOLITIK FOR engrosbasen
        </h1>

        <div className="mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            Hos engrosbasen tager vi beskyttelsen af dine personoplysninger
            alvorligt. Denne privatlivs- og cookiepolitik forklarer, hvordan vi
            indsamler, bruger og beskytter dine oplysninger, når du anvender
            vores platform.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dataansvarlig
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Engrosbasen ApS
            <br />
            CVR-nr.: 44013142 <br />
            Ellehammersvej 2A <br />
            7100 Vejle, Danmark <br />
            E-mail:{" "}
            <a
              href="mailto:info@engrosbasen.dk"
              className="text-blue-600 underline"
            >
              info@engrosbasen.dk
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hvilke oplysninger indsamler vi?
          </h2>
          <ul className="list-disc ml-6 text-lg text-gray-600 leading-relaxed">
            <li>Navn, telefonnummer og e-mailadresse</li>
            <li>Adresse og postnummer</li>
            <li>
              Oplysninger om bilen (nummerplade, model, årgang, kilometerstand)
            </li>
            <li>Tekniske oplysninger som IP-adresse og browseroplysninger</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hvad bruger vi oplysningerne til?
          </h2>
          <ul className="list-disc ml-6 text-lg text-gray-600 leading-relaxed">
            <li>At oprette og administrere din sag</li>
            <li>At vise bilen eller bilsøgning til bilforhandlere</li>
            <li>At muliggøre bud og tilbud</li>
            <li>At kontakte dig ved spørgsmål</li>
            <li>At forbedre platformen</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Videregivelse af oplysninger
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Oplysninger videregives kun til professionelle bilforhandlere og
            relevante databehandlere. Vi sælger aldrig personoplysninger.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Opbevaring
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Oplysninger opbevares kun så længe det er nødvendigt eller
            lovpligtigt.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dine rettigheder
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Du har ret til indsigt, rettelse, sletning, indsigelse og
            tilbagetrækning af samtykke. Kontakt os på{" "}
            <a
              href="mailto:info@engrosbasen.dk"
              className="text-blue-600 underline"
            >
              info@engrosbasen.dk
            </a>
            .
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vi anvender cookies for funktionalitet og statistik. Du kan slette
            eller blokere cookies via din browser.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Se vejledning på{" "}
            <a
              href="https://minecookies.org/cookiehandtering"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              minecookies.org
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ændringer
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vi forbeholder os retten til at opdatere denne politik. Den gældende
            version vil altid være tilgængelig på hjemmesiden.
          </p>
        </div>
      </div>
    );
};

export default PrivatePolicy;