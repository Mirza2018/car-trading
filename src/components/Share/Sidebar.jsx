
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AllImages } from "@/assets/AllImages";

const Sidebar = ({ slider, setSlider }) => {
  const router = useRouter();
  const location = usePathname();

  return (
    <div className=" bg-base-color text-black h-[89vh] lg:h-[85vh] pt-5  overflow-y-auto">
      {/* //* SideBar Collaps Buttons */}
      <div className="lg:hidden">
        {slider ? (
          <div className="flex justify-center items-end flex-col px-5">
            <button onClick={() => setSlider(!slider)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button onClick={() => setSlider(!slider)} className="ml-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
      </div>
      {/* //* SideBar Collaps Menus */}
      <div className={`${slider ? "block" : "hidden lg:block "}  h-[90%]`}>
        <h1 className="text-2xl cursor-pointer flex justify-start items-center px-5 mb-10">
          {/* <Link href="/dashboard">
            <span className="font-bold">Dashboard</span>
          </Link> */}
        </h1>
        {/* For Laptop View  */}
        <div className="hidden lg:block relative h-full">
          <div>
            <ul className=" flex justify-center items-start flex-col gap-3 pe-10">
              <Link href="/dashboard/total-car" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                    location === "/dashboard/total-car"
                      ? "text-white bg-highlight-color"
                      : "text-black"
                  }`}
                >
                  <Image
                    src={AllImages.totalCar}
                    alt="show-feedback"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/total-car"
                          ? "brightness(0) invert(1) "
                          : undefined,
                    }}
                  />
                  <p>Total Car For Sell</p>
                </li>
              </Link>
              <Link href="/dashboard/order-transport" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/order-transport"
                      ? "text-white bg-highlight-color"
                      : "text-black"
                  }`}
                >
                  <Image
                    src={AllImages.orderTransport}
                    alt="order-transport"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/order-transport"
                          ? "brightness(0) invert(1)"
                          : undefined,
                    }}
                  />
                  Order Transport
                </li>
              </Link>
              <Link href="/dashboard/user-profile" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/user-profile"
                      ? "text-white bg-highlight-color"
                      : "text-black"
                  }`}
                >
                  <Image
                    src={AllImages.userProfile}
                    alt="user-profile"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/user-profile"
                          ? "brightness(0) invert(1)"
                          : undefined,
                    }}
                  />
                  <p>User Profile</p>
                </li>
              </Link>
              <Link href="/dashboard/terms" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/terms"
                      ? "text-white bg-highlight-color"
                      : "text-black"
                  }`}
                >
                  <Image
                    src={AllImages.terms}
                    alt="terms"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/terms"
                          ? "brightness(0) invert(1)"
                          : undefined,
                    }}
                  />
                  Terms & Conditions
                </li>
              </Link>
              <Link href="/dashboard/privacy" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/privacy"
                      ? "text-white bg-highlight-color"
                      : "text-black"
                  }`}
                >
                  <Image
                    src={AllImages.terms}
                    alt="privacy"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/privacy"
                          ? "brightness(0) invert(1)"
                          : undefined,
                    }}
                  />
                  Privacy Policy
                </li>
              </Link>
            </ul>
          </div>

          <div
            className={`flex items-center cursor-pointer absolute bottom-14 gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg text-black 
           `}
            onClick={() => {
              router.push("/login");
            }}
          >
            <Image src={AllImages.logo} alt="show-feedback" width={30} />
            <p>Log Out</p>
          </div>
        </div>



        
        {/* For Mobile View */}
        <div className="block lg:hidden relative h-[90%]">
          <div>
            <ul className=" flex justify-center items-start flex-col gap-3  pe-5">
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/all-products"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={AllImages.logo}
                  alt="show-feedback"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/all-products"
                        ? "brightness(0) invert(1)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/all-products">All Products</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/shelter"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={AllImages.logo}
                  alt="shelter"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/shelter"
                        ? "brightness(0) invert(1)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/shelter">Shelter</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/donation"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={AllImages.logo}
                  alt="Donation"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/donation"
                        ? "brightness(0) invert(1)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/donation">Donation</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/members"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={AllImages.logo}
                  alt="members"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/members"
                        ? "brightness(0) invert(1)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/members">Members</Link>
              </li>
            </ul>
          </div>
          <div
            className={`flex items-center cursor-pointer absolute bottom-0 gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg text-black 
           `}
            onClick={() => {
              router.push("/login");
              setSlider(!slider);
            }}
          >
            <Image src={AllImages.logo} alt="show-feedback" width={30} />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
