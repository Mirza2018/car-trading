"use client";
import { Input } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { AudioOutlined, UserOutlined } from "@ant-design/icons";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import Link from "next/link";
const { Search } = Input;

const SellBuyTrade = () => {
  const [isSellCar, SetIsSellCar] = useState(true);
  const onSearch = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Head>
        <title>Car Trade</title>
        <meta name="description" content="Trade cars easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <main className=" max-w-7xl border-2 rounded-xl border-base-color w-fit">
          <div className=" flex w-full max-w-4xl ">
            <div
              onClick={() => SetIsSellCar(true)}
              className={`flex-1 text-center p-4 font-bold text-[30px] rounded-ss-xl cursor-pointer ${
                isSellCar
                  ? "text-primary-color bg-highlight-color"
                  : "bg-[#F3F9FB]"
              }  `}
            >
              <p className="text-xl">Sell Car</p>
            </div>
            <div
              onClick={() => SetIsSellCar(false)}
              className={`flex-1 text-center p-4  rounded-se-xl font-bold text-[30px]  cursor-pointer ${
                isSellCar
                  ? "bg-[#F3F9FB]"
                  : "   text-primary-color bg-highlight-color"
              }`}
            >
              <p className="text-xl">Buy Car</p>
            </div>
          </div>
          <div className="text-center my-7 ">
            <h1 className="text-2xl font-bold">Welcome to Car Trade</h1>
            <p className="text-gray-600 mt-5 px-10 max-w-2xl">
              We are committed to providing our customers with exceptional
              service.
            </p>{" "}
          </div>

          {/* <div className="  rounded-lg shadow-lg flex items-center ">
            <span className="p-3 bg-blue-500 text-white ">DK</span>
            <input
              type="text"
              placeholder="Enter license plate"
              className="flex-1 border-2 p-2 "
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Get Offer
            </button>
          </div> */}
          <div className="text-center mb-16 mx-24">
            <Input
              //  ref={inputRef}
              placeholder="Enter license plate"
              className=""
              suffix={
                <div
                  //  onClick={handleEditClick}
                  className="bg-highlight-color  rounded py-3 px-10 cursor-pointer"
                >
                  <Link
                    href="/sell-car"
                    className="text-white font-bold text-lg"
                  >
                    Get Offer
                  </Link>
                </div>
              }
              prefix={
                <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-5">
                  <Image
                    width={0}
                    height={0}
                    alt="search"
                    src={AllImages.star}
                  />
                  <Image width={0} height={0} alt="search" src={AllImages.dk} />
                </div>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellBuyTrade;
