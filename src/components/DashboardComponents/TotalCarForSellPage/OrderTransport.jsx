import React from "react";

const OrderTransport = () => {
  return (
    <div className=" mx-auto container gap-9">
      <div className="p-5">
        <h1 className="text-3xl font-medium mb-2">Car Details</h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-[28px] ">
            Make & Model: <span className="text-[#606060]">Toyota Corolla</span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            {" "}
            Year: <span className="text-[#606060]">2021</span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            License plate: <span className="text-[#606060]">ABC-1245</span>
          </p>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-3xl font-medium mb-2">
          Customer Contact information
        </h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-[28px] ">
            Name: <span className="text-[#606060]">John Dom</span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            {" "}
            Address:{" "}
            <span className="text-[#606060]">
              {" "}
              156 Main Street Road, Springfield
            </span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            Mileage: <span className="text-[#606060]">35000 miles</span>
          </p>
          <p className="text-[#1E1E1E] text-[28px] ">
            Phone: <span className="text-[#606060]">(123) 4587 48900</span>
          </p>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-3xl font-medium mb-2">
          Customer destination information
        </h1>
        <div className="flex flex-col gap-5 bg-base-color rounded-lg p-5 w-full">
          <p className="text-[#1E1E1E] text-[28px]">
            Destination:
            <span className="text-[#606060]">
              465 Elm Street Shelbyville Dom
            </span>
           
          </p> <div className="bg-secondary-color rounded-lg w-full h-36"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderTransport;
