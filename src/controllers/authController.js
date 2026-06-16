
import User from "../models/User.js";
import bcrypt from "bcrypt";


export const signup= async(req, res)=>{
     const { name,
               email,
               password,
               gender}= req.body;
    try{
         if(!email|| !password)
         {
          return res.status(400).json({
            message : "email or password required"
          })
         }
         const existinguser= await User.findOne(email);
         if(existinguser){
            return res.status(400).json({
                 success:false, message:"User already exists"})
         }

         const salt= await bcrypt.genSalt(10);
         const hashPassword= await bcrypt.hash(password,salt);
         const newuser= await User.create({name,
                                        email,password:hashedPassword,gender });
                    return res.status(201).json({
                    success:true,
                    message:"User created successfully",
                    user
                })
     
        }
     catch(error)
     {
        return res.status(404).json(
            {
                success:false, message:error
            }

        )
     }
}

export const login = async(req,res)=>{
     const {email, password}= req.body;
    try{
       const checkuser = User.findOne(email)
        if(!email|| !password)
        {
            return res.status(404).json({
                success:false,
                message:"uemail and password is requried sorry"
            })
        }
        
        if(!checkuser)
        {
            return res.status(404).json({
                    success:false,
                    message:"user doesnot exists"
                })
        }
      const isPasswordCorrect= await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"});
      }
        generateToken(user._id,res);
        res.status(200).json({
            message:"Login successful",
            user:{  
                email:User.email,
                fullName:User.name,
            }
        });

    }catch(error){
                 res.status(500).json({message:"Internal server error at login"});

    }
}