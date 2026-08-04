"use client";

import { useGetChatHistory } from "./_hooks/use-get-chat-history";

function Page() {
  const receiverId = "123";
  const { data } = useGetChatHistory(receiverId);
  console.log(data);
  return <div>test</div>;
}

export default Page;
