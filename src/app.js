import express from "express";
import authrouter from "./routes/authRoutes"; 
import protectedroutes from "./middleware/authMiddleware";

const app = express();




app.get("/",(req,res)=>{
    res.send("API Running");
})

app.use("/api/auth", authRoutes);

export default app;