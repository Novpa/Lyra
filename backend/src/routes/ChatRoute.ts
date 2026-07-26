import { Router } from "express";
import { ChatRepository } from "../repositories/ChatRepository";
import { ChatService } from "../services/ChatService";
import { ChatController } from "../controllers/ChatController";

const chatRoute = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

chatRoute.post("/", chatController.sendMessage);

export default chatRoute;
