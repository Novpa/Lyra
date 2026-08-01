import { Router } from "express";
import { CommentRepository } from "../repositories/CommentRepository";
import { CommentService } from "../services/CommentService";
import { CommentController } from "../controllers/CommentController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddlewares";
import { CommentValidator } from "../validators/CommentValidator";

const commentRoute = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

commentRoute.post(
  "/:postId",
  ValidationMiddleware.validate(CommentValidator.createComment),
  commentController.createComment,
);
commentRoute.get(
  "/:postId",
  ValidationMiddleware.validate(CommentValidator.getAllCommentByPostIdSchema),
  commentController.getAllCommentByPostId,
);

export default commentRoute;
