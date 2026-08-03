import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginUserDTO, RegisterUserDTO } from "../validators/AuthValidator";
import Cookie from "../config/Cookie";
import { JwtTokenProvider } from "../utils/JwtTokenProvider";

export class AuthController {
  private authService: AuthService;

  constructor(AuthService: AuthService) {
    this.authService = AuthService;
  }

  public register = async (
    req: Request<{}, {}, RegisterUserDTO, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newUser = await this.authService.register(req.body);

      res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request<{}, {}, LoginUserDTO, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        accessToken,
        refreshToken,
        userWithoutPassword: user,
      } = await this.authService.login(req.body);

      JwtTokenProvider.setTokenCookies(res, accessToken, refreshToken);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
