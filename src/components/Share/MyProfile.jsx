import Link from "next/link";


import React from "react";

const MyProfile = ({ setIsProfile, handleLogout }) => {


  return (
    <div className=" absolute right-0 z-50 bg-[#F3F9FB] text-base font-normal flex flex-col justify-center items-center gap-3 pb-16  rounded-2xl cursor-context-menu">
      <div className="cursor-pointer py-3 px-4 rounded-t-2xl bg-highlight-color text-white flex justify-start gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3.75C9.92893 3.75 8.25 5.42893 8.25 7.5C8.25 9.57107 9.92893 11.25 12 11.25C14.0711 11.25 15.75 9.57107 15.75 7.5C15.75 5.42893 14.0711 3.75 12 3.75Z"
            fill="white"
          />
          <path
            d="M8 13.25C5.92893 13.25 4.25 14.9289 4.25 17V18.1883C4.25 18.9415 4.79588 19.5837 5.53927 19.7051C9.8181 20.4037 14.1819 20.4037 18.4607 19.7051C19.2041 19.5837 19.75 18.9415 19.75 18.1883V17C19.75 14.9289 18.0711 13.25 16 13.25H15.6591C15.4746 13.25 15.2913 13.2792 15.1159 13.3364L14.2504 13.6191C12.7881 14.0965 11.2119 14.0965 9.74959 13.6191L8.88407 13.3364C8.70869 13.2792 8.52536 13.25 8.34087 13.25H8Z"
            fill="white"
          />
        </svg>
        <h1 className="whitespace-nowrap">My Account</h1>
      </div>

      <Link
        onClick={() => setIsProfile(false)}
        href={`/dashboard/user-profile`}
        className="cursor-pointer text-[#414141] flex justify-start gap-2 mx-5"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="15" r="2" fill="#222222" />
          <path
            d="M4.5 13.5C4.5 11.6144 4.5 10.6716 5.08579 10.0858C5.67157 9.5 6.61438 9.5 8.5 9.5H15.5C17.3856 9.5 18.3284 9.5 18.9142 10.0858C19.5 10.6716 19.5 11.6144 19.5 13.5V14.5C19.5 17.3284 19.5 18.7426 18.6213 19.6213C17.7426 20.5 16.3284 20.5 13.5 20.5H10.5C7.67157 20.5 6.25736 20.5 5.37868 19.6213C4.5 18.7426 4.5 17.3284 4.5 14.5V13.5Z"
            stroke="#222222"
          />
          <path
            d="M16.5 9.5V8C16.5 5.51472 14.4853 3.5 12 3.5V3.5C9.51472 3.5 7.5 5.51472 7.5 8V9.5"
            stroke="#222222"
            stroke-linecap="round"
          />
        </svg>

        <h1 className="whitespace-nowrap">Change Password</h1>
      </Link>

      <Link
        onClick={() => setIsProfile(false)}
        href={`/dashboard/user-profile`}
        className="cursor-pointer text-[#414141] flex justify-start gap-2 w-full ms-10 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3.75C9.92893 3.75 8.25 5.42893 8.25 7.5C8.25 9.57107 9.92893 11.25 12 11.25C14.0711 11.25 15.75 9.57107 15.75 7.5C15.75 5.42893 14.0711 3.75 12 3.75Z"
            fill="#333333"
          />
          <path
            d="M8 13.25C5.92893 13.25 4.25 14.9289 4.25 17V18.1883C4.25 18.9415 4.79588 19.5837 5.53927 19.7051C9.8181 20.4037 14.1819 20.4037 18.4607 19.7051C19.2041 19.5837 19.75 18.9415 19.75 18.1883V17C19.75 14.9289 18.0711 13.25 16 13.25H15.6591C15.4746 13.25 15.2913 13.2792 15.1159 13.3364L14.2504 13.6191C12.7881 14.0965 11.2119 14.0965 9.74959 13.6191L8.88407 13.3364C8.70869 13.2792 8.52536 13.25 8.34087 13.25H8Z"
            fill="#333333"
          />
        </svg>
        <h1>Profile</h1>
      </Link>

      <div
        onClick={handleLogout}
        className="cursor-pointer text-[#414141] flex justify-start gap-2 w-full ms-10 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.25 19C11.25 18.5858 11.5858 18.25 12 18.25H18C18.1381 18.25 18.25 18.1381 18.25 18L18.25 6C18.25 5.86193 18.1381 5.75 18 5.75L12 5.75C11.5858 5.75 11.25 5.41421 11.25 5C11.25 4.58579 11.5858 4.25 12 4.25H18C18.9665 4.25 19.75 5.0335 19.75 6V18C19.75 18.9665 18.9665 19.75 18 19.75H12C11.5858 19.75 11.25 19.4142 11.25 19Z"
            fill="#414141"
          />
          <path
            d="M15.6116 13.1152C15.6116 13.6675 15.1639 14.1152 14.6116 14.1152H9.75562C9.73269 14.4706 9.70399 14.8258 9.66951 15.1805L9.63985 15.4857C9.59162 15.982 9.06466 16.2791 8.61504 16.0637C6.78712 15.1876 5.13234 13.9889 3.73028 12.525L3.70032 12.4937C3.43323 12.2148 3.43323 11.7751 3.70032 11.4962L3.73028 11.4649C5.13234 10.001 6.78712 8.80226 8.61504 7.92625C9.06466 7.71077 9.59162 8.00796 9.63985 8.5042L9.66951 8.8094C9.70399 9.16413 9.73269 9.51928 9.75562 9.8747L14.6116 9.87471C15.1639 9.87471 15.6116 10.3224 15.6116 10.8747V13.1152Z"
            fill="#414141"
          />
        </svg>
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default MyProfile;
