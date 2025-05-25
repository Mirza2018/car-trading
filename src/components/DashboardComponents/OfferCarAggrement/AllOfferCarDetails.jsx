import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import AllOfferCarTableCarDetails from "./AllOfferCarTableCarDetails";

const AllOfferCarDetails = ({ car }) => {
  return (
    <div className="my-5">
      <p className="text-2xl font-semibold">{car?.model}</p>

      {/* <pre>{JSON.stringify(car,null,2)}</pre> */}
      <div className="flex gap-4 justify-between my-5 flex-wrap">
        {car?.DrivenKm && (
          <div className=" flex gap-2 justify-start items-center flex-wrap">
            <Image
              alt="speed"
              width={0}
              height={0}
              src={AllImages.speed}
              className=""
            />
            <p className="text-sm font-normal">{car?.DrivenKm} Km</p>
          </div>
        )}
        {/* 
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
        )} */}

        {/* {car?.company?.postCode && (
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
        )} */}

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
      {/* <div className="text-base font-medium flex flex-wrap gap-3  select-none mb-5">
          <p className="cursor-pointer">Primary Data</p>
          <p className="cursor-pointer">Information</p>
          <p className="cursor-pointer">Equipment</p>
          <p className="cursor-pointer">Classification</p>
          <p className="cursor-pointer">Services</p>
          <p className="cursor-pointer">Seller</p>
        </div> */}
      <AllOfferCarTableCarDetails car={car} />
    </div>
  );
};

export default AllOfferCarDetails;
