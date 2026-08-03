import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginUserDTO, RegisterUserDTO } from "../validators/AuthValidator";
import Cookie from "../config/Cookie";
import { JwtTokenProvider } from "../utils/JwtTokenProvider";
import { AppError } from "../utils/AppError";

export class AuthController {
  private authService: AuthService;

  constructor(AuthService: AuthService) {
    this.authService = AuthService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  public async register(
    req: Request<{}, {}, RegisterUserDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
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
  }

  public async login(
    req: Request<{}, {}, LoginUserDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
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
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const storedRefreshToken = req.cookies.refreshToken;

      if (!storedRefreshToken) {
        throw new AppError(401, "Your session has finished, please re-login");
      }

      const { accessToken, refreshToken } =
        await this.authService.refresh(storedRefreshToken);

      JwtTokenProvider.setTokenCookies(res, accessToken, refreshToken);

      res.status(200).json({
        success: true,
        message: "Token refreshed",
      });
    } catch (error) {
      next(error);
    }
  }
}
