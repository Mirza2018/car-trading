import React from "react";

const BrandnViewTableDetails = ({ car }) => {
  console.log(car);
  
  return (
    <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-7 gap-y-2">
      {/* <pre>{ JSON.stringify(car,null,2)}</pre> */}
      {car?.carCategory && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Category:</p>
          <p>{car?.carCategory}</p>
        </div>
      )}
      {car?.mark && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mark:</p>
          <p>{car?.mark}</p>
        </div>
      )}
      {car?.model && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Model:</p>
          <p>{car?.model}</p>
        </div>
      )}
      {car?.cashPrice && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Cash Price:</p>
          <p>{car?.cashPrice} DKK</p>
        </div>
      )}
      {car?.priceType && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>priceType</p>
          {car?.priceType.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      )}
      {car?.carCondition && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Condition:</p>
          <p>{car?.carCondition} </p>
        </div>
      )}
      {car?.models && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models:</p>
          <p>{car?.models} </p>
        </div>
      )}
      {car?.fuel && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel</p>
          <p>
            {car?.fuel.map((p) => (
              <>{p}, </>
            ))}
          </p>
        </div>
      )}
      {car?.gearType && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>GearType</p>
          <p>
            {car?.gearType.map((p) => (
              <>{p}, </>
            ))}
          </p>
        </div>
      )}
      {car?.models && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models:</p>
          <p>{car?.models} </p>
        </div>
      )}
      {car?.drivenKmFrom && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Driven Km:</p>
          <p>
            {car?.drivenKmFrom}-{car?.drivenKmTo}{" "}
          </p>
        </div>
      )}
      {car?.modelsFrom && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models Year:</p>
          <p>
            {car?.modelsFrom}-{car?.modelsTo}{" "}
          </p>
        </div>
      )}

      {car?.color && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Color:</p>
          {/* <p>{car?.color}</p> */}

          <p>
            {car?.color.map((p) => (
              <>{p}, </>
            ))}
          </p>
        </div>
      )}
      {car?.trailerHitch && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>TrailerHitch:</p>
          <p>{car?.trailerHitch} </p>
        </div>
      )}
      {car?.exterior && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Exterior:</p>
          {/* <p>{car?.exterior} </p> */}
          <p>
            {car?.exterior.map((p) => (
              <>{p}, </>
            ))}
          </p>
        </div>
      )}
      {car?.interior && (
        <div className="flex justify-between border-b border-text-light-color gap-3">
          <p>Interior:</p>
          {/* <p>{car?.interior} </p> */}
          <p>
            {car?.interior.map((p) => (
              <>{p}, </>
            ))}
          </p>
        </div>
      )}
      {car?.city && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>City:</p>
          <p>{car?.city} </p>
        </div>
      )}
      {car?.postalCode && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Postal Code:</p>
          <p>{car?.postalCode} </p>
        </div>
      )}
      {/* <section className="flex flex-col gap-2">
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Category</p>
          <p>SUV</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Model</p>
          <p>308</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mileage</p>
          <p>68,500 km</p>
        </div>

        <div className="flex justify-between border-b border-text-light-color">
          <p>Max Price</p>
          <p>30.0000</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Price Type</p>
          <p>cash Price/Cars without tax</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Car Type</p>
          <p>New Used</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel Type</p>
          <p>Petrol</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Gearbox</p>
          <p>Manual</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Driven-KM</p>
          <p>0-30000KM</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Exterior</p>
          <p>LED Headlights</p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mark</p>
          <p>Audi</p>
        </div>

        <div className="flex justify-between border-b border-text-light-color">
          <p>Car For</p>
          <p>Company</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Company Name</p>
          <p>STA</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>CVR Number</p>
          <p>123456789</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>First Name</p>
          <p>Takibul</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Last Name</p>
          <p>Hasan</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Postal Code</p>
          <p>123456</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>City</p>
          <p>Dhaka</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Phone Number</p>
          <p>012345-678910</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Color</p>
          <p>ALL</p>
        </div>
        <div className="flex justify-between border-b border-text-light-color">
          <p>Interior</p>
          <p>Seat Heating</p>
        </div>
      </section> */}
    </main>
  );
};

export default BrandnViewTableDetails;
