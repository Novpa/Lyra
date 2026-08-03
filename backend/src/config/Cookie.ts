import { NODE_ENV } from "./Dotenv";
import { CookieOptions } from "express";

class Cookie {
  private static instance: Cookie;
  private static readonly isProd = NODE_ENV === "production";

  public readonly ACCESS_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: Cookie.isProd,
    sameSite: Cookie.isProd ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
  };

  public readonly REFRESH_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: Cookie.isProd,
    sameSite: Cookie.isProd ? "none" : "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
    path: "/",
  };

  private constructor() {}

  public static getInstance() {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie();
    }

    return Cookie.instance;
  }
}

export default Cookie.getInstance();
