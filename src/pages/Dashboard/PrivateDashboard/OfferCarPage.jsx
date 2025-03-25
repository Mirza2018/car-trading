"use client"
import SingleOfferCarComponent from '@/components/DashboardComponents/OfferCarPage/SingleOfferCarComponent';
import React from "react";

const OfferCarPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <SingleOfferCarComponent/>
            <SingleOfferCarComponent/>
            <SingleOfferCarComponent/>

    </div>
  );
};

export default OfferCarPage;
