import { AllImages } from '@/assets/AllImages';
import Image from 'next/image';
import React from 'react';
import OfferCarTable from './OfferCarTable';

const OfferCarDetails = ({offerCar,car}) => {
    return (
      <div className="my-5">
        <p className="text-2xl font-semibold mb-5">
          {offerCar.mark} {offerCar?.model}
        </p>
        {/* <div className="flex gap-4 justify-between mb-5 flex-wrap">
          <div className=" flex gap-2 ">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.speed}
              className=""
            />
            <p className="text-sm font-normal">{car?.kilometers}</p>
          </div>
          <div className=" flex gap-2">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.calender}
              className=""
            />
            <p className="text-sm font-normal">{car?.serviceDate}</p>
          </div>
          <div className=" flex gap-2">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.map}
              className=""
            />
            <p className="text-sm font-normal">{car?.postalCode}</p>
          </div>
          <div className=" flex gap-2">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.suv}
              className=""
            />
            <p className="text-sm font-normal">{car?.vehicleType}</p>
          </div>
        </div> */}

        <OfferCarTable car={car} offerCar={offerCar} />
      </div>
    );
};

export default OfferCarDetails;