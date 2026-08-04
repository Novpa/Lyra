import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetChatHistory = (receiverId: string) => {
  const chatHistoryQuery = useQuery({
    queryKey: ["chat-history"],
    queryFn: async () => {
      const { data } = await api.get(`/chats/history/${receiverId}`, {
        withCredentials: true,
      });

      return data;
    },
  });

  return chatHistoryQuery;
};
