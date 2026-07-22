import dotenv from "dotenv";
import { Pool } from "pg";
import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

class Database {
  private static instance: Database;
  private pool: Pool;
  private prisma: PrismaClient;

  private constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    });

    const adapter = new PrismaPg(this.pool);

    this.prisma = new PrismaClient({ adapter });

    this.pool.on("connect", () => {
      console.log("[PG Pool]: connected to PostgreSQL!");
    });

    this.pool.on("error", (err) => {
      console.error("[PG Pool]: failed connection", err);
      process.exit(-1);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public getPrisma(): PrismaClient {
    return this.prisma;
  }
}

export default Database;
