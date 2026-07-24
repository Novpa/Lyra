import express, { Express } from "express";
import Database from "./config/Database";
import { PORT } from "./config/Dotenv";
import authRoute from "./routes/AuthRoute";
import { ErrorHandler } from "./middlewares/ErrorHandler";

const app: Express = express();

app.use(express.json());

const db = Database.getInstance();

// db connection setting
db.getPool().query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Successfully connected to DB:", err);
  } else {
    console.log("Database time:", res.rows[0].now);
  }
});

// main routes
app.use("/api/auth", authRoute);

// error handler
app.use(ErrorHandler.handle);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
