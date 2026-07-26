import { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

export class WebSocketManager {
  private static instance: WebSocketManager;
  private wss: WebSocketServer | null = null;
  private clients: Map<string, WebSocket> = new Map();

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public initialize(server: Server) {
    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws: WebSocket) => {
      console.log("[WebSocket] new client is trying to connect...");

      ws.on("message", (message: string) => {
        try {
          const data: any = JSON.parse(message);

          if (data.type === "REGISTER") {
            const userId = data.userId;
            this.clients.set(userId, ws);
            console.log(`[WebSocket] User: ${data.userId} is online`);
          }

          ws.send(
            JSON.stringify({
              type: "SYSTEM",
              message: "Successfully connected to Real-Time Server",
            }),
          );
        } catch (error) {
          console.error("[WebSocket] Error during message processing:", error);
        }
      });

      ws.on("close", () => {
        this.clients.forEach((clientConnection, userId) => {
          if (clientConnection === ws) {
            this.clients.delete(userId);
            console.log(`[WebSocket] User ${userId} offline!`);
          }
        });
      });
    });
  }

  // send notification to specific user
  public sendToUser(userId: string, payload: any): void {
    const client = this.clients.get(userId);

    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    } else {
      console.log(`[WebSocket] Sending data failed: ${userId} is offline!`);
    }
  }
}
