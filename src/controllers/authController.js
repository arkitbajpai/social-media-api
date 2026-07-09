
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

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
         const existinguser= await User.findOne({email});
         if(existinguser){
            return res.status(400).json({
                 success:false, message:"User already exists"})
         }

         const salt= await bcrypt.genSalt(10);
         const hashPassword= await bcrypt.hash(password,salt);
         const newuser= await User.create({name,email,password,gender });
                    return res.status(201).json({
                    success:true,
                    message:"User created successfully",
                    newuser
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

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate Input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
      const checkuser = await User.findOne({ email }).select("+password");

        if (!checkuser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare Password
    const isPasswordCorrect = await checkuser.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = generateToken(checkuser._id, res);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: checkuser._id,
                name: checkuser.name,
                email: checkuser.email,
                gender: checkuser.gender,
                avatar: checkuser.avatar
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};