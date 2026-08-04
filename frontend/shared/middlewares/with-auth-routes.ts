import { NextRequest, NextResponse } from "next/server";

export async function withAuthRoutes(
  request: NextRequest,
  _response: NextResponse,
) {
  const {
    nextUrl: { pathname },
  } = request;

  const prefixes = ["/login", "/signup"];

  const isMatch = prefixes.some((prefix) => pathname.startsWith(prefix));
  const accessToken = request.cookies.get("accessToken")?.value;

  if (isMatch && !accessToken) {
    return null;
  }

  if (isMatch) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return null; // escape to the next middleware
}
