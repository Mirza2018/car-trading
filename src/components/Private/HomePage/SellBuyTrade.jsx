"use client"
import { Input } from "antd";
import Head from "next/head";
import React from "react";
import { AudioOutlined, UserOutlined } from "@ant-design/icons";
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
            <div className="flex-1 text-center p-4 text-primary-color bg-highlight-color font-bold text-[30px] rounded-ss-xl">
              <a href="/sell-car" className="text-xl">
                Sell Car
              </a>
            </div>
            <div className="flex-1 text-center p-4 bg-[#F3F9FB] rounded-se-xl font-bold text-[30px]">
              <a href="/" className="text-xl">
                Buy Car
              </a>
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
          <div className="text-center mb-16">
            <Search
              placeholder="Enter license plate"
              allowClear
              enterButton=" Get Offer"
              size="large"
              prefix={<UserOutlined />}
              onSearch={onSearch}
              style={{
                width: 400,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellBuyTrade;
