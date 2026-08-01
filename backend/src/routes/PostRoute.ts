import { Router } from "express";
import { PostRepository } from "../repositories/PostRepository";
import { PostService } from "../services/PostService";
import { PostController } from "../controllers/PostController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { PostValidator } from "../validators/PostValidator";

const postRoute = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRoute.post(
  "/",
  ValidationMiddleware.validate(PostValidator.createPostSchema),
  postController.createPost,
);

postRoute.get("/", postController.getAllPost);

export default postRoute;
