import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const isAuthenticated = () => {
  // request can also be used to get cookies
  return (
    cookies().has("token") && cookies().has("email") && cookies().has("name")
  );
};

export function middleware(request: NextRequest) {
  if (isAuthenticated()) {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/profile", "/register"],
};
