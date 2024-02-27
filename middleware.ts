import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./service/authService";

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

// these matcher decides on which routes middleware will be executed
export const config = {
  // match for all routes except static pages and api routes
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
