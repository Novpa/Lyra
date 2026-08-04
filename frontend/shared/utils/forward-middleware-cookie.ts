import { NextResponse } from "next/server";
import * as cookie from "cookie";

export const forwardMiddlewareCookie = (
  setCookieHeader: string[] | undefined,
  responseObj: NextResponse,
) => {
  if (!setCookieHeader || !setCookieHeader.length) return;

  setCookieHeader.forEach((cookieString) => {
    const parsed = cookie.parseCookie(cookieString);
    const [cookieKey, cookieValue] = Object.entries(parsed)[0];

    const isDeleteAction =
      parsed["Max-Age"] === "0" ||
      (parsed.Expires && new Date(parsed.Expires).getTime() < Date.now());

    if (isDeleteAction) {
      responseObj.cookies.delete(cookieKey);
    } else {
      responseObj.cookies.set(cookieKey, cookieValue as string, {
        httpOnly: cookieString.toLowerCase().includes("httponly"),
        secure: cookieString.toLowerCase().includes("secure"),
        path: parsed.Path || "/",
        maxAge: parsed["Max-Age"] ? parseInt(parsed["Max-Age"], 10) : undefined,
        sameSite:
          (parsed.SameSite?.toLowerCase() as "lax" | "strict" | "none") ||
          "lax",
      });
    }
  });
};
