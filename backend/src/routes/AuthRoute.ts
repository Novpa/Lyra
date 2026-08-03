import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { AuthValidator } from "../validators/AuthValidator";
import { TokenRepository } from "../repositories/TokenRepository";

const userRepository = new UserRepository();
const tokenRepository = new TokenRepository();
const authService = new AuthService(userRepository, tokenRepository);
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

authRoute.post("/refresh", authController.refresh);

export default authRoute;
