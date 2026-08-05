"use client";

import { useEffect, useRef } from "react";
import { WEBSOCKET_URL } from "../config/dotenv-config";
import { toast } from "sonner";
import { showSocialToast } from "../components/CustomNotificationToast";

interface WebSocketProviderProps {
  userId: string;
  children: React.ReactNode;
}

function WebSocketProvider({ userId, children }: WebSocketProviderProps) {
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    //
    if (!userId) return;

    const ws = new WebSocket(String(WEBSOCKET_URL));
    webSocketRef.current = ws;

    ws.onopen = () => {
      console.log(
        `[Global WebSocket]: ${userId} is connecting to the websocket...`,
      );
      const data = {
        type: "REGISTER",
        userId,
      };
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      try {
        //fixme (add mapper util function based on type)
        if (data.type === "NEW_CHAT_MESSAGE") {
          showSocialToast({
            avatar: data?.data?.sender?.avatar,
            firstName: data?.data?.sender?.firstName,
            lastName: data?.data?.sender?.lastName,
            content: data?.data?.content,
          });
        }
      } catch (error) {
        console.log("[Global WebSocket] :", error);
      }
    };

    ws.onclose = () => {
      console.log("[Global WebSocket]: Connection closed.");
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  return <div>{children}</div>;
}

export default WebSocketProvider;
