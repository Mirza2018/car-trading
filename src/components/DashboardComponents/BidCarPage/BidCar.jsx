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
    <div className="rounded-lg border border-highlight-color p-7 flex justify-between my-5">
      <div className="flex gap-7 flex-col">
        <h1 className="text-lg font-semibold">
          Car: {bids?.carName} 
        </h1>
        <h1 className="text-lg font-semibold">
          Highest Bid: {bids.bidAmount} .kr
        </h1>
      </div>
      <div className="flex gap-3 h-fit ">
        <>
          <button
            onClick={acceptOffer}
            className="bg-[#00721E] text-white rounded-md px-2 py-1 font-medium"
          >
            Accept
          </button>
          <button
            onClick={rejectOffer}
            className="bg-[#DC3545] text-white rounded-md px-2 py-1 font-medium"
          >
            Reject
          </button>
        </>
      </div>
    </div>
  );
};

export default BidCar;
