"use client";
import { Input } from "antd";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { AudioOutlined, UserOutlined } from "@ant-design/icons";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import Link from "next/link";
import useGetData from "@/components/DataFetch/useGetData";
import {
  useGetCarInfoQuery,
  useLazyGetCarInfoQuery,
} from "@/redux/api/features/carPrivate";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCarLicenseInfo } from "@/redux/slices/carInfoSlice";
import { FiInfo } from "react-icons/fi";
const { Search } = Input;

const SellBuyTrade = () => {
  // const { data, isFetching } = useGetCarInfoQuery();
  const [trigger, { data, isSuccess, isError }] = useLazyGetCarInfoQuery();
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(userInfo);

  const license = useRef();
  const navigate = useRouter();
  const toastId = "unique-toast-id";
  const dispatch = useDispatch();
  const handleEditClick = () => {

    toast.loading("Registreringsplade kontrolleres…", {
      id: toastId,
    });







    console.log(license?.current?.input?.value);
    // AJ30124;
    const lisenceNumber = license?.current?.input?.value;
    trigger({ license: lisenceNumber });
  };

  // console.log(isSuccess, isError, data?.data?.data);

 

  if (isSuccess) {
    toast.success("Registreringspladedata hentet succesfuldt…", {
      id: toastId,
      duration: 2000,
    });
    const numberPlates = license?.current?.input?.value;

    const carAllDetails = {
      ...data?.data?.data,
      numberPlates: numberPlates,
    };
    dispatch(setCarLicenseInfo(carAllDetails));
    navigate.push("/sell-car");
  }
  if (isError) {
    toast.error("Angiv et gyldigt registreringspladenummer", {
      id: toastId,
      duration: 2000,
    });
  }

  return (
    <div>
      <Head>
        <title>Bilbytte</title>
        <meta name="description" content="Trade cars easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <main className=" max-w-7xl border-2 rounded-xl border-base-color w-fit">
          <div className=" flex w-full max-w-4xl ">
            <div
              className={`flex-1 text-center md:p-4 p-2 font-bold text-[30px] rounded-ss-xl text-primary-color bg-highlight-color`}
            >
              <p className="text-xl flex justify-center items-center gap-3">
                Sælg bil <FiInfo />
              </p>
            </div>
            <div
              className={`flex-1 text-center md:p-4 p-2 rounded-se-xl font-bold text-[30px]  cursor-pointer bg-blue-600 text-white `}
            >
              <Link href="/submit-listing">
                <p className="text-xl flex justify-center items-center gap-3">
                  Køb bil <FiInfo />
                </p>
              </Link>
            </div>
          </div>
          <div className="text-center my-7 ">
            <h1 className="text-2xl font-bold">Velkommen til Bilbytte</h1>
            <p className="text-gray-600 mt-5 px-10 max-w-2xl">
              Vi er forpligtede til at give vores kunder en enestående service.
            </p>{" "}
          </div>

          <div className="text-center mb-16 mx-10">
            <Input
              ref={license}
              placeholder="Indtast nummerplade"
              name="number"
              suffix={
                <div
                  onClick={handleEditClick}
                  className="bg-highlight-color  rounded py-2 md:px-8 px-2 cursor-pointer"
                >
                  <p
                    // href="/sell-car"
                    className="text-white font-bold md:text-lg"
                  >
                    Søg
                  </p>
                </div>
              }
              prefix={
                <div className="!bg-blue-600 flex flex-col justify-center items-center gap-2 rounded py-2 px-3">
                  <Image
                    width={0}
                    height={0}
                    alt="search"
                    src={AllImages.star}
                    className="md:w-7 w-4"
                  />
                  <Image
                    width={0}
                    height={0}
                    alt="search"
                    className="md:w-6 w-3"
                    src={AllImages.dk}
                  />
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
