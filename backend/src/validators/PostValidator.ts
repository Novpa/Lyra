import { z } from "zod";

export class PostValidator {
  // create post
  public static readonly createPostSchema = z.object({
    body: z.object({
      content: z
        .string()
        .min(2, "Post at least has 2 characters")
        .max(1000, "Post only contains max 1000 characters"),
    }),
  });
}

// login DTO
export type CreatePostDTO = z.infer<
  typeof PostValidator.createPostSchema
>["body"];
