import express from "express";

import { signup,login} from "../controllers/authController.js";
import protectedroutes from "../middleware/authMiddleware.js";

const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/login",login);
authrouter.get("/me", authrouter)

export default authrouter;