"use client";
import { useChatStore } from "@/shared/store/chat-store/ChatStoreProvider";
import ChatItems from "./ChatItems";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useGetChatHistory } from "../_hooks/use-get-chat-history";

function ChatList() {
  const { activeContactId, activeAvatar, activeFirstName, activeLastName } =
    useChatStore((store) => store);
  const { id, avatar } = useAuthStore((store) => store);
  const { data } = useGetChatHistory(activeContactId as string);
  const totalData = data?.totalData;
  const totalPage = data?.totalPage;
  const currentPage = data?.currentPage;
  const messages = data?.data;

  console.log("CHAT HISTORY ==> ", data);
  return (
    <div className="pt-20">
      {Array.from({ length: 30 }).map((_, i: number) => {
        return <ChatItems key={i} />;
      })}
    </div>
  );
}

export default ChatList;
