import { useBidCreateMutation } from "@/redux/api/features/carDealer";
import { Button, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "sonner";

const MakeABidBtn = ({ carid }) => {
  const [bidCreate] = useBidCreateMutation();
  const [bidOpen, setBidOpen] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [isBid, setIsBid] = useState(false);
  const [valueOfBid, setValueOfBid] = useState(false);
  const bidRef = useRef(null);

  const bidValue = () => {
    // console.log(bidRef.current.input.value);
    setValueOfBid(bidRef.current.input.value);
    setBidOpen(false);
    setIsBuy(true);
  };

  const submitBid = async () => {
    const toastId = toast.loading("Bud indsendes…");

    const data = {
      carId: carid,
      bidAmount: valueOfBid,
    };
    // console.log(valueOfBid);
    if (valueOfBid < 0) {
      toast.error("Buddet kan ikke være et negativt beløb", {
        id: toastId,
        duration: 2000,
      });
      return setIsBuy(false);
    }

    try {
      const res = await bidCreate(data).unwrap();
      console.log(res);
      toast.success("Dit bud er indsendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      setIsBuy(false);
      setIsBid(true);
    } catch (error) {
      console.log(error);
      toast.error(
        "Der er et problem med at indsende buddet, prøv venligst senere",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  const suffix = (
    <p className="cursor-pointer">
      <AiOutlineSend
        onClick={bidValue}
        className={`text-2xl  text-highlight-color`}
      />
    </p>
  );

  return (
    <React.Fragment>
      <button
        disabled={isBid}
        onClick={() => setBidOpen(!bidOpen)}
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className={`   font-medium  py-2 rounded-lg  cursor-pointer  hover:animate-pulse text-white whitespace-nowrap md:w-44 w-36 ${
          isBid ? "bg-[#00721E]" : "bg-highlight-color "
        }`}
      >
        Giv et bud
      </button>
      {bidOpen && (
        <Input
          required
          type="number"
          className="!bg-[#FFDFB8] md:w-44 w-36 transition-all"
          name="bid"
          ref={bidRef}
          placeholder="Indtast budpris"
          suffix={suffix}
          size="large"
        />
      )}

      <Modal open={isBuy} onCancel={() => setIsBuy(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Er du sikker på at du vil købe denne bil?
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
            Nej
          </Button>
          {/* <Link href={`/final-note`}> */}
          <Button
            onClick={submitBid}
            className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
            type="primary"
          >
            Ja
          </Button>
          {/* </Link> */}
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default MakeABidBtn;
