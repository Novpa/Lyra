import { Router } from "express";
import { ChatRepository } from "../repositories/ChatRepository";
import { ChatService } from "../services/ChatService";
import { ChatController } from "../controllers/ChatController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { ChatValidator } from "../validators/ChatValidator";

const chatRoute = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

chatRoute.post(
  "/",
  ValidationMiddleware.validate(ChatValidator.sendMessage),
  chatController.sendMessage,
);

chatRoute.get(
  "/history",
  ValidationMiddleware.validate(ChatValidator.getChatHistory),
  chatController.getChatHistory,
);

export default chatRoute;
