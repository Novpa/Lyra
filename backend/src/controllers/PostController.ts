import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/PostService";
import { CreatePostDTO } from "../validators/PostValidator";

export class PostController {
  private postService: PostService;

  constructor(PostServiceInstance: PostService) {
    this.postService = PostServiceInstance;
    this.createPost = this.createPost.bind(this);
    this.getAllPost = this.getAllPost.bind(this);
  }

  public async createPost(
    req: Request<{}, {}, CreatePostDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.userId as string;
      const { content } = req.body;
      const createdPost = await this.postService.createPost(userId, content);

      res.status(201).json({
        success: true,
        message: "Post created successfully!",
        data: createdPost,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllPost(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      const allPost = await this.postService.getAllPost(limit, page);

      res.status(201).json({
        success: true,
        message: "Post data retrieved successfully!",
        data: allPost,
      });
    } catch (error) {
      next(error);
    }
  }
}
