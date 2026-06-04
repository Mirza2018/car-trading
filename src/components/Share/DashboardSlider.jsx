"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardSlider = ({ children }) => {
  const [slider, setSlider] = useState(false);
  return (
    <div className="grid grid-cols-12 relative">
      <div
        className={`${
          slider ? "fixed   lg:w-full w-3/4 sm:w-1/2" : "col-span-1 "
        } lg:relative lg:col-start-1 lg:col-end-4 xl:col-end-3 z-40`}
      >
        <div className="sticky top-[70px] md:top-[90px] lg:top-[110px] xl:top-[100px]">
          <Sidebar slider={slider} setSlider={setSlider} />
        </div>
      </div>
      {/* //*2nd grid */}
      <div
        className={`${
          slider ? "col-span-12" : "md:col-span-11 col-span-12"
        }  lg:col-span-9 xl:col-span-10 min-h-screen w-[95%] mx-auto mt-5`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardSlider;
