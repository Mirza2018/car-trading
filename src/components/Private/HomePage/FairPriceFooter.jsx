import React from 'react';

const FairPriceFooter = () => {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-col-1 container mx-auto gap-5">
        
        <div className="flex  flex-col items-center">
          <h1 className="text-[38px] font-bold">836M</h1>
          <p className="text-[15px] font-bold">CARS FOR </p>
          <p className="text-[15px] font-bold mt-9">SALE</p>
        </div>
        <div className="flex  flex-col items-center">
          <h1 className="text-[38px] font-bold">738M</h1>
          <p className="text-[15px] font-bold">DEALER </p>
          <p className="text-[15px] font-bold mt-9">REVIEWS </p>
        </div>
        <div className="flex  flex-col items-center">
          <h1 className="text-[38px] font-bold">100M</h1>
          <p className="text-[15px] font-bold">VISITORS PER </p>
          <p className="text-[15px] font-bold mt-9">DAY</p>
        </div>
        <div className="flex  flex-col items-center">
          <h1 className="text-[38px] font-bold">238M</h1>
          <p className="text-[15px] font-bold">VERIFIED </p>
          <p className="text-[15px] font-bold mt-9">DEALERS</p>
        </div>
      </div>
    );
};

export default FairPriceFooter;