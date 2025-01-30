import React from "react";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#9BC1CD] text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Terms</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Our Brands</h3>
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
            <h3 className="font-bold mb-4">Vehicles Type</h3>
            <ul>
              <li>Sedan</li>
              <li>Hatchback</li>
              <li>SUV</li>
              <li>Hybrid</li>
              <li>Electric</li>
              <li>Coupe</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[20px] mb-4">Our Mobile App</h3>
            <div className="flex flex-col justify-center gap-2 ">
              <div className="flex items-center justify-start w-fit border-[#FFFFFF] border  bg-[#CCDFE6] text-black px-6 py-2 rounded-lg">
                <div>
                  <FaApple className="mr-2 text-3xl" />
                </div>
                <div>
                  <p className="text-xs font-normal">Download on the</p>
                  <p className="text-[15px] font-medium">Apple Store</p>
                </div>
              </div>
              <div className="flex items-center justify-start w-fit border-[#FFFFFF] border  bg-[#CCDFE6] text-black px-8 py-2 rounded-lg">
                <div>
                  <FaGooglePlay className="mr-2 text-2xl" />
                </div>
                <div>
                  <p className="text-xs font-normal">Get in on</p>
                  <p className="text-[15px] font-medium">Google Play</p>
                </div>
              </div>
              {/* <a
                href="#"
                className="flex items-center bg-black text-white px-6 py-2 rounded-lg"
              >
                <FaGooglePlay className="mr-2" />
                Google Play
              </a> */}
            </div>
            <h3 className="font-medium text-[20px] mb-4 mt-3">
              Connect With Us
            </h3>
          </div>
          <div>
            <h3 className="font-medium text-[20px] mt-3">Join BoxCar</h3>
            <p className="text-[15px] font-normal mb-3">
              Receive pricing updates, shopping tips & more!
            </p>
            {/* <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded text-black"
              />
              <button className="bg-white text-[#9BC1CD] p-2 rounded">
                Sign Up
              </button>
            </div> */}
            <div className="relative max-w-3xl">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-[#ccdfe6] border-[#FFFFFF] border rounded-full px-6 py-6 text-lg placeholder-[#53585a] focus:outline-none pr-32"
              />
              <button className="absolute whitespace-nowrap right-2 top-1/2 -translate-y-1/2 bg-[#ff991c] text-white font-medium px-8 py-3 rounded-full text-lg hover:opacity-90 transition-opacity">
                Sign Up
              </button>
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
        <div className="border-t border-white mt-8 pt-8 text-center flex justify-between md:flex-row flex-col ">
          <p>© 2025 example.com. All rights reserved</p>
          <p>Terms Condition | Privacy Notice</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
