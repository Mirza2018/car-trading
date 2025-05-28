import { Button, Modal } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const BuyNowBtn = ({ price, carId, buyCar }) => {
  const [isBuy, setIsBuy] = useState(false);
  const [isCongrat, setIsCongrat] = useState(false);

  const buyCarHandle = async () => {
    const toastId = toast.loading("You buying a car...");
    const data = {
      carId: carId,
    };
    console.log(data);

    try {
      const res = await buyCar(data).unwrap();
      console.log(res);
      toast.success("You successfully buy a car", {
        id: toastId,
        duration: 2000,
      });

      setIsCongrat(true);
      setIsBuy(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          "There is an problem to buy car, please try letter",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setIsBuy(true)}
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className="bg-highlight-color text-white  font-semibold py-1  rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-center w-44"
      >
        <div className="text-start">

        <p className="text-[10px] text-start">Buy Now :</p>
        <p>{price} .kr</p>
        </div>
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

          <Button
            onClick={buyCarHandle}
            className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
            type="primary"
          >
            yes
          </Button>
        </section>
      </Modal>

      <Modal open={isCongrat} onCancel={() => setIsCongrat(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Congratulations on Your Purchase!
        </h1>
        <p className="font-medium text-center mx-20 mb-5">
          Your car has been successfully purchased. Thank you for the deal!! you
          can find your car in “Total Buy Car“
        </p>
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
          <Link href={`/dashboard/total-dealer-car-sell`}>
            <Button
              // onClick={deleteSingleCategory}
              className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
              type="primary"
            >
              Go to Buy Car
            </Button>
          </Link>
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default BuyNowBtn;
