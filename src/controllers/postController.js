import Post from "../models/Post";

export const CreatePost=async(req,res)=>{
    const {caption,image}=req.body;
    
    try{
        const post = await Post.create({
            caption, image,
            user:req.user._id
        })
        
        if(!post)
            console.log("error in creating post");
        return res.status(201).json({
                success:true,
                message:"Post created",
                post})
          }catch(error){
             return res.status(404).json({message:error})
           }


}


export const getAllPosts = async(req,res)=>{
    



}