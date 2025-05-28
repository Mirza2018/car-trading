"use client";
import { AllImages } from "@/assets/AllImages";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyProfile from "./MyProfile";
import { clearAuth } from "@/redux/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TaskPage from "../DealerComponents/TaskPage/taskPage";
import { useTaskListQuery } from "@/redux/api/features/taskApi";

const Navbar = () => {

  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  // console.log(carUser, "carUser");

  const task = true;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  // console.log({isProfile});

  const menuRef = useRef(null); // Create a ref to track the menu
  const profileRef = useRef(null); // Create a ref to track the profile

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleProfile = () => {
    setIsProfile(!isProfile);
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

  // Close the Profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside the menuRef, close the menu
      if (
        isProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfile(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfile]);

  // Priority Common Menu Items (shown in any specific order)
  const PriorityCommonMenuItems = [{ name: "Home", path: "/" }];

  // Items to always appear last
  const AlwaysLastMenuItems = [
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  // Specific Menus based on roles
  const RoleSpecificMenus = {
    default: [],  
    private_user: [
      { name: "Submit Listing", path: "/submit-listing" },
      { name: "Inbox", path: "/inbox" },
      { name: "Dashboard", path: "/dashboard/total-private-car-sell" },
    ],
    dealer: [
      // { name: "Home", path: "/dealer" }, // Overridden Home for dealer
      // { name: "Listings", path: "/listings" },
      { name: "Task", path: "/", onClick: true },
      { name: "Inbox", path: "/inbox" },
      { name: "Dashboard", path: "/dashboard/total-dealer-car-sell" },
    ],
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    cookies.remove("car_trading_accessToken");
    navigate.push("/");
    toast.success("Log out successfully done");
  };

  const getMenuItems = (user) => {
    const { role } = user || {};
    const specificItems = RoleSpecificMenus[role] || RoleSpecificMenus.default;

    // Combining and de-duplicating items, allowing for role-based overrides
    const priorityItemsMap = new Map(
      PriorityCommonMenuItems.map((item) => [item.name, item])
    );
    specificItems.forEach((item) => priorityItemsMap.set(item.name, item)); // Updates or adds specific items

    // Combine priority items with always-last items
    const mergedItems = [
      ...PriorityCommonMenuItems,
      ...specificItems,
      ...AlwaysLastMenuItems,
    ];
    return mergedItems;
  };

  // Generate the main menu based on the user's role
  const mainMenu = getMenuItems(userInfo);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // console.log(loading, "loading");

  return (
    <div className="flex justify-around bg-secondary-color text-primary-color  items-center z-50 py-2  w-full">
      {" "}
      {/* The style property fixed & w-full is to fixed the navber , if you dont want this just remove it */}
      {/* This is small/Mobile device Menu section */}
      <div ref={menuRef} className="relative md:hidden cursor-pointer">
        {" "}
        {/* This is hidden in md screen */}
        <div
          onClick={toggleMenu}
          className="relative inline-flex items-center   justify-center p-2 rounded-md text-white hover:text-white font-bold focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out "
          aria-label="Toggle menu"
        >
          <label className="flex flex-col gap-2 w-8 cursor-pointer">
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
            {mainMenu.map((item) => (
              <Link
                onClick={() => setIsOpen(false)}
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
        <div className="flex justify-center items-center md:gap-2 my-7">
          <Image
            alt="logo"
            width={0}
            height={0}
            className=""
            src={AllImages.logo}
          />
          {/* <h1 className="text-white uppercase font-semibold md:text-3xl text-xl">
            Mirza
          </h1> */}
        </div>
      </Link>
      {/* This is Big device Menu section */}
      <div className="hidden md:block ">
        {/* This is hidden in mobile device  */}
        <ul className="flex text-white  flex-1 gap-5 text-xl font-bold justify-center items-center">
          {mainMenu.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault(); // Disable navigation
                  showModal();
                }
              }}
              className=""
            >
              <li className="flex text-[15px] w-fit font-medium">
                {item.name}
              </li>
            </Link>
          ))}

          {userInfo?.role ? (
            <>
              {" "}
              <div ref={profileRef} className="cursor-pointer relative">
                <div onClick={toggleProfile} className="relative ">
                  <Image
                    alt="logo"
                    width={0}
                    height={0}
                    className="w-12  rounded-full border border-highlight-color aspect-square object-cover"
                    src={AllImages.profile}
                  />{" "}
                </div>
                {isProfile && (
                  <MyProfile
                    setIsProfile={setIsProfile}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
              {/* <Link href={"/"}>
                <Badge count={1}>
                  <Avatar size={50} icon={<BellOutlined />} />
                </Badge>
              </Link> */}
              {userInfo?.role === "private_user" ? (
                <p
                  // href={"/sign-in"}
                  onClick={() => {
                    handleLogout();
                    navigate.push("/sign-in");
                  }}
                >
                  <p className="bg-[#00721E] text-[15px] cursor-pointer font-medium px-3 py-2 rounded-3xl">
                    Log In For Dealer
                  </p>
                </p>
              ) : (
                ""
              )}
            </>
          ) : (
            <Link href={"/sign-in"}>
              <p className="bg-[#00721E] text-[15px] font-medium px-3 py-2 rounded-3xl whitespace-normal">
                Log In
              </p>
            </Link>
          )}
        </ul>
        {/* This is hidden in mobile device */}
      </div>
      <Modal
        title=""
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        footer={[]}
      >
        {/* <React.Fragment>
          <div className="flex flex-col justify-center items-center p-20">
            <h1
              style={{ fontSize: "clamp(20px, 1vw + 1rem ,48px)" }}
              className="font-semibold"
            >
              Task
            </h1>

            {task ? (
              <div className="flex flex-col gap-3 w-full min-w-[400px]">
                <div className="flex justify-between bg-secondary-color rounded-md  p-3">
                  <div className="">
                    <h1 className="font-semibold">Unanswered Questions</h1>
                    <p className="text-xs">Respond to customer inquiry</p>
                  </div>
                  <Link href={"/task/01"}>
                    <button className="text-[15px] px-3 py-2 text-white bg-highlight-color rounded-md">
                      Resolve
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between bg-secondary-color rounded-md w-full p-3">
                  <div className="">
                    <h1 className="font-semibold">Unanswered Questions</h1>
                    <p className="text-xs">Respond to customer inquiry</p>
                  </div>
                  <Link href={"/task/02"}>
                    <button className="text-[15px] px-3 py-2 text-white bg-highlight-color rounded-md">
                      Resolve
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between bg-secondary-color rounded-md w-full p-3">
                  <div className="">
                    <h1 className="font-semibold">Unanswered Questions</h1>
                    <p className="text-xs">Respond to customer inquiry</p>
                  </div>
                  <Link href={"/task/03"}>
                    <button className="text-[15px] px-3 py-2 text-white bg-highlight-color rounded-md">
                      Resolve
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="221"
                height="220"
                viewBox="0 0 221 220"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M120.427 16.3828C114.219 12.9453 106.677 12.9453 100.462 16.3828C78.3096 28.6445 56.1561 40.905 34.0018 53.1641C30.9435 54.8581 28.366 57.3018 26.5114 60.2656C24.6569 63.2294 23.5862 66.6159 23.3999 70.1072C23.2136 73.5984 23.9179 77.0796 25.4465 80.2239C26.9751 83.3682 29.278 86.0723 32.1387 88.0822L98.5924 134.757C102.064 137.194 106.203 138.502 110.445 138.502C114.687 138.502 118.826 137.194 122.297 134.757C136.941 124.465 168.635 102.217 188.751 88.0753C191.613 86.0657 193.918 83.3613 195.447 80.2163C196.977 77.0713 197.682 73.589 197.495 70.0966C197.309 66.6043 196.238 63.2168 194.382 60.2523C192.527 57.2879 189.948 54.844 186.888 53.1503L120.427 16.3828Z"
                  fill="#336EBD"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.45 152.446L98.5925 202.413C102.064 204.851 106.203 206.159 110.445 206.159C114.687 206.159 118.826 204.851 122.297 202.413L193.447 152.446C194.907 151.385 195.891 149.793 196.187 148.013C196.483 146.233 196.067 144.407 195.029 142.931C193.991 141.455 192.415 140.446 190.64 140.122C188.865 139.797 187.033 140.184 185.541 141.198L114.398 191.166C113.24 191.978 111.859 192.413 110.445 192.413C109.03 192.413 107.65 191.978 106.492 191.166L35.3425 141.198C33.8494 140.213 32.0308 139.848 30.273 140.181C28.5152 140.515 26.9567 141.52 25.9284 142.984C24.9001 144.449 24.4831 146.256 24.7659 148.022C25.0487 149.789 26.0091 151.376 27.4431 152.446H27.45Z"
                  fill="#336EBD"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.45 118.132L98.5925 168.1C102.064 170.538 106.203 171.846 110.445 171.846C114.687 171.846 118.826 170.538 122.297 168.1L193.447 118.132C194.907 117.071 195.891 115.479 196.187 113.699C196.483 111.919 196.067 110.094 195.029 108.618C193.991 107.141 192.415 106.132 190.64 105.808C188.865 105.484 187.033 105.871 185.541 106.885L114.398 156.852C113.24 157.664 111.859 158.1 110.445 158.1C109.03 158.1 107.65 157.664 106.492 156.852L35.3425 106.885C33.8494 105.899 32.0308 105.534 30.273 105.868C28.5152 106.201 26.9567 107.207 25.9284 108.671C24.9001 110.135 24.4831 111.942 24.7659 113.709C25.0487 115.476 26.0091 117.062 27.4431 118.132H27.45Z"
                  fill="#336EBD"
                />
              </svg>
            )}
          </div>
        </React.Fragment> */}
        <TaskPage setIsModalOpen={setIsModalOpen} />
      </Modal>
      {/* This is Profile or contract section */}
    </div>
  );
};

export default Navbar;
