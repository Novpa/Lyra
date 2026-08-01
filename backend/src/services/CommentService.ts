import { CommentRepository } from "../repositories/CommentRepository";
import { WebSocketManager } from "../websockets/WebSocketManager";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor(commentRepositoryInstance: CommentRepository) {
    this.commentRepository = commentRepositoryInstance;
  }

  public async createComment(data: any) {
    const createdComment = await this.commentRepository.createComment(data);

    // send notification
    const ws = WebSocketManager.getInstance();
    const payload = {
      type: "NEW_COMMENT_NOTIFICATION",
      data: createdComment,
    };
    ws.sendToUser(createdComment.authorId, payload);

    return createdComment;
  }

  public async getAllCommentsByPostId(
    postId: string,
    limit: number,
    page: number,
  ) {
    const rawComments = await this.commentRepository.getAllCommentsByPostId(
      postId,
      limit,
      page,
    );

    const meta = {
      totalPage: 0,
      totalData: 0,
    };

    const comments = rawComments.map(({ totalData, totalPage, ...rest }) => {
      meta.totalData = totalData;
      meta.totalPage = totalPage;

      return rest;
    });

    return { comments, meta };
  }
}
