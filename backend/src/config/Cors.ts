import { FRONTEND_URL, NODE_ENV } from "./Dotenv";

export class Cors {
  public static readonly allowedOrigins = Cors.buildAllowedOrigins();

  public static readonly CORS_CONFIG = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) return callback(null, true);

      if (Cors.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked: ${origin}`);
        callback(new Error(`CORS policy: Origin "${origin}" is not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  };

  public static buildAllowedOrigins(): string[] {
    const rawOrigins = [FRONTEND_URL];
    // filter out undefined, null, empty strings
    const cleanOrigins = rawOrigins.filter(
      (origin): origin is string =>
        typeof origin === "string" && origin.trim().length > 0,
    );

    if (NODE_ENV !== "production") {
      cleanOrigins.push("http://localhost:3000");
    }

    return cleanOrigins;
  }
}
