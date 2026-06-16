import express from "express";

import { signup,login} from "../controllers/authController.js";
import protectedroutes from "../middleware/authMiddleware.js";

const authrouter = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.get("/me", authrouter)

export default authrouter;