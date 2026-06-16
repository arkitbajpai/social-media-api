import express from "express";

import protectedroutes from "../middleware/authMiddleware.js";

import {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post(
  "/:postId",
  protectedroutes,
  addComment
);

router.get(
  "/:postId",
  protectedroutes,
  getCommentsByPost
);

router.put(
  "/:commentId",
  protectedroutes,
  updateComment
);

router.delete(
  "/:commentId",
  protectedroutes,
  deleteComment
);

export default router;