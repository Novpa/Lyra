"use client";

import { createContext, useContext, useState } from "react";
import { AuthState, AuthStore, createAuthStore } from "./auth-store";
import { useStore } from "zustand";

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

interface AuthStoreProviderProps {
  initialAuth: AuthState;
  children: React.ReactNode;
}

export default function AuthStoreProvider({
  initialAuth,
  children,
}: AuthStoreProviderProps) {
  const [authStore] = useState(() => createAuthStore(initialAuth));

  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
