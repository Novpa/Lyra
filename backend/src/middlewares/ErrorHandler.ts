import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { Prisma } from "../../generated/prisma/client";

export class ErrorHandler {
  public static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // FIXME
    console.log("ERROR ===> ", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    if (err instanceof AppError) {
      statusCode = err.statusCode;
      message = err.message;
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002": {
          let targets = err.meta?.target as string[] | undefined;

          if (!targets && err.meta?.driverAdapterError) {
            const metaAny = err.meta as any;

            targets =
              metaAny.driverAdapterError?.cause?.constraint?.fields?.join(
                ", ",
              ) || "This field";
          }
          statusCode = 409;
          message = `Unique constraint failed: ${targets} is already in use.`;
        }

        case "P2025":
          statusCode = 404;
          message = "Record not found: The requested resource does not exist.";

        case "P2003":
          statusCode = 400;
          message =
            "Foreign key constraint failed: This data is linked to other existing records.";

        case "P2000":
          statusCode = 400;
          message =
            "Value too long: The provided input exceeds the column limit.";

        case "P2011":
          statusCode = 400;
          message = "Constraint violation: A required field cannot be null.";

        default:
          statusCode = 500;
          message = "Constraint violation: A required field cannot be null.";
      }
    }

    // Schema Validation Errors (Triggered before hitting the DB)
    if (err instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400;
      message =
        "Invalid data structure: Please check your input fields and types.";
    }

    // Connection & Initialization Errors
    if (err instanceof Prisma.PrismaClientInitializationError) {
      statusCode = 503;
      message =
        "Database connection failed: The server is currently unable to reach the data source.";
    }

    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}
