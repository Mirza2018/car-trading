import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AllImages } from "@/assets/AllImages";

const Sidebar = ({ slider, setSlider }) => {
  const router = useRouter();
  const location = usePathname();
  const user = JSON.parse(localStorage.getItem("car-trading_user"));
  const menuItems = (
    <div>
      <ul className=" flex justify-center items-start flex-col gap-3 pe-10">
        {user.role === "dealer" ? (
          <>
            <Link href="/dashboard/total-dealer-car-sell" className="w-full">
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                  location === "/dashboard/total-dealer-car-sell"
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
                      location === "/dashboard/total-dealer-car-sell"
                        ? "brightness(0) invert(1) "
                        : undefined,
                  }}
                />
                <p>Total Car For Sell</p>
              </li>
            </Link>
            <Link href="/dashboard/order-transport" className="w-full">
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
          </>
        ) : (
          <>
            <Link href="/dashboard/total-private-car-sell" className="w-full">
              {" "}
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                  location === "/dashboard/total-private-car-sell"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
              >
                <Image
                  src={AllImages.totalCar}
                  alt="car"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/total-private-car-sell"
                        ? "brightness(0) invert(1) "
                        : undefined,
                  }}
                />
                <p>Total Car Sell</p>
              </li>
            </Link>
            <Link href="/dashboard/total-car-sold" className="w-full">
              {" "}
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                  location === "/dashboard/total-car-sold"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
              >
                <Image
                  src={AllImages.totalCar}
                  alt="car"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/total-car-sold"
                        ? "brightness(0) invert(1) "
                        : undefined,
                  }}
                />
                <p>Total Car Sold</p>
              </li>
            </Link>
            <Link href="/dashboard/offer-car" className="w-full">
              {" "}
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                  location === "/dashboard/offer-car"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
              >
                <Image
                  src={AllImages.offer}
                  alt="show-feedback"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/offer-car"
                        ? "brightness(0) invert(1) "
                        : undefined,
                  }}
                />
                <p>Offer car</p>
              </li>
            </Link>
            <Link href="/dashboard/bid-car" className="w-full">
              {" "}
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg  ${
                  location === "/dashboard/bid-car"
                    ? "text-white bg-highlight-color"
                    : "text-black"
                }`}
              >
                <Image
                  src={AllImages.bid}
                  alt="show-feedback"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/bid-car"
                        ? "brightness(0) invert(1) "
                        : undefined,
                  }}
                />
                <p>Bid Details</p>
              </li>
            </Link>
          </>
        )}

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

        <Link href="/login" className="w-full">
          <li
            className={`flex items-center gap-x-3 w-full py-3 px-2  font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
              location === "/login"
                ? "text-white bg-highlight-color"
                : "text-black"
            }`}
          >
            <Image
              src={AllImages.logOut}
              alt="login"
              width={30}
              style={{
                filter:
                  location === "/login" ? "brightness(0) invert(1)" : undefined,
              }}
            />
            Log Out
          </li>
        </Link>
      </ul>
    </div>
  );

  return (
    <div className=" bg-base-color text-black h-[89vh] lg:h-screen lg:fixed pt-5  overflow-y-auto">
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
      <div className={`${slider ? "block" : "hidden lg:block "}  `}>
        {/* For Laptop View  */}
        <div className="hidden lg:block relative h-full">{menuItems}</div>

        {/* For Mobile View */}
        <div className="block lg:hidden relative h-[90%]">{menuItems}</div>
      </div>
    </div>
  );
};

export default Sidebar;
