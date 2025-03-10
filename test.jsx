"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref to track the menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside the menuRef, close the menu
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Apply Now", path: "/apply-now" },
    { name: "Get Started", path: "/#get-started" },
    { name: "Advanced", path: "/#advanced" },
  ];

  return (
    <div className="flex justify-around bg-[#161622]  items-center z-50 py-2 fixed w-full">
      {" "}
      {/* The style property fixed & w-full is to fixed the navber , if you dont want this just remove it */}
      {/* This is small/Mobile device Menu section */}
      <div className="relative md:hidden">
        {" "}
        {/* This is hidden in md screen */}
        <div
          onClick={toggleMenu}
          ref={menuRef}
          className="relative inline-flex items-center   justify-center p-2 rounded-md text-white hover:text-white font-bold focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out cursor-pointer"
          aria-label="Toggle menu"
        >
          <label className="flex flex-col gap-2 w-8">
            <div
              className={`rounded-2xl h-[3px]  bg-white duration-500 transform ${
                isOpen ? "rotate-45  translate-y-[10px]" : ""
              }`}
            ></div>
            <div
              className={`rounded-2xl h-[3px] w-full bg-white duration-500 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`rounded-2xl h-[3px] transform bg-white duration-500 ${
                isOpen ? " -rotate-45 -translate-y-[10px]" : ""
              }`}
            ></div>
          </label>
              </div>
              


              
        {isOpen && (
          <div className="px-2 w-[180px] pt-2 pb-3 space-y-1 sm:px-3 absolute bg-black z-20 rounded-xl">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                aria-label={item.name}
              >
                <span className="flex items-center">
                  <span>{item.name}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* This is logo section */}
      <Link href="/">
        <div className="flex justify-center items-center md:gap-2">
          <Image
            alt="logo"
            width={200}
            height={200}
            className="md:w-16 lg:w-24 w-14 rounded-3xl"
            src={`/logo.png`}
          />
          <h1 className="text-white uppercase font-semibold md:text-3xl text-xl">
            Mirza
          </h1>
        </div>
      </Link>
      {/* This is Big device Menu section */}
      <div className="hidden md:block ">
        {" "}
        {/* This is hidden in mobile device  */}
        <ul className="flex text-white  flex-1 gap-5 text-xl font-bold">
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name} className="">
              <li className="flex">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      {/* This is Profile or contract section */}
      <div className="md:block hidden">
        {" "}
        {/* This is hidden in mobile device */}
        <Link href={"/apply-now"}>
          <div>
            <button
              className="text-gray-400 md:text-xl  font-semibold border rounded-full md:p-3 
            p-2 md:px-6 hover:text-white hover:border-white transition-all duration-300 ease-in-out z-30 relative"
            >
              Profile
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
