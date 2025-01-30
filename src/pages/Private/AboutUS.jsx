import AboutUsIntro from "@/components/Private/AboutUsPage/AboutUsIntro";
import Reviews from "@/components/Private/AboutUsPage/Reviews";
import FairPriceCard from "@/components/Private/HomePage/FairPriceCard";
import FairPriceFooter from "@/components/Private/HomePage/FairPriceFooter";
import WhyChooseUS from "@/components/Private/HomePage/WhyChooseUS";
import React from "react";

const AboutUS = () => {
  return (
    <div>
      <AboutUsIntro />
      <WhyChooseUS />
      <FairPriceCard />
      <FairPriceFooter />
      <Reviews />
    </div>
  );
};

export default AboutUS;
