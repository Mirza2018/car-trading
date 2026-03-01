import React from "react";

const PrisstrukturDealer = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg ">
      <h1 className="text-center text-4xl font-bold  mb-8">
        PRISSTRUKTUR FOR FORHANDLERE
      </h1>
      <h2 className="text-xl text-gray-700 font-semibold mb-4">
        engrosbasen anvender en ensartet og gennemsigtig salærmodel.
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Salær opkræves udelukkende ved gennemført handel, uanset om du som
        forhandler køber en bil fra en privat sælger eller sælger en bil til en
        privat kunde via platformen.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Salæret er identisk for køb og salg, og der er ingen faste gebyrer,
        abonnementer eller binding.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Når en handel er gennemført, fremsendes en ordrebekræftelse pr. mail, og
        handlen registreres under “Mine biler”.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Herefter aftales den endelige overdragelse direkte mellem forhandler og
        privat kunde.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Der udsendes en samlet månedlig afregning, hvor alle gennemførte handler
        og tilhørende salærer fremgår.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Alle beløb er angivet ekskl. moms.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        SALÆR VED GENNEMFØRT HANDEL
      </h2>

      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-6 text-left">Bilens handelspris</th>
            <th className="py-3 px-6 text-left">Salær</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-6 text-left">DKK 0 – 9.999</td>
            <td className="py-3 px-6 text-left">DKK 750</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-6 text-left">DKK 10.000 – 24.999</td>
            <td className="py-3 px-6 text-left">DKK 1.500</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-6 text-left">DKK 25.000 – 49.999</td>
            <td className="py-3 px-6 text-left">DKK 2.500</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-6 text-left">DKK 50.000 – 99.999</td>
            <td className="py-3 px-6 text-left">DKK 3.000</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-6 text-left">DKK 100.000 og opefter</td>
            <td className="py-3 px-6 text-left">DKK 4.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrisstrukturDealer;

