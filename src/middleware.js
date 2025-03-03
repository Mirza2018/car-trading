import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const userCookie = request.cookies.get("car-trading_user");

  const publicPaths = ["/", "/about-us", "/contact-us"];

  if (!userCookie) {
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  let user;
  try {
    user = JSON.parse(decodeURIComponent(userCookie.value));
  } catch (error) {
    const response = NextResponse.redirect(new URL("/", origin));
    response.cookies.delete("car-trading_user");
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user.role) {
      const allowedDealerDashboardPaths = [
      ];
      if (!allowedDealerDashboardPaths.includes(pathname)) {
        return NextResponse.redirect(
          new URL("/", origin)
        );
      }
    } else if (user.role === "dealer") {
      const allowedDealerDashboardPaths = [
        "/dashboard/total-dealer-car-sell",
        "/dashboard/order-transport",
        "/dashboard/user-profile",
        "/dashboard/terms",
        "/dashboard/privacy",
      ];
      if (!allowedDealerDashboardPaths.includes(pathname)) {
        return NextResponse.redirect(
          new URL("/dashboard/total-dealer-car-sell", origin)
        );
      }
    } else if (user.role === "user") {
      const allowedUserDashboardPaths = [
        "/dashboard/total-private-car-sell",
        "/dashboard/total-car-sold",
        "/dashboard/offer-car",
        "/dashboard/bid-car",
        "/dashboard/user-profile",
        "/dashboard/terms",
        "/dashboard/privacy",
      ];
      if (!allowedUserDashboardPaths.includes(pathname)) {
        return NextResponse.redirect(
          new URL("/dashboard/total-private-car-sell", origin)
        );
      }
    }
  }

  if (pathname === "/submit-listing" && user.role !== "user") {
    return NextResponse.redirect(new URL("/", origin));
  }
  if (
    (pathname === "/listings" || pathname === "/task") &&
    user.role !== "dealer"
  ) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/submit-listing", "/listings", "/task"],
};
