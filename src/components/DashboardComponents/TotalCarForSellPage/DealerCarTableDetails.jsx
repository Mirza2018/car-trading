import React from "react";

const DealerCarTableDetails = ({ car }) => {
  const date = new Date(car?.inspectionDate).toDateString();
  return (
    <>
      <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-7 gap-y-2">
        {car?.noOfKmDriven && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Driven Km:</p>
            <p>{car?.noOfKmDriven} Km</p>
          </div>
        )}
        {car?.noOfVarnishField && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Varnish Field:</p>
            <p>{car?.noOfVarnishField} </p>
          </div>
        )}
        {car?.additionalEquipment && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Additional Equipment</p>
            <p>
              {car?.additionalEquipment.map((p) => (
                <>{p}, </>
              ))}
            </p>
          </div>
        )}
        {car?.condition && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Condition:</p>
            <p>{car?.condition} </p>
          </div>
        )}
        {car?.carCategory && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Category:</p>
            <p>{car?.carCategory} </p>
          </div>
        )}

        {car?.registrationNumber && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Registration Number:</p>
            <p>{car?.registrationNumber} </p>
          </div>
        )}

        {/* {car?.milage != 0 && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Milage:</p>
            <p>{car?.milage} </p>
          </div>
        )} */}
        {car?.chassisNumber && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Chassis Number:</p>
            <p>{car?.chassisNumber} </p>
          </div>
        )}
        {car?.inspectionDate != 0 && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Inspection Date:</p>
            <p>{date} </p>
          </div>
        )}

        {car?.carModel?.brand && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Brand:</p>
            <p>{car?.carModel?.brand} </p>
          </div>
        )}
        {car?.carModel?.model ? (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Model:</p>
            <p>{car?.carModel?.model} </p>
          </div>
        ) : (
          ""
        )}
        {car?.carModel?.modelYear ? (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Model Year:</p>
            <p>{car?.carModel?.modelYear} </p>
          </div>
        ) : (
          ""
        )}
        {car?.carModel?.variant && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Variant:</p>
            <p>{car?.carModel?.variant} </p>
          </div>
        )}
        {car?.carModel?.color && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Color:</p>
            <p>{car?.carModel?.color} </p>
          </div>
        )}
        {car?.carModel?.fuelType != 0 && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>FuelType:</p>
            <p>{car?.carModel?.fuelType} </p>
          </div>
        )}
        {car?.carModel?.fuelConsumption && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Fuel Consumption:</p>
            <p>{car?.carModel?.fuelConsumption} </p>
          </div>
        )}
        {car?.carModel?.euroStandard ? (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Euro Standard:</p>
            <p>Yes </p>
          </div>
        ) : (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Euro Standard:</p>
            <p>No</p>
          </div>
        )}
        {car?.carModel?.numberPlates && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Number Plates:</p>
            <p>{car?.carModel?.numberPlates} </p>
          </div>
        )}
        {car?.comment && (
          <div className="flex justify-between border-b border-text-light-color">
            <p>Comment:</p>
            <p>{car?.comment} </p>
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

export default DealerCarTableDetails;
