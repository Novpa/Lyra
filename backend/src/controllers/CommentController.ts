import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/CommentService";
import {
  CreateCommentDTO,
  CreateCommentParamsDTO,
  GetAllCommentByPostIdParamsDTO,
} from "../validators/CommentValidator";

export class CommentController {
  private commentService: CommentService;

  constructor(CommentServiceInstance: CommentService) {
    this.commentService = CommentServiceInstance;
    this.createComment = this.createComment.bind(this);
    this.getAllCommentByPostId = this.getAllCommentByPostId.bind(this);
  }

  public async createComment(
    req: Request<CreateCommentParamsDTO, {}, CreateCommentDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = req.params.postId;
      const result = await this.commentService.createComment({
        ...req.body,
        postId,
      });

      res.status(201).json({
        success: true,
        message: "Comment created successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllCommentByPostId(
    req: Request<GetAllCommentByPostIdParamsDTO, {}, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = req.params.postId;

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await this.commentService.getAllCommentsByPostId(
        postId,
        limit,
        page,
      );

      res.status(201).json({
        success: true,
        message: "Comments retrieved successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
