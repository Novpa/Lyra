import Database from "../config/Database";
import { AppError } from "../util/AppError";

export class ChatRepository {
  constructor(private prisma = Database.getInstance().getPrisma()) {}

  public async saveMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ) {
    const isSenderExist = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
    });

    const isReceiverExist = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!isSenderExist || !isReceiverExist)
      throw new AppError(400, "Invalid sender or receiver id!");

    return await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }

  // get chat history
  public async getChatHistory(user1: string, user2: string) {
    return await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
