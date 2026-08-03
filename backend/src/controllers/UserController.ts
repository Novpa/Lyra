import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor(userServiceInstance: UserService) {
    this.userService = userServiceInstance;
    this.findUserByEmail = this.findUserByEmail.bind(this);
  }

  public findUserByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
  };
}
