import { ChatRepository } from "../repositories/ChatRepository";
import { WebSocketManager } from "../websockets/WebSocketManager";

export class ChatService {
  private chatRepository: ChatRepository;

  constructor(ChatRepositoryInstance: ChatRepository) {
    this.chatRepository = ChatRepositoryInstance;
  }

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

    // send to specific user
    ws.sendToUser(receiverId, payload);

    return savedMessage;
  }
}
