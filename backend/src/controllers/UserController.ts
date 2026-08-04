import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor(userServiceInstance: UserService) {
    this.userService = userServiceInstance;
    this.findUserByEmail = this.findUserByEmail.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  public async findUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req.params.email as string;
      const user = await this.userService.findUserByEmail(email);

      res.status(200).json({
        success: true,
        message: "User data retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as string;
      const user = await this.userService.getUserDetails(userId);

      res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
