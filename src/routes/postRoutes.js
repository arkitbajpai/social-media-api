import express from "express";
import protectedroutes from "../middleware/authMiddleware.js";
import { CreatePost,
getAllPosts,
updatePost,
deletePost } from "../controllers/postController.js";

const router=express.Router();
router.post(
"/create",
protectedroutes,
CreatePost
);
router.get("/",protectedroutes,getAllPosts);

//router.get("/:id",auth,getSinglePost);

router.put("/:id",protectedroutes,updatePost);

router.delete("/:id",protectedroutes,deletePost);

export default router;