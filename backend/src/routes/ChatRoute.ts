import { Router } from "express";
import { ChatRepository } from "../repositories/ChatRepository";
import { ChatService } from "../services/ChatService";
import { ChatController } from "../controllers/ChatController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { ChatValidator } from "../validators/ChatValidator";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const chatRoute = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

// >>> send message
chatRoute.post(
  "/",
  AuthMiddleware.authentication,
  ValidationMiddleware.validate(ChatValidator.sendMessage),
  chatController.sendMessage,
);

// >>> get chat history
chatRoute.get(
  "/history",
  AuthMiddleware.authentication,
  ValidationMiddleware.validate(ChatValidator.getChatHistory),
  chatController.getChatHistory,
);

// >>> get contact chat history
chatRoute.get(
  "/contact-history",
  AuthMiddleware.authentication,
  chatController.getContactChatHistory,
);

export default chatRoute;
