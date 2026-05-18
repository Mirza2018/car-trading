import React from "react";
import { toast } from "sonner";

const BidCar = ({ bids, bidCarAction }) => {
  console.log(bids);

  const acceptOffer = async () => {
    const toastId = toast.loading("Tilbud accepteres…");
    const data = {
      bidCarId: bids._id,
      status: "accepted",
      carId: bids.carId,
    };

    console.log(data);

    try {
      const res = await bidCarAction(data).unwrap();
      console.log(res);
      toast.success("Tilbud accepteret succesfuldt", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at acceptere tilbuddet", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const rejectOffer = async () => {
    const toastId = toast.loading("Tilbud afvises…");
    const data = {
      bidCarId: bids._id,
      status: "rejected",
    };
    console.log(data);

    // return;
    try {
      const res = await bidCarAction(data).unwrap();
      console.log(res);
      toast.success("Tilbud afvist succesfuldt", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at afvise tilbuddet", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="rounded-lg border border-highlight-color p-6 flex justify-between items-center my-5 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 md:flex-row flex-col gap-4">
      <div className="flex flex-col gap-4 text-white">
        <h1 className="text-2xl font-bold">Car: {bids?.carName}</h1>
        <h1 className="text-xl font-medium opacity-90">
          Højeste bud:{" "}
          <span className="font-semibold text-yellow-400">
            {bids.bidAmount} .kr
          </span>
        </h1>
      </div>
      <div className="flex gap-5">
        <button
          onClick={acceptOffer}
          className="bg-green-500 text-white rounded-lg px-4 py-3 font-medium transition-transform transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-sm md:text-base"
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Acceptere
          </span>
        </button>
        <button
          onClick={rejectOffer}
          className="bg-red-500 text-white rounded-lg px-4 py-3 font-medium transition-transform transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 text-sm md:text-base"
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Afvise
          </span>
        </button>
      </div>
    </div>
  );
};

export default BidCar;
