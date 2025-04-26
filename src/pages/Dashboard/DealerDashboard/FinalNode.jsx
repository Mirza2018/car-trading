"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { TiPrinter } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { AllImages } from "@/assets/AllImages";
import { Radio, Space } from "antd";

// Dynamically import SignatureModal with SSR disabled
const SignatureModal = dynamic(
  () => import("@/components/DealerComponents/FinalNote.jsx/SignatureModal"),
  { ssr: false }
);

const FinalNode = () => {
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signature, setSignature] = useState(null);
  const [isValueIncressed, setIsValueIncreased] = useState(false);

  // Access localStorage only on the client side for initial load
  useEffect(() => {
    const storedSignature = localStorage.getItem("signature");
    setSignature(storedSignature);
  }, []);


  // Callback to update signature when saved in the modal
  const handleSignatureSave = (newSignature) => {
    setSignature(newSignature);
  };
  console.log(isValueIncressed);
  

  return (
    <div className="container mx-auto border-2 border-secondary-color rounded-md md:my-20 overflow-x-clip">
      <div className="max-w-[1350px] mx-auto md:my-10 ">
        <h1
          style={{ fontSize: "clamp(20px, 3vw + 1rem ,60px)" }}
          className="font-bold "
        >
          Final note
        </h1>
        <section className="flex flex-col mx-5">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold my-5"
          >
            With
          </h1>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p className="overflow-x-scroll hide-x-scrollbar">
              Model and brand
            </p>
            <p className="overflow-x-scroll hide-x-scrollbar">
              RENAULT, Captur, TCe 90
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Bil type</p>
            <p className="overflow-x-scroll hide-x-scrollbar">Passenger car</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Year</p>
            <p>2017</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Kilometer</p>
            <p>113000</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p className="overflow-x-scroll hide-x-scrollbar">
              Registration number
            </p>
            <p>BZ88778</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Fuel</p>
            <p>Gasoline</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p className="overflow-x-scroll hide-x-scrollbar">
              The condition of the car
            </p>
            <p className="overflow-x-scroll hide-x-scrollbar">
              Can&apos;t drive
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
            <p>Last seen</p>
            <p className="overflow-x-scroll hide-x-scrollbar">
              Godkendt, 12. dec. 2023
            </p>
          </div>
        </section>
        <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 mx-6 my-10 ">
          <section className="flex flex-col">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold mb-3 mt-7"
            >
              Seller
            </h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>First name</p>
              <p>Kasper</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Surname</p>
              <p>Munch Sørensen</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Address</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                Ballevej 26, 7182 Bredsten
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>By</p>
              <p>Bredsten</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Postal code</p>
              <p>7182</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>E-mail</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                kmunchs@hotmail.com
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
              <p>Telephone</p>
              <p className="overflow-x-scroll  hide-x-scrollbar">+4522818334</p>
            </div>
          </section>
          <section className="flex flex-col">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold my-5"
            >
              Buyer
            </h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Company</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                Autoone (Vejle)
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>CVR/VAT</p>
              <p className="overflow-x-scroll hide-x-scrollbar">34464081</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Contact person</p>
              <p className="overflow-x-scroll hide-x-scrollbar">Darin</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Address</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                Ellehammersvej 2
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>By</p>
              <p className="overflow-x-scroll hide-x-scrollbar">Vejle</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Postal code</p>
              <p className="overflow-x-scroll hide-x-scrollbar">7100</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>E-mail</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                bogholderi@autoone.dk
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
              <p>Telephone</p>
              <p className="overflow-x-scroll hide-x-scrollbar">22114444</p>
            </div>
          </section>
        </main>
        <section className="flex flex-col mx-5">
          <div
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color font-bold mb-3 py-3"
          >
            Price
          </div>
          <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <div className="flex justify-between items-center w-full gap-5 flex-wrap">
              <div className="bg-base-color py-2 border border-highlight-color rounded-md flex items-center gap-5 px-5 flex-wrap">
                <h1
                  style={{ fontSize: "clamp(12px, 3vw + 1rem ,18px)" }}
                  className="text-xl font-bold"
                >
                  Purchase amount*
                </h1>
                <p
                  onClick={() => setIsValueIncreased(false)}
                  className={`bg-base-color md:px-8 px-2 py-2 rounded-md flex justify-center items-center gap-2 ${
                    isValueIncressed ? "" : "border border-secondary-color "
                  }`}
                >
                  inkl
                </p>
                <p
                  onClick={() => setIsValueIncreased(true)}
                  className={`bg-base-color md:px-8 px-2 py-2  rounded-md flex justify-center items-center gap-2 ${
                    isValueIncressed ? "border border-secondary-color" : ""
                  }`}
                >
                  moms
                </p>
              </div>
              <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md">
                {isValueIncressed
                  ? `${3000000 + (3000000 * 0.25)} kr.`
                  : "3000000 kr."}
              </p>
            </div>
            <div className="flex justify-between items-center w-full gap-5 flex-wrap">
              <h1>
                The deal is signed and completed before inspection. The buyer
                undertakes to pay the agreed amount upon collection of the car,
                provided that the car is as described.
              </h1>
              <div>
                <FaRegSquareCheck className="text-xl text-highlight-color" />
              </div>
            </div>
            <div className="flex justify-between items-start w-full gap-5  flex-wrap">
              <h1 className="flex-1">
                It has been agreed that the buyer pays a deposit to the seller
                as security for the transaction. The remaining amount is paid
                upon handover of the car. The deposit amounts to DKK
              </h1>
              <p className="bg-base-color px-12 py-2 border border-secondary-color rounded-md">
                0
              </p>
            </div>
            <div className="flex justify-between items-start w-full gap-5  flex-wrap">
              <h1>
                The remaining amount, which is paid out at the time of transfer,
                is
              </h1>
              <p className="bg-base-color px-2 py-2 border border-secondary-color rounded-md ">
                30.000,00 kr.
              </p>
            </div>
            <div className="flex justify-between items-center w-full gap-5">
              <h1>
                *The buyer is obliged to pay the agreed amount at the time of
                transfer.
              </h1>
            </div>
          </div>
        </section>

        <section className="flex flex-col mx-5">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold mb-3 py-3"
          >
            Re-registration/de-registration view
          </h1>
          <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <Radio.Group
              // onChange={onChange}
              // value={value}
              style={{ width: "100%" }}
            >
              <Space
                // className="flex  items-start justify-between  w-full"
                direction="vertical"
              >
                <Radio
                  // className="flex flex-row-reverse justify-between w-full"
                  value={1}
                >
                  Køber omregistrerer/afmelder bilen inden for 4 hverdage*
                </Radio>
                <Radio
                  // className="flex flex-row-reverse justify-between w-full"
                  value={2}
                >
                  Buyer and seller re-register the car together
                </Radio>
                <Radio
                  value={3}
                  // className="flex flex-row-reverse justify-between"
                >
                  The seller deregisters the car and hands over the number
                  plates
                </Radio>
                <Radio
                  value={4}
                  // className="flex flex-row-reverse justify-between"
                >
                  The car is deregistered
                </Radio>
                <Radio
                  value={5}
                  // className="flex flex-row-reverse justify-between"
                >
                  According to Danish legislation, the car must be
                  re-registered/de-registered no later than 4 working days after
                  the transaction
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </section>

        <section className="border rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around gap-9 mx-5 my-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
            <p className="text-base font-medium">Seller Signature</p>
            <p className="text-base font-medium">Kasper Munch Sørensen</p>
            <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
          </div>

          <div className="flex flex-col justify-center gap-2 items-center">
            <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
              {signature ? (
                <Image
                  src={signature}
                  alt="Saved Signature"
                  fill
                  style={{ objectFit: "contain" }}
                  className="absolute"
                />
              ) : (
                <p></p>
              )}
            </div>
            <p className="text-base font-medium">Buyer Signature</p>
            <p className="text-base font-medium">Autoone (Guide)</p>
            <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
          </div>

          <div className="!flex !justify-end !items-end">
            <button className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md text-end h-fit">
              30.000,00 kr.
            </button>
          </div>
        </section>

        <section className="flex justify-between mx-5 flex-wrap gap-5">
          <div className="flex justify-center gap-2 ">
            <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
              <LiaQuestionCircleSolid className="text-xl" />
              Guide
            </button>
            <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
              <Image width={0} height={0} src={AllImages.cross} alt="cross" />
              Reset
            </button>
          </div>
          <div className="flex md:justify-center gap-2 flex-wrap">
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
            >
              Signature
            </button>
            <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
              <Image width={0} height={0} src={AllImages.print} alt="cross" />
              Print
            </button>
            <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
              <Image
                width={0}
                height={0}
                src={AllImages.signature}
                alt="cross"
              />
              Send for signature
            </button>
            <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
              <Image width={0} height={0} src={AllImages.save} alt="cross" />
              Save and send
            </button>
          </div>
          <SignatureModal
            isSignatureModalOpen={isSignatureModalOpen}
            setIsSignatureModalOpen={setIsSignatureModalOpen}
            onSignatureSave={handleSignatureSave} // Pass the callback
          />
        </section>
      </div>
    </div>
  );
};

export default FinalNode;
