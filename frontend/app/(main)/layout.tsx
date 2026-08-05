import { getUserDetails } from "@/actions/get-user-details";
import WebSocketProvider from "@/shared/providers/WebSocketProvider";
import { AuthState } from "@/shared/store/auth-store/auth-store";
import StoreProvider from "@/shared/store/StoreProvider";
import { cookies } from "next/headers";

async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let userResponse;

  if (accessToken || refreshToken) {
    userResponse = await getUserDetails();
  }

  const initialAuth: AuthState = {
    id: String(userResponse?.data?.data?.id) || "",
    firstName: String(userResponse?.data?.data?.firstName) || "",
    lastName: String(userResponse?.data?.data?.lastName) || "",
    email: String(userResponse?.data?.data?.email) || "",
    avatar: String(userResponse?.data?.data?.avatar) || null,
  };

  return (
    <div className="w-full min-h-full">
      <StoreProvider initialAuth={initialAuth}>
        <WebSocketProvider userId={initialAuth.id}>
          {children}
        </WebSocketProvider>
      </StoreProvider>
    </div>
  );
}

export default layout;
