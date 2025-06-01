"use client";
import SubmitListing from "@/components/Private/SubmitListingPage/SubmitListing";
import React, { useState } from "react";

const SubmitListingPage = () => {
  return (
    <div className="mx-auto container min-h-screen border-2 border-secondary-color rounded-md my-20">
      <div className="flex justify-center items-center text-2xl font-bold  gap-3 bg-base-color border border-secondary-color rounded max-w-[1200px] md:mx-20 mx-4 my-10">
        <button
          className={` rounded w-full  text-white bg-highlight-color m-1`}
        >
          Deal
        </button>
      </div>
      <SubmitListing />
    </div>
  );
};

export default SubmitListingPage;
