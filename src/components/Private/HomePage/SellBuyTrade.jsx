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
              className={`flex-1 text-center p-4 font-bold text-[30px] rounded-ss-xl text-primary-color bg-highlight-color`}
            >
              <p className="text-xl">Sell Car</p>
            </div>
            <div
              className={`flex-1 text-center p-4  rounded-se-xl font-bold text-[30px]  cursor-pointer bg-[#F3F9FB] `}
            >
              <Link href="/submit-listing">
                <p className="text-xl">Buy Car</p>
              </Link>
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
          <div className="text-center mb-16 mx-10">
            <Input
              //  ref={inputRef}
              placeholder="Enter license plate"
              className=""
              suffix={
                <div
                  //  onClick={handleEditClick}
                  className="bg-highlight-color  rounded py-2 px-8 cursor-pointer"
                >
                  <Link
                    href="/sell-car"
                    className="text-white font-bold text-lg"
                  >
                   Search
                  </Link>
                </div>
              }
              prefix={
                <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-7">
                  <Image
                    width={0}
                    height={0}
                    alt="search"
                    src={AllImages.star}
                    className="w-7"
                  />
                  <Image width={0} height={0} alt="search" className="w-6" src={AllImages.dk} />
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
