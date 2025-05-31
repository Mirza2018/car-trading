import React from "react";

const OfferCarTable = ({ offerCar }) => {
  return (
    //   <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 gap-0">
    <main className="flex flex-col lg:grid lg:grid-cols-2 gap-x-7 gap-y-2">
      {offerCar?.carCategory && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Category</p>
          <p>{offerCar?.carCategory}</p>
        </div>
      )}

      {offerCar?.mark && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mark</p>
          <p>{offerCar?.mark}</p>
        </div>
      )}
      {offerCar?.model && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Model</p>
          <p>{offerCar?.model}</p>
        </div>
      )}
      {offerCar?.cashPrice && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Cash Price</p>
          <p>{offerCar?.cashPrice}</p>
        </div>
      )}
      {offerCar?.priceType && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Price Type</p>
          {offerCar?.priceType.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      )}

      {offerCar?.carCondition && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Condition</p>
          <p>{offerCar?.carCondition}</p>
        </div>
      )}

      {offerCar?.models && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models</p>
          <p>{offerCar?.models}</p>
        </div>
      )}

      {offerCar?.fuel && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel</p>
          {offerCar?.fuel.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      )}
      {offerCar?.gearType && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>GearType</p>
          {offerCar?.gearType.map((p,index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      )}

      {offerCar?.modelsYear && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models Year</p>
          <p>{offerCar?.modelsYear}</p>
        </div>
      )}
      {offerCar?.status && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Status</p>
          <p>{offerCar?.status}</p>
        </div>
      )}

      {/*           
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
      </section> */}
    </main>
  );
};

export default OfferCarTable;
