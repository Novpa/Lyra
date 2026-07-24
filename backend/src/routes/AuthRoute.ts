import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { AuthValidator } from "../validators/AuthValidator";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authRoute = Router();

authRoute.post(
  "/register",
  ValidationMiddleware.validate(AuthValidator.registerSchema),
  authController.register,
);

authRoute.post(
  "/login",
  ValidationMiddleware.validate(AuthValidator.loginSchema),
  authController.login,
);

export default authRoute;
