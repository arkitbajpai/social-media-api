import express from "express";
import authrouter from "./routes/authRoutes"; 
import protectedroutes from "./middleware/authMiddleware";
import postRoutes from "./routes/postRoutes.js";

const app = express();




app.get("/",(req,res)=>{
    res.send("API Running");
})

app.use("/api/auth", authRoutes);

app.use("/api/posts",postRoutes);

export default app;

