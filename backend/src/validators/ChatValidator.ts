import { z } from "zod";

export class ChatValidator {
  // send message
  public static readonly sendMessage = z.object({
    body: z.object({
      senderId: z.uuid("Invalid sender ID"),
      receiverId: z.uuid("Invalid receiver ID"),
      content: z
        .string()
        .min(1, "Message content cannot be empty")
        .max(1000, "Message cannot exceed 1000 characters"),
    }),
  });

  // get chat history
  public static readonly getChatHistory = z.object({
    query: z.object({
      user1: z.uuid("Invalid sender ID"),
      user2: z.uuid("Invalid receiver ID"),
    }),
  });
}

// send message DTO
export type SendMessageDTO = z.infer<typeof ChatValidator.sendMessage>["body"];
export type GetChatHistory = z.infer<
  typeof ChatValidator.getChatHistory
>["query"];
