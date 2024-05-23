import { Router } from "express";
import { commentController } from "../controllers/comment";

export const commentRouter = Router();

commentRouter.post("/", commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.get("/:id", commentController.getCommentsByCollectionId);
