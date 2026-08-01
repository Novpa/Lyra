import express, { Express } from "express";
import Database from "./config/Database";
import { PORT } from "./config/Dotenv";
import authRoute from "./routes/AuthRoute";
import chatRoute from "./routes/ChatRoute";
import postRoute from "./routes/PostRoute";
import commentRoute from "./routes/CommentRoute";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { createServer } from "node:http";
import { WebSocketManager } from "./websockets/WebSocketManager";

const app: Express = express();

app.use(express.json());

// main routes
app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// error handler
app.use(ErrorHandler.handle);

const server = createServer(app);

// web socket
const wsManager = WebSocketManager.getInstance();
wsManager.initialize(server);

server.listen(PORT, () => {
  console.log(`[HTTP Server] running on http://localhost:${PORT}`);
  console.log(`[WebSocket] Server ready on ws://localhost:${PORT}`);

  try {
    const db = Database.getInstance().getPool();
    db.query("SELECT NOW()");
  } catch (err) {
    console.error("Successfully connected to DB:", err);
  }
});
