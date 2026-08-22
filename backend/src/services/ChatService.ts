import { ChatRepository } from "../repositories/ChatRepository";
import { WebSocketManager } from "../websockets/WebSocketManager";

export class ChatService {
  private chatRepository: ChatRepository;

  constructor(ChatRepositoryInstance: ChatRepository) {
    this.chatRepository = ChatRepositoryInstance;
  }

  // >>> send message
  public async sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ) {
    // save message to db
    const savedMessage = await this.chatRepository.saveMessage(
      senderId,
      receiverId,
      content,
    );

    // get instance
    const ws = WebSocketManager.getInstance();

    const payload = {
      type: "NEW_CHAT_MESSAGE",
      data: savedMessage,
    };

    // >>> send to specific user
    ws.sendToUser(receiverId, payload);

    return savedMessage;
  }

  // >>> get chat history
  public async getHistory(
    user1: string,
    user2: string,
    page: number,
    limit: number,
  ) {
    const offset = (page - 1) * limit;
    return await this.chatRepository.getChatHistory(
      user1,
      user2,
      limit,
      offset,
    );
  }

  // >>> get contact chat
  public async getContactChatHistory(
    userId: string,
    page: number,
    limit: number,
  ) {
    const offset = (page - 1) * limit;
    const contacts = await this.chatRepository.getContactChatHistory(
      userId,
      limit,
      offset,
    );

    return contacts;
  }
}
