"use client";
import Deal from "@/components/DealerComponents/ListingsPage/Deal";
import Listings from "@/components/DealerComponents/ListingsPage/Listings";
import React, { useState } from "react";

const ListingsPage = () => {
  const [isDeal, setIsDeal] = useState(true);
  return (
    <div className="flex justify-center items-center">
      <div className="min-h-screen border-2 border-secondary-color rounded-md md:my-20 my-10 md:mx-10 mx-3 ">
        <Listings />
      </div>
    </div>
  );
};

export default ListingsPage;
