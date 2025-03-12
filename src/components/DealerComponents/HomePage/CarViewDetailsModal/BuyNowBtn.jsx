import { Button, Modal } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const BuyNowBtn = ({ price }) => {
  const [isBuy, setIsBuy] = useState(false);
  return (
    <React.Fragment>
      <button
        onClick={() => setIsBuy(true)}
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className="bg-highlight-color text-white  font-semibold py-2  px-11 rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-start w-fit "
      >
        <p className="text-[10px] ">Buy Now :</p>
        <p>{price}</p>
      </button>

      <Modal open={isBuy} onCancel={() => setIsBuy(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Are You Sure You Buy this Car?
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
          <Link href={`/final-note`}>
            <Button
              // onClick={deleteSingleCategory}
              className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
              type="primary"
            >
              yes
            </Button>
          </Link>
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default BuyNowBtn;
