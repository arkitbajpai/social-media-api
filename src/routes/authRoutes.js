import express from "express";

import { signup,login} from "../controllers/authController";
import protectedroutes from "../middleware/authMiddleware";

const authrouter = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.get("/me", authrouter)

export default authrouter;