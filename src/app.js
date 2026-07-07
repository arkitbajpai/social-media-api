import express from "express";
import authrouter from "./routes/authRoutes.js"; 
import protectedroutes from "./middleware/authMiddleware.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cookieParser from "cookie-parser";
import likeRoutes from "./routes/likeRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";

const app = express();




app.get("/",(req,res)=>{
    res.send("API Running");
})
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authrouter);

app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/friends", friendRoutes);
export default app;

