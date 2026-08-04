import { createStore } from "zustand";

export interface AuthState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

interface AuthAction {
  setAuth: (data: AuthState) => void;
  clearAuth: () => void;
}

const defaultDefaultAuthState: AuthState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: null,
};

export type AuthStore = AuthState & AuthAction;

export const createAuthStore = (
  initialAuth: AuthState = defaultDefaultAuthState,
) => {
  return createStore<AuthStore>()((set) => {
    return {
      ...initialAuth,

      setAuth(data) {
        return set({ ...data });
      },

      clearAuth() {
        return set({ ...initialAuth });
      },
    };
  });
};
