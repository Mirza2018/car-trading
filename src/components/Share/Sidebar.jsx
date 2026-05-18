"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AllImages } from "@/assets/AllImages";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { clearAuth } from "@/redux/slices/authSlice";
import { toast } from "sonner";

// =================================================================
// Custom Hook: useOutsideClick
// Handles closing the sidebar when a click occurs outside its area.
// =================================================================
const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// =================================================================
// Main Component: Sidebar
// =================================================================
const Sidebar = ({ slider, setSlider }) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = usePathname();

  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    if (slider) {
      setSlider(false);
    }
  });

  const handleLogout = () => {
    dispatch(clearAuth());
    cookies.remove("car_trading_accessToken", { path: "/" });
    cookies.remove("car_trading_accessToken", { path: "/dashboard" });

    toast.success("Log ud gennemført succesfuldt");
    window.location.replace("/");
  };

  // =================================================================
  // Helper Component: MenuItem
  // =================================================================
  const MenuItem = ({ href, src, alt, text, isDashboardExit = false }) => {
    const isActive = location === href && !isDashboardExit;

    const handleClick = () => {
      // Close sidebar on mobile after clicking a link
      if (setSlider) {
        setSlider(false);
      }
    };

    return (
      <Link href={href} className="w-full" onClick={handleClick}>
        <li
          className={`flex items-center gap-x-3 w-full py-3 px-2 font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg transition-colors duration-200 ${
            isActive
              ? "text-white bg-highlight-color"
              : isDashboardExit
              ? "text-black hover:bg-red-100 lg:hidden" // Highlighted for Exit/Home on mobile
              : "text-black hover:bg-gray-100"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            width={30}
            style={{
              filter: isActive ? "brightness(0) invert(1)" : undefined,
            }}
          />
          <p>{text}</p>
        </li>
      </Link>
    );
  };

  // =================================================================
  // Menu Items Content
  // =================================================================
  const menuItems = (
    <div className="p-4">
      <ul className="flex justify-center items-start flex-col gap-3">
        {/* --- NEW: Exit Dashboard Button for Mobile --- */}
        {/* Assumes AllImages.home or similar is available. Using AllImages.logOut as a placeholder for a distinct icon if 'home' isn't available. */}
        <MenuItem
          href="/"
          src={AllImages.logOut} // Replace with AllImages.home or AllImages.arrowLeft if needed
          alt="go-home"
          text="Gå til Forsiden"
          isDashboardExit={true}
        />
        {/* --- END NEW --- */}

        {/* Conditional menu items based on user role */}
        {userInfo?.role === "dealer" ? (
          // --- Dealer Menu Items ---
          <>
            <MenuItem
              href="/dashboard/total-dealer-car-sell"
              src={AllImages.totalCar}
              alt="total-car"
              text="Mine købte biler"
            />
            {/* ... rest of dealer menu items ... */}
            <MenuItem
              href="/dashboard/dealer-offer-car-aggrement"
              src={AllImages.totalCar}
              alt="dealer-agreement"
              text="Sendte tilbud"
            />
            <MenuItem
              href="/dashboard/my-bids"
              src={AllImages.bid}
              alt="my-bids"
              text="Mine bud"
            />
            <MenuItem
              href="/dashboard/order-transport"
              src={AllImages.orderTransport}
              alt="order-transport"
              text="Bestil transport"
            />
          </>
        ) : (
          // --- Private Seller Menu Items ---
          <>
            <MenuItem
              href="/dashboard/total-private-car-sell"
              src={AllImages.totalCar}
              alt="overview"
              text="Oversigt"
            />
            {/* ... rest of private seller menu items ... */}
            <MenuItem
              href="/dashboard/listed-cars"
              src={AllImages.totalCar}
              alt="listed-cars"
              text="Mine biler"
            />
            <MenuItem
              href="/dashboard/total-car-sold"
              src={AllImages.totalCar}
              alt="car-sold"
              text="Solgte biler"
            />
            <MenuItem
              href="/dashboard/private-offer-car-aggrement"
              src={AllImages.totalCar}
              alt="private-agreement"
              text="Mine handler"
            />
            <MenuItem
              href="/dashboard/offer-car"
              src={AllImages.offer}
              alt="offer-car"
              text="Tilbud fra forhandlere"
            />
            <MenuItem
              href="/dashboard/bid-car"
              src={AllImages.bid}
              alt="bid-car"
              text="Købstilbud"
            />
          </>
        )}

        {/* --- Shared Menu Items --- */}
        <MenuItem
          href="/dashboard/user-profile"
          src={AllImages.userProfile}
          alt="user-profile"
          text="Min profil"
        />
        <MenuItem
          href="/dashboard/terms"
          src={AllImages.terms}
          alt="terms"
          text="Vilkår"
        />
        <MenuItem
          href="/dashboard/privacy"
          src={AllImages.terms}
          alt="privacy"
          text="Privatliv"
        />

        {/* Logout Button (not a Link) */}
        <li
          onClick={handleLogout}
          className={`flex items-center gap-x-3 w-full py-3 px-2 font-semibold text-lg lg:rounded-tr-lg lg:rounded-br-lg cursor-pointer transition-colors duration-200 hover:bg-red-500 hover:text-white text-black`}
        >
          <Image src={AllImages.logOut} alt="logout" width={30} />
          Log ud
        </li>
      </ul>
    </div>
  );

  // =================================================================
  // Component Render (Focus on Mobile Overlay)
  // =================================================================
  return (
    <div className="bg-base-color text-black h-[89vh] lg:h-screen lg:fixed pt-5 overflow-y-auto">
      {/* 1. Mobile Toggle Button (Visible on small screens) */}
      <div className="lg:hidden md:px-4 px-0 mb-4">
        <button
          onClick={() => setSlider(true)}
          className="ml-0"
          aria-label="Open menu"
        >
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
      </div>

      {/* 2. Desktop Sidebar (Always visible) */}
      <div className="hidden lg:block relative h-full">{menuItems}</div>

      {/* 3. Mobile Slide-Out Sidebar (Fixed overlay and content) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          slider
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay to close sidebar on click outside */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSlider(false)}
        />

        {/* Sidebar Content Panel */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 left-0 h-full w-3/4 max-w-xs bg-base-color shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            slider ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* --- CLOSE BUTTON (Sticky at the top for easy access) --- */}
          <div className="flex justify-end p-4 sticky top-0 bg-base-color z-10">
            <button onClick={() => setSlider(false)} aria-label="Close menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-8 h-8 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          {/* The actual menu items */}
          {menuItems}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
