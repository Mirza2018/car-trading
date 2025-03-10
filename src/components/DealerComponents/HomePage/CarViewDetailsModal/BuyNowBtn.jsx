import React from 'react';

const BuyNowBtn = ({price}) => {
    return (
      <button
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className="bg-highlight-color text-white  font-semibold py-2  px-11 rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-start w-fit "
      >
        <p className="text-[10px] ">Buy Now :</p>
        <p>{price}</p>
      </button>
    );
};

export default BuyNowBtn;