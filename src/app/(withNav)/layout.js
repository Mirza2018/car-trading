
import Footer from "@/components/Share/Foooter";
import Navbar from "@/components/Share/Navber";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0  z-50 ">
        <Navbar />
      </div>
      {children}
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
