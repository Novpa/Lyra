import z from "zod";

export class CommentValidator {
  public static readonly createComment = z.object({
    body: z.object({
      authorId: z.uuid("Invalid user ID"), // FIXME (remove after using authentication middleware)
      content: z
        .string()
        .min(1, "Post at least has 1 characters")
        .max(225, "Post only contains max 225 characters"),
    }),
    params: z.object({
      postId: z.uuid("Invalid post ID"),
    }),
  });

  public static readonly getAllCommentByPostIdSchema = z.object({
    params: z.object({
      postId: z.uuid("Invalid post ID"),
    }),
  });
}

export type CreateCommentDTO = z.infer<
  typeof CommentValidator.createComment
>["body"];

export type CreateCommentParamsDTO = z.infer<
  typeof CommentValidator.createComment
>["params"];

export type GetAllCommentByPostIdParamsDTO = z.infer<
  typeof CommentValidator.getAllCommentByPostIdSchema
>["params"];
