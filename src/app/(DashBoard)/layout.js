
import DashboardSlider from "@/components/Share/DashboardSlider";
import Navbar from "@/components/Share/Navber";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative">
      <div className="sticky top-0  z-50 ">
        <Navbar />
      </div>
      <div className="relative">
        <DashboardSlider>{children}</DashboardSlider>
      </div>
    </div>
  );
};

export default DashboardLayout;
