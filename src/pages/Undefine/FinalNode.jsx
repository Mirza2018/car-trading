import React from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const FinalNode = () => {
  return (
    <div className="container mx-auto min-h-screen border-2 border-secondary-color rounded-md my-20">
      <div className="max-w-[1350px]  mx-auto my-10">
        <h1 className="font-bold text-6xl">Final note</h1>

        <main className="flex flex-col lg:grid lg:grid-cols-2  gap-0 mx-6 my-10">
          <section className="flex flex-col ">
            <h1 className="text-highlight-color text-5xl font-bold mb-3">
              Seller
            </h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p className=" ">First name</p>
              <p>Kasper</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Surname</p>
              <p>Munch Sørensen</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Address</p>
              <p>Ballevej 26, 7182 Bredsten</p>
            </div>

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>By</p>
              <p>Bredsten</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium  border-t border-secondary-color p-3 ">
              <p>Postal code</p>
              <p>7182</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>E-mail</p>
              <p>kmunchs@hotmail.com</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3 ">
              <p>Telephone</p>
              <p>+4522818334</p>
            </div>
          </section>
          <section className="flex flex-col">
            <h1 className="text-highlight-color text-5xl font-bold mb-3">
              Buyer
            </h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Company</p>
              <p>Autoone (Vejle)</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>CVR/VAT</p>
              <p>34464081</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Contact person</p>
              <p>Darin</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Address</p>
              <p>Ellehammersvej 2</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>By</p>
              <p>Vejle</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>Postal code</p>
              <p>7100</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
              <p>E-mail</p>
              <p>bogholderi@autoone.dk </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3 ">
              <p>Telephone</p>
              <p>22114444</p>
            </div>
          </section>
        </main>
        <section className="flex flex-col mx-5">
          <h1 className="text-highlight-color text-5xl font-bold mb-3">With</h1>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Model and brand</p>
            <p>RENAULT, Captur, TCe 90</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Bil type</p>
            <p>Passenger car</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Year</p>
            <p>2017</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Kilometer</p>
            <p>113000</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Registration number</p>
            <p>BZ88778</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>Fuel</p>
            <p>Gasoline</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3 ">
            <p>The condition of the car</p>
            <p>Can't drive</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3 ">
            <p>Last seen</p>
            <p>Godkendt, 12. dec. 2023</p>
          </div>
        </section>
        <section className="flex flex-col mx-5 ">
          <h1 className="text-highlight-color text-5xl font-bold mb-3 py-3">
            Re-registration/de-registration view
          </h1>
          <div className=" border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <div className="flex justify-between items-center w-full ">
              <h1>Køber omregistrerer/afmelder bilen inden for 4 hverdage*</h1>
              <p className="w-4 aspect-square rounded-full bg-highlight-color ring ring-highlight-color border-2 border-white"></p>
            </div>
            <div className="flex justify-between items-center w-full ">
              <h1>Buyer and seller re-register the car together</h1>
              <p className="w-4 aspect-square rounded-full  ring ring-highlight-color "></p>
            </div>
            <div className="flex justify-between items-center w-full ">
              <h1>
                The seller deregisters the car and hands over the number plates
              </h1>
              <p className="w-4 aspect-square rounded-full  ring ring-highlight-color "></p>
            </div>
            <div className="flex justify-between items-center w-full ">
              <h1>The car is deregistered</h1>
              <p className="w-4 aspect-square rounded-full  ring ring-highlight-color "></p>
            </div>
            <div className="flex justify-between items-center w-full ">
              <h1>
                *According to Danish legislation, the car must be
                re-registered/de-registered no later than 4 working days after
                the transaction
              </h1>
              <p className="w-4 aspect-square rounded-full  ring ring-highlight-color "></p>
            </div>
          </div>
        </section>
        <section className="flex flex-col mx-5">
          <div className="text-highlight-color text-5xl font-bold mb-3 py-3">
            Price
          </div>
          <div className=" border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <div className="flex justify-between items-center w-full gap-5 ">
              <div className="bg-base-color  py-2 border border-highlight-color rounded-md flex items-center gap-5 px-5">
                <h1 className="text-xl font-bold">Purchase amount*</h1>
                <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md flex justify-center items-center gap-2 ">
                  ink <IoIosArrowDown className="text-xl" />
                </p>
                <p>moms</p>
              </div>
              <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md ">
                3000
              </p>
            </div>
            <div className="flex justify-between items-center w-full gap-5 ">
              <h1>
                The deal is signed and completed before inspection. The buyer
                undertakes to pay the agreed amount upon collection of the car,
                provided that the car is as described.
              </h1>
              <div>
                <FaRegSquareCheck className="text-xl text-highlight-color " />
              </div>
            </div>
            <div className="flex justify-between items-start w-full gap-5 ">
              <h1 className="flex-1">
                It has been agreed that the buyer pays a deposit to the seller
                as security for the transaction. The remaining amount is paid
                upon handover of the car. The deposit amounts to DKK{" "}
              </h1>
              <p className="bg-base-color px-12 py-2 border border-secondary-color rounded-md ">
                0
              </p>
            </div>
            <div className="flex justify-between items-start w-full gap-5">
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

        <section className=" border rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around  gap-9 mx-5 my-10 ">
          <div className="flex flex-col  justify-center items-center gap-2">
            <p className=" h-36 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
            <p className="text-base font-medium">Seller Signature</p>
            <p className="text-base font-medium">Kasper Munch Sørensen</p>
            <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:items-end items-center gap-4 md:gap-0">
            <div className="flex flex-col  justify-center items-center gap-2">
              <p className=" h-36 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
              <p className="text-base font-medium">Buyer Signature</p>
              <p className="text-base font-medium">Autoone (Guide)</p>
              <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
            </div>
            <p className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md ">
              30.000,00 kr.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinalNode;
