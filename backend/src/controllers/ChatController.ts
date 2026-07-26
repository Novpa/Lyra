import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/ChatService";

export class ChatController {
  private chatService: ChatService;

  constructor(ChatServiceInstance: ChatService) {
    this.chatService = ChatServiceInstance;
    this.sendMessage = this.sendMessage.bind(this);
  }

  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { senderId, receiverId, text } = req.body;

      const result = await this.chatService.sendMessage(
        senderId,
        receiverId,
        text,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
