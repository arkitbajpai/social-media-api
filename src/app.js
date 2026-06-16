import express from "express";
import authrouter from "./routes/authRoutes.js"; 
import protectedroutes from "./middleware/authMiddleware.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();




app.get("/",(req,res)=>{
    res.send("API Running");
})

app.use("/api/auth", protectedroutes);

app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);

export default app;

