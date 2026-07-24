import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL!;
export const PORT = parseInt(String(process.env.PORT)) || 8000;
