import { createStore } from "zustand";

interface ChatState {
  activeContactId: string | null;
}

interface ChatAction {
  setContactId: (contactId: string) => void;
  clearContactId: () => void;
}

export type ChatStore = ChatState & ChatAction;

export const createChatStore = () => {
  return createStore<ChatStore>()((set) => {
    return {
      activeContactId: null,
      setContactId: (contactId) => set({ activeContactId: contactId }),
      clearContactId: () => set({ activeContactId: null }),
    };
  });
};
