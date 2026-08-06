"use client";

import ChatContainer from "./_components/ChatContainer";
import { useGetChatHistory } from "./_hooks/use-get-chat-history";

function Page() {
  const receiverId = "50569fcf-2af8-412e-b213-23f4943a3461";
  const { data } = useGetChatHistory(receiverId);
  console.log(data);
  return <ChatContainer />;
}

export default Page;
