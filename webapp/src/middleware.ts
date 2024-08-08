import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // app should redirect to /dashboard by default
  const { pathname } = request.nextUrl;
  if (pathname === "/")
    return NextResponse.redirect(new URL("/dashboard", request.url));
}
