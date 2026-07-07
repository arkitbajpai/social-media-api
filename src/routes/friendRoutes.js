import express from "express";
import auth from "../middleware/authMiddleware.js";

import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getPendingRequests,
  getFriends,
  removeFriend,
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/request/:userId", auth, sendFriendRequest);

router.post("/accept/:requestId", auth, acceptFriendRequest);

router.post("/reject/:requestId", auth, rejectFriendRequest);

router.get("/pending", auth, getPendingRequests);

router.get("/", auth, getFriends);

router.delete("/:friendshipId", auth, removeFriend);

export default router;