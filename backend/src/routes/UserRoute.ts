import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userRoute = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.get("/email/:email", userController.findUserByEmail);
userRoute.get(
  "/me",
  AuthMiddleware.authentication,
  userController.getUserDetails,
);

export default userRoute;
