import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import {
  ChatValidator,
  GetChatHistory,
  SendMessageDTO,
} from "../validators/ChatValidator";

export class ChatController {
  private chatService: ChatService;

  constructor(ChatServiceInstance: ChatService) {
    this.chatService = ChatServiceInstance;
    this.sendMessage = this.sendMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
  }

  public async sendMessage(
    req: Request<{}, {}, SendMessageDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const senderId = req.user?.userId as string;
      const { receiverId, content } = req.body;

      const result = await this.chatService.sendMessage(
        senderId,
        receiverId,
        content,
      );

      res.status(200).json({
        success: true,
        message: "Message sent & notified successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getChatHistory(
    req: Request<{}, {}, {}, GetChatHistory>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user1 = req.user?.userId as string;
      const user2 = req.query.user2;
      const messages = await this.chatService.getHistory(user1, user2);

      res.status(200).json({
        success: true,
        message: "Chat history retrieved successfully!",
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  }
}
