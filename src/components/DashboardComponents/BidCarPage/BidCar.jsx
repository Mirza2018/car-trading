import React from "react";

const BidCar = ({ bids }) => {
  return (
    <div className="rounded-lg border border-highlight-color p-7 flex justify-between my-5">
      <div className="flex gap-7 flex-col">
        <h1 className="text-lg font-semibold">Car:{bids.car}</h1>
        <h1 className="text-lg font-semibold">
          Highest Bid: {bids.bid ? ` $${bids.highestBid}` : "No Bid"}
        </h1>
      </div>
      <div className="flex gap-3 h-fit ">
        {bids.bid ? (
          <>
            <button className="bg-[#00721E] text-white rounded-md px-2 py-1 font-medium">
              Accept
            </button>
            <button className="bg-[#DC3545] text-white rounded-md px-2 py-1 font-medium">
              Reject
            </button>
          </>
        ) : (
          <button
            className="bg-[#FF991C] text-white rounded-md px-2 py-1 
          font-medium"
          >
            No Bids
          </button>
        )}
      </div>
    </div>
  );
};

export default BidCar;
