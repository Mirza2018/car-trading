"use client"
import Deal from '@/components/DealerComponents/ListingsPage/Deal';
import React, { useState } from 'react';

const ListingsPage = () => {
  const [isDeal, setIsDeal] = useState(true);
  return (
    <div className="container mx-auto min-h-screen border-2 border-secondary-color rounded-md my-20">
      {/* <div className="flex justify-center items-center text-2xl font-bold  gap-3 bg-base-color w-fit mx-auto border border-secondary-color rounded mt-10">
        <button
          onClick={() => setIsDeal(true)}
          className={`px-20 rounded  ${
            isDeal
              ? "text-white bg-highlight-color transition-all delay-100 ease-in-out animate-bounce"
              : ""
          }`}
        >
          Deal
        </button>
        <button
          onClick={() => setIsDeal(false)}
          className={`px-20 rounded  ${
            isDeal
              ? ""
              : "text-white bg-highlight-color transition-all delay-100 ease-in-out animate-bounce"
          }`}
        >
          Listing
        </button>
      </div> */}
          {/* {isDeal ? <Deal /> : <Listing />} */}
          <Deal/>
    </div>
  );
};

export default ListingsPage;