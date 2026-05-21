import express from "express";
import protectedroutes from "../middleware/authMiddleware";
import { CreatePost } from "../controllers/postController";

const router=express.Router();
router.post(
"/create",
protectedroutes,
createPost
);

export default router;