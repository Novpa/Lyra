import express, { Express } from "express";
import Database from "./config/Database";
import { PORT } from "./config/Dotenv";
import authRoute from "./routes/AuthRoute";
import chatRoute from "./routes/ChatRoute";
import postRoute from "./routes/PostRoute";
import commentRoute from "./routes/CommentRoute";
import userRoute from "./routes/UserRoute";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { createServer } from "node:http";
import { WebSocketManager } from "./websockets/WebSocketManager";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

// main routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
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
  console.log(`[HTTP Server] is running on http://localhost:${PORT}`);
  console.log(`[WebSocket] is running on ws://localhost:${PORT}`);

  try {
    const db = Database.getInstance().getPool();
    db.query("SELECT NOW()");
  } catch (err) {
    console.error("Successfully connected to DB:", err);
  }
});
