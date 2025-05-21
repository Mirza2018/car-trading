import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import DealerCarTableDetails from "./DealerCarTableDetails";

const DealerAllCarDetails = ({ car }) => {
  return (
    <div className="my-5">
      <p className="text-2xl font-semibold">{car?.model}</p>
      {/* <div className="flex gap-4 justify-between my-5 flex-wrap">
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

      <div className="flex gap-4 justify-between my-5 flex-wrap">
        {car?.car?.noOfKmDriven && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.speed}
              className=""
            />
            <p className="text-sm font-normal">{car?.car?.noOfKmDriven} Km</p>
          </div>
        )}

        {car?.car?.firstRegistrationDate && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.calender}
              className=""
            />
            <p className="text-sm font-normal">
              {car?.car?.firstRegistrationDate}
            </p>
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
              {car?.company?.city} ({car?.company?.postCode})
            </p>
          </div>
        )}

        {car?.car?.carCategory && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.suv}
              className=""
            />
            <p className="text-sm font-normal">{car?.car?.carCategory}</p>
          </div>
        )}
      </div>
      {/* <div className="text-base font-medium flex flex-wrap gap-3  select-none mb-5">
          <p className="cursor-pointer">Primary Data</p>
          <p className="cursor-pointer">Information</p>
          <p className="cursor-pointer">Equipment</p>
          <p className="cursor-pointer">Classification</p>
          <p className="cursor-pointer">Services</p>
          <p className="cursor-pointer">Seller</p>
        </div> */}
      <DealerCarTableDetails car={car} />
    </div>
  );
};

export default DealerAllCarDetails;
