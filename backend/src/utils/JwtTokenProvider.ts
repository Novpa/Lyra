import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/Dotenv";
import { TokenPayload } from "../types/tokenTypes";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "./AppError";
import { Response } from "express";
import Cookie from "../config/Cookie";

export class JwtTokenProvider {
  //? generate tokens
  public static generateTokens(tokenPayload: TokenPayload) {
    const accessToken = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET!, {
      expiresIn: "14d",
    });

    return { accessToken, refreshToken };
  }

  //? verify refresh token
  public static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      if (
        error instanceof TokenExpiredError &&
        error.name === "TokenExpiredError"
      ) {
        throw new AppError(401, "Refresh token expired");
      } else {
        throw new AppError(400, "Invalid refresh token");
      }
    }
  }

  //? verify access token
  public static verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
  }

  //? set token cookie
  public static setTokenCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie("accessToken", accessToken, Cookie.ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, Cookie.REFRESH_COOKIE_OPTIONS);
  }

  //? clear token cookie
  public static clearTokenCookies(res: Response) {
    res.clearCookie("accessToken", Cookie.ACCESS_COOKIE_OPTIONS);
    res.clearCookie("refreshToken", Cookie.REFRESH_COOKIE_OPTIONS);
  }
}
