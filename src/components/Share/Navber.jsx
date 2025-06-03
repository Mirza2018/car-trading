"use client";
import { AllImages } from "@/assets/AllImages";
import { Avatar, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyProfile from "./MyProfile";
import { clearAuth } from "@/redux/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TaskPage from "../DealerComponents/TaskPage/taskPage";
import { useTaskListQuery } from "@/redux/api/features/taskApi";
import Notification from "./Notification";
import { SocketContext } from "@/utils/SocketContext";
import {
  useGetAllnotificationCountQuery,
  useNotificationActionMutation,
} from "@/redux/api/features/notificationApi";
import { useProfileQuery } from "@/redux/api/features/myProfile";
import { getImageUrl } from "@/helpers/config/envConfig";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useProfileQuery();
  const [notificationRead] = useNotificationActionMutation();
  const cookies = new Cookies();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const displayedData = data ?? currentData;
  let userInfo;
  // const userInfo = useSelector((state) => state.auth.userInfo);
  const userCookie = cookies.get("car_trading_accessToken");
  if (!userCookie) {
    // navigate.push("/sign-in");
    userInfo = { role: false };
  } else {
    userInfo = jwtDecode(userCookie);
  }

  // console.log(userInfo, decodeToken);

  // toast.success(notify, {
  //   id: "notify",
  //   duration: 1500,
  // });

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
    cookies.remove("car_trading_accessToken", { path: "/" });
    cookies.remove("car_trading_accessToken", { path: "/dashboard" });
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
    <div className="flex justify-around bg-secondary-color text-primary-color  items-center !z-[100] py-2  w-full ">
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
              <div onClick={() => notificationRead()}>
                <Notification />
              </div>
              <div ref={profileRef} className="cursor-pointer relative">
                <div onClick={toggleProfile} className="relative ">
                  {displayedData?.data?.profile?.profileImage ? (
                    <Avatar
                      size={50}
                      className="ring ring-highlight-color"
                      src={
                        getImageUrl() +
                        displayedData?.data?.profile?.profileImage
                      }
                    />
                  ) : (
                    <Avatar size={45} className="ring ring-highlight-color">
                      {displayedData?.data?.profile?.first_name?.charAt(0)}
                    </Avatar>
                  )}
                  {/* <Image
                    alt="logo"
                    width={0}
                    height={0}
                    className="w-12  rounded-full border border-highlight-color aspect-square object-cover"
                    src={AllImages.profile}
                  />{" "} */}
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
        <TaskPage setIsModalOpen={setIsModalOpen} />
      </Modal>
      {/* This is Profile or contract section */}
    </div>
  );
};

export default Navbar;
