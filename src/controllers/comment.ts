import { Request, Response } from "express";
import Comment, { IComment } from "../models/comment/Comment";

type CommentCreateRequest = Request & {
  body: Omit<IComment, "_id">;
};

class CommentController {
  async createComment(req: CommentCreateRequest, res: Response) {
    try {
      const { author, text, collection } = req.body;

      const newComment = new Comment({
        text,
        collection,
        author,
      });

      await newComment.save();

      return res.json(newComment);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment)
        return res.status(404).json({ message: "Comment not found" });

      res.json(deletedComment);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async getCommentsByCollectionId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const comments = await Comment.find({ collection: id });

      if (!comments.length)
        return res.status(404).json({ message: "Comments not found" });

      res.json(comments);
    } catch (error) {}
  }
}

export const commentController = new CommentController();
