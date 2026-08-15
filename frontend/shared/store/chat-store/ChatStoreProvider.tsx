"use client";

import { createContext, useState, useContext } from "react";
import { ChatStore, createChatStore } from "./chat-store";
import { useStore } from "zustand";

export type ChatContextApi = ReturnType<typeof createChatStore>;

const ChatStoreContext = createContext<ChatContextApi | null>(null);

interface ChatStoreProviderProps {
  children: React.ReactNode;
}
export default function ChatStoreProvider({
  children,
}: ChatStoreProviderProps) {
  const [chatStore] = useState(() => createChatStore());
  return (
    <ChatStoreContext.Provider value={chatStore}>
      {children}
    </ChatStoreContext.Provider>
  );
}

export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext)
    throw new Error("useChatStore must be used within its provider");

  return useStore(chatStoreContext, selector);
};
