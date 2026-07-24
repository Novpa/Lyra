import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export class ValidationMiddleware {
  public static validate(schema: ZodObject<any>) {
    return async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            success: false,
            message: "Failed validation",
            errors: error.issues.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          });
          return;
        }

        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    };
  }
}
