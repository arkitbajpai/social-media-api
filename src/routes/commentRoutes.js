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
  auth,
  addComment
);

router.get(
  "/:postId",
  auth,
  getCommentsByPost
);

router.put(
  "/:commentId",
  auth,
  updateComment
);

router.delete(
  "/:commentId",
  auth,
  deleteComment
);

export default router;