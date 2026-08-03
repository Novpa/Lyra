import Database from "../config/Database";
import { COMMENT_QUERIES } from "../queries/commentQueries";
import { CreateComment } from "../types/commentTypes";

export class CommentRepository {
  constructor(
    private prisma = Database.getInstance().getPrisma(),
    private pool = Database.getInstance().getPool(),
  ) {}

  public async createComment({ postId, authorId, content }: CreateComment) {
    return await this.prisma.comment.create({
      data: {
        postId,
        authorId,
        content,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  public async getAllCommentsByPostId(
    postId: string,
    limit: number,
    page: number,
  ) {
    const offset = (page - 1) * limit;

    const rawResult = await this.pool.query(
      COMMENT_QUERIES.GET_ALL_COMMENT_BY_POST_ID,
      [postId, page, limit, offset],
    );

    const comments = rawResult.rows;
    return comments;
  }
}
