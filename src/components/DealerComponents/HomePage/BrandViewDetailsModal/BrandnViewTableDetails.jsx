import React from "react";

const BrandnViewTableDetails = ({ car }) => {
  console.log(car);

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-7 gap-y-2 w-full">
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

      {car?.fuel && car?.fuel.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Fuel:</p>
          <p>
            {car.fuel.map((p, index) => (
              <span key={index}>
                {p}
                {index < car.fuel.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {car?.gearType && car?.gearType.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>GearType:</p>
          <p>
            {car.gearType.map((p, index) => (
              <span key={index}>
                {p}
                {index < car.gearType.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {car?.models && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models:</p>
          <p>{car?.models} </p>
        </div>
      )}
      {car?.drivenKmTo > 0 && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Driven Km:</p>
          <p>
            {car?.drivenKmFrom}-{car?.drivenKmTo} Km:
          </p>
        </div>
      )}
      {car?.modelsFrom > 0 && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Models Year:</p>
          <p>
            {car?.modelsFrom}-{car?.modelsTo}{" "}
          </p>
        </div>
      )}

      {car?.color && car?.color.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Color:</p>
          <p>
            {car.color.map((p, index) => (
              <span key={index}>
                {p}
                {index < car.color.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {car?.trailerHitch && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>TrailerHitch:</p>
          <p>{car?.trailerHitch} </p>
        </div>
      )}
      {console.log(car?.color)}
      {car?.exterior && car?.exterior.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Exterior:</p>
          <p>
            {car.exterior.map((p, index) => (
              <span key={index}>
                {p}
                {index < car.exterior.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}
      {car?.interior && car?.interior.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Interior:</p>
          <p>
            {car.interior.map((p, index) => (
              <span key={index}>
                {p}
                {index < car.interior.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {car?.companyName && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Company Name :</p>
          <p>{car?.companyName}</p>
        </div>
      )}
      {car?.cvrNumber && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>CVR Number :</p>
          <p>{car?.cvrNumber}</p>
        </div>
      )}
      {car?.city && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>City:</p>
          <p>{car?.city.split(",")[0]}</p>
        </div>
      )}
      {car?.postalCode && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Postal Code:</p>
          <p>{car?.postalCode} </p>
        </div>
      )}
    </main>
  );
};

export default BrandnViewTableDetails;
