import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetChatContactHistory = (page?: number, limit?: number) => {
  const chatContactHistoryQuery = useQuery({
    queryKey: ["chat-contact-history", "contact"],
    queryFn: async () => {
      const { data } = await api.get(`/chats/contact-history?${page}&${limit}`);
      return data?.data;
    },
  });

  return chatContactHistoryQuery;
};
