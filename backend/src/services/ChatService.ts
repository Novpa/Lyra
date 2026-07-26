import { ChatRepository } from "../repositories/ChatRepository";
import { WebSocketManager } from "../websockets/WebSocketManager";

export class ChatService {
  private chatRepository: ChatRepository;

  constructor(ChatRepositoryInstance: ChatRepository) {
    this.chatRepository = ChatRepositoryInstance;
  }

  public async sendMessage(senderId: string, receiverId: string, text: string) {
    // save message to db
    //...

    // get instance
    const ws = WebSocketManager.getInstance();

    const payload = {
      type: "NEW_CHAT_MESSAGE",
      data: {
        from: senderId,
        content: text,
        timeStamp: new Date().toISOString(),
      },
    };

    // send to specific user
    ws.sendToUser(receiverId, payload);

    return { success: true, message: "Message sent successfully" };
  }
}
