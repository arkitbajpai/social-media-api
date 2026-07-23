import express from "express";

import { signup,login,logout} from "../controllers/authController.js";
import protectedroutes from "../middleware/authMiddleware.js";

const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/login",login);
authrouter.get("/me", authrouter)
authrouter.post("/logout", logout);

export default authrouter;