import express from "express";
import protectedroutes from "../middleware/authMiddleware";
import { createPost,
getAllPosts,
getSinglePost,
updatePost,
deletePost } from "../controllers/postController";

const router=express.Router();
router.post(
"/create",
protectedroutes,
createPost
);
router.get("/",auth,getAllPosts);

router.get("/:id",auth,getSinglePost);

router.put("/:id",auth,updatePost);

router.delete("/:id",auth,deletePost);

export default router;