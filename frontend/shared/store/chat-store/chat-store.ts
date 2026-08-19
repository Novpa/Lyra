import { createStore } from "zustand";

interface ChatState {
  activeContactId: string | null;
  activeAvatar: string | null;
  activeFirstName: string;
  activeLastName: string;
}

interface ChatAction {
  setActiveContact: (activeContactData: ChatState) => void;
  clearActiveContact: () => void;
}

export type ChatStore = ChatState & ChatAction;

export const createChatStore = () => {
  return createStore<ChatStore>()((set) => {
    return {
      activeContactId: null,
      activeAvatar: null,
      activeFirstName: "",
      activeLastName: "",
      setActiveContact: (activeContactData) => set({ ...activeContactData }),
      clearActiveContact: () => set({ activeContactId: null }),
    };
  });
};
