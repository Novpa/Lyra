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
  "/signup",
  ValidationMiddleware.validate(AuthValidator.registerSchema),
  authController.register,
);

export default authRoute;
