import express, { Express } from "express";
import Database from "./config/database.config";

const app: Express = express();
const PORT = 8000;

app.use(express.json());

const db = Database.getInstance();

db.getPool().query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Gagal terhubung ke database:", err);
  } else {
    console.log("Database time:", res.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
