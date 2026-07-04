import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
    toggleLike,
    getLikesByPost
} from "../controllers/likeController.js";

const router = express.Router();

router.post(
    "/toggle/:postId",
    auth,
    toggleLike
);

router.get(
    "/:postId",
    auth,
    getLikesByPost
);

export default router;