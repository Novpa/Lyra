import Database from "../config/Database";
import { POST_QUERIES } from "../queries/postQueries";

export class PostRepository {
  private prisma = Database.getInstance().getPrisma();
  private pool = Database.getInstance().getPool();

  constructor() {}

  public async createPost(authorId: string, content: string) {
    return await this.prisma.post.create({
      data: {
        authorId,
        content,
      },
    });
  }

  public async getAllPost(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const result = await this.pool.query(POST_QUERIES.GET_ALL_POST, [
      page,
      limit,
      offset,
    ]);

    const allPost = result.rows;
    return allPost;
  }
}
