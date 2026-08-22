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
    this.getContactChatHistory = this.getContactChatHistory.bind(this);
  }

  // >>> send message
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

  // >>> get chat history
  public async getChatHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const user1 = req.user?.userId as string;
      const user2 = req.query?.user2 as string;
      const page = Number(req.query?.page) || 1;
      const limit = Number(req.query?.limit) || 50;

      const messages = await this.chatService.getHistory(
        user1,
        user2,
        page,
        limit,
      );

      res.status(200).json({
        success: true,
        message: "Chat history retrieved successfully!",
        data: { ...messages, currentPage: page },
      });
    } catch (error) {
      next(error);
    }
  }

  // get contact chat history
  public async getContactChatHistory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 50;
      const userId = req.user?.userId as string;
      const contacts = await this.chatService.getContactChatHistory(
        userId,
        page,
        limit,
      );

      res.status(200).json({
        success: true,
        message: "Contacts data retrieved successfully!",
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  }
}
