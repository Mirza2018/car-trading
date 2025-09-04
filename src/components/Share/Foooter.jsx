import React from "react";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { Input } from "antd";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4">Virksomhed</h3>
            <ul>
              <li>Om os</li>
              <li>Tjenester</li>
              <li>Vilkår</li>
              <li>Kontakt os</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Vores mærker</h3>
            <ul>
              <li>Toyota</li>
              <li>Porsche</li>
              <li>Audi</li>
              <li>BMW</li>
              <li>Ford</li>
              <li>Nissan</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Køretøjstyper</h3>
            <ul>
              <li>Sedan</li>
              <li>Hatchback</li>
              <li>SUV</li>
              <li>Hybrid</li>
              <li>Elektrisk</li>
              <li>Coupe</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[20px] mb-4">Vores mobilapp</h3>
            <div className="flex flex-col justify-center gap-2 ">
              <div className="flex items-center justify-start w-fit border-[#FFFFFF] border bg-[#CCDFE6] text-black px-6 py-2 rounded-lg">
                <div>
                  <FaApple className="mr-2 text-3xl" />
                </div>
                <div>
                  <p className="text-xs font-normal">Download på</p>
                  <p className="text-[15px] font-medium">Apple Store</p>
                </div>
              </div>
              <div className="flex items-center justify-start w-fit border-[#FFFFFF] border bg-[#CCDFE6] text-black px-8 py-2 rounded-lg">
                <div>
                  <FaGooglePlay className="mr-2 text-2xl" />
                </div>
                <div>
                  <p className="text-xs font-normal">Hent den på</p>
                  <p className="text-[15px] font-medium">Google Play</p>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-[20px] mb-4 mt-3">
              Kommer snart...
            </h3>
          </div>
          <div>
            <h3 className="font-medium text-[20px] mt-3">Tilmeld dig BoxCar</h3>
            <p className="text-[15px] font-normal mb-3">
              Modtag prisopdateringer, købstips og meget mere!
            </p>

            <div className="relative max-w-3xl">
              <Input
                placeholder="Din e-mail"
                className="w-full bg-[#ccdfe6] border-[#FFFFFF] border rounded-full text-lg placeholder-[#53585a] focus:outline-none"
                suffix={
                  <div className="whitespace-nowrap bg-[#ff991c] !text-white font-medium px-4 py-2 rounded-full lg:text-lg text-sm hover:opacity-90 transition-opacity">
                    <Link href="/sign-up" className="!text-white">
                      Tilmeld
                    </Link>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <ul className="flex space-x-4 justify-end mt-4">
          <li>
            <FacebookFilled className="text-2xl" />
          </li>
          <li>
            <TwitterOutlined className="text-2xl" />
          </li>
          <li>
            <InstagramOutlined className="text-2xl" />
          </li>
          <li>
            <LinkedinFilled className="text-2xl" />
          </li>
        </ul>

        <div className="border-t border-white mt-8 pt-8 text-center flex justify-between md:flex-row flex-col">
          <p>© 2025 Alle rettigheder forbeholdes</p>
          <p> Privatlivspolitik | Cookiepolitik</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
