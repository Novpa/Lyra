import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetChatHistory = (
  receiverId?: string,
  page?: number,
  limit?: number,
) => {
  const chatHistoryQuery = useQuery({
    queryKey: ["chat-history", receiverId],
    queryFn: async () => {
      const { data } = await api.get(
        `/chats/history?user2=${receiverId}&page=${page}&limit=${limit}`,
        {},
      );

      return data;
    },
    enabled: !!receiverId,
  });

  return chatHistoryQuery;
};
