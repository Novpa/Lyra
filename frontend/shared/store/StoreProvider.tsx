import { AuthState } from "./auth-store/auth-store";
import AuthStoreProvider from "./auth-store/AuthStoreProvider";

interface StoreProviderProps {
  initialAuth: AuthState;
  children: React.ReactNode;
}

function StoreProvider({ children, initialAuth }: StoreProviderProps) {
  return (
    <AuthStoreProvider initialAuth={initialAuth}>{children}</AuthStoreProvider>
  );
}

export default StoreProvider;
