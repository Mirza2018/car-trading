import React from "react";

const BrandnViewTableDetails = ({ car }) => {
  // console.log(car);

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-7 gap-y-2 w-full">
      {/* <pre>{ JSON.stringify(car,null,2)}</pre> */}
      {car?.carCategory && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Bilkategori:</p>
          <p>{car?.carCategory}</p>
        </div>
      )}
      {car?.mark && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Mærke:</p>
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
          <p>Kontantpris:</p>
          <p>{car?.cashPrice} DKK</p>
        </div>
      )}
      {car?.priceType && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Pristype</p>
          {car?.priceType.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      )}
      {car?.carCondition && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Bilens tilstand:</p>
          <p>{car?.carCondition} </p>
        </div>
      )}
      {car?.models && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Modeller:</p>
          <p>{car?.models} </p>
        </div>
      )}

      {car?.fuel && car?.fuel.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Brændstof:</p>
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
          <p>Gearingstype:</p>
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
          <p>Modeller:</p>
          <p>{car?.models} </p>
        </div>
      )}
      {car?.drivenKmTo > 0 && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Kørte kilometer:</p>
          <p>
            {car?.drivenKmFrom}-{car?.drivenKmTo} Km:
          </p>
        </div>
      )}
      {car?.modelsFrom > 0 && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Modelår:</p>
          <p>
            {car?.modelsFrom}-{car?.modelsTo}{" "}
          </p>
        </div>
      )}

      {car?.color && car?.color.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Farve:</p>
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
          <p>Trailertræk:</p>
          <p>{car?.trailerHitch} </p>
        </div>
      )}
      {console.log(car?.color)}
      {car?.exterior && car?.exterior.length > 0 ? (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Udvendig:</p>
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
          <p>Indvendig:</p>
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
          <p>Firmanavn :</p>
          <p>{car?.companyName}</p>
        </div>
      )}
      {car?.cvrNumber && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>CVR-nummer:</p>
          <p>{car?.cvrNumber}</p>
        </div>
      )}
      {car?.city && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>By:</p>
          <p>{car?.city.split(",")[0]}</p>
        </div>
      )}
      {car?.postalCode && (
        <div className="flex justify-between border-b border-text-light-color">
          <p>Postnummer:</p>
          <p>{car?.postalCode} </p>
        </div>
      )}
    </main>
  );
};

export default BrandnViewTableDetails;
