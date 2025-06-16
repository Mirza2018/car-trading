
import Navbar from "@/components/Share/Navber";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative">
      <div className="sticky top-0  z-50 ">
        <Navbar />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default DashboardLayout;
