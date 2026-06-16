import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { token } from "morgan";

const protectedroutes = async(req,res, next)=>{
    try{
       const token=req.cookies.jwt;
       if(!token)
       {
        return res.status(401).json({
            message:"Unauthorized sorry!"
        })
       }

      const decoded= jwt.verify(token,process.env.JWT_SECRET);
       if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("User not found for token:", decoded.userId);
            return res.status(404).json({message:"Unauthorized user" });
        }
        req.user=user;
        next();

    }

    catch(error){
        console.error("protectRoute error:", error);
        res.status(500).json({message:"Internal server error in auth middleware"});

    }

}
export default protectedroutes;