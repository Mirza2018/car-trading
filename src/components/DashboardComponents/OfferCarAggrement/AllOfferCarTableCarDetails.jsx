import React from "react";

const AllOfferCarTableCarDetails = ({ car }) => {
  const date = new Date(car?.inspectionDate).toDateString();
  return (
    <>
      <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-7 gap-y-2">
        {car?.DrivenKm && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Kørte km:</p>
            <p>{car?.DrivenKm} Km</p>
          </div>
        )}
        {/* {car?.noOfVarnishField && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Varnish Field:</p>
            <p>{car?.noOfVarnishField} </p>
          </div>
        )} */}
        {car?.mark && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Mærke:</p>
            <p>{car?.mark} </p>
          </div>
        )}
        {car?.model && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Model</p>
            <p>{car?.model} </p>
          </div>
        )}
        {car?.carCondition && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Bilens stand</p>
            <p>{car?.carCondition} </p>
          </div>
        )}

        {car?.fuel && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Brændstof</p>
            <p>
              {car?.fuel.map((p) => (
                <>{p}, </>
              ))}
            </p>
          </div>
        )}

        {car?.gearType && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Gearingstype</p>
            <p>
              {car?.gearType.map((p) => (
                <>{p}, </>
              ))}
            </p>
          </div>
        )}
        {car?.color && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Farve:</p>
            <p>{car?.color} </p>
          </div>
        )}
        {/* {car?.DrivenKm && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Driven Km:</p>
            <p>{car?.DrivenKm} </p>
          </div>
        )} */}

        {car?.carLicensePlateNumber && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Nummerplade:</p>
            <p>{car?.carLicensePlateNumber} </p>
          </div>
        )}

        {/* <section className="flex flex-col gap-2">
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
              Can the car brake, use the handbrake, drive, and reverse on an
              auto transporter?
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
    </>
  );
};

export default AllOfferCarTableCarDetails;
