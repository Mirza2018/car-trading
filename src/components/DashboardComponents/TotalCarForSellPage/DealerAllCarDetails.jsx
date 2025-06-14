import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import DealerCarTableDetails from "./DealerCarTableDetails";

const DealerAllCarDetails = ({ car }) => {
  return (
    <div className="my-5">
      <p className="text-2xl font-semibold">{car?.model}</p>

      {/* <pre>{JSON.stringify(car,null,2)}</pre> */}
      <div className="flex gap-4 justify-between my-5 flex-wrap">
        {car?.noOfKmDriven && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.speed}
              className=""
            />
            <p className="text-sm font-normal">{car?.noOfKmDriven} Km</p>
          </div>
        )}

        {car?.firstRegistrationDate && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.calender}
              className=""
            />
            <p className="text-sm font-normal">{car?.firstRegistrationDate}</p>
          </div>
        )}

        {car?.company?.postCode && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.map}
              className=""
            />
            <p className="text-sm font-normal">
              {car?.company?.city.split(",")[0]} ({car?.company?.postCode})
            </p>
          </div>
        )}

        {car?.carCategory && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.suv}
              className=""
            />
            <p className="text-sm font-normal">{car?.carCategory}</p>
          </div>
        )}
      </div>

      <DealerCarTableDetails car={car} />
    </div>
  );
};

export default DealerAllCarDetails;
