import { Button, Input, Modal } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const MakeABidBtn = () => {
  const [bidOpen, setBidOpen] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const bidRef = useRef(null);

  const bidValue = () => {
    console.log(bidRef.current.input.value);
    setBidOpen(false);
    setIsBuy(true)
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
          required
          type="number"
          className="!bg-[#FFDFB8] !w-[160px] transition-all"
          name="bid"
          ref={bidRef}
          placeholder="input bid price"
          suffix={suffix}
          size="large"
        />
      )}

      <Modal open={isBuy} onCancel={() => setIsBuy(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Are You Sure You Bid this Car?
        </h1>
        <section className="flex justify-center items-center ">
          <Button
            className="text-xl py-5 px-8 !text-black !bg-base-color border border-secondary-color"
            type="primary"
            onClick={() => setIsBuy(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            No
          </Button>
          {/* <Link href={`/final-note`}> */}
          <Button
            onClick={() => setIsBuy(false)}
            className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
            type="primary"
          >
            yes
          </Button>
          {/* </Link> */}
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default MakeABidBtn;
