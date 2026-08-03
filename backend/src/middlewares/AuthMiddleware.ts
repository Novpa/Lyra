import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../types/tokenTypes";
import { AppError } from "../utils/AppError";
import { JwtTokenProvider } from "../utils/JwtTokenProvider";
import { TokenExpiredError } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export class AuthMiddleware {
  constructor() {}

  public static authentication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.cookies.accessToken;
      console.log("ACCESS TOKEN ==> ", accessToken);
      if (!accessToken) {
        throw new AppError(401, "Unauthenticated action");
      }

      const decoded = JwtTokenProvider.verifyAccessToken(accessToken);

      req.user = {
        userId: decoded.userId,
        fullName: decoded.fullName,
      };

      next();
    } catch (error) {
      if (
        error instanceof TokenExpiredError &&
        error.name === "TokenExpiredError"
      ) {
        throw new AppError(401, "Access token expired");
      } else {
        throw new AppError(400, "Invalid access Token");
      }
    }
  }
}
