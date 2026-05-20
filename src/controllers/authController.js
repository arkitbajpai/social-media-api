import User from "../models/User";


export const signup= async(req, res)=>{
    try{
        const { name,
               email,
               password,
               gender}= req.body;
        if(!email|| !password)
        {
          return res.status(400).json({
            message : "email or password required"
          })
        }
    
        return await User.findOne({email})? res.status(400).json({ success:false, message:"User already exists"}):
          await User.create({name, email,password,gender });
     
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
