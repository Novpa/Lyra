import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/PostService";
import { CreatePostDTO } from "../validators/PostValidator";

export class PostController {
  private postService: PostService;

  constructor(PostServiceInstance: PostService) {
    this.postService = PostServiceInstance;
    this.createPost = this.createPost.bind(this);
  }

  public async createPost(
    req: Request<{}, {}, CreatePostDTO, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // fixme (get userId from authentication middleware)
      const { userId, content } = req.body;
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
}
