import { off } from "node:cluster";
import Database from "../config/Database";
import { CHAT_QUERIES } from "../queries/chatQueries";
import { AppError } from "../utils/AppError";

export class ChatRepository {
  constructor(
    private prisma = Database.getInstance().getPrisma(),
    private pool = Database.getInstance().getPool(),
  ) {}

  // >>> Save message
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

  // >>> get chat history
  public async getChatHistory(
    user1: string,
    user2: string,
    limit: number,
    offset: number,
  ) {
    const where = {
      OR: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    };

    const data = await this.prisma.message.findMany({
      where,
      orderBy: {
        createdAt: "asc",
      },
      take: limit,
      skip: offset,
    });

    const totalData = await this.prisma.message.count({
      where,
    });

    const totalPage = Math.ceil(totalData / limit);

    return { data, totalData, totalPage };
  }

  // >>> get contact chat history
  public async getContactChatHistory(
    userId: string,
    limit: number,
    offset: number,
  ) {
    const rawContacts = await this.pool.query(
      CHAT_QUERIES.GET_ALL_CONTACT_CHAT_HISTORY,
      [userId, limit, offset],
    );

    return rawContacts.rows;
  }
}
