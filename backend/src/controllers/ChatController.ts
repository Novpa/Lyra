import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { success } from "zod";

export class ChatController {
  private chatService: ChatService;

  constructor(ChatServiceInstance: ChatService) {
    this.chatService = ChatServiceInstance;
    this.sendMessage = this.sendMessage.bind(this);
  }

  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { senderId, receiverId, content } = req.body;

      if (!senderId || !receiverId || !content) {
        return res
          .status(400)
          .json({ error: "senderId, receiverId, dan content wajib diisi!" });
      }

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
}
