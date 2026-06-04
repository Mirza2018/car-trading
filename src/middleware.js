import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export function middleware(request) {
  const cookies = new Cookies();
  const { pathname, origin } = request.nextUrl;
  // console.log("Received request for pathname:", pathname);
  const userCookie = request.cookies.get("car_trading_accessToken")?.value;
  // console.log("User cookie on homepage:", userCookie);

  if (!userCookie) {
    console.log("No user cookie found, checking public paths");
    const publicPaths = [
      "/",
      "/about-us",
      "/faq",
      "/contact-us",
      "/prisstruktur",
      "/private",
      "/cookie",
      "/sell-car",
      "/submit-listing",
    ];
    if (!publicPaths.includes(pathname)) {
      console.log("Pathname not in public paths, redirecting to home");
      return NextResponse.redirect(new URL("/", origin));
    }
    console.log("Pathname is public, proceeding");
    return NextResponse.next();
  }

  console.log("User cookie found, parsing user");

  let user;
  try {
    user = jwtDecode(userCookie);
    console.log("User parsed successfully:", user);
  } catch (error) {
    console.log("Error parsing user, deleting cookie and redirecting:", error);
    const response = NextResponse.redirect(new URL("/", origin));
    response.cookies.delete("car-trading_user");
    return response;
  }

  // Restrict /task and /task/:id to dealers only
  if (pathname === "/task" || pathname.startsWith("/task/")) {
    console.log("Accessing task route, checking user role");
    if (user.role !== "dealer") {
      console.log("Non-dealer trying to access task route, redirecting");
      return NextResponse.redirect(new URL("/", origin));
    }
  }

  // Restrict /submit-listing to private_user only
  if (pathname === "/submit-listing") {
    console.log("Accessing submit-listing route, checking user role");
    if (user.role == "dealer") {
      console.log(
        "Non-private_user trying to access submit-listing, redirecting",
      );
      return NextResponse.redirect(new URL("/", origin));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    console.log("Accessing dashboard, checking user role");
    if (!user.role) {
      console.log("No user role found, redirecting to home");
      return NextResponse.redirect(new URL("/", origin));
    } else if (user.role === "dealer") {
      console.log("User is a dealer, checking allowed paths");
      const allowedDealerDashboardPaths = [
        "/dashboard/total-dealer-car-sell",
        "/dashboard/dealer-offer-car-aggrement",
        "/dashboard/order-transport",
        "/dashboard/my-bids",
        "/dashboard/user-profile",
        "/dashboard/terms",
        "/dashboard/privacy",
      ];
      const isAllowedPath = allowedDealerDashboardPaths.some((path) =>
        pathname.startsWith(path),
      );
      const isOrderTransportPath = pathname.startsWith(
        "/dashboard/total-dealer-car-sell/order-transport",
      );
      if (!isAllowedPath && !isOrderTransportPath) {
        console.log("Dealer trying to access unauthorized path, redirecting");
        return NextResponse.redirect(
          new URL("/dashboard/total-dealer-car-sell", origin),
        );
      }
    } else if (user.role === "private_user") {
      console.log("User is a regular user, checking allowed paths");
      const allowedUserDashboardPaths = [
        "/dashboard/total-private-car-sell",
        "/dashboard/listed-cars",
        "/dashboard/private-offer-car-aggrement",
        "/dashboard/total-car-sold",
        "/dashboard/offer-car",
        "/dashboard/bid-car",
        "/dashboard/user-profile",
        "/dashboard/terms",
        "/dashboard/privacy",
      ];
      const isAllowedPath = allowedUserDashboardPaths.some((path) =>
        pathname.startsWith(path),
      );
      if (!isAllowedPath) {
        console.log("User trying to access unauthorized path, redirecting");
        return NextResponse.redirect(
          new URL("/dashboard/total-private-car-sell", origin),
        );
      }
    }
  }

  console.log("Request processed, continuing");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/submit-listing",
    "/listings",
    "/task/:path*",
  ],
};
