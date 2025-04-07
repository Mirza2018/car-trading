import React from "react";

const OrderTransport = () => {
  return (
    <div className=" mx-auto container gap-9">
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">Car Details</h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-xl ">
            Make & Model: <span className="text-[#606060]">Toyota Corolla</span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            {" "}
            Year: <span className="text-[#606060]">2021</span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            License plate: <span className="text-[#606060]">ABC-1245</span>
          </p>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">
          Customer Contact information
        </h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-xl ">
            Name: <span className="text-[#606060]">John Dom</span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            {" "}
            Address:{" "}
            <span className="text-[#606060]">
              {" "}
              156 Main Street Road, Springfield
            </span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p>
          <p className="text-[#1E1E1E] text-xl ">
            Phone: <span className="text-[#606060]">(123) 4587 48900</span>
          </p>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-medium mb-2">
          Customer destination information
        </h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-xl">
            Destination:
            <span className="text-[#606060]">
              465 Elm Street Shelbyville Dom
            </span>
          </p>{" "}
          <div className="bg-secondary-color rounded-lg w-full h-36"></div>
        </div>
      </div>

      <div className=" flex justify-center gap-5 items-center my-12 flex-wrap">
        <button className="bg-highlight-color font-medium text-white rounded-2xl px-16 py-5 text-2xl ">
          Cancel
        </button>
        <button className="bg-highlight-color font-medium text-white rounded-2xl px-12 py-5 text-2xl ">
          Cancel Transport{" "}
        </button>
        <button className="bg-highlight-color font-medium text-white rounded-2xl px-20 py-5 text-2xl ">
          Edit
        </button>
        <button className="bg-highlight-color whitespace-nowrap  font-medium text-white rounded-2xl px-14 py-5 text-2xl ">
          Confim & Arrange Transport
        </button>
      </div>
    </div>
  );
};

export default OrderTransport;
