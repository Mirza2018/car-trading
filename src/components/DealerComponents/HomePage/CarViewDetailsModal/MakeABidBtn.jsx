import { Input } from "antd";
import React, { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const MakeABidBtn = () => {
  const [bidOpen, setBidOpen] = useState(false);
  const bidRef = useRef(null);

  const bidValue = () => {
    console.log(bidRef.current.input.value);
    setBidOpen(false);
  };
  const suffix = (
    <p onClick={bidValue} className="cursor-pointer">
      <AiOutlineSend className="text-2xl text-highlight-color" />
    </p>
  );
  console.log(bidRef);
  return (
    <React.Fragment>
      <button
        onClick={() => setBidOpen(!bidOpen)}
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className="bg-highlight-color text-white  font-medium  py-2  px-4 rounded-lg  cursor-pointer  hover:animate-pulse whitespace-nowrap w-fit"
      >
        Make An Bid Price
      </button>
      {bidOpen && (
        <Input
          type="number"
          className="!bg-[#FFDFB8] !w-[160px] transition-all"
          name="bid"
          ref={bidRef}
          placeholder="input bid price"
          suffix={suffix}
          size="large"
        />
      )}
    </React.Fragment>
  );
};

export default MakeABidBtn;
