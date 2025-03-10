import React from "react";

const CarTableDetails = ({ car }) => {
  return (
    <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 gap-0">
      <section className="flex flex-col gap-2">
        <div className="flex justify-between border-b border-text-light-color">
          <p>Brand</p>
          <p>Audi</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Variant</p>
          <p>Allure Sky</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Gearbox</p>
          <p>Manual</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel Type</p>
          <p>Petrol</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Engine Performance</p>
          <p>96 kW / 131 HP</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>CO2 Emissions</p>
          <p>120 g</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Color</p>
          <p>Black</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Registration Number</p>
          <p>BX40437</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Registration Number</p>
          <p>Audi</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>VAT</p>
          <p>Including VAT</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>
            Can the car brake, use the handbrake, drive, and reverse on an auto
            transporter?
          </p>
          <p>yes</p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between border-b border-text-light-color">
          <p>Model</p>
          <p>308</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Category</p>
          <p>SUV</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mileage</p>
          <p>68,500 km</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Engine Size</p>
          <p>1.2L</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel Consumption</p>
          <p>5.2 L/100km</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>EURO Standard</p>
          <p>Euro VI</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>First Registration Date</p>
          <p>19/03/2018</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Chassis Number</p>
          <p>VF3LRHNSPJS092227</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Tax</p>
          <p>Including Taxes</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Inspection Date</p>
          <p>20/03/2024</p>
        </div>
      </section>
    </main>
  );
};

export default CarTableDetails;
