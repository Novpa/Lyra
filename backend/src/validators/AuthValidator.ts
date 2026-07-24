import { z } from "zod";

export class AuthValidator {
  // register
  public static readonly registerSchema = z.object({
    body: z.object({
      firstName: z
        .string()
        .min(2, "First name at least has 2 characters")
        .max(50, "First name only contains max 50 characters"),
      lastName: z
        .string()
        .min(2, "Last name at least has 2 characters")
        .max(35, "Last name only contains max 35 characters"),
      email: z.email("Email format is not valid"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character",
        ),
      gender: z.enum(["MALE", "FEMALE"]).optional(),
    }),
  });
}

export type RegisterUserDTO = z.infer<
  typeof AuthValidator.registerSchema
>["body"];
